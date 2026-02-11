import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";

// GET single habit
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const habit = await Habit.findOne({
            _id: params.id,
            userId: session.user.id,
        });

        if (!habit) {
            return NextResponse.json({ error: "Habit not found" }, { status: 404 });
        }

        return NextResponse.json({ habit });
    } catch (error) {
        console.error("Error fetching habit:", error);
        return NextResponse.json(
            { error: "Failed to fetch habit" },
            { status: 500 }
        );
    }
}

// UPDATE habit
export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        await dbConnect();

        const habit = await Habit.findOneAndUpdate(
            { _id: params.id, userId: session.user.id },
            { $set: body },
            { new: true }
        );

        if (!habit) {
            return NextResponse.json({ error: "Habit not found" }, { status: 404 });
        }

        return NextResponse.json({ habit });
    } catch (error) {
        console.error("Error updating habit:", error);
        return NextResponse.json(
            { error: "Failed to update habit" },
            { status: 500 }
        );
    }
}

// DELETE habit
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const habit = await Habit.findOneAndDelete({
            _id: params.id,
            userId: session.user.id,
        });

        if (!habit) {
            return NextResponse.json({ error: "Habit not found" }, { status: 404 });
        }

        // Also delete all logs for this habit
        await HabitLog.deleteMany({ habitId: params.id });

        return NextResponse.json({ message: "Habit deleted successfully" });
    } catch (error) {
        console.error("Error deleting habit:", error);
        return NextResponse.json(
            { error: "Failed to delete habit" },
            { status: 500 }
        );
    }
}
