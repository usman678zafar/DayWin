import { ObjectId } from "mongoose";

export interface User {
    _id: string;
    email: string;
    name: string;
    image?: string;
    timezone: string;
    preferences: UserPreferences;
    stats: UserStats;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPreferences {
    theme: "light" | "dark" | "system";
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    reminderTime: string;
    soundEnabled: boolean;
    celebrationsEnabled: boolean;
}

export interface UserStats {
    totalHabits: number;
    completedToday: number;
    currentStreak: number;
    longestStreak: number;
    totalCompletions: number;
}

export type HabitFrequency = "daily" | "weekly" | "custom";

export type HabitCategory =
    | "health"
    | "fitness"
    | "productivity"
    | "learning"
    | "mindfulness"
    | "social"
    | "creativity"
    | "finance"
    | "other";

export interface Habit {
    _id: string;
    userId: string;
    title: string;
    description?: string;
    icon: string;
    color: HabitColor;
    category: HabitCategory;
    frequency: {
        type: HabitFrequency;
        daysOfWeek?: number[]; // 0-6, Sunday-Saturday
        timesPerPeriod?: number;
        periodDays?: number;
    };
    targetCount: number;
    reminders: Reminder[];
    startDate: Date;
    endDate?: Date;
    isArchived: boolean;
    streak: {
        current: number;
        longest: number;
        lastCompletedDate?: Date;
    };
    completionRate: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Reminder {
    id: string;
    time: string;
    enabled: boolean;
    days: number[];
}

export interface HabitLog {
    _id: string;
    habitId: string;
    userId: string;
    date: Date;
    completed: boolean;
    count: number;
    note?: string;
    skipped: boolean;
    skipReason?: string;
    completedAt?: Date;
    createdAt: Date;
}

export interface HabitWithLog extends Habit {
    todayLog?: HabitLog;
}

export type HabitColor =
    | "violet"
    | "purple"
    | "blue"
    | "cyan"
    | "teal"
    | "green"
    | "lime"
    | "yellow"
    | "orange"
    | "red"
    | "pink"
    | "rose";

export const habitColors: Record<HabitColor, { bg: string; text: string; gradient: string }> = {
    violet: {
        bg: "bg-violet-100 dark:bg-violet-900/30",
        text: "text-violet-600 dark:text-violet-400",
        gradient: "from-violet-400 to-violet-600",
    },
    purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        gradient: "from-purple-400 to-purple-600",
    },
    blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        gradient: "from-blue-400 to-blue-600",
    },
    cyan: {
        bg: "bg-cyan-100 dark:bg-cyan-900/30",
        text: "text-cyan-600 dark:text-cyan-400",
        gradient: "from-cyan-400 to-cyan-600",
    },
    teal: {
        bg: "bg-teal-100 dark:bg-teal-900/30",
        text: "text-teal-600 dark:text-teal-400",
        gradient: "from-teal-400 to-teal-600",
    },
    green: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        gradient: "from-green-400 to-green-600",
    },
    lime: {
        bg: "bg-lime-100 dark:bg-lime-900/30",
        text: "text-lime-600 dark:text-lime-400",
        gradient: "from-lime-400 to-lime-600",
    },
    yellow: {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-600 dark:text-yellow-400",
        gradient: "from-yellow-400 to-yellow-600",
    },
    orange: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-600 dark:text-orange-400",
        gradient: "from-orange-400 to-orange-600",
    },
    red: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
        gradient: "from-red-400 to-red-600",
    },
    pink: {
        bg: "bg-pink-100 dark:bg-pink-900/30",
        text: "text-pink-600 dark:text-pink-400",
        gradient: "from-pink-400 to-pink-600",
    },
    rose: {
        bg: "bg-rose-100 dark:bg-rose-900/30",
        text: "text-rose-600 dark:text-rose-400",
        gradient: "from-rose-400 to-rose-600",
    },
};

export const habitIcons = [
    "💪", "🏃", "📚", "💧", "🧘", "😴", "🥗", "💊",
    "✍️", "🎨", "🎵", "🌱", "🧠", "💰", "📱", "🚭",
    "🏋️", "🚴", "🧹", "📝", "🎯", "⏰", "🌅", "🌙",
    "❤️", "🙏", "😊", "🔥", "⭐", "🌈", "🎉", "✨"
];

export const habitCategories: { value: HabitCategory; label: string; icon: string }[] = [
    { value: "health", label: "Health", icon: "❤️" },
    { value: "fitness", label: "Fitness", icon: "💪" },
    { value: "productivity", label: "Productivity", icon: "⚡" },
    { value: "learning", label: "Learning", icon: "📚" },
    { value: "mindfulness", label: "Mindfulness", icon: "🧘" },
    { value: "social", label: "Social", icon: "👥" },
    { value: "creativity", label: "Creativity", icon: "🎨" },
    { value: "finance", label: "Finance", icon: "💰" },
    { value: "other", label: "Other", icon: "📌" },
];
