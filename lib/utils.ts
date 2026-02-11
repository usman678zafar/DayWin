import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isYesterday, startOfDay, differenceInDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
    const d = new Date(date);
    if (isToday(d)) return "Today";
    if (isYesterday(d)) return "Yesterday";
    return format(d, "MMM d, yyyy");
}

export function formatTime(date: Date | string): string {
    return format(new Date(date), "h:mm a");
}

export function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

export function calculateStreak(logs: { date: Date; completed: boolean }[]): number {
    if (!logs.length) return 0;

    const sortedLogs = logs
        .filter((log) => log.completed)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!sortedLogs.length) return 0;

    let streak = 0;
    let currentDate = startOfDay(new Date());

    // Check if completed today
    const lastLogDate = startOfDay(new Date(sortedLogs[0].date));
    const daysDiff = differenceInDays(currentDate, lastLogDate);

    if (daysDiff > 1) return 0;
    if (daysDiff === 1) currentDate = lastLogDate;

    for (const log of sortedLogs) {
        const logDate = startOfDay(new Date(log.date));
        const diff = differenceInDays(currentDate, logDate);

        if (diff === 0) {
            streak++;
            currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
        } else if (diff === 1) {
            streak++;
            currentDate = logDate;
        } else {
            break;
        }
    }

    return streak;
}

export function getCompletionRate(logs: { completed: boolean }[]): number {
    if (!logs.length) return 0;
    const completed = logs.filter((log) => log.completed).length;
    return Math.round((completed / logs.length) * 100);
}

export function getDayName(day: number): string {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

export function getFullDayName(day: number): string {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
}

export function isHabitDueToday(frequency: {
    type: string;
    daysOfWeek?: number[];
    timesPerPeriod?: number;
    periodDays?: number;
}): boolean {
    const today = new Date().getDay();

    switch (frequency.type) {
        case "daily":
            return true;
        case "weekly":
            return frequency.daysOfWeek?.includes(today) ?? false;
        case "custom":
            // For custom, we'd need to check based on start date and period
            return true;
        default:
            return true;
    }
}

export function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
