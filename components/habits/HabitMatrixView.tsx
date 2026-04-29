"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    format,
    eachDayOfInterval,
    isSameDay,
    isToday,
    isFuture,
    differenceInDays,
} from "date-fns";
import {
    Check,
    X,
    Flame,
    MoreVertical,
    Edit2,
    Trash2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface HabitMatrixViewProps {
    habits: HabitWithLog[];
    startDate: Date;
    endDate: Date;
    viewMode: "daily" | "weekly" | "monthly" | "custom";
    onEdit: (habit: HabitWithLog) => void;
    onDelete: (id: string) => Promise<void>;
}

interface DayLog {
    date: Date;
    completed: boolean;
}

interface HabitData {
    habit: HabitWithLog;
    logs: DayLog[];
    completionRate: number;
}

export function HabitMatrixView({
    habits,
    startDate,
    endDate,
    viewMode,
    onEdit,
    onDelete,
}: HabitMatrixViewProps) {
    const [habitsData, setHabitsData] = useState<HabitData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingHabit, setDeletingHabit] = useState<HabitWithLog | null>(null);
    const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Generate array of dates
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // Reverse for display (most recent first) if more than 7 days
    const displayDays = days.length > 7 ? [...days].reverse() : days;

    const fetchLogs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/logs?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const habitsWithData: HabitData[] = habits.map((habit) => {
                const habitLogs: DayLog[] = days.map((day) => {
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

            setHabitsData(habitsWithData);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
            toast.error("Failed to load habit data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, [startDate, endDate, habits, fetchLogs]);

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

            if (!currentCompleted) {
                toast.success("Habit completed! 🎉", { duration: 1500 });
            }
        } catch (error) {
            // Revert on error
            fetchLogs();
            toast.error("Failed to update habit");
        }
    };

    const handleDelete = async () => {
        if (deletingHabit) {
            await onDelete(deletingHabit._id);
            setDeletingHabit(null);
        }
    };

    // Calculate column width based on number of days
    const getColumnWidth = () => {
        if (days.length <= 7) return "w-12";
        if (days.length <= 14) return "w-10";
        return "w-8";
    };

    if (isLoading) {
        return (
            <div className="card p-8 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
            </div>
        );
    }

    return (
        <>
            <div className="card overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto"
                >
                    <table className="w-full min-w-[600px]">
                        {/* Header with dates */}
                        <thead>
                            <tr className="border-b border-black/10 dark:border-white/10">
                                <th className="sticky left-0 z-10 bg-white px-4 py-4 text-left dark:bg-surface-900">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Habit
                                    </span>
                                </th>
                                {displayDays.map((day) => (
                                    <th
                                        key={day.toISOString()}
                                        className={cn(
                                            "px-1 py-3 text-center",
                                            getColumnWidth()
                                        )}
                                    >
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">
                                                {format(day, "EEE")}
                                            </span>
                                            <span
                                                className={cn(
                                                    "mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold",
                                                    isToday(day)
                                                        ? "bg-[#4D7CFE] text-white"
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
                                        Rate
                                    </span>
                                </th>
                                <th className="w-12 px-2 py-4" />
                            </tr>
                        </thead>

                        {/* Habit rows */}
                        <tbody>
                            {habitsData.map(({ habit, logs, completionRate }, rowIndex) => {
                                const colors =
                                    habitColors[habit.color as keyof typeof habitColors] ||
                                    habitColors.purple;

                                // Get logs in display order
                                const displayLogs = days.length > 7 ? [...logs].reverse() : logs;

                                return (
                                    <motion.tr
                                        key={habit._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: rowIndex * 0.03 }}
                                        className="group border-b border-black/5 last:border-0 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                    >
                                        {/* Habit info cell */}
                                        <td className="sticky left-0 z-10 bg-white px-4 py-3 dark:bg-surface-900 group-hover:bg-gray-50 dark:group-hover:bg-surface-800/50">
                                            <div className="flex items-center gap-3">
                                                {/* Progress ring */}
                                                <div className="relative h-10 w-10 flex-shrink-0">
                                                    <svg
                                                        className="h-10 w-10 -rotate-90 transform"
                                                        viewBox="0 0 36 36"
                                                    >
                                                        <circle
                                                            cx="18"
                                                            cy="18"
                                                            r="15"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            className="text-black/10 dark:text-white/10"
                                                        />
                                                        <circle
                                                            cx="18"
                                                            cy="18"
                                                            r="15"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            strokeDasharray={`${completionRate} 100`}
                                                            strokeLinecap="round"
                                                            className={colors.text}
                                                        />
                                                    </svg>
                                                    <div
                                                        className={cn(
                                                            "absolute inset-1 flex items-center justify-center rounded-full text-sm",
                                                            colors.bg
                                                        )}
                                                    >
                                                        {habit.icon}
                                                    </div>
                                                </div>

                                                {/* Title and streak */}
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-semibold text-black dark:text-white">
                                                        {habit.title}
                                                    </p>
                                                    {habit.streak.current > 0 && (
                                                        <div className="flex items-center gap-1 text-orange-500">
                                                            <Flame className="h-3 w-3" />
                                                            <span className="text-xs font-semibold">
                                                                {habit.streak.current}d streak
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Day cells */}
                                        {displayLogs.map((log, index) => {
                                            const isFutureDay =
                                                isFuture(log.date) && !isToday(log.date);
                                            const isTodayDate = isToday(log.date);

                                            return (
                                                <td
                                                    key={index}
                                                    className={cn(
                                                        "px-1 py-3 text-center",
                                                        getColumnWidth()
                                                    )}
                                                >
                                                    <motion.button
                                                        whileHover={
                                                            !isFutureDay ? { scale: 1.15 } : undefined
                                                        }
                                                        whileTap={
                                                            !isFutureDay ? { scale: 0.9 } : undefined
                                                        }
                                                        onClick={() =>
                                                            handleToggle(
                                                                habit._id,
                                                                log.date,
                                                                log.completed
                                                            )
                                                        }
                                                        disabled={isFutureDay}
                                                        className={cn(
                                                            "mx-auto flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                                                            log.completed
                                                                ? `bg-gradient-to-br ${colors.gradient} text-white shadow-md`
                                                                : "text-black/30 dark:text-white/30",
                                                            isFutureDay &&
                                                            "cursor-not-allowed opacity-20",
                                                            isTodayDate &&
                                                            !log.completed &&
                                                            "ring-2 ring-[#4D7CFE]/30"
                                                        )}
                                                    >
                                                        {log.completed ? (
                                                            <Check
                                                                className="h-4 w-4"
                                                                strokeWidth={3}
                                                            />
                                                        ) : isFutureDay ? null : (
                                                            <X className="h-4 w-4 opacity-40" />
                                                        )}
                                                    </motion.button>
                                                </td>
                                            );
                                        })}

                                        {/* Completion rate */}
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

                                        {/* Actions menu */}
                                        <td className="px-2 py-3">
                                            <div className="relative">
                                                <button
                                                    onClick={() =>
                                                        setMenuOpenFor(
                                                            menuOpenFor === habit._id
                                                                ? null
                                                                : habit._id
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 opacity-0 transition-all hover:bg-black/5 hover:text-black/60 group-hover:opacity-100 dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white/60"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>

                                                <AnimatePresence>
                                                    {menuOpenFor === habit._id && (
                                                        <>
                                                            <div
                                                                className="fixed inset-0 z-10"
                                                                onClick={() => setMenuOpenFor(null)}
                                                            />
                                                            <motion.div
                                                                initial={{
                                                                    opacity: 0,
                                                                    scale: 0.95,
                                                                    y: -8,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    scale: 1,
                                                                    y: 0,
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                    scale: 0.95,
                                                                }}
                                                                className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-surface-900"
                                                            >
                                                                <button
                                                                    onClick={() => {
                                                                        setMenuOpenFor(null);
                                                                        onEdit(habit);
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

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 border-t border-black/10 px-4 py-4 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-green-400 to-green-600 text-white">
                            <Check className="h-3 w-3" strokeWidth={3} />
                        </div>
                        <span className="text-xs text-black/50 dark:text-white/50">
                            Completed
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md text-black/30 dark:text-white/30">
                            <X className="h-3 w-3" />
                        </div>
                        <span className="text-xs text-black/50 dark:text-white/50">
                            Missed
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-black/5 dark:bg-white/5" />
                        <span className="text-xs text-black/50 dark:text-white/50">
                            Future
                        </span>
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="card p-4 text-center">
                    <p className="text-2xl font-black text-black dark:text-white">
                        {habitsData.length}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                        Total Habits
                    </p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-2xl font-black text-black dark:text-white">
                        {days.length}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                        Days Tracked
                    </p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-2xl font-black text-green-500">
                        {habitsData.reduce(
                            (acc, hd) => acc + hd.logs.filter((l) => l.completed).length,
                            0
                        )}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                        Completions
                    </p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-2xl font-black text-[#4D7CFE]">
                        {habitsData.length > 0
                            ? Math.round(
                                habitsData.reduce((acc, hd) => acc + hd.completionRate, 0) /
                                habitsData.length
                            )
                            : 0}
                        %
                    </p>
                    <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                        Avg Rate
                    </p>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deletingHabit}
                onClose={() => setDeletingHabit(null)}
                title="Delete Habit"
                size="sm"
            >
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                        <span className="text-3xl">{deletingHabit?.icon}</span>
                    </div>
                    <p className="mb-6 text-black/60 dark:text-white/60">
                        Delete <strong>&quot;{deletingHabit?.title}&quot;</strong>? This will remove
                        all completion history. This cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setDeletingHabit(null)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete} className="flex-1">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
