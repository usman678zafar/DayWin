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
    addMonths,
    subMonths,
    isToday,
    isFuture,
} from "date-fns";
import { ChevronLeft, ChevronRight, Check, Flame, Calendar as CalendarIcon, TrendingUp } from "lucide-react";
import { CalendarCellsSkeleton } from "@/components/ui/PageSkeletons";
import { cn } from "@/lib/utils";
import { useHabits } from "@/hooks/useHabits";
import { Button } from "@/components/ui/Button";
import { HabitIcon } from "@/components/habits/HabitIcon";
import { habitColors } from "@/types";
import toast from "react-hot-toast";

export default function CalendarPage() {
    const { habits, fetchHabits, completeHabitForDate } = useHabits();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => { fetchHabits(); }, [fetchHabits]);

    const fetchLogs = useCallback(async () => {
        setIsLoading(true);
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);
        try {
            const response = await fetch(`/api/logs?startDate=${start.toISOString()}&endDate=${end.toISOString()}`);
            const data = await response.json();
            setLogs(data.logs || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [currentMonth]);

    useEffect(() => { fetchLogs(); }, [currentMonth, fetchLogs]);

    const handleToggleHabit = async (habitId: string, date: Date, currentCompleted: boolean) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark future dates");
            return;
        }

        const newCompleted = !currentCompleted;
        setLogs((prev) => {
            const idx = prev.findIndex((log) => log.habitId === habitId && isSameDay(new Date(log.date), date));
            if (idx >= 0) {
                const updated = [...prev];
                updated[idx] = { ...updated[idx], completed: newCompleted };
                return updated;
            }
            return [...prev, { habitId, date, completed: newCompleted }];
        });

        try {
            await completeHabitForDate(habitId, date, newCompleted);
        } catch (error) {
            fetchLogs();
        }
    };

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const renderCells = () => {
        const rows = [];
        let day = startDate;
        while (day <= endDate) {
            const daysInRow = [];
            for (let i = 0; i < 7; i++) {
                const d = day;
                const dayLogs = logs.filter((log) => isSameDay(new Date(log.date), d));
                const completedCount = dayLogs.filter((log) => log.completed).length;
                const totalHabits = habits.length;
                const rate = totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0;
                const isSelected = isSameDay(d, selectedDate);
                const isCurrent = isSameMonth(d, monthStart);
                const isFutureD = isFuture(d) && !isToday(d);

                daysInRow.push(
                    <div
                        key={d.toString()}
                        onClick={() => setSelectedDate(d)}
                        className={cn(
                            "relative aspect-square cursor-pointer transition-all border border-black/[0.03] dark:border-white/[0.03]",
                            !isCurrent && "opacity-10 pointer-events-none",
                            isSelected && "ring-1 ring-inset ring-black dark:ring-white z-10",
                            isToday(d) && "bg-primary-500/5"
                        )}
                    >
                        <div className={cn(
                            "w-full h-full flex flex-col items-center justify-center p-0.5",
                            rate === 100 && !isFutureD && "bg-green-500/20 dark:bg-green-500/10",
                            rate > 0 && rate < 100 && !isFutureD && "bg-yellow-500/20 dark:bg-yellow-500/10",
                            rate === 0 && dayLogs.length > 0 && !isFutureD && "bg-red-500/20 dark:bg-red-500/10"
                        )}>
                            <span className={cn("text-[10px] font-black", isToday(d) ? "text-primary-600 dark:text-primary-400" : "text-black/60 dark:text-white/40")}>
                                {format(d, "d")}
                            </span>
                            {rate > 0 && !isFutureD && (
                                <span className="text-[8px] font-black pointer-events-none">{Math.round(rate)}%</span>
                            )}
                        </div>
                    </div>
                );
                day = addDays(day, 1);
            }
            rows.push(<div key={day.toString()} className="grid grid-cols-7">{daysInRow}</div>);
        }
        return <div className="border border-black/5 dark:border-white/5 rounded-lg overflow-hidden">{rows}</div>;
    };

    const selectedDateLogs = logs.filter((log) => isSameDay(new Date(log.date), selectedDate));
    const isSelectedFuture = isFuture(selectedDate) && !isToday(selectedDate);

    return (
        <div className="page-container">
            {/* Very Compact Calendar Header */}
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <h1 className="text-sm font-black uppercase tracking-widest text-black/40 dark:text-white/40 flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" /> Calendar
                    </h1>
                    <div className="h-4 w-px bg-black/10 dark:bg-white/10" />
                    <h2 className="text-sm font-black text-black dark:text-white">{format(currentMonth, "MMMM yyyy")}</h2>
                </div>

                <div className="flex items-center gap-1">
                    <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                        <ChevronLeft className="h-4 w-4" />
                    </button>
                    <button onClick={() => { setCurrentMonth(new Date()); setSelectedDate(new Date()); }} className="px-2 py-1 text-[10px] font-black uppercase tracking-widest hover:bg-black/5 rounded">Today</button>
                    <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-4">
                {/* Calendar View */}
                <div className="lg:col-span-3">
                    <div className="card p-2">
                        <div className="grid grid-cols-7 mb-1">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                                <div key={d} className="text-center py-1 text-[8px] font-black uppercase tracking-widest text-black/20">
                                    {d}
                                </div>
                            ))}
                        </div>
                        {isLoading ? <CalendarCellsSkeleton /> : renderCells()}

                        {/* Legend - Mini */}
                        <div className="flex items-center justify-center gap-4 mt-3 pb-1">
                            {[{c: "bg-green-500/40", l: "FULL"}, {c: "bg-yellow-500/40", l: "PART"}, {c: "bg-red-500/40", l: "NONE"}].map(item => (
                                <div key={item.l} className="flex items-center gap-1.5">
                                    <div className={cn("w-2 h-2 rounded-full", item.c)} />
                                    <span className="text-[9px] font-black text-black/30 tracking-widest">{item.l}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Selected Date Details - High Density */}
                <div className="lg:col-span-1 space-y-3">
                    <div className="card p-3">
                        <div className="mb-3">
                            <h3 className="text-[11px] font-black uppercase tracking-tight text-black dark:text-white">{format(selectedDate, "EEEE, MMMM d")}</h3>
                            {isSelectedFuture && <p className="text-[9px] font-bold text-yellow-600 dark:text-yellow-400 mt-0.5">Future date - locked</p>}
                        </div>

                        <div className="space-y-1.5">
                            {habits.length > 0 ? habits.map((habit) => {
                                const isComp = selectedDateLogs.find(l => l.habitId === habit._id)?.completed || false;
                                const col = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;
                                return (
                                    <button
                                        key={habit._id}
                                        onClick={() => handleToggleHabit(habit._id, selectedDate, isComp)}
                                        disabled={isSelectedFuture}
                                        className={cn(
                                            "w-full flex items-center gap-2 p-1.5 rounded-lg transition-all text-left",
                                            isComp ? "bg-black/[0.02] dark:bg-white/[0.04]" : "hover:bg-black/[0.01] dark:hover:bg-white/[0.01]",
                                            isSelectedFuture && "opacity-40"
                                        )}
                                    >
                                        <div className={cn("flex h-7 w-7 items-center justify-center rounded-md shrink-0", col.bg)}>
                                            <HabitIcon name={habit.icon} size={14} className={col.text} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn("text-[11px] font-bold truncate", isComp ? "text-black dark:text-white" : "text-black/50 dark:text-white/40")}>{habit.title}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <span className="text-[8px] font-black uppercase text-black/20">{habit.category}</span>
                                                {habit.streak.current > 0 && <div className="flex items-center gap-0.5 text-orange-500"><Flame className="h-2 w-2" /><span className="text-[8px] font-bold">{habit.streak.current}d</span></div>}
                                            </div>
                                        </div>
                                        <div className={cn("h-5 w-5 rounded-md flex items-center justify-center shrink-0 border transition-all", isComp ? "bg-black dark:bg-white border-transparent" : "border-black/5 dark:border-white/5")}>
                                            {isComp && <Check className="h-3 w-3 text-white dark:text-black" strokeWidth={5} />}
                                        </div>
                                    </button>
                                );
                            }) : <p className="text-[10px] text-center py-4 text-black/20">No habits</p>}
                        </div>

                        {habits.length > 0 && !isSelectedFuture && (
                            <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-1.5 opacity-30">
                                    <TrendingUp className="h-3 w-3" />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Rate</span>
                                </div>
                                <span className="text-[10px] font-black">{selectedDateLogs.filter(l => l.completed).length} / {habits.length}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

