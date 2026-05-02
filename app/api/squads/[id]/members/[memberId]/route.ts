import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Challenge from "@/models/Challenge";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string, memberId: string } }
) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, memberId } = params;
        await dbConnect();

        const squad = await Challenge.findById(id);
        if (!squad) {
            return NextResponse.json({ error: "Squad not found" }, { status: 404 });
        }

        // Only owner can remove members
        if (squad.ownerId.toString() !== user.id) {
            return NextResponse.json({ error: "Forbidden - Only owner can remove members" }, { status: 403 });
        }

        // Cannot remove the owner
        if (squad.ownerId.toString() === memberId) {
            return NextResponse.json({ error: "Cannot remove squad owner" }, { status: 400 });
        }

        // Check if member exists in the squad
        const isMember = squad.members.some((m: any) => m.toString() === memberId);
        if (!isMember) {
            return NextResponse.json({ error: "Member not found in squad" }, { status: 404 });
        }

        // Remove member from squad
        await Challenge.findByIdAndUpdate(
            id,
            { $pull: { members: memberId } }
        );

        // Delete all habits and logs for this member in this squad
        const memberHabits = await Habit.find({
            squadId: id,
            userId: memberId
        });

        const habitIds = memberHabits.map(h => h._id);
        
        // Delete habit logs
        await HabitLog.deleteMany({
            habitId: { $in: habitIds }
        });

        // Delete habits
        await Habit.deleteMany({
            squadId: id,
            userId: memberId
        });

        return NextResponse.json({ message: "Member removed successfully" });
    } catch (error) {
        console.error("REMOVE MEMBER ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
