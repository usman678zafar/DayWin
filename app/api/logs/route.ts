import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay, subDays } from "date-fns";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: NextRequest) {
    try {
        const session = await auth();
        const user = session?.user;

        if (!user || !user.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const habitId = searchParams.get("habitId");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const days = searchParams.get("days");

        await dbConnect();

        const query: any = { userId: user.id };

        if (habitId) {
            query.habitId = habitId;
        }

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            query.date = {
                $gte: new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0)),
                $lte: new Date(Date.UTC(end.getFullYear(), end.getMonth(), end.getDate(), 23, 59, 59, 999)),
            };
        } else if (days) {
            const now = new Date();
            const start = subDays(now, parseInt(days));
            query.date = {
                $gte: new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate(), 0, 0, 0)),
                $lte: new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999)),
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
