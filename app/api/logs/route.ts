import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay, subDays } from "date-fns";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const habitId = searchParams.get("habitId");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const days = searchParams.get("days");

        await dbConnect();

        const query: any = { userId: session.user.id };

        if (habitId) {
            query.habitId = habitId;
        }

        if (startDate && endDate) {
            query.date = {
                $gte: startOfDay(new Date(startDate)),
                $lte: endOfDay(new Date(endDate)),
            };
        } else if (days) {
            query.date = {
                $gte: startOfDay(subDays(new Date(), parseInt(days))),
                $lte: endOfDay(new Date()),
            };
        }

        const logs = await HabitLog.find(query).sort({ date: -1 });

        return NextResponse.json({ logs });
    } catch (error) {
        console.error("Error fetching logs:", error);
        return NextResponse.json(
            { error: "Failed to fetch logs" },
            { status: 500 }
        );
    }
}
