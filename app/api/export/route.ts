import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { format } from "date-fns";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { searchParams } = new URL(req.url);
        const exportFormat = searchParams.get("format") || "csv";

        // Get all habits
        const habits = await Habit.find({
            userId: session.user.id,
        }).sort({ createdAt: -1 });

        // Get all logs
        const logs = await HabitLog.find({
            userId: session.user.id,
        }).sort({ date: -1 });

        if (exportFormat === "json") {
            const data = habits.map((habit) => {
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

            return new NextResponse(JSON.stringify(data, null, 2), {
                headers: {
                    "Content-Type": "application/json",
                    "Content-Disposition": `attachment; filename="daywin-export-${format(new Date(), "yyyy-MM-dd")}.json"`,
                },
            });
        }

        // CSV format
        const csvRows: string[] = [];
        csvRows.push("Habit,Category,Type,Date,Completed,Count,Note,Skipped");

        for (const habit of habits) {
            const habitLogs = logs.filter(
                (log) => log.habitId.toString() === habit._id.toString()
            );

            if (habitLogs.length === 0) {
                // Include habit even if no logs
                csvRows.push(
                    `"${habit.title}","${habit.category}","${habit.habitType}","","","","",""`
                );
            }

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
