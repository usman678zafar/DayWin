import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay, differenceInDays } from "date-fns";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { completed, count, note, date } = await req.json();

        // Normalize to UTC midnight to avoid timezone shifts
        const targetDate = date ? new Date(date) : new Date();
        const utcDate = new Date(Date.UTC(
            targetDate.getFullYear(),
            targetDate.getMonth(),
            targetDate.getDate()
        ));

        await dbConnect();

        // Find or create log for the day using exact UTC date match
        let log = await HabitLog.findOne({
            habitId: params.id,
            userId: user.id,
            date: utcDate,
        });

        if (log) {
            log.completed = completed;
            log.count = count ?? log.count;
            log.note = note ?? log.note;
            log.completedAt = completed ? new Date() : undefined;
            await log.save();
        } else {
            log = await HabitLog.create({
                habitId: params.id,
                userId: user.id,
                date: utcDate,
                completed,
                count: count ?? 1,
                note,
                completedAt: completed ? new Date() : undefined,
            });
        }

        // Update habit streak
        const habit = await Habit.findById(params.id);

        if (habit && completed) {
            const lastCompleted = habit.streak.lastCompletedDate;
            const now = new Date();
            const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
            const targetDay = utcDate;

            // Only update streak if completing for today or yesterday
            if (targetDay.getTime() >= today.getTime() - (24 * 60 * 60 * 1000)) {
                if (!lastCompleted) {
                    habit.streak.current = 1;
                } else {
                    const daysSinceLastCompletion = differenceInDays(
                        targetDay,
                        startOfDay(new Date(lastCompleted))
                    );

                    if (daysSinceLastCompletion === 1) {
                        habit.streak.current += 1;
                    } else if (daysSinceLastCompletion > 1) {
                        habit.streak.current = 1;
                    }
                    // If 0, already completed today, don't change
                }

                habit.streak.lastCompletedDate = targetDate;

                if (habit.streak.current > habit.streak.longest) {
                    habit.streak.longest = habit.streak.current;
                }

                await habit.save();
            }
        } else if (habit && !completed) {
            // Handle uncomplete
            const targetDay = utcDate;
            const lastCompleted = habit.streak.lastCompletedDate;

            if (lastCompleted && startOfDay(new Date(lastCompleted)).getTime() === targetDay.getTime()) {
                // Find the previous completion
                const previousLog = await HabitLog.findOne({
                    habitId: params.id,
                    completed: true,
                    date: { $lt: targetDay },
                }).sort({ date: -1 });

                if (previousLog) {
                    habit.streak.lastCompletedDate = previousLog.date;
                    // Recalculate streak would be complex, simplify for now
                    habit.streak.current = Math.max(0, habit.streak.current - 1);
                } else {
                    habit.streak.current = 0;
                    habit.streak.lastCompletedDate = undefined;
                }

                await habit.save();
            }
        }

        return NextResponse.json({
            log,
            streak: habit?.streak,
        });
    } catch (error) {
        console.error("Error completing habit:", error);
        return NextResponse.json(
            { error: "Failed to complete habit" },
            { status: 500 }
        );
    }
}
