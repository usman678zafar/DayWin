"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { DailyProgress } from "@/components/dashboard/DailyProgress";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { MotivationalQuote } from "@/components/dashboard/MotivationalQuote";
import { HabitList } from "@/components/habits/HabitList";
import { useHabits } from "@/hooks/useHabits";
import { Loader2, Plus, BarChart3 } from "lucide-react";

export default function DashboardPage() {
    const { habits, isLoading, fetchHabits } = useHabits();

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const completedCount = habits.filter((h) => h.todayLog?.completed).length;
    const totalCount = habits.length;

    const weeklyData = [
        { date: "Mon", completed: 4, total: 5, percentage: 80 },
        { date: "Tue", completed: 5, total: 5, percentage: 100 },
        { date: "Wed", completed: 3, total: 5, percentage: 60 },
        { date: "Thu", completed: 5, total: 5, percentage: 100 },
        { date: "Fri", completed: 4, total: 5, percentage: 80 },
        { date: "Sat", completed: 2, total: 5, percentage: 40 },
        { date: "Sun", completed: completedCount, total: totalCount, percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0 },
    ];

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

            <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Active Habits</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{totalCount}</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Completed Today</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{completedCount}</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Completion Rate</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</p>
                </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
                <Link href="/dashboard/habits" className="inline-flex items-center gap-2 rounded-xl border border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                    <Plus className="h-4 w-4" />
                    New Habit
                </Link>
                <Link href="/dashboard/stats" className="inline-flex items-center gap-2 rounded-xl border border-black/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-black transition hover:border-black dark:border-white/25 dark:text-white dark:hover:border-white">
                    <BarChart3 className="h-4 w-4" />
                    View Analytics
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
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

                <div className="space-y-6">
                    <MotivationalQuote />
                    <WeeklyChart data={weeklyData} />
                </div>
            </div>
        </div>
    );
}

