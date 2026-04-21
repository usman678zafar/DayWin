"use client";

import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    format,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    addWeeks,
    subWeeks,
    addMonths,
    subMonths,
    eachDayOfInterval,
    isSameDay,
    isToday,
    isFuture,
    subDays,
    addDays,
} from "date-fns";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Check,
    MoreVertical,
    Edit2,
    Trash2,
    Loader2,
    CalendarDays,
    Calendar,
    Settings,
    TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useHabits } from "@/hooks/useHabits";
import { HabitWithLog, Habit, habitColors, HabitType, habitCategories } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { HabitForm } from "@/components/habits/HabitForm";
import { HabitIcon } from "@/components/habits/HabitIcon";
import { PageLoader } from "@/components/ui/PageLoader";
import toast from "react-hot-toast";

// Types
interface DayLog {
    date: Date;
    completed: boolean;
}

interface HabitData {
    habit: HabitWithLog;
    logs: DayLog[];
    completionRate: number;
}

// Habit type tabs configuration
const habitTypeTabs: { value: HabitType; label: string; icon: React.ElementType; periodDays: number }[] = [
    { value: "weekly", label: "Weekly", icon: CalendarDays, periodDays: 7 },
    { value: "monthly", label: "Monthly", icon: Calendar, periodDays: 30 },
    { value: "custom", label: "Custom", icon: Settings, periodDays: 0 },
];

export default function HabitsPage() {
    const { habits, fetchHabits, addHabit, updateHabit, deleteHabit } = useHabits();

    // Active habit type tab
    const [activeType, setActiveType] = useState<HabitType>("weekly");

    // Date navigation state
    const [currentDate, setCurrentDate] = useState(new Date());

    // Data state
    const [habitsData, setHabitsData] = useState<HabitData[]>([]);
    const [isLoadingLogs, setIsLoadingLogs] = useState(false);

    // UI state
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [deletingHabit, setDeletingHabit] = useState<HabitWithLog | null>(null);
    const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);

    // Track current fetch request to prevent race conditions
    const fetchIdRef = useRef(0);

    // Filter habits by active type
    const filteredHabits = useMemo(() => {
        return habits.filter((h) => (h.habitType || "weekly") === activeType);
    }, [habits, activeType]);

    // Calculate date range based on active type
    const dateRange = useMemo(() => {
        switch (activeType) {
            case "weekly":
                return {
                    start: startOfWeek(currentDate, { weekStartsOn: 1 }),
                    end: endOfWeek(currentDate, { weekStartsOn: 1 }),
                };
            case "monthly":
                return {
                    start: startOfMonth(currentDate),
                    end: endOfMonth(currentDate),
                };
            case "custom":
                return {
                    start: subDays(currentDate, 13),
                    end: currentDate,
                };
            default:
                return {
                    start: startOfWeek(currentDate, { weekStartsOn: 1 }),
                    end: endOfWeek(currentDate, { weekStartsOn: 1 }),
                };
        }
    }, [activeType, currentDate]);

    const days = useMemo(() => {
        return eachDayOfInterval({ start: dateRange.start, end: dateRange.end });
    }, [dateRange]);

    const displayDays = useMemo(() => {
        if (activeType === "custom") return [...days].reverse();
        return days;
    }, [days, activeType]);

    useEffect(() => {
        fetchHabits().finally(() => setIsLoading(false));
    }, [fetchHabits]);

    const fetchLogs = useCallback(async (habitsToFetch: HabitWithLog[], type: HabitType) => {
        const currentFetchId = ++fetchIdRef.current;
        if (habitsToFetch.length === 0) {
            setHabitsData([]);
            return;
        }

        if (habitsData.length === 0) setIsLoadingLogs(true);
        
        try {
            let fetchStart = dateRange.start;
            let fetchEnd = dateRange.end;

            if (type === "custom") {
                const starts = habitsToFetch.map((h) => new Date(h.startDate).getTime());
                const ends = habitsToFetch.map((h) => h.endDate ? new Date(h.endDate).getTime() : new Date().getTime());
                fetchStart = new Date(Math.min(...starts));
                fetchEnd = new Date(Math.max(...ends));
            }

            const response = await fetch(`/api/logs?startDate=${fetchStart.toISOString()}&endDate=${fetchEnd.toISOString()}`);
            const data = await response.json();
            const logs = data.logs || [];

            if (currentFetchId !== fetchIdRef.current) return;

            const habitsWithData: HabitData[] = habitsToFetch.map((habit) => {
                const habitDays = type === "custom"
                    ? eachDayOfInterval({
                        start: new Date(habit.startDate),
                        end: new Date(habit.endDate || new Date())
                    })
                    : days;

                const habitLogs: DayLog[] = habitDays.map((day) => {
                    const dayLog = logs.find(
                        (log: any) =>
                            log.habitId === habit._id &&
                            format(new Date(log.date), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
                    );
                    return { date: day, completed: dayLog?.completed || false };
                });

                const completedCount = habitLogs.filter((l) => l.completed).length;
                const validDays = habitLogs.filter((l) => !isFuture(l.date) || isToday(l.date)).length;
                const completionRate = validDays > 0 ? Math.round((completedCount / validDays) * 100) : 0;

                return { habit, logs: habitLogs, completionRate };
            });

            setHabitsData(habitsWithData);
        } catch (error) {
            console.error(error);
        } finally {
            if (currentFetchId === fetchIdRef.current) setIsLoadingLogs(false);
        }
    }, [dateRange, days]);

    useEffect(() => {
        fetchLogs(filteredHabits, activeType);
    }, [filteredHabits, activeType, fetchLogs]);

    const handleToggle = async (habitId: string, date: Date, currentCompleted: boolean) => {
        if (isFuture(date) && !isToday(date)) return;

        setHabitsData((prev) => prev.map((hd) => {
            if (hd.habit._id === habitId) {
                const newLogs = hd.logs.map((log) =>
                    isSameDay(log.date, date) ? { ...log, completed: !currentCompleted } : log
                );
                const completedCount = newLogs.filter((l) => l.completed).length;
                const validDays = newLogs.filter((l) => !isFuture(l.date) || isToday(l.date)).length;
                return { ...hd, logs: newLogs, completionRate: validDays > 0 ? Math.round((completedCount / validDays) * 100) : 0 };
            }
            return hd;
        }));

        try {
            await fetch(`/api/habits/${habitId}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !currentCompleted, date: format(date, "yyyy-MM-dd") }),
            });
            fetchHabits();
        } catch (error) {
            fetchLogs(filteredHabits, activeType);
            toast.error("Failed to update");
        }
    };

    const goToPrevious = () => {
        if (activeType === "weekly") setCurrentDate(subWeeks(currentDate, 1));
        else if (activeType === "monthly") setCurrentDate(subMonths(currentDate, 1));
        else setCurrentDate(subDays(currentDate, 14));
    };

    const goToNext = () => {
        if (activeType === "weekly") setCurrentDate(addWeeks(currentDate, 1));
        else if (activeType === "monthly") setCurrentDate(addMonths(currentDate, 1));
        else setCurrentDate(addDays(currentDate, 14));
    };
    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Form handlers
    const handleSubmit = async (data: Partial<Habit>) => {
        if (editingHabit) {
            await updateHabit(editingHabit._id, data);
        } else {
            await addHabit(data);
        }
        setShowForm(false);
        setEditingHabit(null);
    };

    const handleDelete = async () => {
        if (deletingHabit) {
            await deleteHabit(deletingHabit._id);
            setDeletingHabit(null);
        }
    };
    if (isLoading) return <PageLoader />;

    return (
        <div className="page-container">
            {/* Header / Tabs - Mini */}
            <div className="mb-2 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-0.5 rounded-lg border border-black/10 bg-white p-0.5 dark:border-white/10 dark:bg-white/5">
                    {habitTypeTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => { setActiveType(tab.value); setCurrentDate(new Date()); }}
                            className={cn(
                                "px-3 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-md transition-all",
                                activeType === tab.value
                                    ? "bg-black text-white dark:bg-white dark:text-black shadow-sm"
                                    : "text-black/40 hover:text-black hover:bg-black/5 dark:text-white/50 dark:hover:text-white dark:hover:bg-white/10"
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-1.5">
                    <button onClick={goToPrevious} className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                        <ChevronLeft className="h-3.5 w-3.5" />
                    </button>
                    <span className="text-[11px] font-semibold uppercase tracking-tight">
                        {activeType === "monthly" ? format(currentDate, "MMMM yyyy") : `${format(dateRange.start, "MMM d")} - ${format(dateRange.end, "MMM d")}`}
                    </span>
                    <button onClick={goToNext} className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/5">
                        <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                    <button onClick={() => setCurrentDate(new Date())} className="ml-1 text-[9px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white">Today</button>
                </div>

                <Button onClick={() => setShowForm(true)} className="h-7 px-3 text-[10px] font-semibold uppercase tracking-widest">
                    <Plus className="h-3 w-3 mr-1" /> New Habit
                </Button>
            </div>

            {/* Matrix - High Density */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto scrollbar-hide">
                    <table className="w-full min-w-max border-collapse">
                        <thead>
                            <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01]">
                                <th className="sticky left-0 z-10 bg-white dark:bg-surface-900 px-3 py-2 text-left border-r border-black/5 dark:border-white/5">
                                    <span className="text-[9px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">Habit</span>
                                </th>
                                {displayDays.map((day) => (
                                    <th key={day.toISOString()} className={cn(
                                        "px-1 py-1.5 text-center min-w-[32px] sm:min-w-[40px]",
                                        isToday(day) && "bg-primary-500/5 dark:bg-primary-500/10"
                                    )}>
                                        <div className="flex flex-col items-center">
                                            <span className="text-[8px] font-semibold uppercase text-black/50 dark:text-white/50 leading-none">{format(day, "EEE")}</span>
                                            <span className={cn("text-[11px] font-semibold mt-0.5", isToday(day) ? "text-primary-600 dark:text-primary-400" : "text-black dark:text-white")}>{format(day, "d")}</span>
                                        </div>
                                    </th>
                                ))}
                                <th className="px-3 py-2 text-center bg-black/[0.03] dark:bg-white/[0.03]">
                                    <TrendingUp className="h-3 w-3 mx-auto text-purple-500" />
                                </th>
                                <th className="w-8" />
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-black/5 dark:divide-white/5">
                            {habitsData.length > 0 ? (
                                habitsData.map(({ habit, logs, completionRate }, rowIndex) => {
                                    const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;
                                    return (
                                        <tr key={habit._id} className="group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                                            <td className="sticky left-0 z-10 bg-white dark:bg-surface-900 px-3 py-1.5 border-r border-black/5 dark:border-white/5 group-hover:bg-surface-50 dark:group-hover:bg-white/[0.02]">
                                                <div className="flex items-center gap-2 max-w-[120px] sm:max-w-[180px]">
                                                    <div className="relative h-8 w-8 flex-shrink-0">
                                                        <svg className="h-8 w-8 -rotate-90 transform" viewBox="0 0 36 36">
                                                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-black/5 dark:stroke-white/5" strokeWidth="3" />
                                                            <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${completionRate} 100`} strokeLinecap="round" className={colors.text} />
                                                        </svg>
                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                            {(() => {
                                                                const categoryIcon = habitCategories.find(c => c.value === habit.category)?.icon || "Star";
                                                                const iconToDisplay = habit.icon && habit.icon !== "Star" ? habit.icon : categoryIcon;
                                                                return <HabitIcon name={iconToDisplay} size={11} className={colors.text} />;
                                                            })()}
                                                        </div>
                                                    </div>
                                                    <span className="truncate text-[11px] font-semibold text-black dark:text-white">{habit.title}</span>
                                                </div>
                                            </td>
                                            {logs.map((log, lIdx) => {
                                                const isFutureDay = isFuture(log.date) && !isToday(log.date);
                                                return (
                                                    <td key={lIdx} className={cn("px-0.5 py-1 text-center", isToday(log.date) && "bg-primary-500/[0.02] dark:bg-primary-500/[0.05]")}>
                                                        <motion.button
                                                            whileHover={!isFutureDay ? { scale: 1.1 } : undefined}
                                                            whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                            onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                            disabled={isFutureDay}
                                                            className={cn(
                                                                "mx-auto h-5 w-5 sm:h-6 sm:w-6 rounded-md flex items-center justify-center transition-all",
                                                                log.completed
                                                                    ? `bg-gradient-to-br ${colors.gradient} ${colors.checkedText} shadow-sm`
                                                                    : "bg-black/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10",
                                                                isFutureDay && "opacity-10 cursor-not-allowed",
                                                                isToday(log.date) && !log.completed && "ring-1 ring-primary-500/30"
                                                            )}
                                                        >
                                                            {log.completed && <Check className={cn("h-3 w-3", colors.checkedText)} strokeWidth={5} />}
                                                            {!log.completed && !isFutureDay && (
                                                                <span className="text-[8px] font-semibold text-black/20 dark:text-white/30">{format(log.date, "d")}</span>
                                                            )}
                                                        </motion.button>
                                                    </td>
                                                );
                                            })}
                                            <td className="px-2 py-1.5 text-center bg-black/[0.02] dark:bg-white/[0.02]">
                                                <span className={cn(
                                                    "text-[10px] font-semibold",
                                                    completionRate >= 80 ? "text-green-500" : completionRate >= 50 ? "text-yellow-500" : "text-red-400"
                                                )}>{completionRate}%</span>
                                            </td>
                                            <td className="px-1 py-1.5">
                                                <div className="relative">
                                                    <button onClick={() => setMenuOpenFor(menuOpenFor === habit._id ? null : habit._id)} className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <MoreVertical className="h-3.5 w-3.5 text-black/40 dark:text-white/40" />
                                                    </button>
                                                    <AnimatePresence>
                                                        {menuOpenFor === habit._id && (
                                                            <>
                                                                <div className="fixed inset-0 z-10" onClick={() => setMenuOpenFor(null)} />
                                                                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="absolute right-0 top-full z-20 mt-1 w-32 bg-white dark:bg-surface-900 border border-black/10 dark:border-white/10 rounded-lg shadow-xl p-1">
                                                                    <button onClick={() => { setEditingHabit(habit); setShowForm(true); setMenuOpenFor(null); }} className="flex w-full items-center gap-2 px-2 py-1.5 text-[10px] font-semibold hover:bg-black/5 dark:hover:bg-white/5 rounded"><Edit2 className="h-3 w-3" /> Edit</button>
                                                                    <button onClick={() => { setDeletingHabit(habit); setMenuOpenFor(null); }} className="flex w-full items-center gap-2 px-2 py-1.5 text-[10px] font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded"><Trash2 className="h-3 w-3" /> Delete</button>
                                                                </motion.div>
                                                            </>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan={displayDays.length + 3} className="py-12 text-center text-[11px] font-semibold text-black/40 dark:text-white/40 uppercase">No habits found for this category</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Summary Row - Compact */}
            <div className="mt-2 flex items-center justify-between px-1">
                <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <span className="text-[10px] font-semibold text-black/40 dark:text-white/40 uppercase">Success {" > "} 80%</span>
                    </div>
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-black/30 dark:text-white/30">Momentum Tracking Active</span>
            </div>

            {/* Modals */}
            <Modal isOpen={showForm} onClose={() => { setShowForm(false); setEditingHabit(null); }} title={editingHabit ? "Edit Habit" : "New Habit"} size="sm">
                <HabitForm habit={editingHabit || undefined} onSubmit={handleSubmit} onCancel={() => { setShowForm(false); setEditingHabit(null); }} />
            </Modal>

            <Modal isOpen={!!deletingHabit} onClose={() => setDeletingHabit(null)} title="Delete Habit" size="sm">
                <div className="text-center p-2">
                    <p className="text-sm font-semibold text-black dark:text-white mb-4">Delete "{deletingHabit?.title}"?</p>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => setDeletingHabit(null)} className="flex-1 h-8 text-[10px] uppercase font-semibold">Cancel</Button>
                        <Button variant="danger" onClick={handleDelete} className="flex-1 h-8 text-[10px] uppercase font-semibold">Delete</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
