"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, LayoutGrid, List, Sparkles, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { HabitCard } from "@/components/habits/HabitCard";
import { HabitForm } from "@/components/habits/HabitForm";
import { Modal } from "@/components/ui/Modal";
import { useHabits } from "@/hooks/useHabits";
import { habitCategories, Habit, HabitWithLog } from "@/types";
import { cn } from "@/lib/utils";

export default function HabitsPage() {
    const { habits, fetchHabits, addHabit, updateHabit, deleteHabit, completeHabit } = useHabits();
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const filteredHabits = useMemo(() => {
        return habits.filter((habit) => {
            const matchesSearch = habit.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || habit.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [habits, searchQuery, selectedCategory]);

    const completedToday = habits.filter((h) => h.todayLog?.completed).length;
    const activeCount = habits.length;
    const completionRate = activeCount > 0 ? Math.round((completedToday / activeCount) * 100) : 0;
    const topStreak = Math.max(...habits.map((h) => h.streak?.current || 0), 0);

    const handleSubmit = async (data: Partial<Habit>) => {
        if (editingHabit) {
            await updateHabit(editingHabit._id, data);
        } else {
            await addHabit(data);
        }
        setShowForm(false);
        setEditingHabit(null);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="page-title">My Habits</h1>
                        <p className="page-subtitle">A modern command center for your daily consistency system.</p>
                    </div>
                    <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-5 h-5" />}>
                        Create Habit
                    </Button>
                </div>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Active Habits</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{activeCount}</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Completed Today</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{completedToday}</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Completion Rate</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{completionRate}%</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Top Streak</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{topStreak}</p>
                </div>
            </div>

            <div className="card mb-6 p-4 sm:p-5">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="flex-1">
                            <Input
                                placeholder="Search habits..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftIcon={<Search className="w-5 h-5" />}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition",
                                    viewMode === "list"
                                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                        : "border-black/20 text-black/60 hover:border-black dark:border-white/20 dark:text-white/60 dark:hover:border-white"
                                )}
                            >
                                <List className="h-4 w-4" />
                                List
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition",
                                    viewMode === "grid"
                                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                        : "border-black/20 text-black/60 hover:border-black dark:border-white/20 dark:text-white/60 dark:hover:border-white"
                                )}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Grid
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition",
                                !selectedCategory
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/20 text-black/60 hover:border-black dark:border-white/20 dark:text-white/60 dark:hover:border-white"
                            )}
                        >
                            All
                        </button>
                        {habitCategories.slice(0, 6).map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={cn(
                                    "rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition",
                                    selectedCategory === cat.value
                                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                        : "border-black/20 text-black/60 hover:border-black dark:border-white/20 dark:text-white/60 dark:hover:border-white"
                                )}
                            >
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55 dark:text-white/55">
                    Showing {filteredHabits.length} of {habits.length} habits
                </p>
                {(searchQuery || selectedCategory) && (
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory(null);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-black/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-black/60 transition hover:border-black hover:text-black dark:border-white/20 dark:text-white/60 dark:hover:border-white dark:hover:text-white"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset Filters
                    </button>
                )}
            </div>

            {filteredHabits.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        viewMode === "grid" ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"
                    )}
                >
                    {filteredHabits.map((habit, index) => (
                        <HabitCard
                            key={habit._id}
                            habit={habit}
                            index={index}
                            onComplete={(completed) => completeHabit(habit._id, completed)}
                            onEdit={() => {
                                setEditingHabit(habit);
                                setShowForm(true);
                            }}
                            onDelete={() => deleteHabit(habit._id)}
                        />
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card py-16 text-center"
                >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-black/15 text-black/60 dark:border-white/15 dark:text-white/60">
                        {searchQuery || selectedCategory ? <Search className="h-7 w-7" /> : <Sparkles className="h-7 w-7" />}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                        {searchQuery || selectedCategory ? "No matching habits" : "Start your first habit"}
                    </h3>
                    <p className="mx-auto max-w-md text-black/60 dark:text-white/60">
                        {searchQuery || selectedCategory
                            ? "Try a different keyword or category filter."
                            : "Create a habit and begin building streaks with daily actions."}
                    </p>
                    {!searchQuery && !selectedCategory && (
                        <div className="mt-6">
                            <Button onClick={() => setShowForm(true)} leftIcon={<CheckCircle2 className="w-5 h-5" />}>
                                Create Your First Habit
                            </Button>
                        </div>
                    )}
                </motion.div>
            )}

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
        </div>
    );
}
