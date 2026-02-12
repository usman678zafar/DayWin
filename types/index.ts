// types/index.ts

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
        daysOfWeek?: number[];
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

// Color options with actual hex values for inline styles (fixes dynamic Tailwind issue)
export const habitColorOptions: {
    value: HabitColor;
    label: string;
    colors: {
        from: string;
        to: string;
        bg: string;
        text: string;
    };
}[] = [
        {
            value: "violet",
            label: "Violet",
            colors: {
                from: "#8b5cf6",
                to: "#7c3aed",
                bg: "#ede9fe",
                text: "#7c3aed",
            },
        },
        {
            value: "purple",
            label: "Purple",
            colors: {
                from: "#a855f7",
                to: "#9333ea",
                bg: "#f3e8ff",
                text: "#9333ea",
            },
        },
        {
            value: "blue",
            label: "Blue",
            colors: {
                from: "#3b82f6",
                to: "#2563eb",
                bg: "#dbeafe",
                text: "#2563eb",
            },
        },
        {
            value: "cyan",
            label: "Cyan",
            colors: {
                from: "#06b6d4",
                to: "#0891b2",
                bg: "#cffafe",
                text: "#0891b2",
            },
        },
        {
            value: "teal",
            label: "Teal",
            colors: {
                from: "#14b8a6",
                to: "#0d9488",
                bg: "#ccfbf1",
                text: "#0d9488",
            },
        },
        {
            value: "green",
            label: "Green",
            colors: {
                from: "#22c55e",
                to: "#16a34a",
                bg: "#dcfce7",
                text: "#16a34a",
            },
        },
        {
            value: "lime",
            label: "Lime",
            colors: {
                from: "#84cc16",
                to: "#65a30d",
                bg: "#ecfccb",
                text: "#65a30d",
            },
        },
        {
            value: "yellow",
            label: "Yellow",
            colors: {
                from: "#eab308",
                to: "#ca8a04",
                bg: "#fef9c3",
                text: "#ca8a04",
            },
        },
        {
            value: "orange",
            label: "Orange",
            colors: {
                from: "#f97316",
                to: "#ea580c",
                bg: "#ffedd5",
                text: "#ea580c",
            },
        },
        {
            value: "red",
            label: "Red",
            colors: {
                from: "#ef4444",
                to: "#dc2626",
                bg: "#fee2e2",
                text: "#dc2626",
            },
        },
        {
            value: "pink",
            label: "Pink",
            colors: {
                from: "#ec4899",
                to: "#db2777",
                bg: "#fce7f3",
                text: "#db2777",
            },
        },
        {
            value: "rose",
            label: "Rose",
            colors: {
                from: "#f43f5e",
                to: "#e11d48",
                bg: "#ffe4e6",
                text: "#e11d48",
            },
        },
    ];

// Lucide icon names as string types
export type HabitIconName =
    | "Dumbbell"
    | "Heart"
    | "Brain"
    | "Book"
    | "Droplets"
    | "Moon"
    | "Sun"
    | "Apple"
    | "Pill"
    | "Activity"
    | "Bike"
    | "Walk"
    | "Flame"
    | "Target"
    | "Trophy"
    | "Star"
    | "Zap"
    | "Coffee"
    | "Cigarette"
    | "Wine"
    | "Music"
    | "Palette"
    | "Camera"
    | "Pen"
    | "Code"
    | "Briefcase"
    | "DollarSign"
    | "PiggyBank"
    | "TrendingUp"
    | "Users"
    | "MessageCircle"
    | "Phone"
    | "Home"
    | "Sparkles"
    | "Leaf"
    | "Smile"
    | "Clock"
    | "Calendar"
    | "CheckCircle"
    | "ListTodo";

export interface HabitIconOption {
    name: HabitIconName;
    label: string;
    category: string;
}

// Icon options organized by category
export const habitIconOptions: HabitIconOption[] = [
    // Fitness
    { name: "Dumbbell", label: "Workout", category: "fitness" },
    { name: "Activity", label: "Exercise", category: "fitness" },
    { name: "Bike", label: "Cycling", category: "fitness" },
    { name: "Walk", label: "Walking", category: "fitness" },
    { name: "Flame", label: "Cardio", category: "fitness" },

    // Health
    { name: "Heart", label: "Health", category: "health" },
    { name: "Apple", label: "Nutrition", category: "health" },
    { name: "Droplets", label: "Hydration", category: "health" },
    { name: "Pill", label: "Medication", category: "health" },
    { name: "Moon", label: "Sleep", category: "health" },
    { name: "Cigarette", label: "Quit Smoking", category: "health" },
    { name: "Wine", label: "No Alcohol", category: "health" },

    // Mindfulness
    { name: "Brain", label: "Meditation", category: "mindfulness" },
    { name: "Sun", label: "Morning Routine", category: "mindfulness" },
    { name: "Smile", label: "Gratitude", category: "mindfulness" },
    { name: "Leaf", label: "Nature", category: "mindfulness" },
    { name: "Sparkles", label: "Self-care", category: "mindfulness" },

    // Learning
    { name: "Book", label: "Reading", category: "learning" },
    { name: "Pen", label: "Writing", category: "learning" },
    { name: "Code", label: "Coding", category: "learning" },

    // Productivity
    { name: "Target", label: "Goals", category: "productivity" },
    { name: "CheckCircle", label: "Tasks", category: "productivity" },
    { name: "ListTodo", label: "To-do", category: "productivity" },
    { name: "Clock", label: "Time", category: "productivity" },
    { name: "Calendar", label: "Planning", category: "productivity" },
    { name: "Briefcase", label: "Work", category: "productivity" },
    { name: "Zap", label: "Energy", category: "productivity" },

    // Creativity
    { name: "Music", label: "Music", category: "creativity" },
    { name: "Palette", label: "Art", category: "creativity" },
    { name: "Camera", label: "Photography", category: "creativity" },

    // Finance
    { name: "DollarSign", label: "Money", category: "finance" },
    { name: "PiggyBank", label: "Savings", category: "finance" },
    { name: "TrendingUp", label: "Investing", category: "finance" },

    // Social
    { name: "Users", label: "Social", category: "social" },
    { name: "MessageCircle", label: "Communication", category: "social" },
    { name: "Phone", label: "Calls", category: "social" },
    { name: "Home", label: "Family", category: "social" },

    // General
    { name: "Star", label: "Favorite", category: "other" },
    { name: "Trophy", label: "Achievement", category: "other" },
    { name: "Coffee", label: "Coffee", category: "other" },
];

// Icons organized by category for the HabitForm
export const habitIconsByCategory: Record<string, { name: HabitIconName; label: string }[]> = {
    fitness: [
        { name: "Dumbbell", label: "Workout" },
        { name: "Activity", label: "Exercise" },
        { name: "Bike", label: "Cycling" },
        { name: "Walk", label: "Walking" },
        { name: "Flame", label: "Cardio" },
    ],
    health: [
        { name: "Heart", label: "Health" },
        { name: "Apple", label: "Nutrition" },
        { name: "Droplets", label: "Water" },
        { name: "Pill", label: "Medication" },
        { name: "Moon", label: "Sleep" },
        { name: "Cigarette", label: "Quit Smoking" },
        { name: "Wine", label: "No Alcohol" },
    ],
    mindfulness: [
        { name: "Brain", label: "Meditation" },
        { name: "Sun", label: "Morning" },
        { name: "Smile", label: "Gratitude" },
        { name: "Leaf", label: "Nature" },
        { name: "Sparkles", label: "Self-care" },
    ],
    learning: [
        { name: "Book", label: "Reading" },
        { name: "Pen", label: "Writing" },
        { name: "Code", label: "Coding" },
    ],
    productivity: [
        { name: "Target", label: "Goals" },
        { name: "CheckCircle", label: "Tasks" },
        { name: "ListTodo", label: "To-do" },
        { name: "Clock", label: "Time" },
        { name: "Calendar", label: "Planning" },
        { name: "Briefcase", label: "Work" },
        { name: "Zap", label: "Energy" },
    ],
    creativity: [
        { name: "Music", label: "Music" },
        { name: "Palette", label: "Art" },
        { name: "Camera", label: "Photo" },
    ],
    finance: [
        { name: "DollarSign", label: "Money" },
        { name: "PiggyBank", label: "Savings" },
        { name: "TrendingUp", label: "Investing" },
    ],
    social: [
        { name: "Users", label: "Social" },
        { name: "MessageCircle", label: "Chat" },
        { name: "Phone", label: "Calls" },
        { name: "Home", label: "Family" },
    ],
    other: [
        { name: "Star", label: "Favorite" },
        { name: "Trophy", label: "Achievement" },
        { name: "Coffee", label: "Coffee" },
    ],
};

// Keep old emojis for backward compatibility (existing habits in database)
export const habitIcons = [
    "💪", "🏃", "📚", "💧", "🧘", "😴", "🥗", "💊",
    "✍️", "🎨", "🎵", "🌱", "🧠", "💰", "📱", "🚭",
    "🏋️", "🚴", "🧹", "📝", "🎯", "⏰", "🌅", "🌙",
    "❤️", "🙏", "😊", "🔥", "⭐", "🌈", "🎉", "✨"
];

// Updated categories with Lucide icon names (string)
export const habitCategories: { value: HabitCategory; label: string; icon: string }[] = [
    { value: "health", label: "Health", icon: "Heart" },
    { value: "fitness", label: "Fitness", icon: "Dumbbell" },
    { value: "productivity", label: "Productivity", icon: "Zap" },
    { value: "learning", label: "Learning", icon: "Book" },
    { value: "mindfulness", label: "Mindfulness", icon: "Brain" },
    { value: "social", label: "Social", icon: "Users" },
    { value: "creativity", label: "Creativity", icon: "Palette" },
    { value: "finance", label: "Finance", icon: "DollarSign" },
    { value: "other", label: "Other", icon: "Star" },
];

// Helper function to get color config by value
export function getHabitColorConfig(color: HabitColor) {
    return habitColorOptions.find((c) => c.value === color) || habitColorOptions[1]; // Default to purple
}

// Helper function to check if icon is a Lucide icon name or emoji
export function isLucideIcon(icon: string): icon is HabitIconName {
    const lucideIcons: string[] = [
        "Dumbbell", "Heart", "Brain", "Book", "Droplets", "Moon", "Sun", "Apple",
        "Pill", "Activity", "Bike", "Walk", "Flame", "Target", "Trophy", "Star",
        "Zap", "Coffee", "Cigarette", "Wine", "Music", "Palette", "Camera", "Pen",
        "Code", "Briefcase", "DollarSign", "PiggyBank", "TrendingUp", "Users",
        "MessageCircle", "Phone", "Home", "Sparkles", "Leaf", "Smile", "Clock",
        "Calendar", "CheckCircle", "ListTodo"
    ];
    return lucideIcons.includes(icon);
}

// Helper function to get icons for a specific category
export function getIconsForCategory(category: HabitCategory): { name: HabitIconName; label: string }[] {
    return habitIconsByCategory[category] || habitIconsByCategory.other;
}
