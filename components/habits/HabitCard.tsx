"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MoreVertical, Flame, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import { HabitIcon } from "./HabitIcon";
import { fireSmallConfetti, fireStreakConfetti } from "@/lib/confetti";

interface HabitCardProps {
    habit: HabitWithLog;
    onComplete: (completed: boolean) => Promise<{ streak?: { current: number } }>;
    onEdit: () => void;
    onDelete: () => void;
    index: number;
    disabled?: boolean;
    isCompleted?: boolean;
}

export function HabitCard({
    habit,
    onComplete,
    onEdit,
    onDelete,
    index,
    disabled = false,
    isCompleted: isCompletedProp,
}: HabitCardProps) {
    const [isCompleted, setIsCompleted] = useState(isCompletedProp ?? habit.todayLog?.completed ?? false);
    const [isLoading, setIsLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showStreak, setShowStreak] = useState(false);

    const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;

    const handleComplete = async () => {
        if (isLoading || disabled) return;

        setIsLoading(true);
        const newCompleted = !isCompleted;
        setIsCompleted(newCompleted);

        try {
            const result = await onComplete(newCompleted);

            if (newCompleted && !disabled) {
                fireSmallConfetti();

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
            className={cn(
                "habit-card group p-3 sm:p-5",
                disabled && "opacity-60"
            )}
        >
            {/* Streak celebration overlay */}
            <AnimatePresence>
                {showStreak && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500/90 to-red-500/90"
                    >
                        <div className="text-center text-white">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                            >
                                <Flame className="mx-auto h-10 w-10 sm:h-12 sm:w-12" />
                            </motion.div>
                            <p className="mt-2 text-lg sm:text-xl font-bold">{habit.streak.current} Day Streak!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-3 sm:gap-4">
                {/* Checkbox */}
                <motion.button
                    whileHover={!disabled ? { scale: 1.1 } : undefined}
                    whileTap={!disabled ? { scale: 0.9 } : undefined}
                    onClick={handleComplete}
                    disabled={isLoading || disabled}
                    className={cn(
                        "flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-lg sm:rounded-xl",
                        "border-2 transition-all duration-300",
                        isCompleted
                            ? `bg-gradient-to-br ${colors.gradient} border-transparent shadow-lg`
                            : "border-surface-300 hover:border-primary-400 dark:border-surface-800",
                        disabled && "cursor-not-allowed"
                    )}
                >
                    <AnimatePresence mode="wait">
                        {isCompleted ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="flex flex-col items-center justify-center"
                            >
                                <span className="text-sm font-bold text-white">
                                    {new Date().getDate()}
                                </span>
                                <Check className="h-3 w-3 text-white/80" strokeWidth={4} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="h-5 w-5 sm:h-6 sm:w-6"
                            />
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Icon */}
                <div
                    className={cn(
                        "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg sm:rounded-xl",
                        colors.bg
                    )}
                >
                    <HabitIcon name={habit.icon} size={24} className={colors.text} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <h3
                        className={cn(
                            "font-semibold text-sm sm:text-base text-surface-900 transition-all duration-300 dark:text-white truncate",
                            isCompleted && "line-through opacity-60"
                        )}
                    >
                        {habit.title}
                    </h3>
                    <div className="mt-0.5 sm:mt-1 flex items-center gap-2 sm:gap-3 flex-wrap">
                        <span className={cn("text-[10px] sm:text-xs font-medium", colors.text)}>
                            {habit.category}
                        </span>

                        {habit.streak.current > 0 && (
                            <div className="flex items-center gap-1 text-orange-500">
                                <Flame className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                <span className="text-[10px] sm:text-xs font-semibold">{habit.streak.current}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="rounded-lg p-1.5 sm:p-2 opacity-100 sm:opacity-0 transition-all hover:bg-surface-100 group-hover:opacity-100 dark:hover:bg-surface-800"
                    >
                        <MoreVertical className="h-4 w-4 sm:h-5 sm:w-5 text-surface-400" />
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
                                    className="absolute right-0 top-full z-20 mt-2 w-40 sm:w-48 overflow-hidden rounded-xl border border-surface-200 bg-white shadow-xl dark:border-surface-800 dark:bg-surface-900"
                                >
                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            onEdit();
                                        }}
                                        className="flex w-full items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 transition-colors hover:bg-surface-100 dark:hover:bg-surface-800"
                                    >
                                        <Edit className="h-4 w-4 text-surface-400" />
                                        <span className="text-sm text-surface-900 dark:text-white">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            onDelete();
                                        }}
                                        className="flex w-full items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                        <span className="text-sm">Delete</span>
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Progress bar for target count > 1 */}
            {habit.targetCount > 1 && (
                <div className="mt-3 sm:mt-4">
                    <div className="mb-1.5 sm:mb-2 flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-surface-400">Progress</span>
                        <span className={colors.text}>
                            {habit.todayLog?.count ?? 0} / {habit.targetCount}
                        </span>
                    </div>
                    <div className="h-1.5 sm:h-2 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
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
