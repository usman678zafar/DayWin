"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MoreVertical, Flame, Edit, Trash2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import { fireSmallConfetti, fireStreakConfetti } from "@/lib/confetti";

interface HabitCardProps {
    habit: HabitWithLog;
    onComplete: (completed: boolean) => Promise<{ streak?: { current: number } }>;
    onEdit: () => void;
    onDelete: () => void;
    index: number;
}

export function HabitCard({
    habit,
    onComplete,
    onEdit,
    onDelete,
    index,
}: HabitCardProps) {
    const [isCompleted, setIsCompleted] = useState(habit.todayLog?.completed ?? false);
    const [isLoading, setIsLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showStreak, setShowStreak] = useState(false);

    const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;

    const handleComplete = async () => {
        if (isLoading) return;

        setIsLoading(true);
        const newCompleted = !isCompleted;
        setIsCompleted(newCompleted);

        try {
            const result = await onComplete(newCompleted);

            if (newCompleted) {
                fireSmallConfetti();

                // Check for streak milestone
                if (result.streak?.current && result.streak.current % 7 === 0) {
                    fireStreakConfetti();
                    setShowStreak(true);
                    setTimeout(() => setShowStreak(false), 3000);
                }
            }
        } catch (error) {
            setIsCompleted(!newCompleted);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="habit-card group"
        >
            {/* Streak celebration overlay */}
            <AnimatePresence>
                {showStreak && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-orange-500/90 to-red-500/90 rounded-2xl z-10"
                    >
                        <div className="text-center text-white">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                className="text-5xl mb-2"
                            >
                                🔥
                            </motion.div>
                            <p className="text-xl font-bold">{habit.streak.current} Day Streak!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-4">
                {/* Checkbox */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleComplete}
                    disabled={isLoading}
                    className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        "border-2 transition-all duration-300",
                        isCompleted
                            ? `bg-gradient-to-br ${colors.gradient} border-transparent shadow-lg`
                            : "border-surface-300 dark:border-surface-800 hover:border-primary-400"
                    )}
                >
                    <AnimatePresence mode="wait">
                        {isCompleted ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Check className="w-6 h-6 text-white" strokeWidth={3} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="w-6 h-6"
                            />
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Icon */}
                <div
                    className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                        colors.bg
                    )}
                >
                    {habit.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3
                        className={cn(
                            "font-semibold text-surface-900 dark:text-white transition-all duration-300",
                            isCompleted && "line-through opacity-60"
                        )}
                    >
                        {habit.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                        {/* Category badge */}
                        <span className={cn("text-xs font-medium", colors.text)}>
                            {habit.category}
                        </span>

                        {/* Streak */}
                        {habit.streak.current > 0 && (
                            <div className="flex items-center gap-1 text-orange-500">
                                <Flame className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold">{habit.streak.current}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                    >
                        <MoreVertical className="w-5 h-5 text-surface-200/50" />
                    </button>

                    <AnimatePresence>
                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMenu(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-900 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800 z-20 overflow-hidden"
                                >
                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            onEdit();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    >
                                        <Edit className="w-4 h-4 text-surface-200/50" />
                                        <span className="text-surface-900 dark:text-white">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            onDelete();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete</span>
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Progress bar for target count > 1 */}
            {habit.targetCount > 1 && (
                <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-surface-200/50">Progress</span>
                        <span className={colors.text}>
                            {habit.todayLog?.count ?? 0} / {habit.targetCount}
                        </span>
                    </div>
                    <div className="h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width: `${Math.min(((habit.todayLog?.count ?? 0) / habit.targetCount) * 100, 100)}%`,
                            }}
                            className={cn("h-full rounded-full bg-gradient-to-r", colors.gradient)}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
}
