import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay } from "date-fns";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET all habits for user
export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const habits = await Habit.find({
            userId: user.id,
            isArchived: false,
        }).sort({ order: 1, createdAt: -1 });

        const { searchParams } = new URL(req.url);
        const dateStr = searchParams.get("date");
        const today = dateStr ? new Date(dateStr) : new Date();

        const logs = await HabitLog.find({
            userId: user.id,
            date: {
                $gte: startOfDay(today),
                $lte: endOfDay(today),
            },
        });

        const habitsWithLogs = habits.map((habit) => {
            const todayLog = logs.find(
                (log) => log.habitId.toString() === habit._id.toString()
            );
            return {
                ...habit.toObject(),
                todayLog: todayLog?.toObject() || null,
            };
        });

        return NextResponse.json({ habits: habitsWithLogs });
    } catch (error) {
        console.error("Error fetching habits:", error);
        return NextResponse.json(
            { error: "Failed to fetch habits" },
            { status: 500 }
        );
    }
}

// CREATE new habit
export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        await dbConnect();

        // Get the highest order number
        const lastHabit = await Habit.findOne({ userId: user.id }).sort({
            order: -1,
        });

        const habit = await Habit.create({
            ...body,
            userId: user.id,
            order: lastHabit ? lastHabit.order + 1 : 0,
        });

        return NextResponse.json({ habit }, { status: 201 });
    } catch (error) {
        console.error("Error creating habit:", error);
        return NextResponse.json(
            { error: "Failed to create habit" },
            { status: 500 }
        );
    }
}
