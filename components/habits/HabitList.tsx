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
        <div className="space-y-8">
            {/* Add Habit Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="w-full p-4 rounded-2xl border-2 border-dashed border-surface-300 dark:border-surface-800 hover:border-primary-400 dark:hover:border-primary-600 transition-colors group"
            >
                <div className="flex items-center justify-center gap-3 text-surface-200/50 group-hover:text-primary-500 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add new habit</span>
                </div>
            </motion.button>

            {/* Pending Habits */}
            {pendingHabits.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                        <span>To Do</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm">
                            {pendingHabits.length}
                        </span>
                    </h2>
                    <div className="space-y-3">
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
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-success-500" />
                        <span>Completed</span>
                        <span className="px-2 py-0.5 rounded-full bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400 text-sm">
                            {completedHabits.length}
                        </span>
                    </h2>
                    <div className="space-y-3 opacity-75">
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

            {/* Empty State */}
            {habits.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
                        <span className="text-5xl">🌱</span>
                    </div>
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                        Start your journey
                    </h3>
                    <p className="text-surface-200/50 mb-6 max-w-sm mx-auto">
                        Create your first habit and begin building a better version of yourself.
                    </p>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="w-5 h-5" />
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
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <span className="text-3xl">{deletingHabit?.icon}</span>
                    </div>
                    <p className="text-surface-600 dark:text-surface-200/50 mb-6">
                        Are you sure you want to delete <strong>"{deletingHabit?.title}"</strong>? This action cannot be undone.
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
        </div>
    );
}
