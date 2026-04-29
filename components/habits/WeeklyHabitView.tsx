"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    format,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameDay,
    isToday,
    isFuture,
} from "date-fns";
import { Check, X, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import toast from "react-hot-toast";

interface WeeklyHabitViewProps {
    habits: HabitWithLog[];
    weekStart: Date;
    onToggleCompletion: (habitId: string, date: Date, completed: boolean) => Promise<void>;
}

interface WeekLog {
    date: Date;
    completed: boolean;
    count: number;
}

interface HabitWeekData {
    habit: HabitWithLog;
    logs: WeekLog[];
}

export function WeeklyHabitView({ habits, weekStart, onToggleCompletion }: WeeklyHabitViewProps) {
    const [habitsData, setHabitsData] = useState<HabitWeekData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(weekStart), i));

    const fetchWeekLogs = async () => {
        setIsLoading(true);
        try {
            const start = startOfWeek(weekStart);
            const end = endOfWeek(weekStart);
            const response = await fetch(
                `/api/logs?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const habitsWithWeekData: HabitWeekData[] = habits.map((habit) => {
                const habitLogs: DayLog[] = weekDays.map((day) => {
                    const dayLog = logs.find(
                        (log: any) =>
                            log.habitId === habit._id && isSameDay(new Date(log.date), day)
                    );
                    return {
                        date: day,
                        completed: dayLog?.completed || false,
                    };
                });

                const completedCount = habitLogs.filter((l) => l.completed).length;
                const completionRate = Math.round((completedCount / 7) * 100);

                return { habit, logs: habitLogs, completionRate };
            });

            setHabitsData(habitsWithWeekData);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch week logs");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchWeekLogs();
    }, [weekStart, habits, fetchWeekLogs]);

    const handleToggle = async (habitId: string, date: Date, currentCompleted: boolean) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark future dates");
            return;
        }

        // Optimistic update
        setHabitsData((prev) =>
            prev.map((hd) => {
                if (hd.habit._id === habitId) {
                    return {
                        ...hd,
                        logs: hd.logs.map((log) =>
                            format(log.date, "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                                ? { ...log, completed: !currentCompleted }
                                : log
                        ),
                    };
                }
                return hd;
            })
        );

        try {
            await onToggleCompletion(habitId, date, !currentCompleted);
        } catch (error) {
            // Revert on error
            fetchWeekLogs();
        }
    };

    if (isLoading) {
        return (
            <div className="card p-8 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
            </div>
        );
    }

    if (habitsData.length === 0) {
        return (
            <div className="card p-8 text-center">
                <p className="text-black/60 dark:text-white/60">No habits to display</p>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="border-b border-black/10 dark:border-white/10">
                            <th className="px-4 py-4 text-left">
                                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    Habit
                                </span>
                            </th>
                            {weekDays.map((day) => (
                                <th key={day.toString()} className="px-2 py-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">
                                            {format(day, "EEE")}
                                        </span>
                                        <span
                                            className={cn(
                                                "mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold",
                                                isToday(day)
                                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                                    : "text-black/70 dark:text-white/70"
                                            )}
                                        >
                                            {format(day, "d")}
                                        </span>
                                    </div>
                                </th>
                            ))}
                            <th className="px-4 py-4 text-center">
                                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    Streak
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitsData.map(({ habit, logs }) => {
                            const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;
                            const weekCompleted = logs.filter((l) => l.completed).length;

                            return (
                                <motion.tr
                                    key={habit._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-b border-black/5 last:border-0 dark:border-white/5"
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-xl", colors.bg)}>
                                                {habit.icon}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-black dark:text-white">
                                                    {habit.title}
                                                </p>
                                                <p className="text-xs text-black/50 dark:text-white/50">
                                                    {weekCompleted}/7 this week
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    {logs.map((log, index) => {
                                        const isFutureDay = isFuture(log.date) && !isToday(log.date);
                                        return (
                                            <td key={index} className="px-2 py-4 text-center">
                                                <motion.button
                                                    whileHover={!isFutureDay ? { scale: 1.15 } : undefined}
                                                    whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                    onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                    disabled={isFutureDay}
                                                    className={cn(
                                                        "mx-auto flex h-9 w-9 items-center justify-center rounded-xl transition",
                                                        log.completed
                                                            ? `bg-gradient-to-br ${colors.gradient} text-white shadow-md`
                                                            : "border-2 border-black/15 dark:border-white/15",
                                                        isFutureDay && "cursor-not-allowed opacity-30"
                                                    )}
                                                >
                                                    {log.completed ? (
                                                        <Check className="h-5 w-5" strokeWidth={3} />
                                                    ) : (
                                                        <span className="h-5 w-5" />
                                                    )}
                                                </motion.button>
                                            </td>
                                        );
                                    })}
                                    <td className="px-4 py-4 text-center">
                                        {habit.streak.current > 0 ? (
                                            <div className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                                                <Flame className="h-4 w-4" />
                                                <span className="text-sm font-bold">{habit.streak.current}</span>
                                            </div>
                                        ) : (
                                            <span className="text-black/30 dark:text-white/30">-</span>
                                        )}
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
