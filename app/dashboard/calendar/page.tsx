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
} from "date-fns";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHabits } from "@/hooks/useHabits";
import { Button } from "@/components/ui/Button";

export default function CalendarPage() {
    const { habits, fetchHabits } = useHabits();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        fetchHabits();
        fetchLogs();
    }, [currentMonth]);

    const fetchLogs = async () => {
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
                    onClick={() => setCurrentMonth(new Date())}
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
                const isToday = isSameDay(day, new Date());
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);

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
                            isToday && "bg-primary-50 dark:bg-primary-900/20"
                        )}
                    >
                        <div
                            className={cn(
                                "w-full h-full rounded-lg flex flex-col items-center justify-center",
                                completionRate === 100 && "bg-success-100 dark:bg-success-900/30",
                                completionRate > 0 && completionRate < 100 && "bg-yellow-100 dark:bg-yellow-900/30",
                                completionRate === 0 && totalHabits > 0 && dayLogs.length > 0 && "bg-red-100 dark:bg-red-900/30"
                            )}
                        >
                            <span
                                className={cn(
                                    "text-sm font-semibold",
                                    isToday
                                        ? "text-primary-600 dark:text-primary-400"
                                        : "text-surface-900 dark:text-white"
                                )}
                            >
                                {format(day, "d")}
                            </span>
                            {totalHabits > 0 && isCurrentMonth && (
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

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Calendar</h1>
                <p className="page-subtitle">Track completion patterns across every day and spot streak trends.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <div className="card p-6">
                        {renderHeader()}
                        {renderDays()}
                        {renderCells()}
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

                {/* Selected Date Details */}
                <div className="card p-6 h-fit sticky top-6">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                        {format(selectedDate, "EEEE, MMMM d")}
                    </h3>

                    {selectedDateLogs.length > 0 ? (
                        <div className="space-y-3">
                            {habits.map((habit) => {
                                const log = selectedDateLogs.find(
                                    (l) => l.habitId === habit._id
                                );
                                return (
                                    <div
                                        key={habit._id}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50"
                                    >
                                        <div className="text-xl">{habit.icon}</div>
                                        <div className="flex-1">
                                            <p className="font-medium text-surface-900 dark:text-white">
                                                {habit.title}
                                            </p>
                                        </div>
                                        <div
                                            className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center",
                                                log?.completed
                                                    ? "bg-success-500"
                                                    : "bg-surface-200 dark:bg-surface-800"
                                            )}
                                        >
                                            {log?.completed ? (
                                                <Check className="w-4 h-4 text-white" />
                                            ) : (
                                                <X className="w-4 h-4 text-surface-200/50" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-surface-200/50 text-center py-8">
                            {isSameDay(selectedDate, new Date())
                                ? "Start completing your habits!"
                                : "No activity on this day"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}


