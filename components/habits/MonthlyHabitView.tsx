"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
    isToday,
    isFuture,
} from "date-fns";
import { Check, ChevronDown, ChevronUp, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import toast from "react-hot-toast";

interface MonthlyHabitViewProps {
    habits: HabitWithLog[];
    month: Date;
    onToggleCompletion: (habitId: string, date: Date, completed: boolean) => Promise<void>;
}

interface DayLog {
    date: Date;
    completed: boolean;
}

interface HabitMonthData {
    habit: HabitWithLog;
    logs: DayLog[];
    completionRate: number;
}

export function MonthlyHabitView({ habits, month, onToggleCompletion }: MonthlyHabitViewProps) {
    const [habitsData, setHabitsData] = useState<HabitMonthData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedHabit, setExpandedHabit] = useState<string | null>(null);

    const fetchMonthLogs = useCallback(async () => {
        setIsLoading(true);
        try {
            const start = startOfMonth(month);
            const end = endOfMonth(month);
            const response = await fetch(
                `/api/logs?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const daysInMonth: Date[] = [];
            let currentDay = start;
            while (currentDay <= end) {
                daysInMonth.push(currentDay);
                currentDay = addDays(currentDay, 1);
            }

            const habitsWithLogs: HabitMonthData[] = habits.map((habit) => {
                const habitLogs: DayLog[] = daysInMonth.map((day) => {
                    const dayLog = logs.find(
                        (log: any) => log.habitId === habit._id && isSameDay(new Date(log.date), day)
                    );
                    return {
                        date: day,
                        completed: dayLog?.completed || false,
                    };
                });

                const completedCount = habitLogs.filter((l) => l.completed).length;
                const validDays = habitLogs.filter(
                    (l) => !isFuture(l.date) || isToday(l.date)
                ).length;
                const completionRate =
                    validDays > 0 ? Math.round((completedCount / validDays) * 100) : 0;

                return {
                    habit,
                    logs: habitLogs,
                    completionRate,
                };
            });

            setHabitsData(habitsWithLogs);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch month logs");
        } finally {
            setIsLoading(false);
        }
    }, [month, habits]);

    useEffect(() => {
        fetchMonthLogs();
    }, [month, habits, fetchMonthLogs]);

    const getDaysInMonth = (date: Date): Date[] => {
        const start = startOfMonth(date);
        const end = endOfMonth(date);
        const days: Date[] = [];
        let day = start;
        while (day <= end) {
            days.push(day);
            day = addDays(day, 1);
        }
        return days;
    };

    const handleToggle = async (habitId: string, date: Date, currentCompleted: boolean) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark future dates");
            return;
        }

        const dateStr = format(date, "yyyy-MM-dd");

        setHabitsData((prev) =>
            prev.map((hd) => {
                if (hd.habit._id === habitId) {
                    const newLogs = hd.logs.map((log) =>
                        format(log.date, "yyyy-MM-dd") === dateStr ? { ...log, completed: !currentCompleted } : log
                    );
                    const completedDays = newLogs.filter((l) => l.completed).length;
                    const totalDays = newLogs.filter((l) => !isFuture(l.date) || isToday(l.date)).length;
                    return {
                        ...hd,
                        logs: newLogs,
                        completionRate: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
                    };
                }
                return hd;
            })
        );

        try {
            await onToggleCompletion(habitId, date, !currentCompleted);
        } catch (error) {
            fetchMonthLogs();
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
        <div className="space-y-4">
            {habitsData.map(({ habit, logs, completionRate }) => {
                const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;
                const isExpanded = expandedHabit === habit._id;

                return (
                    <motion.div
                        key={habit._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card overflow-hidden"
                    >
                        {/* Header */}
                        <button
                            onClick={() => setExpandedHabit(isExpanded ? null : habit._id)}
                            className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                        >
                            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-2xl", colors.bg)}>
                                {habit.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-black dark:text-white">{habit.title}</p>
                                <div className="mt-1 flex items-center gap-4">
                                    <span className="text-sm text-black/50 dark:text-white/50">
                                        {completionRate}% completion
                                    </span>
                                    {habit.streak.current > 0 && (
                                        <div className="flex items-center gap-1 text-orange-500">
                                            <Flame className="h-3.5 w-3.5" />
                                            <span className="text-xs font-semibold">{habit.streak.current} day streak</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Mini Progress Bar */}
                                <div className="hidden w-32 sm:block">
                                    <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${completionRate}%` }}
                                            className={cn("h-full rounded-full bg-gradient-to-r", colors.gradient)}
                                        />
                                    </div>
                                </div>
                                {isExpanded ? (
                                    <ChevronUp className="h-5 w-5 text-black/40 dark:text-white/40" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-black/40 dark:text-white/40" />
                                )}
                            </div>
                        </button>

                        {/* Expanded Calendar Grid */}
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-black/10 p-4 dark:border-white/10"
                            >
                                {/* Day Headers */}
                                <div className="mb-2 grid grid-cols-7 gap-1">
                                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                        <div key={day} className="py-1 text-center text-xs font-semibold text-black/40 dark:text-white/40">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {/* Empty cells for offset */}
                                    {Array.from({ length: startOfMonth(month).getDay() }).map((_, i) => (
                                        <div key={`empty-${i}`} className="aspect-square" />
                                    ))}

                                    {/* Day cells */}
                                    {logs.map((log, index) => {
                                        const isFutureDay = isFuture(log.date) && !isToday(log.date);
                                        const isTodayDate = isToday(log.date);

                                        return (
                                            <motion.button
                                                key={index}
                                                whileHover={!isFutureDay ? { scale: 1.1 } : undefined}
                                                whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                disabled={isFutureDay}
                                                className={cn(
                                                    "relative aspect-square rounded-lg transition",
                                                    log.completed
                                                        ? `bg-gradient-to-br ${colors.gradient} text-white`
                                                        : "bg-black/5 dark:bg-white/5",
                                                    isFutureDay && "cursor-not-allowed opacity-30",
                                                    isTodayDate && !log.completed && "ring-2 ring-black/20 dark:ring-white/20"
                                                )}
                                            >
                                                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                                    {log.completed ? (
                                                        <Check className="h-4 w-4" strokeWidth={3} />
                                                    ) : (
                                                        format(log.date, "d")
                                                    )}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}
