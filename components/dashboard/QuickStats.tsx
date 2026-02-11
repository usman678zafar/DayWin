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
        },
        {
            label: "Done Today",
            value: stats.completedToday,
            icon: Zap,
        },
        {
            label: "Weekly Rate",
            value: `${stats.weeklyCompletionRate}%`,
            icon: TrendingUp,
        },
        {
            label: "All Time",
            value: stats.totalCompletions,
            icon: Award,
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -3 }}
                    className="card p-4"
                >
                    <div className="mb-3 inline-flex rounded-lg border border-black/15 p-2 text-black dark:border-white/15 dark:text-white">
                        <item.icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-2xl font-black text-black dark:text-white">{item.value}</div>
                    <div className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">{item.label}</div>
                </motion.div>
            ))}
        </div>
    );
}

