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
    X,
    MoreVertical,
    Edit2,
    Trash2,
    Loader2,
    CalendarDays,
    Calendar,
    Settings,
    Activity,
    CheckCircle2,
    Target,
    TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useHabits } from "@/hooks/useHabits";
import { HabitWithLog, Habit, habitColors, HabitType } from "@/types";
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

    // Filter habits by active type - strict comparison
    const filteredHabits = useMemo(() => {
        return habits.filter((h) => {
            const habitType = h.habitType || "weekly";
            return habitType === activeType;
        });
    }, [habits, activeType]);

    // Count habits by type
    const habitCounts = useMemo(() => {
        return {
            weekly: habits.filter((h) => (h.habitType || "weekly") === "weekly").length,
            monthly: habits.filter((h) => h.habitType === "monthly").length,
            custom: habits.filter((h) => h.habitType === "custom").length,
        };
    }, [habits]);

    // Calculate date range based on active type
    const dateRange = useMemo(() => {
        switch (activeType) {
            case "weekly":
                return {
                    start: startOfWeek(currentDate, { weekStartsOn: 0 }),
                    end: endOfWeek(currentDate, { weekStartsOn: 0 }),
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
                    start: startOfWeek(currentDate, { weekStartsOn: 0 }),
                    end: endOfWeek(currentDate, { weekStartsOn: 0 }),
                };
        }
    }, [activeType, currentDate]);

    // Generate array of dates - always in chronological order (left to right)
    const days = useMemo(() => {
        return eachDayOfInterval({ start: dateRange.start, end: dateRange.end });
    }, [dateRange]);

    // Display days - for custom view we show most recent first, otherwise left to right
    const displayDays = useMemo(() => {
        // Only reverse for custom type (showing recent dates first)
        if (activeType === "custom") {
            return [...days].reverse();
        }
        // For weekly and monthly, keep chronological order (left to right)
        return days;
    }, [days, activeType]);

    // Fetch habits on mount
    useEffect(() => {
        fetchHabits().finally(() => setIsLoading(false));
    }, [fetchHabits]);

    // Fetch logs when date range or filtered habits change
    const fetchLogs = useCallback(async (
        habitsToFetch: HabitWithLog[],
        type: HabitType
    ) => {
        const currentFetchId = ++fetchIdRef.current;

        if (habitsToFetch.length === 0) {
            setHabitsData([]);
            return;
        }

        setIsLoadingLogs(true);
        try {
            // Determine the range to fetch from API
            let fetchStart = dateRange.start;
            let fetchEnd = dateRange.end;

            if (type === "custom") {
                const starts = habitsToFetch.map((h) => new Date(h.startDate).getTime());
                const ends = habitsToFetch.map((h) => h.endDate ? new Date(h.endDate).getTime() : new Date(h.startDate).getTime());
                if (starts.length > 0) {
                    fetchStart = new Date(Math.min(...starts));
                    fetchEnd = new Date(Math.max(...ends));
                }
            }

            const response = await fetch(
                `/api/logs?startDate=${fetchStart.toISOString()}&endDate=${fetchEnd.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            // Check if this fetch is still relevant
            if (currentFetchId !== fetchIdRef.current) {
                return;
            }

            const habitsWithData: HabitData[] = habitsToFetch.map((habit) => {
                const habitDays = type === "custom"
                    ? eachDayOfInterval({
                        start: new Date(habit.startDate),
                        end: new Date(habit.endDate || habit.startDate)
                    })
                    : days;

                const habitLogs: DayLog[] = habitDays.map((day) => {
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
                const validDays = habitLogs.filter(
                    (l) => !isFuture(l.date) || isToday(l.date)
                ).length;
                const completionRate =
                    validDays > 0 ? Math.round((completedCount / validDays) * 100) : 0;

                return { habit, logs: habitLogs, completionRate };
            });

            if (currentFetchId === fetchIdRef.current) {
                setHabitsData(habitsWithData);
            }
        } catch (error) {
            console.error("Failed to fetch logs:", error);
            if (currentFetchId === fetchIdRef.current) {
                toast.error("Failed to load habit data");
            }
        } finally {
            if (currentFetchId === fetchIdRef.current) {
                setIsLoadingLogs(false);
            }
        }
    }, [fetchHabits]);

    // Effect to trigger log fetching
    useEffect(() => {
        fetchLogs(filteredHabits, activeType);
    }, [filteredHabits, activeType, fetchLogs]);

    // Memoized custom groups for special layout
    const customHabitGroups = useMemo(() => {
        if (activeType !== "custom") return [];

        const groups: Record<string, HabitData[]> = {};
        habitsData.forEach((hd) => {
            const key = `${format(new Date(hd.habit.startDate), "yyyy-MM-dd")}_${hd.habit.endDate ? format(new Date(hd.habit.endDate), "yyyy-MM-dd") : "none"}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(hd);
        });

        return Object.entries(groups).map(([key, habits]) => ({
            key,
            startDate: new Date(habits[0].habit.startDate),
            endDate: habits[0].habit.endDate ? new Date(habits[0].habit.endDate) : new Date(habits[0].habit.startDate),
            habits,
            days: eachDayOfInterval({
                start: new Date(habits[0].habit.startDate),
                end: habits[0].habit.endDate ? new Date(habits[0].habit.endDate) : new Date(habits[0].habit.startDate)
            })
        })).sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    }, [habitsData, activeType]);
    // Navigation handlers
    const goToPrevious = () => {
        switch (activeType) {
            case "weekly":
                setCurrentDate(subWeeks(currentDate, 1));
                break;
            case "monthly":
                setCurrentDate(subMonths(currentDate, 1));
                break;
            case "custom":
                setCurrentDate(subDays(currentDate, 14));
                break;
        }
    };

    const goToNext = () => {
        switch (activeType) {
            case "weekly":
                setCurrentDate(addWeeks(currentDate, 1));
                break;
            case "monthly":
                setCurrentDate(addMonths(currentDate, 1));
                break;
            case "custom":
                const nextDate = addDays(currentDate, 14);
                if (nextDate <= new Date()) {
                    setCurrentDate(nextDate);
                }
                break;
        }
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Toggle habit completion
    const handleToggle = async (
        habitId: string,
        date: Date,
        currentCompleted: boolean
    ) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark future dates");
            return;
        }

        // Optimistic update
        setHabitsData((prev) =>
            prev.map((hd) => {
                if (hd.habit._id === habitId) {
                    const newLogs = hd.logs.map((log) =>
                        isSameDay(log.date, date)
                            ? { ...log, completed: !currentCompleted }
                            : log
                    );
                    const completedCount = newLogs.filter((l) => l.completed).length;
                    const validDays = newLogs.filter(
                        (l) => !isFuture(l.date) || isToday(l.date)
                    ).length;
                    return {
                        ...hd,
                        logs: newLogs,
                        completionRate:
                            validDays > 0
                                ? Math.round((completedCount / validDays) * 100)
                                : 0,
                    };
                }
                return hd;
            })
        );

        try {
            const response = await fetch(`/api/habits/${habitId}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    completed: !currentCompleted,
                    date: format(date, "yyyy-MM-dd"),
                }),
            });

            if (!response.ok) throw new Error("Failed to update");



            fetchHabits();
        } catch (error) {
            fetchLogs(filteredHabits, activeType);
            toast.error("Failed to update habit");
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

    // Get title based on active type
    const getTitle = () => {
        switch (activeType) {
            case "weekly":
                return `${format(dateRange.start, "MMM d")} - ${format(dateRange.end, "MMM d, yyyy")}`;
            case "monthly":
                return format(currentDate, "MMMM yyyy");
            case "custom":
                return `${format(dateRange.start, "MMM d")} - ${format(dateRange.end, "MMM d, yyyy")}`;
            default:
                return format(currentDate, "MMMM d, yyyy");
        }
    };

    // Calculate column width based on number of days
    const getColumnWidth = () => {
        if (days.length <= 7) return "w-12";
        if (days.length <= 14) return "w-10";
        return "w-8";
    };

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className="page-container">

            {/* Habit Type Tabs - Mobile Optimized */}
            <div className="mb-4 sm:mb-6">
                <div className="flex items-center gap-1 rounded-xl border border-black/10 bg-white p-1 dark:border-white/10 dark:bg-white/5 overflow-x-auto">
                    {habitTypeTabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => {
                                setActiveType(tab.value);
                                setCurrentDate(new Date());
                            }}
                            className={cn(
                                "relative flex items-center gap-1.5 sm:gap-2 rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap flex-1 sm:flex-none justify-center",
                                activeType === tab.value
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "text-black/70 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                            )}
                        >
                            <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span>{tab.label}</span>
                            {habitCounts[tab.value] > 0 && (
                                <span
                                    className={cn(
                                        "rounded-full px-1.5 sm:px-2 py-0.5 text-[9px] sm:text-[10px] font-bold",
                                        activeType === tab.value
                                            ? "bg-white/20 dark:bg-black/20"
                                            : "bg-black/10 dark:bg-white/10"
                                    )}
                                >
                                    {habitCounts[tab.value]}
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Date Navigation - Mobile Optimized */}
            <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-3">
                    <button
                        onClick={goToPrevious}
                        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-black/15 text-black transition hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>

                    <div className="flex-1 sm:flex-none sm:min-w-[200px] text-center">
                        <span className="text-sm sm:text-lg font-bold text-black dark:text-white">
                            {getTitle()}
                        </span>
                    </div>

                    <button
                        onClick={goToNext}
                        className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-black/15 text-black transition hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-2">
                    <button
                        onClick={goToToday}
                        className="rounded-xl bg-black px-3 sm:px-4 py-2 sm:py-2.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                    >
                        Today
                    </button>
                    <span className="text-xs sm:text-sm font-bold text-black/40 dark:text-white/40">
                        {days.length} days
                    </span>
                </div>
            </div>

            {/* Habit Display */}
            {filteredHabits.length > 0 ? (
                <>
                    {activeType === "custom" ? (
                        <div className="space-y-12">
                            {customHabitGroups.map((group) => (
                                <div key={group.key} className="space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-[#4D7CFE]" />
                                            <h3 className="font-black uppercase tracking-widest text-[11px] text-black/50 dark:text-white/40">
                                                {format(group.startDate, "MMM d")} - {format(group.endDate, "MMM d, yyyy")}
                                            </h3>
                                        </div>
                                        <span className="text-[10px] font-bold text-[#4D7CFE] bg-[#4D7CFE]/10 px-2 py-0.5 rounded-full">
                                            {group.days.length} Days
                                        </span>
                                    </div>

                                    {/* Mobile View for this group */}
                                    <div className="block md:hidden card overflow-hidden">
                                        {isLoadingLogs ? (
                                            <PageLoader fullScreen={false} className="py-20 bg-transparent dark:bg-transparent" />
                                        ) : (
                                            <div className="overflow-x-auto scrollbar-hide">
                                                <div className="min-w-max">
                                                    <div className="flex border-b border-black/5 bg-black/[0.02] dark:border-white/5 dark:bg-white/[0.02] py-4">
                                                        <div className="w-[110px] sticky left-0 z-20 bg-white dark:bg-surface-900 px-4 flex items-end pb-1">
                                                            <span className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">Habits</span>
                                                        </div>
                                                        <div className="flex">
                                                            {group.days.map((day) => (
                                                                <div key={day.toISOString()} className="w-12 flex flex-col items-center flex-shrink-0">
                                                                    <span className="text-[9px] font-black text-black/30 dark:text-white/30 uppercase tracking-tighter">
                                                                        {format(day, "EEE")}
                                                                    </span>
                                                                    <span className={cn(
                                                                        "text-[13px] font-black mt-1 flex items-center justify-center w-7 h-7 rounded-full transition-colors",
                                                                        isToday(day)
                                                                            ? "bg-black text-white shadow-lg shadow-black/20 dark:bg-white dark:text-black"
                                                                            : "text-black/40 dark:text-white/40"
                                                                    )}>
                                                                        {format(day, "d")}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="divide-y divide-black/5 dark:divide-white/5 pb-2">
                                                        {group.habits.map(({ habit, logs, completionRate }) => {
                                                            const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;
                                                            return (
                                                                <div key={habit._id} className="flex items-center group">
                                                                    <div
                                                                        onClick={() => {
                                                                            setEditingHabit(habit);
                                                                            setShowForm(true);
                                                                        }}
                                                                        className="w-[110px] sticky left-0 z-20 bg-white dark:bg-surface-900 p-3 border-r border-black/5 dark:border-white/5 flex items-center cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                                                    >
                                                                        <div className="min-w-0 flex-1">
                                                                            <p className="text-[11px] font-black text-black dark:text-white truncate leading-tight uppercase tracking-tight">
                                                                                {habit.title}
                                                                            </p>
                                                                            <p className={cn("text-[9px] font-bold mt-0.5",
                                                                                completionRate >= 80 ? "text-green-500" :
                                                                                    completionRate >= 50 ? "text-yellow-500" : "text-red-500"
                                                                            )}>
                                                                                {completionRate}%
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex">
                                                                        {logs.map((log, logIdx) => {
                                                                            const isFutureDay = isFuture(log.date) && !isToday(log.date);
                                                                            const isTodayDate = isToday(log.date);
                                                                            return (
                                                                                <div key={logIdx} className="w-12 flex justify-center p-2">
                                                                                    <motion.button
                                                                                        whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                                                        onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                                                        disabled={isFutureDay}
                                                                                        className={cn(
                                                                                            "flex h-8 w-8 items-center justify-center rounded-lg transition-all shadow-sm",
                                                                                            log.completed
                                                                                                ? `bg-gradient-to-br ${colors.gradient} ${colors.checkedText}`
                                                                                                : "bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5",
                                                                                            isFutureDay && "opacity-20 cursor-not-allowed",
                                                                                            isTodayDate && !log.completed && "ring-2 ring-[#4D7CFE]/20"
                                                                                        )}
                                                                                    >
                                                                                        {log.completed ? (
                                                                                            <Check className={cn("h-4 w-4", colors.checkedText)} strokeWidth={4} />
                                                                                        ) : (
                                                                                            <span className="text-[9px] font-black text-black/40 dark:text-white/20">
                                                                                                {format(log.date, "d")}
                                                                                            </span>
                                                                                        )}
                                                                                    </motion.button>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Desktop View for this group */}
                                    <div className="hidden md:block card overflow-visible">
                                        {isLoadingLogs ? (
                                            <div className="flex items-center justify-center py-16">
                                                <Loader2 className="h-8 w-8 animate-spin text-black/30 dark:text-white/30" />
                                            </div>
                                        ) : (
                                            <div className="overflow-x-auto habit-matrix-scroll">
                                                <table className="w-full min-w-[600px]">
                                                    <thead>
                                                        <tr className="border-b border-black/10 dark:border-white/10">
                                                            <th className="sticky left-0 z-10 bg-white px-4 py-4 text-left dark:bg-surface-900">
                                                                <span className="text-xs font-black uppercase tracking-widest text-black/30 dark:text-white/30">Habit</span>
                                                            </th>
                                                            {group.days.map((day) => (
                                                                <th key={day.toISOString()} className="px-1 py-3 text-center min-w-[40px]">
                                                                    <div className="flex flex-col items-center">
                                                                        <span className="text-[10px] font-black uppercase tracking-widest text-black/30 dark:text-white/30">{format(day, "EEE")}</span>
                                                                        <span className={cn(
                                                                            "mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold",
                                                                            isToday(day) ? "bg-black text-white dark:bg-white dark:text-black" : "text-black/40 dark:text-white/40"
                                                                        )}>{format(day, "d")}</span>
                                                                    </div>
                                                                </th>
                                                            ))}
                                                            <th className="px-4 py-4 text-center">
                                                                <div className="flex items-center justify-center gap-1.5">
                                                                    <TrendingUp className="h-3 w-3 text-purple-500" />
                                                                    <span className="text-xs font-black uppercase tracking-widest text-black/30 dark:text-white/30">Rate</span>
                                                                </div>
                                                            </th>
                                                            <th className="w-12 px-2 py-4" />
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {group.habits.map(({ habit, logs, completionRate }, rowIndex) => {
                                                            const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;
                                                            return (
                                                                <motion.tr
                                                                    key={habit._id}
                                                                    initial={{ opacity: 0, y: 10 }}
                                                                    animate={{ opacity: 1, y: 0 }}
                                                                    transition={{ delay: rowIndex * 0.03 }}
                                                                    className="group border-b border-black/5 last:border-0 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                                                >
                                                                    <td className="sticky left-0 z-10 bg-white px-4 py-3 dark:bg-surface-900 group-hover:bg-gray-50 dark:group-hover:bg-surface-800/50">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="relative h-10 w-10 flex-shrink-0">
                                                                                <svg className="h-10 w-10 -rotate-90 transform" viewBox="0 0 36 36">
                                                                                    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-black/10 dark:text-white/10" />
                                                                                    <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${completionRate} 100`} strokeLinecap="round" className={colors.text} />
                                                                                </svg>
                                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                                    <span className={cn("text-[10px] font-bold", colors.text)}>{completionRate}%</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="min-w-0 flex-1">
                                                                                <p className="truncate font-semibold text-black dark:text-white">{habit.title}</p>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    {logs.map((log, index) => {
                                                                        const isFutureDay = isFuture(log.date) && !isToday(log.date);
                                                                        const isTodayDate = isToday(log.date);
                                                                        return (
                                                                            <td key={index} className="px-1 py-3 text-center">
                                                                                <motion.button
                                                                                    whileHover={!isFutureDay ? { scale: 1.15 } : undefined}
                                                                                    whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                                                    onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                                                    disabled={isFutureDay}
                                                                                    className={cn(
                                                                                        "mx-auto flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                                                                                        log.completed
                                                                                            ? `bg-gradient-to-br ${colors.gradient} ${colors.checkedText} shadow-md`
                                                                                            : "bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5",
                                                                                        isFutureDay && "cursor-not-allowed opacity-10",
                                                                                        isTodayDate && !log.completed && "ring-2 ring-black/10 dark:ring-white/10"
                                                                                    )}
                                                                                >
                                                                                    <div className="relative">
                                                                                        <span className={cn("text-xs font-black transition-colors duration-200", log.completed ? colors.checkedText : "text-black/40 dark:text-white/20")}>
                                                                                            {format(log.date, "d")}
                                                                                        </span>
                                                                                        {log.completed && <Check className={cn("absolute -top-1.5 -right-1.5 h-3 w-3", colors.checkedText)} strokeWidth={4} />}
                                                                                    </div>
                                                                                </motion.button>
                                                                            </td>
                                                                        );
                                                                    })}
                                                                    <td className="px-4 py-3 text-center">
                                                                        <span className={cn(
                                                                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
                                                                            completionRate >= 80 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                                                                                completionRate >= 50 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                                                                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                                        )}>{completionRate}%</span>
                                                                    </td>
                                                                    <td className="px-2 py-3">
                                                                        <div className="relative">
                                                                            <button
                                                                                onClick={() => setMenuOpenFor(menuOpenFor === habit._id ? null : habit._id)}
                                                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 opacity-0 transition-all hover:bg-black/5 hover:text-black/60 group-hover:opacity-100 dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white/60"
                                                                            >
                                                                                <MoreVertical className="h-4 w-4" />
                                                                            </button>
                                                                            <AnimatePresence>
                                                                                {menuOpenFor === habit._id && (
                                                                                    <>
                                                                                        <div className="fixed inset-0 z-10" onClick={() => setMenuOpenFor(null)} />
                                                                                        <motion.div
                                                                                            initial={{ opacity: 0, scale: 0.95, y: 8 }}
                                                                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                                                            className="absolute right-0 bottom-full z-20 mb-1 w-36 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-surface-900"
                                                                                        >
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    setMenuOpenFor(null);
                                                                                                    setEditingHabit(habit);
                                                                                                    setShowForm(true);
                                                                                                }}
                                                                                                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-black/5 dark:hover:bg-white/5"
                                                                                            >
                                                                                                <Edit2 className="h-4 w-4" /> Edit
                                                                                            </button>
                                                                                            <button
                                                                                                onClick={() => {
                                                                                                    setMenuOpenFor(null);
                                                                                                    setDeletingHabit(habit);
                                                                                                }}
                                                                                                className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                                            >
                                                                                                <Trash2 className="h-4 w-4" /> Delete
                                                                                            </button>
                                                                                        </motion.div>
                                                                                    </>
                                                                                )}
                                                                            </AnimatePresence>
                                                                        </div>
                                                                    </td>
                                                                </motion.tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {/* Mobile Matrix View - Consolidated Chronological Table */}
                            <div className="block md:hidden card overflow-hidden">
                                {isLoadingLogs ? (
                                    <PageLoader fullScreen={false} className="py-20 bg-transparent dark:bg-transparent" />
                                ) : (
                                    <div className="overflow-x-auto scrollbar-hide">
                                        <div className="min-w-max">
                                            {/* Date Header Row */}
                                            <div className="flex border-b border-black/5 bg-black/[0.02] dark:border-white/5 dark:bg-white/[0.02] py-4">
                                                <div className="w-[110px] sticky left-0 z-20 bg-white dark:bg-surface-900 px-4 flex items-end pb-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">Habits</span>
                                                </div>
                                                <div className="flex">
                                                    {days.map((day) => (
                                                        <div key={day.toISOString()} className="w-12 flex flex-col items-center flex-shrink-0">
                                                            <span className="text-[9px] font-black text-black/30 dark:text-white/30 uppercase tracking-tighter">
                                                                {format(day, "EEE")}
                                                            </span>
                                                            <span className={cn(
                                                                "text-[13px] font-black mt-1 flex items-center justify-center w-7 h-7 rounded-full transition-colors",
                                                                isToday(day)
                                                                    ? "bg-black text-white shadow-lg shadow-black/20 dark:bg-white dark:text-black"
                                                                    : "text-black/40 dark:text-white/40"
                                                            )}>
                                                                {format(day, "d")}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Habit Rows */}
                                            <div className="divide-y divide-black/5 dark:divide-white/5 pb-2">
                                                {habitsData.map(({ habit, logs, completionRate }) => {
                                                    const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;

                                                    return (
                                                        <div key={habit._id} className="flex items-center group">
                                                            {/* Sticky Habit Label */}
                                                            <div
                                                                onClick={() => {
                                                                    setEditingHabit(habit);
                                                                    setShowForm(true);
                                                                }}
                                                                className="w-[110px] sticky left-0 z-20 bg-white dark:bg-surface-900 p-3 border-r border-black/5 dark:border-white/5 flex items-center cursor-pointer hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                                                            >
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="text-[11px] font-black text-black dark:text-white truncate leading-tight uppercase tracking-tight">
                                                                        {habit.title}
                                                                    </p>
                                                                    <p className={cn("text-[9px] font-bold mt-0.5",
                                                                        completionRate >= 80 ? "text-green-500" :
                                                                            completionRate >= 50 ? "text-yellow-500" : "text-red-500"
                                                                    )}>
                                                                        {completionRate}%
                                                                    </p>
                                                                </div>
                                                            </div>

                                                            {/* Toggle Buttons Grid */}
                                                            <div className="flex">
                                                                {logs.map((log, logIdx) => {
                                                                    const isFutureDay = isFuture(log.date) && !isToday(log.date);
                                                                    const isTodayDate = isToday(log.date);

                                                                    return (
                                                                        <div key={logIdx} className="w-12 flex justify-center p-2">
                                                                            <motion.button
                                                                                whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                                                onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                                                disabled={isFutureDay}
                                                                                className={cn(
                                                                                    "flex h-8 w-8 items-center justify-center rounded-lg transition-all shadow-sm",
                                                                                    log.completed
                                                                                        ? `bg-gradient-to-br ${colors.gradient} ${colors.checkedText}`
                                                                                        : "bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5",
                                                                                    isFutureDay && "opacity-20 cursor-not-allowed",
                                                                                    isTodayDate && !log.completed && "ring-2 ring-[#4D7CFE]/20"
                                                                                )}
                                                                            >
                                                                                {log.completed ? (
                                                                                    <Check className={cn("h-4 w-4", colors.checkedText)} strokeWidth={4} />
                                                                                ) : (
                                                                                    <span className="text-[9px] font-black text-black/40 dark:text-white/20">
                                                                                        {format(log.date, "d")}
                                                                                    </span>
                                                                                )}
                                                                            </motion.button>
                                                                        </div>
                                                                    );
                                                                })}
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block card overflow-visible">
                                {isLoadingLogs ? (
                                    <div className="flex items-center justify-center py-16">
                                        <Loader2 className="h-8 w-8 animate-spin text-black/30 dark:text-white/30" />
                                    </div>
                                ) : (
                                    <div className="overflow-x-auto habit-matrix-scroll">
                                        <table className="w-full min-w-[600px]">
                                            <thead>
                                                <tr className="border-b border-black/10 dark:border-white/10">
                                                    <th className="sticky left-0 z-10 bg-white px-4 py-4 text-left dark:bg-surface-900">
                                                        <span className="text-xs font-black uppercase tracking-widest text-black/30 dark:text-white/30">
                                                            Habit
                                                        </span>
                                                    </th>
                                                    {displayDays.map((day) => (
                                                        <th key={day.toISOString()} className={cn("px-1 py-3 text-center", getColumnWidth())}>
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-[10px] font-black uppercase tracking-widest text-black/30 dark:text-white/30">
                                                                    {format(day, "EEE")}
                                                                </span>
                                                                <span
                                                                    className={cn(
                                                                        "mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold",
                                                                        isToday(day)
                                                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                                                            : "text-black/40 dark:text-white/40"
                                                                    )}
                                                                >
                                                                    {format(day, "d")}
                                                                </span>
                                                            </div>
                                                        </th>
                                                    ))}
                                                    <th className="px-4 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-1.5">
                                                            <TrendingUp className="h-3 w-3 text-purple-500" />
                                                            <span className="text-xs font-black uppercase tracking-widest text-black/30 dark:text-white/30">
                                                                Rate
                                                            </span>
                                                        </div>
                                                    </th>
                                                    <th className="w-12 px-2 py-4" />
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {habitsData.map(({ habit, logs, completionRate }, rowIndex) => {
                                                    const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;

                                                    return (
                                                        <motion.tr
                                                            key={habit._id}
                                                            initial={{ opacity: 0, y: 10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            transition={{ delay: rowIndex * 0.03 }}
                                                            className="group border-b border-black/5 last:border-0 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                                        >
                                                            <td className="sticky left-0 z-10 bg-white px-4 py-3 dark:bg-surface-900 group-hover:bg-gray-50 dark:group-hover:bg-surface-800/50">
                                                                <div className="flex items-center gap-3">
                                                                    <div className="relative h-10 w-10 flex-shrink-0">
                                                                        <svg className="h-10 w-10 -rotate-90 transform" viewBox="0 0 36 36">
                                                                            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" className="text-black/10 dark:text-white/10" />
                                                                            <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${completionRate} 100`} strokeLinecap="round" className={colors.text} />
                                                                        </svg>
                                                                        <div className="absolute inset-0 flex items-center justify-center">
                                                                            <span className={cn("text-[10px] font-bold", colors.text)}>
                                                                                {completionRate}%
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="min-w-0 flex-1">
                                                                        <p className="truncate font-semibold text-black dark:text-white">{habit.title}</p>
                                                                        {habit.customPeriodDays && (
                                                                            <span className="text-[10px] text-black/40 dark:text-white/40">
                                                                                {habit.customPeriodDays}d period
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {logs.map((log, index) => {
                                                                const isFutureDay = isFuture(log.date) && !isToday(log.date);
                                                                const isTodayDate = isToday(log.date);

                                                                return (
                                                                    <td key={index} className={cn("px-1 py-3 text-center", getColumnWidth())}>
                                                                        <motion.button
                                                                            whileHover={!isFutureDay ? { scale: 1.15 } : undefined}
                                                                            whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                                            onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                                            disabled={isFutureDay}
                                                                            className={cn(
                                                                                "mx-auto flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                                                                                log.completed
                                                                                    ? `bg-gradient-to-br ${colors.gradient} ${colors.checkedText} shadow-md`
                                                                                    : "bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5",
                                                                                isFutureDay && "cursor-not-allowed opacity-10",
                                                                                isTodayDate && !log.completed && "ring-2 ring-black/10 dark:ring-white/10"
                                                                            )}
                                                                        >
                                                                            <div className="relative">
                                                                                <span className={cn("text-xs font-black transition-colors duration-200", log.completed ? colors.checkedText : "text-black/40 dark:text-white/20")}>
                                                                                    {format(log.date, "d")}
                                                                                </span>
                                                                                {log.completed && (
                                                                                    <Check className={cn("absolute -top-1.5 -right-1.5 h-3 w-3", colors.checkedText)} strokeWidth={4} />
                                                                                )}
                                                                            </div>
                                                                        </motion.button>
                                                                    </td>
                                                                );
                                                            })}
                                                            <td className="px-4 py-3 text-center">
                                                                <span
                                                                    className={cn(
                                                                        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
                                                                        completionRate >= 80
                                                                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                                            : completionRate >= 50
                                                                                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                                                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                                    )}
                                                                >
                                                                    {completionRate}%
                                                                </span>
                                                            </td>
                                                            <td className="px-2 py-3">
                                                                <div className="relative">
                                                                    <button
                                                                        onClick={() => setMenuOpenFor(menuOpenFor === habit._id ? null : habit._id)}
                                                                        className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 opacity-0 transition-all hover:bg-black/5 hover:text-black/60 group-hover:opacity-100 dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white/60"
                                                                    >
                                                                        <MoreVertical className="h-4 w-4" />
                                                                    </button>
                                                                    <AnimatePresence>
                                                                        {menuOpenFor === habit._id && (
                                                                            <>
                                                                                <div className="fixed inset-0 z-10" onClick={() => setMenuOpenFor(null)} />
                                                                                <motion.div
                                                                                    initial={{ opacity: 0, scale: 0.95, y: 8 }}
                                                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                                    exit={{ opacity: 0, scale: 0.95 }}
                                                                                    className="absolute right-0 bottom-full z-20 mb-1 w-36 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-surface-900"
                                                                                >
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            setMenuOpenFor(null);
                                                                                            setEditingHabit(habit);
                                                                                            setShowForm(true);
                                                                                        }}
                                                                                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-black/5 dark:hover:bg-white/5"
                                                                                    >
                                                                                        <Edit2 className="h-4 w-4" />
                                                                                        Edit
                                                                                    </button>
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            setMenuOpenFor(null);
                                                                                            setDeletingHabit(habit);
                                                                                        }}
                                                                                        className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                                    >
                                                                                        <Trash2 className="h-4 w-4" />
                                                                                        Delete
                                                                                    </button>
                                                                                </motion.div>
                                                                            </>
                                                                        )}
                                                                    </AnimatePresence>
                                                                </div>
                                                            </td>
                                                        </motion.tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 border-t border-black/10 px-4 py-4 mt-6 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-green-500 to-green-600 text-white shadow-sm">
                                <Check className="h-3 w-3" strokeWidth={4} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">Completed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded-md border-2 border-dashed border-black/10 dark:border-white/10">
                                <X className="h-3 w-3 text-black/20 dark:text-white/20" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">Missed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-6 w-6 rounded-md bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">Future</span>
                        </div>
                    </div>

                    {/* Summary Stats - Mobile Optimized */}
                    <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                        <div className="card p-3 sm:p-4 group hover:border-blue-500/30 transition-colors">
                            <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                                <Activity className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-blue-500" />
                                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/60 dark:text-white/40">Habits</p>
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-black dark:text-white">{habitsData.length}</p>
                        </div>
                        <div className="card p-3 sm:p-4 group hover:border-success-500/30 transition-colors">
                            <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                                <CheckCircle2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-success-500" />
                                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/60 dark:text-white/40">Done</p>
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-black dark:text-white">
                                {habitsData.reduce((acc, hd) => acc + hd.logs.filter((l) => l.completed).length, 0)}
                            </p>
                        </div>
                        <div className="card p-3 sm:p-4 group hover:border-purple-500/30 transition-colors">
                            <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                                <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-purple-500" />
                                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/60 dark:text-white/40">Avg Rate</p>
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-black dark:text-white">
                                {habitsData.length > 0
                                    ? Math.round(habitsData.reduce((acc, hd) => acc + hd.completionRate, 0) / habitsData.length)
                                    : 0}%
                            </p>
                        </div>
                        <div className="card p-3 sm:p-4 group hover:border-[#4D7CFE]/30 transition-colors">
                            <div className="flex items-center gap-1.5 mb-1 sm:mb-2">
                                <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#4D7CFE]" />
                                <p className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black/60 dark:text-white/40">Tracked</p>
                            </div>
                            <p className="text-xl sm:text-2xl font-black text-black dark:text-white">
                                {activeType === "custom"
                                    ? customHabitGroups.reduce((acc, g) => acc + g.days.length, 0)
                                    : days.length}
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card py-12 sm:py-16 text-center"
                >
                    <div className="mx-auto mb-4 flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 shadow-inner">
                        {activeType === "weekly" && <CalendarDays className="h-8 w-8 sm:h-10 sm:w-10 text-black/60 dark:text-white/40" />}
                        {activeType === "monthly" && <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-black/60 dark:text-white/40" />}
                        {activeType === "custom" && <Settings className="h-8 w-8 sm:h-10 sm:w-10 text-black/60 dark:text-white/40" />}
                    </div>
                    <h3 className="mb-2 text-lg sm:text-xl font-bold text-black dark:text-white">
                        No {activeType} habits yet
                    </h3>
                    <p className="mx-auto mb-6 max-w-sm text-sm text-black/60 dark:text-white/60 px-4">
                        Create a {activeType} habit to track your progress over{" "}
                        {activeType === "weekly" ? "7" : activeType === "monthly" ? "30" : "custom"} days.
                    </p>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-5 w-5" />
                        Create {activeType.charAt(0).toUpperCase() + activeType.slice(1)} Habit
                    </Button>
                </motion.div>
            )}

            {/* Habit Form Modal */}
            <Modal
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditingHabit(null);
                }}
                title={editingHabit ? "Edit Habit" : "Create Habit"}
                size="lg"
            >
                <HabitForm
                    habit={editingHabit || undefined}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingHabit(null);
                    }}
                    defaultHabitType={activeType}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deletingHabit}
                onClose={() => setDeletingHabit(null)}
                title="Delete Habit"
                size="sm"
            >
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600">
                        <HabitIcon name={deletingHabit?.icon || "Star"} size={32} />
                    </div>
                    <p className="mb-6 text-black/60 dark:text-white/60">
                        Delete <strong>"{deletingHabit?.title}"</strong>? This will remove
                        all completion history. This cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={() => setDeletingHabit(null)} className="flex-1">
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete} className="flex-1">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* Floating Add Button */}
            <motion.button
                onClick={() => setShowForm(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#4D7CFE] text-white shadow-lg shadow-[#4D7CFE]/30 transition-shadow hover:shadow-xl hover:shadow-[#4D7CFE]/40"
            >
                <Plus className="h-6 w-6" strokeWidth={2.5} />
            </motion.button>
        </div>
    );
}
