import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subDays } from "date-fns";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { searchParams } = new URL(req.url);
        const exportFormat = searchParams.get("format") || "csv";
        const range = searchParams.get("range") || "all";
        const customStart = searchParams.get("startDate");
        const customEnd = searchParams.get("endDate");

        let startDate: Date | null = null;
        let endDate: Date = new Date();

        if (range === "weekly") {
            startDate = startOfWeek(new Date(), { weekStartsOn: 1 });
            endDate = endOfWeek(new Date(), { weekStartsOn: 1 });
        } else if (range === "monthly") {
            startDate = startOfMonth(new Date());
            endDate = endOfMonth(new Date());
        } else if (range === "custom" && customStart && customEnd) {
            startDate = new Date(customStart);
            endDate = new Date(customEnd);
        }

        // Get all habits
        const habits = await Habit.find({
            userId: user.id,
        }).sort({ createdAt: -1 });

        // Get logs with date filter if applicable
        const logQuery: any = { userId: user.id };
        if (startDate) {
            logQuery.date = { $gte: startDate, $lte: endDate };
        }

        const logs = await HabitLog.find(logQuery).sort({ date: -1 });

        // Calculations for Analysis
        const totalHabits = habits.length;
        const totalLogs = logs.length;
        const totalCompletions = logs.filter(l => l.completed).length;
        const overallRate = totalLogs > 0 ? Math.round((totalCompletions / totalLogs) * 100) : 0;

        const categoryStats: Record<string, { total: number; completed: number }> = {};
        habits.forEach(h => {
            if (!categoryStats[h.category]) {
                categoryStats[h.category] = { total: 0, completed: 0 };
            }
        });

        logs.forEach(l => {
            const habit = habits.find(h => h._id.toString() === l.habitId.toString());
            if (habit) {
                categoryStats[habit.category].total++;
                if (l.completed) categoryStats[habit.category].completed++;
            }
        });

        const analysis = {
            period: range.toUpperCase(),
            dateRange: startDate ? `${format(startDate, "yyyy-MM-dd")} to ${format(endDate, "yyyy-MM-dd")}` : "All Time",
            summary: {
                totalHabits,
                totalLogs,
                totalCompletions,
                overallCompletionRate: `${overallRate}%`,
                bestStreak: Math.max(...habits.map(h => h.streak?.longest || 0), 0)
            },
            categoryPerformance: Object.entries(categoryStats).map(([name, stats]) => ({
                category: name,
                rate: stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}%` : "0%"
            }))
        };

        if (exportFormat === "json") {
            const habitData = habits.map((habit) => {
                const habitLogs = logs
                    .filter((log) => log.habitId.toString() === habit._id.toString())
                    .map((log) => ({
                        date: format(new Date(log.date), "yyyy-MM-dd"),
                        completed: log.completed,
                        count: log.count,
                        note: log.note || "",
                        skipped: log.skipped,
                    }));

                return {
                    title: habit.title,
                    icon: habit.icon,
                    color: habit.color,
                    category: habit.category,
                    habitType: habit.habitType,
                    streak: habit.streak,
                    completionRate: habit.completionRate,
                    createdAt: format(new Date(habit.createdAt), "yyyy-MM-dd"),
                    logs: habitLogs,
                };
            });

            const finalData = {
                exportedAt: new Date().toISOString(),
                analysis,
                habits: habitData
            };

            return new NextResponse(JSON.stringify(finalData, null, 2), {
                headers: {
                    "Content-Type": "application/json",
                    "Content-Disposition": `attachment; filename="daywin-export-${format(new Date(), "yyyy-MM-dd")}.json"`,
                },
            });
        }

        // CSV format - Well structured with Analysis section at top
        const csvRows: string[] = [];
        csvRows.push("--- ANALYSIS SUMMARY ---");
        csvRows.push(`Exported At,${new Date().toISOString()}`);
        csvRows.push(`Period,${analysis.period}`);
        csvRows.push(`Date Range,${analysis.dateRange}`);
        csvRows.push(`Total Habits,${analysis.summary.totalHabits}`);
        csvRows.push(`Total Logs,${analysis.summary.totalLogs}`);
        csvRows.push(`Overall Completion Rate,${analysis.summary.overallCompletionRate}`);
        csvRows.push(`Best Streak,${analysis.summary.bestStreak}`);
        csvRows.push("");
        csvRows.push("--- CATEGORY PERFORMANCE ---");
        csvRows.push("Category,Completion Rate");
        analysis.categoryPerformance.forEach(c => {
            csvRows.push(`${c.category},${c.rate}`);
        });
        csvRows.push("");
        csvRows.push("--- DETAILED LOGS ---");
        csvRows.push("Habit,Category,Type,Date,Completed,Count,Note,Skipped");

        for (const habit of habits) {
            const habitLogs = logs.filter(
                (log) => log.habitId.toString() === habit._id.toString()
            );

            for (const log of habitLogs) {
                const row = [
                    `"${habit.title}"`,
                    `"${habit.category}"`,
                    `"${habit.habitType}"`,
                    `"${format(new Date(log.date), "yyyy-MM-dd")}"`,
                    log.completed ? "Yes" : "No",
                    log.count,
                    `"${(log.note || "").replace(/"/g, '""')}"`,
                    log.skipped ? "Yes" : "No",
                ].join(",");
                csvRows.push(row);
            }
        }

        const csv = csvRows.join("\n");

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv",
                "Content-Disposition": `attachment; filename="daywin-export-${format(new Date(), "yyyy-MM-dd")}.csv"`,
            },
        });
    } catch (error) {
        console.error("Error exporting data:", error);
        return NextResponse.json(
            { error: "Failed to export data" },
            { status: 500 }
        );
    }
}
