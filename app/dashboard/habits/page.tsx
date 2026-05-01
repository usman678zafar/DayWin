"use client";

import React, { useEffect, useState, useMemo, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    format,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameDay,
    isToday,
    isFuture,
    subDays,
} from "date-fns";
import {
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
import { HabitsSkeleton } from "@/components/ui/PageSkeletons";
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
    return (
        <Suspense fallback={<HabitsSkeleton />}>
            <HabitsPageContent />
        </Suspense>
    );
}

function HabitsPageContent() {
    const { habits, fetchHabits, addHabit, updateHabit, deleteHabit } = useHabits();

    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();


    // DERIVED STATE: URL is the single source of truth
    const activeType = (searchParams.get("type") as HabitType) || "weekly";
    const currentDate = useMemo(() => {
        const dateParam = searchParams.get("date");
        if (!dateParam) return new Date();
        const parsed = new Date(dateParam);
        return isNaN(parsed.getTime()) ? new Date() : parsed;
    }, [searchParams]);

    // Navigation handlers
    const updateURL = useCallback((updates: { type?: string; date?: Date }, shouldPush = false) => {
        const params = new URLSearchParams(searchParams.toString());
        if (updates.type) params.set("type", updates.type);
        if (updates.date) params.set("date", format(updates.date, "yyyy-MM-dd"));
        
        const url = `${pathname}?${params.toString()}`;
        if (shouldPush) router.push(url, { scroll: false });
        else router.replace(url, { scroll: false });
    }, [searchParams, pathname, router]);

    const handleTabChange = (type: HabitType) => {
        updateURL({ type }, true);
    };


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
    }, [dateRange, days, habitsData.length]);

    // Grouping logic for high-density matrix
    const groupedHabits = useMemo(() => {
        if (habitsData.length === 0) return [];

        // If Weekly or Monthly, use a single unified table for the period
        if (activeType !== "custom") {
            const label = activeType === "monthly" 
                ? format(currentDate, "MMMM yyyy")
                : `Week: ${format(dateRange.start, "MMM d")} - ${format(dateRange.end, "MMM d")}`;
            
            return [{
                label,
                items: habitsData,
                days: days
            }];
        }

        // Custom tab still uses intelligent cycle-based grouping
        const groups: Record<string, { label: string, items: HabitData[], days: Date[] }> = {};
        habitsData.forEach((hd) => {
            const start = new Date(hd.habit.startDate);
            const end = hd.habit.endDate ? new Date(hd.habit.endDate) : new Date();
            const startStr = format(start, "MMM d");
            const endStr = hd.habit.endDate ? format(end, "MMM d") : "Ongoing";
            const key = `${startStr} - ${endStr}`;
            
            if (!groups[key]) {
                const groupDays = eachDayOfInterval({ start, end });
                groups[key] = { label: key, items: [], days: groupDays };
            }
            groups[key].items.push(hd);
        });
        return Object.values(groups);
    }, [habitsData, activeType, currentDate, dateRange, days]);

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
    if (isLoading) return <HabitsSkeleton />;

    return (
        <div className="page-container">
            {/* Header / Tabs - Mini */}
            <div className="mb-2 flex flex-col sm:flex-row items-center justify-between gap-2">
                <div className="flex items-center gap-0.5 rounded-lg border border-black/10 bg-white p-0.5 dark:border-white/10 dark:bg-white/5">
                    {habitTypeTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => handleTabChange(tab.value)}
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



                <Button onClick={() => setShowForm(true)} className="h-7 px-3 text-[10px] font-semibold uppercase tracking-widest">
                    <Plus className="h-3 w-3 mr-1" /> New Habit
                </Button>
            </div>

            {/* Matrix Sections */}
            <div className="space-y-6">
                {groupedHabits.length > 0 ? (
                    groupedHabits.map((group) => (
                        <div key={group.label} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            {/* Section Header */}
                            <div className="flex items-center gap-3 mb-2.5 px-1">
                                <div className="flex items-center gap-1.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-primary-500 shadow-sm shadow-primary-500/50" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/60 dark:text-white/60">
                                        Cycle: {group.label}
                                    </span>
                                </div>
                                <div className="h-px flex-1 bg-gradient-to-r from-black/10 to-transparent dark:from-white/10 dark:to-transparent" />
                                <span className="text-[9px] font-bold text-black/30 dark:text-white/30 uppercase tracking-widest">
                                    {group.items.length} Active Habits
                                </span>
                            </div>

                            <div className="card overflow-hidden border-black/[0.03] dark:border-white/[0.03] shadow-sm">
                                <div className="overflow-x-auto scrollbar-hide">
                                    <table className="w-full min-w-max border-collapse">
                                        <thead>
                                            <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01]">
                                                <th className="sticky left-0 z-20 bg-white dark:bg-surface-900 px-3 py-2 text-left border-r border-black/5 dark:border-white/5 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                                    <span className="text-[9px] font-bold uppercase tracking-widest text-black/40 dark:text-white/40">Habit</span>
                                                </th>
                                                {group.days.map((day) => {
                                                    const isFutureDay = isFuture(day) && !isToday(day);
                                                    return (
                                                        <th key={day.toISOString()} className={cn(
                                                            "px-1 py-1.5 text-center min-w-[32px] sm:min-w-[40px] transition-colors",
                                                            isToday(day) && "bg-primary-500/5 dark:bg-primary-500/10"
                                                        )}>
                                                            <div className="flex flex-col items-center">
                                                                <span className={cn(
                                                                    "text-[8px] font-bold uppercase leading-none mb-0.5",
                                                                    isFutureDay ? "text-black/15 dark:text-white/15" : "text-black/40 dark:text-white/40"
                                                                )}>
                                                                    {format(day, "EEE")}
                                                                </span>
                                                                <span className={cn(
                                                                    "text-[11px] font-bold",
                                                                    isToday(day) ? "text-primary-600 dark:text-primary-400" : (isFutureDay ? "text-black/15 dark:text-white/15" : "text-black/80 dark:text-white/80")
                                                                )}>
                                                                    {format(day, "d")}
                                                                </span>
                                                            </div>
                                                        </th>
                                                    );
                                                })}
                                                <th className="sticky right-10 z-20 px-3 py-2 text-center bg-surface-50 dark:bg-white/[0.03] border-l border-black/5 dark:border-white/5 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                                    <TrendingUp className="h-3 w-3 mx-auto text-purple-400" />
                                                </th>
                                                <th className="sticky right-0 z-20 w-10 bg-surface-50 dark:bg-white/[0.03] border-l border-black/5 dark:border-white/5" />
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-black/5 dark:divide-white/5">
                                            {group.items.map(({ habit, logs, completionRate }) => {
                                                const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;
                                                return (
                                                    <tr key={habit._id} className="group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                                                        <td className="sticky left-0 z-10 bg-white dark:bg-surface-900 px-3 py-1.5 border-r border-black/5 dark:border-white/5 group-hover:bg-surface-50 dark:group-hover:bg-white/[0.02] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                                            <div className="flex items-center gap-2.5 max-w-[120px] sm:max-w-[180px]">
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
                                                                <span className="truncate text-[11px] font-bold text-black/90 dark:text-white/90">{habit.title}</span>
                                                            </div>
                                                        </td>
                                                        {group.days.map((date, dIdx) => {
                                                            const log = logs.find((l) => isSameDay(new Date(l.date), date));
                                                            const isFutureDay = isFuture(date) && !isToday(date);
                                                            const categoryIcon = habitCategories.find(c => c.value === habit.category)?.icon || "Star";
                                                            const iconToDisplay = habit.icon && habit.icon !== "Star" ? habit.icon : categoryIcon;

                                                            return (
                                                                <td key={dIdx} className={cn("px-0.5 py-1 text-center", isToday(date) && "bg-primary-500/[0.02] dark:bg-primary-500/[0.05]")}>
                                                                    <div className="flex items-center justify-center">
                                                                        {log ? (
                                                                            <motion.button
                                                                                whileHover={!isFutureDay ? { scale: 1.1 } : undefined}
                                                                                whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                                                onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                                                disabled={isFutureDay}
                                                                                className={cn(
                                                                                    "mx-auto h-5 w-5 sm:h-6 sm:w-6 rounded-[5px] flex items-center justify-center transition-all",
                                                                                    log.completed
                                                                                        ? `bg-gradient-to-br ${colors.gradient} ${colors.checkedText} shadow-sm`
                                                                                        : (isFutureDay ? "bg-black/[0.02] dark:bg-white/[0.02] border-none" : "bg-black/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10"),
                                                                                    isToday(date) && !log.completed && "ring-1 ring-primary-500/30"
                                                                                )}
                                                                            >
                                                                                {isFutureDay ? (
                                                                                    <div className="opacity-[0.08] dark:opacity-[0.05] scale-75">
                                                                                        <HabitIcon name={iconToDisplay} size={10} />
                                                                                    </div>
                                                                                ) : log.completed ? (
                                                                                    <Check className={cn("h-3 w-3", colors.checkedText)} strokeWidth={5} />
                                                                                ) : (
                                                                                    <span className="text-[8px] font-bold text-black/20 dark:text-white/30">{format(date, "d")}</span>
                                                                                )}
                                                                            </motion.button>
                                                                        ) : (
                                                                            <div className="h-5 w-5 sm:h-6 sm:w-6 rounded-[5px] bg-black/[0.01] dark:bg-white/[0.01]" />
                                                                        )}
                                                                    </div>
                                                                </td>
                                                            );
                                                        })}
                                                        <td className="sticky right-10 z-10 px-2 py-1.5 text-center bg-white dark:bg-surface-900 group-hover:bg-surface-50 dark:group-hover:bg-white/[0.02] border-l border-black/5 dark:border-white/5 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)] transition-colors">
                                                            <span className={cn(
                                                                "text-[10px] font-bold",
                                                                completionRate >= 80 ? "text-green-500" : completionRate >= 50 ? "text-yellow-500" : "text-red-400"
                                                            )}>{completionRate}%</span>
                                                        </td>
                                                        <td className="sticky right-0 z-10 px-1 py-1.5 align-middle bg-white dark:bg-surface-900 group-hover:bg-surface-50 dark:group-hover:bg-white/[0.02] border-l border-black/5 dark:border-white/5 transition-colors">
                                                            <div className="relative flex justify-center">
                                                                <button 
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        setMenuOpenFor(menuOpenFor === habit._id ? null : habit._id);
                                                                    }} 
                                                                    className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-black/20 hover:text-black/60 dark:text-white/20 dark:hover:text-white/60 transition-all"
                                                                >
                                                                    <MoreVertical className="h-3.5 w-3.5" />
                                                                </button>
                                                                <AnimatePresence>
                                                                    {menuOpenFor === habit._id && (
                                                                        <>
                                                                            <div className="fixed inset-0 z-10" onClick={() => setMenuOpenFor(null)} />
                                                                            <motion.div 
                                                                                initial={{ opacity: 0, scale: 0.95, y: -10 }} 
                                                                                animate={{ opacity: 1, scale: 1, y: 0 }} 
                                                                                exit={{ opacity: 0, scale: 0.95, y: -10 }} 
                                                                                className="absolute right-0 bottom-full z-[100] mb-1 w-32 bg-white dark:bg-surface-900 border border-black/10 dark:border-white/10 rounded-lg shadow-2xl p-1 backdrop-blur-xl"
                                                                            >
                                                                                <button onClick={() => { setEditingHabit(habit); setShowForm(true); setMenuOpenFor(null); }} className="flex w-full items-center gap-2 px-2 py-1.5 text-[10px] font-bold hover:bg-black/5 dark:hover:bg-white/5 rounded"><Edit2 className="h-3 w-3" /> Edit</button>
                                                                                <button onClick={() => { setDeletingHabit(habit); setMenuOpenFor(null); }} className="flex w-full items-center gap-2 px-2 py-1.5 text-[10px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded"><Trash2 className="h-3 w-3" /> Delete</button>
                                                                            </motion.div>
                                                                        </>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="card p-12 text-center">
                        <span className="text-[11px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest">No habits found for this category</span>
                    </div>
                )}
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
                    <p className="text-sm font-semibold text-black dark:text-white mb-4">Delete &quot;{deletingHabit?.title}&quot;?</p>
                    <div className="flex gap-2">
                        <Button variant="secondary" onClick={() => setDeletingHabit(null)} className="flex-1 h-8 text-[10px] uppercase font-semibold">Cancel</Button>
                        <Button variant="danger" onClick={handleDelete} className="flex-1 h-8 text-[10px] uppercase font-semibold">Delete</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
