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

        // Check if user is a member or owner
        const isMember = squad.members.some((m: any) => m._id.toString() === user.id);
        const isOwner = squad.ownerId._id.toString() === user.id;
        
        if (!isMember && !isOwner) {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Get this user's habits for this squad
        const userHabits = await Habit.find({ 
            squadId: id,
            userId: user.id,
            isArchived: false
        });

        // Get habit logs for these habits
        const userHabitIds = userHabits.map(h => h._id);
        const logs = await HabitLog.find({
            habitId: { $in: userHabitIds }
        }).sort({ date: -1 });

        return NextResponse.json({ squad, userHabits, logs });
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

        // If habitTemplates were updated, sync with members' Habit records
        if (body.habitTemplates) {
            const members = [...squad.members];
            if (!members.includes(squad.ownerId)) {
                members.push(squad.ownerId);
            }

            for (const template of body.habitTemplates) {
                for (const memberId of members) {
                    // Check if member already has this habit for this squad
                    const existingHabit = await Habit.findOne({
                        squadId: id,
                        userId: memberId,
                        title: template.title
                    });

                    if (!existingHabit) {
                        await Habit.create({
                            ...template,
                            userId: memberId,
                            squadId: id,
                            startDate: template.startDate || squad.startDate,
                            endDate: template.endDate || squad.endDate
                        });
                    } else {
                        // Update existing habit properties from template
                        await Habit.findByIdAndUpdate(existingHabit._id, {
                            category: template.category,
                            color: template.color,
                            icon: template.icon,
                            frequency: template.frequency,
                            targetCount: template.targetCount,
                            startDate: template.startDate || squad.startDate,
                            endDate: template.endDate || squad.endDate
                        });
                    }
                }
            }
        }

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
