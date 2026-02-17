"use client";

import { useState, useEffect } from "react";
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
    addMonths,
    subMonths,
    isToday,
    isFuture,
} from "date-fns";
import { ChevronLeft, ChevronRight, Check, X, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHabits } from "@/hooks/useHabits";
import { Button } from "@/components/ui/Button";

import toast from "react-hot-toast";

export default function CalendarPage() {
    const { habits, fetchHabits, completeHabitForDate } = useHabits();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    useEffect(() => {
        fetchLogs();
    }, [currentMonth]);

    const fetchLogs = async () => {
        setIsLoading(true);
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);

        try {
            const response = await fetch(
                `/api/logs?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
            );
            const data = await response.json();
            setLogs(data.logs || []);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleHabit = async (habitId: string, date: Date, currentCompleted: boolean) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark habits for future dates");
            return;
        }

        // Optimistic update
        const newCompleted = !currentCompleted;
        setLogs((prevLogs) => {
            const existingLogIndex = prevLogs.findIndex(
                (log) => log.habitId === habitId && isSameDay(new Date(log.date), date)
            );

            if (existingLogIndex >= 0) {
                const newLogs = [...prevLogs];
                newLogs[existingLogIndex] = { ...newLogs[existingLogIndex], completed: newCompleted };
                return newLogs;
            } else {
                return [...prevLogs, { habitId, date, completed: newCompleted }];
            }
        });

        try {
            await completeHabitForDate(habitId, date, newCompleted);
        } catch (error) {
            // Revert on error
            fetchLogs();
        }
    };

    const renderHeader = () => (
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                {format(currentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => {
                        setCurrentMonth(new Date());
                        setSelectedDate(new Date());
                    }}
                >
                    Today
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );

    const renderDays = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map((day) => (
                    <div
                        key={day}
                        className="py-3 text-center text-sm font-semibold text-surface-200/50"
                    >
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const dayLogs = logs.filter((log) =>
                    isSameDay(new Date(log.date), day)
                );
                const completedCount = dayLogs.filter((log) => log.completed).length;
                const totalHabits = habits.length;
                const completionRate = totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0;
                const cloneDay = day;
                const isTodayDate = isToday(day);
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isFutureDate = isFuture(day) && !isToday(day);

                days.push(
                    <motion.div
                        key={day.toString()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDate(cloneDay)}
                        className={cn(
                            "relative aspect-square p-2 cursor-pointer rounded-xl transition-all duration-300",
                            !isCurrentMonth && "opacity-30",
                            isSelected && "ring-2 ring-primary-500",
                            isTodayDate && "bg-primary-50 dark:bg-primary-900/20"
                        )}
                    >
                        <div
                            className={cn(
                                "w-full h-full rounded-lg flex flex-col items-center justify-center",
                                completionRate === 100 && !isFutureDate && "bg-success-100 dark:bg-success-900/30",
                                completionRate > 0 && completionRate < 100 && !isFutureDate && "bg-yellow-100 dark:bg-yellow-900/30",
                                completionRate === 0 && totalHabits > 0 && dayLogs.length > 0 && !isFutureDate && "bg-red-100 dark:bg-red-900/30"
                            )}
                        >
                            <span
                                className={cn(
                                    "text-sm font-semibold",
                                    isTodayDate
                                        ? "text-primary-600 dark:text-primary-400"
                                        : "text-surface-900 dark:text-white"
                                )}
                            >
                                {format(day, "d")}
                            </span>
                            {totalHabits > 0 && isCurrentMonth && !isFutureDate && (
                                <div className="mt-1 flex gap-0.5">
                                    {completionRate === 100 ? (
                                        <Check className="w-3 h-3 text-success-500" />
                                    ) : completionRate > 0 ? (
                                        <span className="text-[10px] text-yellow-600 dark:text-yellow-400">
                                            {Math.round(completionRate)}%
                                        </span>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day.toString()} className="grid grid-cols-7 gap-1">
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
    };

    const selectedDateLogs = logs.filter((log) =>
        isSameDay(new Date(log.date), selectedDate)
    );
    const isSelectedFuture = isFuture(selectedDate) && !isToday(selectedDate);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Calendar</h1>
                <p className="page-subtitle">Track completion patterns across every day. Click any date to view and edit habits.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <div className="card p-6">
                        {renderHeader()}
                        {renderDays()}
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
                            </div>
                        ) : (
                            renderCells()
                        )}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-success-100 dark:bg-success-900/30" />
                            <span className="text-sm text-surface-200/50">All complete</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-yellow-100 dark:bg-yellow-900/30" />
                            <span className="text-sm text-surface-200/50">Partial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30" />
                            <span className="text-sm text-surface-200/50">None</span>
                        </div>
                    </div>
                </div>

                {/* Selected Date Details - INTERACTIVE */}
                <div className="card p-6 h-fit sticky top-6">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                        {format(selectedDate, "EEEE, MMMM d")}
                    </h3>

                    {isSelectedFuture && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-4">
                            Future date - habits cannot be marked
                        </p>
                    )}

                    {habits.length > 0 ? (
                        <div className="space-y-3">
                            {habits.map((habit) => {
                                const log = selectedDateLogs.find(
                                    (l) => l.habitId === habit._id
                                );
                                const isCompleted = log?.completed || false;


                                return (
                                    <motion.button
                                        key={habit._id}
                                        whileHover={!isSelectedFuture ? { scale: 1.02 } : undefined}
                                        whileTap={!isSelectedFuture ? { scale: 0.98 } : undefined}
                                        onClick={() => handleToggleHabit(habit._id, selectedDate, isCompleted)}
                                        disabled={isSelectedFuture}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left",
                                            isCompleted
                                                ? "bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800"
                                                : "bg-surface-50 dark:bg-surface-800/50 border border-transparent hover:border-black/10 dark:hover:border-white/10",
                                            isSelectedFuture && "opacity-50 cursor-not-allowed"
                                        )}
                                    >

                                        <div className="flex-1">
                                            <p className={cn(
                                                "font-medium",
                                                isCompleted
                                                    ? "text-success-700 dark:text-success-300"
                                                    : "text-surface-900 dark:text-white"
                                            )}>
                                                {habit.title}
                                            </p>
                                            {habit.streak.current > 0 && (
                                                <div className="flex items-center gap-1 mt-0.5 text-orange-500">
                                                    <Flame className="h-3 w-3" />
                                                    <span className="text-xs font-medium">{habit.streak.current} day streak</span>
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                                                isCompleted
                                                    ? "bg-success-500 text-white"
                                                    : "bg-surface-200 dark:bg-surface-700"
                                            )}
                                        >
                                            {isCompleted ? (
                                                <Check className="w-4 h-4" strokeWidth={3} />
                                            ) : (
                                                <span className="w-4 h-4" />
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-surface-200/50 text-center py-8">
                            No habits created yet
                        </p>
                    )}

                    {/* Summary for selected date */}
                    {habits.length > 0 && !isSelectedFuture && (
                        <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-black/60 dark:text-white/60">Completion</span>
                                <span className="font-semibold text-black dark:text-white">
                                    {selectedDateLogs.filter(l => l.completed).length} / {habits.length}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
