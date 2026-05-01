"use client";

import { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { DailyProgress } from "@/components/dashboard/DailyProgress";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { MotivationalQuote } from "@/components/dashboard/MotivationalQuote";
import { HabitList } from "@/components/habits/HabitList";
import { useHabits } from "@/hooks/useHabits";
import { Loader2, Plus, BarChart3, Activity, CheckCircle2, TrendingUp } from "lucide-react";
import { DashboardSkeleton } from "@/components/ui/PageSkeletons";
import {
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    format,
    isSameDay,
    startOfDay,
    endOfDay,
} from "date-fns";

export default function DashboardPage() {
    const { habits, isLoading, fetchHabits } = useHabits();
    const [weeklyData, setWeeklyData] = useState<
        { date: string; completed: number; total: number; percentage: number }[]
    >([]);
    const [isLoadingWeekly, setIsLoadingWeekly] = useState(false);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const completedCount = habits.filter((h) => h.todayLog?.completed).length;
    const totalCount = habits.length;

    // Fetch real weekly data from logs API
    useEffect(() => {
        if (habits.length === 0) {
            setWeeklyData([]);
            return;
        }

        const fetchWeeklyLogs = async () => {
            setIsLoadingWeekly(true);
            try {
                const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday
                const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
                const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

                const response = await fetch(
                    `/api/logs?startDate=${weekStart.toISOString()}&endDate=${weekEnd.toISOString()}`
                );
                const data = await response.json();
                const logs = data.logs || [];

                const chartData = days.map((day) => {
                    const dayLogs = logs.filter(
                        (log: any) =>
                            isSameDay(new Date(log.date), day) && log.completed
                    );
                    const completed = dayLogs.length;
                    const total = habits.length;
                    return {
                        date: format(day, "EEE"),
                        completed,
                        total,
                        percentage:
                            total > 0 ? Math.round((completed / total) * 100) : 0,
                    };
                });

                setWeeklyData(chartData);
            } catch (error) {
                console.error("Failed to fetch weekly data:", error);
                // Fallback: empty data
                const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
                const weekEnd = endOfWeek(new Date(), { weekStartsOn: 1 });
                const days = eachDayOfInterval({ start: weekStart, end: weekEnd });
                setWeeklyData(
                    days.map((day) => ({
                        date: format(day, "EEE"),
                        completed: 0,
                        total: habits.length,
                        percentage: 0,
                    }))
                );
            } finally {
                setIsLoadingWeekly(false);
            }
        };

        fetchWeeklyLogs();
    }, [habits]);

    const currentStreak = Math.max(...habits.map((h) => h.streak?.current || 0), 0);
    const longestStreak = Math.max(...habits.map((h) => h.streak?.longest || 0), 0);

    if (isLoading && habits.length === 0) {
        return <DashboardSkeleton />;
    }

    return (
        <div className="page-container">
            <Header />

            {/* Stats Cards - Modern & Spacious */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -2 }}
                    className="relative overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-blue-50 to-white p-5 dark:from-blue-950/20 dark:to-white/[0.02] dark:border-white/5"
                >
                    <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="rounded-lg bg-blue-500/10 p-2">
                                <Activity className="h-5 w-5 text-blue-500" />
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/40">Active Habits</p>
                        </div>
                        <p className="text-3xl font-bold text-black dark:text-white">{totalCount}</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    whileHover={{ y: -2 }}
                    className="relative overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-green-50 to-white p-5 dark:from-green-950/20 dark:to-white/[0.02] dark:border-white/5"
                >
                    <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-green-500/10 blur-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="rounded-lg bg-green-500/10 p-2">
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/40">Completed</p>
                        </div>
                        <p className="text-3xl font-bold text-black dark:text-white">{completedCount}</p>
                    </div>
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    whileHover={{ y: -2 }}
                    className="relative overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-purple-50 to-white p-5 dark:from-purple-950/20 dark:to-white/[0.02] dark:border-white/5"
                >
                    <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl" />
                    <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="rounded-lg bg-purple-500/10 p-2">
                                <TrendingUp className="h-5 w-5 text-purple-500" />
                            </div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/40">Success Rate</p>
                        </div>
                        <p className="text-3xl font-bold text-black dark:text-white">{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</p>
                    </div>
                </motion.div>
            </div>

            {/* Action Buttons - Modern */}
            <div className="mb-8 flex flex-col sm:flex-row gap-3">
                <Link
                    href="/dashboard/habits"
                    className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-black/80 hover:shadow-xl hover:shadow-black/30 active:scale-[0.98] dark:bg-white dark:text-black dark:shadow-white/10 dark:hover:bg-white/90"
                >
                    <Plus className="h-4 w-4 transition-transform group-hover:rotate-90" />
                    New Habit
                </Link>
                <Link
                    href="/dashboard/stats"
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-6 py-3 text-sm font-semibold text-black/60 shadow-sm transition-all hover:bg-black/5 hover:text-black dark:border-white/10 dark:bg-white/[0.02] dark:text-white/60 dark:hover:bg-white/5 dark:hover:text-white"
                >
                    <BarChart3 className="h-4 w-4" />
                    Analytics
                </Link>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <DailyProgress
                        completed={completedCount}
                        total={totalCount}
                        currentStreak={currentStreak}
                        longestStreak={longestStreak}
                    />

                    <motion.div
                        initial={false}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">Today&apos;s Habits</h2>
                        <HabitList />
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <MotivationalQuote />
                    <WeeklyChart data={weeklyData} />
                </div>
            </div>
        </div>
    );
}
