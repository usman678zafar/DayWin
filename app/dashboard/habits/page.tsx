"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    format,
    addDays,
    subDays,
    isToday,
    isFuture,
    startOfDay,
    isSameDay,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
} from "date-fns";
import {
    ChevronLeft,
    ChevronRight,
    Calendar,
    Plus,
    Check,
    Flame,
    MoreHorizontal,
    Edit2,
    Trash2,
    Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useHabits } from "@/hooks/useHabits";
import { HabitWithLog, Habit, habitColors } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { HabitForm } from "@/components/habits/HabitForm";
import toast from "react-hot-toast";

export default function HabitsPage() {
    const { habits, fetchHabits, addHabit, updateHabit, deleteHabit } = useHabits();

    // Core state
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [dayLogs, setDayLogs] = useState<Record<string, boolean>>({});
    const [loadingHabitId, setLoadingHabitId] = useState<string | null>(null);
    const [isLoadingLogs, setIsLoadingLogs] = useState(false);

    // UI state
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [deletingHabit, setDeletingHabit] = useState<HabitWithLog | null>(null);
    const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);

    // Derived state
    const isViewingToday = isToday(selectedDate);
    const isViewingFuture = isFuture(selectedDate) && !isToday(selectedDate);

    // Fetch habits on mount
    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    // Fetch logs when date changes
    useEffect(() => {
        if (isViewingToday) {
            // Use today's logs from habits state
            const todayLogs: Record<string, boolean> = {};
            habits.forEach((h) => {
                todayLogs[h._id] = h.todayLog?.completed || false;
            });
            setDayLogs(todayLogs);
        } else {
            fetchLogsForDate(selectedDate);
        }
    }, [selectedDate, habits, isViewingToday]);

    const fetchLogsForDate = async (date: Date) => {
        setIsLoadingLogs(true);
        try {
            const response = await fetch(
                `/api/logs?startDate=${startOfDay(date).toISOString()}&endDate=${startOfDay(date).toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const logsMap: Record<string, boolean> = {};
            habits.forEach((h) => {
                const log = logs.find((l: any) => l.habitId === h._id);
                logsMap[h._id] = log?.completed || false;
            });
            setDayLogs(logsMap);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        } finally {
            setIsLoadingLogs(false);
        }
    };

    const toggleHabit = async (habitId: string) => {
        if (isViewingFuture) {
            toast.error("Cannot mark future dates");
            return;
        }

        const currentStatus = dayLogs[habitId] || false;
        const newStatus = !currentStatus;

        // Optimistic update
        setDayLogs((prev) => ({ ...prev, [habitId]: newStatus }));
        setLoadingHabitId(habitId);

        try {
            const response = await fetch(`/api/habits/${habitId}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    completed: newStatus,
                    date: startOfDay(selectedDate).toISOString(),
                }),
            });

            if (!response.ok) throw new Error("Failed to update");

            if (newStatus) {
                toast.success(isViewingToday ? "Great job! 🎉" : `Marked for ${format(selectedDate, "MMM d")}`);
            }

            // Refresh habits to update streaks if viewing today
            if (isViewingToday) {
                fetchHabits();
            }
        } catch (error) {
            // Revert on error
            setDayLogs((prev) => ({ ...prev, [habitId]: currentStatus }));
            toast.error("Failed to update habit");
        } finally {
            setLoadingHabitId(null);
        }
    };

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

    const goToPreviousDay = () => setSelectedDate(subDays(selectedDate, 1));
    const goToNextDay = () => {
        if (!isViewingToday) {
            setSelectedDate(addDays(selectedDate, 1));
        }
    };
    const goToToday = () => setSelectedDate(new Date());

    // Stats
    const completedCount = Object.values(dayLogs).filter(Boolean).length;
    const totalCount = habits.length;
    const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    // Week days for mini calendar
    const weekDays = eachDayOfInterval({
        start: startOfWeek(selectedDate),
        end: endOfWeek(selectedDate),
    });

    return (
        <div className="page-container max-w-3xl mx-auto">
            {/* Header */}
            <div className="page-header">
                <h1 className="page-title">My Habits</h1>
                <p className="page-subtitle">
                    Select any date and check off your habits. Build streaks through consistency.
                </p>
            </div>

            {/* Date Navigation - THE MAIN FEATURE */}
            <div className="card mb-6 p-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Prev Button */}
                    <button
                        onClick={goToPreviousDay}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 text-black transition hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Date Display */}
                    <div className="flex-1 text-center">
                        <button
                            onClick={() => setShowDatePicker(!showDatePicker)}
                            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 transition hover:bg-black/5 dark:hover:bg-white/5"
                        >
                            <Calendar className="h-4 w-4 text-black/50 dark:text-white/50" />
                            <div>
                                <div className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    {isViewingToday ? "Today" : format(selectedDate, "EEEE")}
                                </div>
                                <div className="text-lg font-bold text-black dark:text-white">
                                    {format(selectedDate, "MMMM d, yyyy")}
                                </div>
                            </div>
                        </button>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={goToNextDay}
                        disabled={isViewingToday}
                        className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 text-black transition dark:border-white/15 dark:text-white",
                            isViewingToday
                                ? "cursor-not-allowed opacity-30"
                                : "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black"
                        )}
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>

                {/* Mini Week View */}
                <div className="mt-4 flex justify-center gap-1">
                    {weekDays.map((day) => {
                        const isSelected = isSameDay(day, selectedDate);
                        const isTodayDay = isToday(day);
                        const isFutureDay = isFuture(day) && !isToday(day);

                        return (
                            <button
                                key={day.toISOString()}
                                onClick={() => !isFutureDay && setSelectedDate(day)}
                                disabled={isFutureDay}
                                className={cn(
                                    "flex flex-col items-center rounded-lg px-2 py-1.5 transition",
                                    isSelected
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : isFutureDay
                                            ? "cursor-not-allowed opacity-30"
                                            : "hover:bg-black/5 dark:hover:bg-white/5",
                                    isTodayDay && !isSelected && "ring-1 ring-black/20 dark:ring-white/20"
                                )}
                            >
                                <span className="text-[10px] font-semibold uppercase">
                                    {format(day, "EEE")}
                                </span>
                                <span className="text-sm font-bold">{format(day, "d")}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Today Button */}
                {!isViewingToday && (
                    <div className="mt-3 text-center">
                        <button
                            onClick={goToToday}
                            className="inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                        >
                            Jump to Today
                        </button>
                    </div>
                )}
            </div>

            {/* Future Date Warning */}
            {isViewingFuture && (
                <div className="mb-4 rounded-xl border border-yellow-400/50 bg-yellow-50 p-4 text-center dark:bg-yellow-900/20">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        ⚠️ You're viewing a future date. Habits cannot be marked for future dates.
                    </p>
                </div>
            )}

            {/* Progress Summary */}
            <div className="mb-6 grid grid-cols-3 gap-3">
                <div className="card p-4 text-center">
                    <div className="text-2xl font-black text-black dark:text-white">{totalCount}</div>
                    <div className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">Habits</div>
                </div>
                <div className="card p-4 text-center">
                    <div className="text-2xl font-black text-black dark:text-white">{completedCount}</div>
                    <div className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">Done</div>
                </div>
                <div className="card p-4 text-center">
                    <div className={cn(
                        "text-2xl font-black",
                        completionRate === 100 ? "text-green-500" : completionRate >= 50 ? "text-yellow-500" : "text-black dark:text-white"
                    )}>
                        {completionRate}%
                    </div>
                    <div className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">Complete</div>
                </div>
            </div>

            {/* Habits List */}
            {isLoadingLogs ? (
                <div className="card flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-black/30 dark:text-white/30" />
                </div>
            ) : habits.length > 0 ? (
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {habits.map((habit, index) => {
                            const isCompleted = dayLogs[habit._id] || false;
                            const isLoading = loadingHabitId === habit._id;
                            const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;

                            return (
                                <motion.div
                                    key={habit._id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={cn(
                                        "card group relative p-4 transition",
                                        isCompleted && "bg-green-50/50 dark:bg-green-900/10"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* Checkbox */}
                                        <button
                                            onClick={() => toggleHabit(habit._id)}
                                            disabled={isViewingFuture || isLoading}
                                            className={cn(
                                                "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border-2 transition-all",
                                                isCompleted
                                                    ? `border-transparent bg-gradient-to-br ${colors.gradient} shadow-lg`
                                                    : "border-black/20 hover:border-black/40 dark:border-white/20 dark:hover:border-white/40",
                                                isViewingFuture && "cursor-not-allowed opacity-50",
                                                isLoading && "animate-pulse"
                                            )}
                                        >
                                            {isLoading ? (
                                                <Loader2 className="h-5 w-5 animate-spin text-white" />
                                            ) : isCompleted ? (
                                                <Check className="h-6 w-6 text-white" strokeWidth={3} />
                                            ) : null}
                                        </button>

                                        {/* Icon */}
                                        <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-2xl", colors.bg)}>
                                            {habit.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className={cn(
                                                "font-semibold text-black dark:text-white transition",
                                                isCompleted && "line-through opacity-60"
                                            )}>
                                                {habit.title}
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className={cn("text-xs font-medium", colors.text)}>
                                                    {habit.category}
                                                </span>
                                                {habit.streak?.current > 0 && (
                                                    <div className="flex items-center gap-1 text-orange-500">
                                                        <Flame className="h-3.5 w-3.5" />
                                                        <span className="text-xs font-bold">{habit.streak.current}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Menu */}
                                        <div className="relative">
                                            <button
                                                onClick={() => setMenuOpenFor(menuOpenFor === habit._id ? null : habit._id)}
                                                className="flex h-8 w-8 items-center justify-center rounded-lg opacity-0 transition group-hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5"
                                            >
                                                <MoreHorizontal className="h-5 w-5 text-black/50 dark:text-white/50" />
                                            </button>

                                            <AnimatePresence>
                                                {menuOpenFor === habit._id && (
                                                    <>
                                                        <div className="fixed inset-0 z-10" onClick={() => setMenuOpenFor(null)} />
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.95 }}
                                                            className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-surface-900"
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
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="card py-16 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                        <span className="text-4xl">🌱</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">No habits yet</h3>
                    <p className="mx-auto mb-6 max-w-sm text-black/60 dark:text-white/60">
                        Create your first habit and start building daily consistency.
                    </p>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-5 w-5" />
                        Create First Habit
                    </Button>
                </div>
            )}

            {/* Add Habit Button (Fixed) */}
            {habits.length > 0 && (
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onClick={() => setShowForm(true)}
                    className="fixed bottom-20 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white shadow-xl transition hover:scale-105 active:scale-95 md:bottom-8 md:right-8 dark:bg-white dark:text-black"
                >
                    <Plus className="h-6 w-6" />
                </motion.button>
            )}

            {/* Date Picker Modal */}
            <Modal
                isOpen={showDatePicker}
                onClose={() => setShowDatePicker(false)}
                title="Select Date"
                size="sm"
            >
                <SimpleDatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        setShowDatePicker(false);
                    }}
                />
            </Modal>

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
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                        <span className="text-3xl">{deletingHabit?.icon}</span>
                    </div>
                    <p className="mb-6 text-black/60 dark:text-white/60">
                        Delete <strong>"{deletingHabit?.title}"</strong>? This cannot be undone.
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
        </div>
    );
}

// Simple inline date picker component
function SimpleDatePicker({ selected, onChange }: { selected: Date; onChange: (date: Date) => void }) {
    const [viewMonth, setViewMonth] = useState(selected);

    const monthStart = startOfDay(new Date(viewMonth.getFullYear(), viewMonth.getMonth(), 1));
    const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
    const startDay = monthStart.getDay();

    const days = [];
    for (let i = 0; i < startDay; i++) {
        days.push(<div key={`empty-${i}`} />);
    }
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i);
        const isSelected = isSameDay(date, selected);
        const isTodayDate = isToday(date);
        const isFutureDate = isFuture(date) && !isToday(date);

        days.push(
            <button
                key={i}
                onClick={() => !isFutureDate && onChange(date)}
                disabled={isFutureDate}
                className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition",
                    isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black"
                        : isFutureDate
                            ? "cursor-not-allowed opacity-30"
                            : "hover:bg-black/5 dark:hover:bg-white/5",
                    isTodayDate && !isSelected && "ring-1 ring-black/30 dark:ring-white/30"
                )}
            >
                {i}
            </button>
        );
    }

    return (
        <div>
            <div className="mb-4 flex items-center justify-between">
                <button
                    onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1))}
                    className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5"
                >
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="font-semibold text-black dark:text-white">
                    {format(viewMonth, "MMMM yyyy")}
                </span>
                <button
                    onClick={() => setViewMonth(new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1))}
                    className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5"
                >
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="mb-2 grid grid-cols-7 text-center text-xs font-semibold text-black/50 dark:text-white/50">
                {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                    <div key={d} className="py-2">{d}</div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1">{days}</div>

            <div className="mt-4 flex gap-2 border-t border-black/10 pt-4 dark:border-white/10">
                <button
                    onClick={() => onChange(new Date())}
                    className="flex-1 rounded-lg bg-black py-2 text-sm font-semibold text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                >
                    Today
                </button>
                <button
                    onClick={() => onChange(subDays(new Date(), 1))}
                    className="flex-1 rounded-lg border border-black/20 py-2 text-sm font-semibold text-black transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
                >
                    Yesterday
                </button>
            </div>
        </div>
    );
}
