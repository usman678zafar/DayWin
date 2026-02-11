"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Filter, LayoutGrid, List } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { HabitCard } from "@/components/habits/HabitCard";
import { HabitForm } from "@/components/habits/HabitForm";
import { Modal } from "@/components/ui/Modal";
import { useHabits } from "@/hooks/useHabits";
import { habitCategories, Habit, HabitWithLog } from "@/types";
import { cn } from "@/lib/utils";

export default function HabitsPage() {
    const { habits, isLoading, fetchHabits, addHabit, updateHabit, deleteHabit, completeHabit } = useHabits();
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const filteredHabits = habits.filter((habit) => {
        const matchesSearch = habit.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || habit.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

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
            {/* Header */}
            <div className="page-header">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="page-title">My Habits</h1>
                        <p className="page-subtitle">
                            Manage and organize all your habits in one place
                        </p>
                    </div>
                    <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-5 h-5" />}>
                        New Habit
                    </Button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1">
                    <Input
                        placeholder="Search habits..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        leftIcon={<Search className="w-5 h-5" />}
                    />
                </div>
                <div className="flex items-center gap-2">
                    {/* Category filter */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                                !selectedCategory
                                    ? "bg-primary-500 text-white"
                                    : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-200/50 hover:bg-surface-200"
                            )}
                        >
                            All
                        </button>
                        {habitCategories.slice(0, 5).map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={cn(
                                    "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                                    selectedCategory === cat.value
                                        ? "bg-primary-500 text-white"
                                        : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-200/50 hover:bg-surface-200"
                                )}
                            >
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>

                    {/* View toggle */}
                    <div className="hidden md:flex items-center border border-surface-200 dark:border-surface-800 rounded-xl p-1">
                        <button
                            onClick={() => setViewMode("list")}
                            className={cn(
                                "p-2 rounded-lg transition-colors",
                                viewMode === "list"
                                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600"
                                    : "text-surface-200/50 hover:text-surface-600"
                            )}
                        >
                            <List className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => setViewMode("grid")}
                            className={cn(
                                "p-2 rounded-lg transition-colors",
                                viewMode === "grid"
                                    ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600"
                                    : "text-surface-200/50 hover:text-surface-600"
                            )}
                        >
                            <LayoutGrid className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Habits Grid/List */}
            {filteredHabits.length > 0 ? (
                <div
                    className={cn(
                        viewMode === "grid"
                            ? "grid md:grid-cols-2 lg:grid-cols-3 gap-4"
                            : "space-y-3"
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
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-surface-100 dark:bg-surface-800 flex items-center justify-center">
                        <Search className="w-8 h-8 text-surface-200/50" />
                    </div>
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                        No habits found
                    </h3>
                    <p className="text-surface-200/50">
                        {searchQuery || selectedCategory
                            ? "Try adjusting your filters"
                            : "Create your first habit to get started"}
                    </p>
                </motion.div>
            )}

            {/* Form Modal */}
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
        </div>
    );
}
