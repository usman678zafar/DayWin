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
        return (
            <div className="page-container flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-black dark:text-white" />
            </div>
        );
    }

    return (
        <div className="page-container">
            <Header />

            {/* Stats Cards - Mobile Optimized */}
            <div className="mb-4 sm:mb-6 grid grid-cols-3 gap-2 sm:gap-3">
                <div className="card p-3 sm:p-4 group hover:border-primary-500/30 transition-colors">
                    <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                        <Activity className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-500" />
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] text-black/40 dark:text-white/40">Active</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-black dark:text-white">{totalCount}</p>
                </div>
                <div className="card p-3 sm:p-4 group hover:border-success-500/30 transition-colors">
                    <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                        <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-success-500" />
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] text-black/40 dark:text-white/40">Done</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-black dark:text-white">{completedCount}</p>
                </div>
                <div className="card p-3 sm:p-4 group hover:border-purple-500/30 transition-colors">
                    <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                        <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-500" />
                        <p className="text-[10px] sm:text-xs font-black uppercase tracking-[0.12em] text-black/40 dark:text-white/40">Rate</p>
                    </div>
                    <p className="text-2xl sm:text-3xl font-black text-black dark:text-white">{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</p>
                </div>
            </div>

            {/* Action Buttons - Mobile Optimized */}
            <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Link href="/dashboard/habits" className="inline-flex items-center justify-center gap-2 rounded-xl border border-black bg-black px-4 py-2.5 sm:py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                    <Plus className="h-4 w-4" />
                    New Habit
                </Link>
                <Link href="/dashboard/stats" className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/25 px-4 py-2.5 sm:py-2 text-xs font-bold uppercase tracking-[0.12em] text-black transition hover:border-black dark:border-white/25 dark:text-white dark:hover:border-white">
                    <BarChart3 className="h-4 w-4" />
                    View Analytics
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
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <h2 className="section-title">Today&apos;s Habits</h2>
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
