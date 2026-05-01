"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isSameDay, isToday, isFuture, format } from "date-fns";
import { Plus, Sparkles } from "lucide-react";
import { HabitCard } from "./HabitCard";
import { HabitForm } from "./HabitForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { HabitWithLog, Habit } from "@/types";
import toast from "react-hot-toast";

interface DailyHabitViewProps {
    habits: HabitWithLog[];
    selectedDate: Date;
    onToggleCompletion: (habitId: string, date: Date, completed: boolean) => Promise<void>;
    onAddHabit: (habit: Partial<Habit>) => Promise<void>;
    onUpdateHabit: (id: string, data: Partial<Habit>) => Promise<void>;
    onDeleteHabit: (id: string) => Promise<void>;
}

interface DayHabit extends HabitWithLog {
    dayCompleted: boolean;
}

export function DailyHabitView({
    habits,
    selectedDate,
    onToggleCompletion,
    onAddHabit,
    onUpdateHabit,
    onDeleteHabit,
}: DailyHabitViewProps) {
    const [habitsWithDayStatus, setHabitsWithDayStatus] = useState<DayHabit[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [deletingHabit, setDeletingHabit] = useState<HabitWithLog | null>(null);

    const isViewingToday = isToday(selectedDate);
    const isViewingFuture = isFuture(selectedDate) && !isToday(selectedDate);

    const fetchDayLogs = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/logs?startDate=${selectedDate.toISOString()}&endDate=${selectedDate.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const habitsWithStatus: DayHabit[] = habits.map((habit) => {
                const dayLog = logs.find(
                    (log: any) => log.habitId === habit._id && isSameDay(new Date(log.date), selectedDate)
                );
                return {
                    ...habit,
                    dayCompleted: dayLog?.completed || false,
                };
            });

            setHabitsWithDayStatus(habitsWithStatus);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [selectedDate, habits]);

    useEffect(() => {
        if (isViewingToday) {
            // For today, use the todayLog from habits
            setHabitsWithDayStatus(
                habits.map((h) => ({
                    ...h,
                    dayCompleted: h.todayLog?.completed || false,
                }))
            );
        } else {
            // For other dates, fetch the logs
            fetchDayLogs();
        }
    }, [selectedDate, habits, fetchDayLogs, isViewingToday]);

    const handleComplete = async (habitId: string, completed: boolean) => {
        if (isViewingFuture) {
            toast.error("Cannot mark habits for future dates");
            return { streak: undefined };
        }

        // Optimistic update
        setHabitsWithDayStatus((prev) =>
            prev.map((h) => (h._id === habitId ? { ...h, dayCompleted: completed } : h))
        );

        try {
            await onToggleCompletion(habitId, selectedDate, completed);
            return { streak: undefined };
        } catch (error) {
            // Revert on error
            setHabitsWithDayStatus((prev) =>
                prev.map((h) => (h._id === habitId ? { ...h, dayCompleted: !completed } : h))
            );
            throw error;
        }
    };

    const handleSubmit = async (data: Partial<Habit>) => {
        if (editingHabit) {
            await onUpdateHabit(editingHabit._id, data);
        } else {
            await onAddHabit(data);
        }
        setShowForm(false);
        setEditingHabit(null);
    };

    const handleDelete = async () => {
        if (deletingHabit) {
            await onDeleteHabit(deletingHabit._id);
            setDeletingHabit(null);
        }
    };

    const pendingHabits = habitsWithDayStatus.filter((h) => !h.dayCompleted);
    const completedHabits = habitsWithDayStatus.filter((h) => h.dayCompleted);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Warning for future dates */}
            {isViewingFuture && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-yellow-500/30 bg-yellow-50 p-4 text-center dark:bg-yellow-900/20"
                >
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        You&apos;re viewing a future date. Habits cannot be marked for future dates.
                    </p>
                </motion.div>
            )}

            {/* Add Habit Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="w-full rounded-2xl border-2 border-dashed border-black/20 p-4 transition hover:border-black/40 dark:border-white/20 dark:hover:border-white/40"
            >
                <div className="flex items-center justify-center gap-3 text-black/50 dark:text-white/50">
                    <Plus className="h-5 w-5" />
                    <span className="font-medium">Add new habit</span>
                </div>
            </motion.button>

            {/* Pending Habits */}
            {pendingHabits.length > 0 && (
                <div className="space-y-4">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
                        <span>To Do</span>
                        <span className="rounded-full bg-primary-100 px-2 py-0.5 text-sm text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                            {pendingHabits.length}
                        </span>
                    </h2>
                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {pendingHabits.map((habit, index) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={{ ...habit, todayLog: habit.dayCompleted ? habit.todayLog : undefined }}
                                    index={index}
                                    onComplete={(completed) => handleComplete(habit._id, completed)}
                                    onEdit={() => {
                                        setEditingHabit(habit);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => setDeletingHabit(habit)}
                                    disabled={isViewingFuture}
                                    isCompleted={habit.dayCompleted}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Completed Habits */}
            {completedHabits.length > 0 && (
                <div className="space-y-4">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
                        <Sparkles className="h-5 w-5 text-success-500" />
                        <span>Completed</span>
                        <span className="rounded-full bg-success-100 px-2 py-0.5 text-sm text-success-600 dark:bg-success-900/30 dark:text-success-400">
                            {completedHabits.length}
                        </span>
                    </h2>
                    <div className="space-y-3 opacity-75">
                        <AnimatePresence mode="popLayout">
                            {completedHabits.map((habit, index) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={{ ...habit, todayLog: { ...habit.todayLog!, completed: true } }}
                                    index={index}
                                    onComplete={(completed) => handleComplete(habit._id, completed)}
                                    onEdit={() => {
                                        setEditingHabit(habit);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => setDeletingHabit(habit)}
                                    disabled={isViewingFuture}
                                    isCompleted={habit.dayCompleted}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {habitsWithDayStatus.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-16 text-center"
                >
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30">
                        <span className="text-5xl">🌱</span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                        Start your journey
                    </h3>
                    <p className="mx-auto mb-6 max-w-sm text-black/60 dark:text-white/60">
                        Create your first habit and begin building a better version of yourself.
                    </p>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-5 w-5" />
                        Create your first habit
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
                title={editingHabit ? "Edit Habit" : "Create New Habit"}
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
                        Are you sure you want to delete <strong>&quot;{deletingHabit?.title}&quot;</strong>? This action cannot be undone.
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
