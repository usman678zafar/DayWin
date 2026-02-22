import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Challenge from "@/models/Challenge";
import HabitLog from "@/models/HabitLog";
import Habit from "@/models/Habit";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        await dbConnect();

        const squad = await Challenge.findById(id)
            .populate("ownerId", "name image email")
            .populate("members", "name image email");

        if (!squad) {
            return NextResponse.json({ error: "Squad not found" }, { status: 404 });
        }

        // Check if user is a member
        const isMember = squad.members.some((m: any) => m._id.toString() === user.id);
        if (!isMember && squad.ownerId._id.toString() !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Get habit logs for all members to build leaderboard
        const squadHabitIds = await Habit.find({ squadId: id }).distinct("_id");

        const logs = await HabitLog.find({
            habitId: { $in: squadHabitIds },
            date: { $gte: squad.startDate }
        }).sort({ date: -1 });

        return NextResponse.json({ squad, logs });
    } catch (error) {
        console.error("GET SQUAD ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        await dbConnect();

        const squad = await Challenge.findById(id);
        if (!squad) {
            return NextResponse.json({ error: "Squad not found" }, { status: 404 });
        }

        // Only owner can edit
        if (squad.ownerId.toString() !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        const body = await req.json();
        const updatedSquad = await Challenge.findByIdAndUpdate(id, body, { new: true });

        return NextResponse.json(updatedSquad);
    } catch (error) {
        console.error("PATCH SQUAD ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        await dbConnect();

        const squad = await Challenge.findById(id);
        if (!squad) {
            return NextResponse.json({ error: "Squad not found" }, { status: 404 });
        }

        // Only owner can delete
        if (squad.ownerId.toString() !== user.id) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        await Challenge.findByIdAndDelete(id);

        return NextResponse.json({ message: "Squad deleted successfully" });
    } catch (error) {
        console.error("DELETE SQUAD ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
