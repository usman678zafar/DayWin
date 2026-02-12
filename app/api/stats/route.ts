import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay, subDays, format, differenceInDays } from "date-fns";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { searchParams } = new URL(req.url);
        const startDateParam = searchParams.get("startDate");
        const endDateParam = searchParams.get("endDate");

        const today = new Date();
        const endDate = endDateParam ? new Date(endDateParam) : today;
        const startDate = startDateParam ? new Date(startDateParam) : subDays(today, 30);
        const daysDiff = differenceInDays(endDate, startDate) + 1;

        // Get all habits
        const habits = await Habit.find({
            userId: session.user.id,
            isArchived: false,
        });

        // Get logs for the selected date range
        const logs = await HabitLog.find({
            userId: session.user.id,
            date: {
                $gte: startOfDay(startDate),
                $lte: endOfDay(endDate),
            },
        });

        // Calculate statistics
        const totalHabits = habits.length;
        const completedToday = logs.filter(
            (log) =>
                log.completed &&
                log.date >= startOfDay(today) &&
                log.date <= endOfDay(today)
        ).length;

        // Current streak (days with at least one completion)
        let currentStreak = 0;
        for (let i = 0; i <= 365; i++) {
            const date = subDays(today, i);
            const dayLogs = logs.filter(
                (log) =>
                    log.completed &&
                    log.date >= startOfDay(date) &&
                    log.date <= endOfDay(date)
            );
            if (dayLogs.length > 0) {
                currentStreak++;
            } else if (i > 0) {
                break;
            }
        }

        // Longest streak from habits
        const longestStreak = Math.max(
            ...habits.map((h) => h.streak.longest),
            0
        );

        // Total completions in range
        const totalCompletions = logs.filter((log) => log.completed).length;

        // Completion rate for the selected range
        const rangeCompletedCount = logs.filter((log) => log.completed).length;
        const rangeTotalPossible = habits.length * daysDiff;
        const weeklyCompletionRate = rangeTotalPossible > 0
            ? Math.round((rangeCompletedCount / rangeTotalPossible) * 100)
            : 0;

        // Daily completion data for chart (last 7 days or based on range)
        const chartDays = Math.min(daysDiff, 14); // Max 14 days for chart
        const dailyData = [];
        for (let i = chartDays - 1; i >= 0; i--) {
            const date = subDays(endDate, i);
            const dayLogs = logs.filter(
                (log) =>
                    log.date >= startOfDay(date) &&
                    log.date <= endOfDay(date)
            );
            const completed = dayLogs.filter((log) => log.completed).length;
            dailyData.push({
                date: format(date, "MMM d"),
                completed,
                total: habits.length,
                percentage: habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0,
            });
        }

        // Best performing habits
        const habitStats = await Promise.all(
            habits.map(async (habit) => {
                const habitLogs = logs.filter(
                    (log) => log.habitId.toString() === habit._id.toString()
                );
                const completed = habitLogs.filter((log) => log.completed).length;
                const totalDays = daysDiff;
                return {
                    id: habit._id,
                    title: habit.title,
                    icon: habit.icon,
                    color: habit.color,
                    completionRate: totalDays > 0
                        ? Math.round((completed / totalDays) * 100)
                        : 0,
                    streak: habit.streak.current,
                };
            })
        );

        const topHabits = habitStats
            .sort((a, b) => b.completionRate - a.completionRate)
            .slice(0, 5);

        return NextResponse.json({
            overview: {
                totalHabits,
                completedToday,
                currentStreak,
                longestStreak,
                totalCompletions,
                weeklyCompletionRate,
            },
            dailyData,
            topHabits,
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
