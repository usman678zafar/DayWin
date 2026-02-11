"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { DailyProgress } from "@/components/dashboard/DailyProgress";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { MotivationalQuote } from "@/components/dashboard/MotivationalQuote";
import { HabitList } from "@/components/habits/HabitList";
import { useHabits } from "@/hooks/useHabits";
import { Loader2 } from "lucide-react";

export default function DashboardPage() {
    const { habits, isLoading, fetchHabits } = useHabits();

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const completedCount = habits.filter((h) => h.todayLog?.completed).length;
    const totalCount = habits.length;

    // Mock weekly data - in production, fetch from API
    const weeklyData = [
        { date: "Mon", completed: 4, total: 5, percentage: 80 },
        { date: "Tue", completed: 5, total: 5, percentage: 100 },
        { date: "Wed", completed: 3, total: 5, percentage: 60 },
        { date: "Thu", completed: 5, total: 5, percentage: 100 },
        { date: "Fri", completed: 4, total: 5, percentage: 80 },
        { date: "Sat", completed: 2, total: 5, percentage: 40 },
        { date: "Sun", completed: completedCount, total: totalCount, percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0 },
    ];

    // Calculate streaks from habits
    const currentStreak = Math.max(...habits.map((h) => h.streak?.current || 0), 0);
    const longestStreak = Math.max(...habits.map((h) => h.streak?.longest || 0), 0);

    if (isLoading && habits.length === 0) {
        return (
            <div className="page-container flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
            </div>
        );
    }

    return (
        <div className="page-container">
            <Header />

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main content */}
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
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="section-title">Today's Habits</h2>
                        <HabitList />
                    </motion.div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <MotivationalQuote />
                    <WeeklyChart data={weeklyData} />
                </div>
            </div>
        </div>
    );
}
