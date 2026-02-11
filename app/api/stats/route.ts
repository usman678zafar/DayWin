import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay, subDays, format } from "date-fns";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const today = new Date();
        const thirtyDaysAgo = subDays(today, 30);
        const sevenDaysAgo = subDays(today, 7);

        // Get all habits
        const habits = await Habit.find({
            userId: session.user.id,
            isArchived: false,
        });

        // Get logs for the last 30 days
        const logs = await HabitLog.find({
            userId: session.user.id,
            date: {
                $gte: startOfDay(thirtyDaysAgo),
                $lte: endOfDay(today),
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

        // Total completions
        const totalCompletions = logs.filter((log) => log.completed).length;

        // Weekly completion rate
        const weeklyLogs = logs.filter((log) => log.date >= startOfDay(sevenDaysAgo));
        const weeklyCompleted = weeklyLogs.filter((log) => log.completed).length;
        const weeklyTotal = habits.length * 7;
        const weeklyCompletionRate = weeklyTotal > 0
            ? Math.round((weeklyCompleted / weeklyTotal) * 100)
            : 0;

        // Daily completion data for chart
        const dailyData = [];
        for (let i = 6; i >= 0; i--) {
            const date = subDays(today, i);
            const dayLogs = logs.filter(
                (log) =>
                    log.date >= startOfDay(date) &&
                    log.date <= endOfDay(date)
            );
            const completed = dayLogs.filter((log) => log.completed).length;
            dailyData.push({
                date: format(date, "EEE"),
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
                return {
                    id: habit._id,
                    title: habit.title,
                    icon: habit.icon,
                    color: habit.color,
                    completionRate: habitLogs.length > 0
                        ? Math.round((completed / habitLogs.length) * 100)
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
