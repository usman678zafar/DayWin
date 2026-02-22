import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Challenge from "@/models/Challenge";
import User from "@/models/User";

export async function GET() {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const squads = await Challenge.find({
            $or: [
                { ownerId: session.user.id },
                { members: session.user.id }
            ]
        }).populate("ownerId", "name image")
            .sort({ createdAt: -1 });

        return NextResponse.json(squads);
    } catch (error) {
        console.error("GET SQUADS ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, invitedEmails, habitTemplates } = body;

        if (!title) {
            return NextResponse.json({ error: "Title is required" }, { status: 400 });
        }

        await dbConnect();

        // Find users for invited emails if they exist
        const members = [session.user.id];
        const existingUsers = await User.find({ email: { $in: invitedEmails } });
        existingUsers.forEach(user => {
            if (!members.includes(user._id.toString())) {
                members.push(user._id.toString());
            }
        });

        const newSquad = await Challenge.create({
            title,
            description,
            ownerId: session.user.id,
            members,
            invitedEmails: invitedEmails.filter((email: string) =>
                !existingUsers.some(user => user.email === email)
            ),
            habitTemplates,
            startDate: new Date(),
            status: "active"
        });

        // Create habits for all initial members (owner + existing users)
        for (const memberId of members) {
            for (const template of habitTemplates) {
                await Habit.create({
                    userId: memberId,
                    title: template.title,
                    icon: template.icon,
                    color: template.color,
                    category: template.category,
                    targetCount: template.targetCount,
                    frequency: template.frequency,
                    startDate: new Date(),
                    squadId: newSquad._id,
                });
            }
        }

        return NextResponse.json(newSquad, { status: 201 });
    } catch (error) {
        console.error("POST SQUAD ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
