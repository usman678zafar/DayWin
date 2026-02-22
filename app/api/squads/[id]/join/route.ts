import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Challenge from "@/models/Challenge";
import Habit from "@/models/Habit";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = params;
        await dbConnect();

        const squad = await Challenge.findById(id);
        if (!squad) {
            return NextResponse.json({ error: "Squad not found" }, { status: 404 });
        }

        // Check if already a member
        if (squad.members.includes(session.user.id)) {
            return NextResponse.json({ message: "Already a member" });
        }

        // Add to members and remove from invitedEmails if present
        squad.members.push(session.user.id);
        squad.invitedEmails = squad.invitedEmails.filter(
            (email: string) => email !== session.user.email?.toLowerCase()
        );

        await squad.save();

        // Create habits for the joining user based on templates
        for (const template of squad.habitTemplates) {
            await Habit.create({
                userId: session.user.id,
                title: template.title,
                icon: template.icon,
                color: template.color,
                category: template.category,
                targetCount: template.targetCount,
                frequency: template.frequency,
                startDate: new Date(),
                // Add a reference to the challenge so we can track it
                squadId: squad._id,
            });
        }

        return NextResponse.json({ message: "Joined successfully" });
    } catch (error) {
        console.error("JOIN SQUAD ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
