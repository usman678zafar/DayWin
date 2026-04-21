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
import { PageLoader } from "@/components/ui/PageLoader";
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
        return <PageLoader />;
    }

    return (
        <div className="page-container">
            <Header />

            {/* Stats Cards - Ultra Compact */}
            <div className="mb-2 sm:mb-3 grid grid-cols-3 gap-1.5">
                <div className="card p-2 group hover:border-primary-500/30 transition-colors">
                    <div className="flex items-center gap-1 mb-1">
                        <Activity className="h-2.5 w-2.5 text-blue-500" />
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-black/50 dark:text-white/40">Active</p>
                    </div>
                    <p className="text-lg font-semibold text-black dark:text-white leading-none">{totalCount}</p>
                </div>
                <div className="card p-2 group hover:border-success-500/30 transition-colors">
                    <div className="flex items-center gap-1 mb-1">
                        <CheckCircle2 className="h-2.5 w-2.5 text-success-500" />
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-black/50 dark:text-white/40">Done</p>
                    </div>
                    <p className="text-lg font-semibold text-black dark:text-white leading-none">{completedCount}</p>
                </div>
                <div className="card p-2 group hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="h-2.5 w-2.5 text-purple-500" />
                        <p className="text-[9px] font-semibold uppercase tracking-widest text-black/50 dark:text-white/40">Rate</p>
                    </div>
                    <p className="text-lg font-semibold text-black dark:text-white leading-none">{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</p>
                </div>
            </div>

            {/* Action Buttons - Compact */}
            <div className="mb-3 flex flex-col sm:flex-row gap-1.5">
                <Link href="/dashboard/habits" className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-black bg-black px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-white hover:bg-black/80 transition-all">
                    <Plus className="h-3 w-3" />
                    New Habit
                </Link>
                <Link href="/dashboard/stats" className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg border border-black/10 dark:border-white/10 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 transition-all">
                    <BarChart3 className="h-3 w-3" />
                    Analytics
                </Link>
            </div>

            {/* Main Content Grid - Mobile Stack */}
            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    <DailyProgress
                        completed={completedCount}
                        total={totalCount}
                        currentStreak={currentStreak}
                        longestStreak={longestStreak}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <h2 className="text-[11px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 mb-2">Today&apos;s Habits</h2>
                        <HabitList />
                    </motion.div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <MotivationalQuote />
                    <WeeklyChart data={weeklyData} />
                </div>
            </div>
        </div>
    );
}
