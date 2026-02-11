"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar, Zap, Award } from "lucide-react";

interface QuickStatsProps {
    stats: {
        totalHabits: number;
        completedToday: number;
        weeklyCompletionRate: number;
        totalCompletions: number;
    };
}

export function QuickStats({ stats }: QuickStatsProps) {
    const statItems = [
        {
            label: "Total Habits",
            value: stats.totalHabits,
            icon: Calendar,
            color: "text-blue-500",
            bg: "bg-blue-100 dark:bg-blue-900/30",
        },
        {
            label: "Done Today",
            value: stats.completedToday,
            icon: Zap,
            color: "text-green-500",
            bg: "bg-green-100 dark:bg-green-900/30",
        },
        {
            label: "Weekly Rate",
            value: `${stats.weeklyCompletionRate}%`,
            icon: TrendingUp,
            color: "text-purple-500",
            bg: "bg-purple-100 dark:bg-purple-900/30",
        },
        {
            label: "All Time",
            value: stats.totalCompletions,
            icon: Award,
            color: "text-orange-500",
            bg: "bg-orange-100 dark:bg-orange-900/30",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="card p-4"
                >
                    <div className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div className="text-2xl font-bold text-surface-900 dark:text-white">
                        {item.value}
                    </div>
                    <div className="text-sm text-surface-200/50">{item.label}</div>
                </motion.div>
            ))}
        </div>
    );
}
