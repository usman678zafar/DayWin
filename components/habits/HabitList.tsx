"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { HabitCard } from "./HabitCard";
import { HabitForm } from "./HabitForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useHabits } from "@/hooks/useHabits";
import { HabitWithLog, Habit } from "@/types";

export function HabitList() {
    const { habits, completeHabit, addHabit, updateHabit, deleteHabit } = useHabits();
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [deletingHabit, setDeletingHabit] = useState<HabitWithLog | null>(null);

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

    // Separate completed and pending habits
    const pendingHabits = habits.filter((h) => !h.todayLog?.completed);
    const completedHabits = habits.filter((h) => h.todayLog?.completed);

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Add Habit Button - Mobile Optimized */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="w-full p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 border-dashed border-surface-300 dark:border-surface-800 hover:border-primary-400 dark:hover:border-primary-600 transition-colors group"
            >
                <div className="flex items-center justify-center gap-2 sm:gap-3 text-black/30 dark:text-white/30 group-hover:text-primary-500 transition-colors">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="text-sm sm:text-base font-semibold uppercase tracking-widest px-2 group-hover:translate-x-1 transition-transform">Add new habit</span>
                </div>
            </motion.button>

            {/* Pending Habits */}
            {pendingHabits.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-black/60 dark:text-white/40 flex items-center gap-3">
                            To Do
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/5 text-[10px] text-black/80 dark:bg-white/5 dark:text-white/40">
                                {pendingHabits.length}
                            </span>
                        </h2>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                        <AnimatePresence mode="popLayout">
                            {pendingHabits.map((habit, index) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={habit}
                                    index={index}
                                    onComplete={(completed) => completeHabit(habit._id, completed)}
                                    onEdit={() => {
                                        setEditingHabit(habit);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => setDeletingHabit(habit)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Completed Habits */}
            {completedHabits.length > 0 && (
                <div className="space-y-4 pt-4">
                    <div className="flex items-center justify-between px-1">
                        <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-[#10B981] flex items-center gap-3">
                            <Sparkles className="w-4 h-4" />
                            Completed
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10B981]/10 text-[10px] text-[#10B981]">
                                {completedHabits.length}
                            </span>
                        </h2>
                    </div>
                    <div className="space-y-2 sm:space-y-3 opacity-75">
                        <AnimatePresence mode="popLayout">
                            {completedHabits.map((habit, index) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={habit}
                                    index={index}
                                    onComplete={(completed) => completeHabit(habit._id, completed)}
                                    onEdit={() => {
                                        setEditingHabit(habit);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => setDeletingHabit(habit)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Empty State - Mobile Optimized */}
            {habits.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12 sm:py-16"
                >
                    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
                        <span className="text-4xl sm:text-5xl">🌱</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white mb-2">
                        Start your journey
                    </h3>
                    <p className="text-black/40 dark:text-white/40 mb-4 sm:mb-6 max-w-sm mx-auto text-sm sm:text-base px-4">
                        Create your first habit and begin building a better version of yourself.
                    </p>
                    <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto mx-4 sm:mx-0">
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
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
                    <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <span className="text-2xl sm:text-3xl">{deletingHabit?.icon}</span>
                    </div>
                    <p className="text-surface-600 dark:text-surface-200/50 mb-4 sm:mb-6 text-sm sm:text-base">
                        Are you sure you want to delete <strong>"{deletingHabit?.title}"</strong>? This action cannot be undone.
                    </p>
                    <div className="flex gap-2 sm:gap-3">
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
        </div>
    );
}
