"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Flame, Trophy, Zap, Target, Award, Loader2, Star, TrendingUp } from "lucide-react";
import { subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from "date-fns";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { DateRangePicker, DateRange } from "@/components/habits/DateRangePicker";
import { HabitIcon } from "@/components/habits/HabitIcon";
import { cn } from "@/lib/utils";

const defaultRange: DateRange = {
    startDate: subDays(new Date(), 29),
    endDate: new Date(),
    label: "Last 30 Days",
};

export default function StatsPage() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange>(defaultRange);

    useEffect(() => {
        fetchStats();
    }, [dateRange]);

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                startDate: dateRange.startDate.toISOString(),
                endDate: dateRange.endDate.toISOString(),
            });
            const response = await fetch(`/api/stats?${params}`);
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="page-container flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-surface-900 px-4 py-3 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800">
                    <p className="font-semibold text-surface-900 dark:text-white">{label}</p>
                    <p className="text-sm text-primary-500">
                        {payload[0].value} completed
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="page-title">Statistics</h1>
                        <p className="page-subtitle">Deep performance metrics across habits, streaks, and consistency.</p>
                    </div>
                    <DateRangePicker value={dateRange} onChange={setDateRange} />
                </div>
            </div>

            {/* Overview Stats */}
            <QuickStats stats={stats?.overview || {}} />

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
                {/* Weekly Completion Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                >
                    <h3 className="card-title mb-6">Progress Over Time</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.dailyData || []}>
                                <defs>
                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#71717a", fontSize: 12 }}
                                />
                                <YAxis hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="completed"
                                    stroke="#a855f7"
                                    strokeWidth={3}
                                    fill="url(#colorCompleted)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Completion Rate Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6"
                >
                    <h3 className="card-title mb-6">Completion Rate ({dateRange.label})</h3>
                    <div className="h-64 flex items-center justify-center relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: "Completed", value: stats?.overview?.weeklyCompletionRate || 0 },
                                        { name: "Remaining", value: 100 - (stats?.overview?.weeklyCompletionRate || 0) },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="#a855f7" />
                                    <Cell fill="#e4e4e7" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                            <div className="text-4xl font-bold text-surface-900 dark:text-white">
                                {stats?.overview?.weeklyCompletionRate || 0}%
                            </div>
                            <div className="text-sm text-surface-200/50">Completion</div>
                        </div>
                    </div>
                </motion.div>

                {/* Top Habits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card p-6"
                >
                    <h3 className="card-title mb-6">Top Performing Habits</h3>
                    <div className="space-y-4">
                        {(stats?.topHabits || []).map((habit: any, index: number) => (
                            <div
                                key={habit.id}
                                className="flex items-center gap-4 group"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-surface-100 dark:bg-surface-800/80 border border-black/5 dark:border-white/5 transition-colors group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20">
                                    <HabitIcon name={habit.icon || "Star"} size={20} className="text-primary-600 dark:text-primary-400" />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <p className="font-bold text-sm text-surface-900 dark:text-white truncate">
                                            {habit.title}
                                        </p>
                                        <span className="text-[10px] font-black text-primary-500 uppercase tracking-wider bg-primary-100 dark:bg-primary-900/30 px-1.5 py-0.5 rounded-md">
                                            {habit.completionRate}%
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="flex-1 h-1.5 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${habit.completionRate}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                                className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {habit.streak > 0 && (
                                    <div className="flex flex-col items-center justify-center min-w-[32px]">
                                        <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                                        <span className="text-[10px] font-black text-orange-600">{habit.streak}d</span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {(!stats?.topHabits || stats.topHabits.length === 0) && (
                            <p className="text-center text-surface-200/50 py-8">
                                Complete some habits to see your stats!
                            </p>
                        )}
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card p-6"
                >
                    <h3 className="card-title mb-6">Achievements</h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {[
                            {
                                icon: Flame,
                                title: "On Fire",
                                description: "7 day streak",
                                unlocked: (stats?.overview?.currentStreak || 0) >= 7,
                                color: "text-orange-500",
                                bg: "bg-orange-50/50 dark:bg-orange-900/10",
                            },
                            {
                                icon: Zap,
                                title: "Momentum",
                                description: "30 day streak",
                                unlocked: (stats?.overview?.longestStreak || 0) >= 30,
                                color: "text-yellow-500",
                                bg: "bg-yellow-50/50 dark:bg-yellow-900/10",
                            },
                            {
                                icon: Target,
                                title: "Focused",
                                description: "100% weekly",
                                unlocked: (stats?.overview?.weeklyCompletionRate || 0) === 100,
                                color: "text-blue-500",
                                bg: "bg-blue-50/50 dark:bg-blue-900/10",
                            },
                            {
                                icon: Trophy,
                                title: "Champion",
                                description: "100 completions",
                                unlocked: (stats?.overview?.totalCompletions || 0) >= 100,
                                color: "text-primary-500",
                                bg: "bg-primary-50/50 dark:bg-primary-900/10",
                            },
                        ].map((achievement) => (
                            <div
                                key={achievement.title}
                                className={cn(
                                    "p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center",
                                    achievement.unlocked
                                        ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                                        : "border-surface-200 dark:border-surface-800 opacity-50"
                                )}
                            >
                                <div className="text-3xl mb-2">{achievement.icon}</div>
                                <p className="font-semibold text-surface-900 dark:text-white">
                                    {achievement.title}
                                </p>
                                <p className="text-sm text-surface-200/50">
                                    {achievement.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
