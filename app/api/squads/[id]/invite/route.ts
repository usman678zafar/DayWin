import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Challenge from "@/models/Challenge";
import User from "@/models/User";
import Habit from "@/models/Habit";

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

        const { id } = params;
        const { email } = await req.json();

        if (!email || !email.trim()) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        await dbConnect();

        const squad = await Challenge.findById(id);
        if (!squad) {
            return NextResponse.json({ error: "Squad not found" }, { status: 404 });
        }

        // Only owner can invite
        if (squad.ownerId.toString() !== user.id) {
            return NextResponse.json({ error: "Only the squad owner can invite members" }, { status: 403 });
        }

        // Look up the invited user by email
        const invitedUser = await User.findOne({ email: email.trim().toLowerCase() });
        if (!invitedUser) {
            return NextResponse.json(
                { error: `No account found for "${email}". They need to sign up first.` },
                { status: 404 }
            );
        }

        // Check if already a member
        const isAlreadyMember = squad.members.some(
            (m: any) => m.toString() === invitedUser._id.toString()
        );
        if (isAlreadyMember) {
            return NextResponse.json(
                { error: `${invitedUser.name || email} is already in this squad.` },
                { status: 400 }
            );
        }

        // Add user to squad members
        squad.members.push(invitedUser._id);
        await squad.save();

        // Create habit records for the new member from all existing templates
        for (const template of squad.habitTemplates) {
            const existingHabit = await Habit.findOne({
                squadId: id,
                userId: invitedUser._id,
                title: template.title,
            });

            if (!existingHabit) {
                await Habit.create({
                    title: template.title,
                    icon: template.icon,
                    color: template.color,
                    category: template.category,
                    targetCount: template.targetCount || 1,
                    frequency: template.frequency,
                    userId: invitedUser._id,
                    squadId: id,
                    startDate: template.startDate || squad.startDate,
                    endDate: template.endDate || squad.endDate,
                });
            }
        }

        return NextResponse.json({
            message: `${invitedUser.name || email} has been added to the squad!`,
            member: {
                _id: invitedUser._id,
                name: invitedUser.name,
                email: invitedUser.email,
                image: invitedUser.image,
            },
        });
    } catch (error) {
        console.error("INVITE MEMBER ERROR:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
