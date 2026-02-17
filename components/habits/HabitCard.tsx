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
                "card group relative overflow-hidden transition-all duration-500",
                isCompleted && "opacity-80",
                disabled && "opacity-60 grayscale pointer-events-none"
            )}
        >
            {/* Smooth Gradient Glow on Hover */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-br blur-3xl -z-10",
                colors.bg.replace("bg-", "from-").replace("/10", "/05"),
                "to-transparent"
            )} />

            {/* Streak celebration overlay */}
            <AnimatePresence>
                {showStreak && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-20 flex items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-[#4D7CFE] via-purple-600 to-pink-500"
                    >
                        <div className="text-center text-white">
                            <motion.div
                                animate={{ y: [0, -8, 0], rotate: [0, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 1 }}
                            >
                                <Flame className="mx-auto h-12 w-12" strokeWidth={2.5} />
                            </motion.div>
                            <p className="mt-2 text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">
                                {habit.streak.current} DAY STREAK!
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-4 sm:gap-6">
                {/* Premium Checkbox */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleComplete}
                    disabled={isLoading || disabled}
                    className={cn(
                        "relative flex h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-2xl sm:rounded-3xl transition-all duration-500",
                        isCompleted
                            ? `bg-gradient-to-br ${colors.gradient} shadow-2xl ${colors.checkedText.replace("text-", "shadow-")}/20`
                            : "bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10"
                    )}
                >
                    <AnimatePresence mode="wait">
                        {isCompleted ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0, rotate: -45 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 45 }}
                                className="flex flex-col items-center justify-center"
                            >
                                <span className="text-lg font-black text-white leading-none">
                                    {new Date().getDate()}
                                </span>
                                <Check className="mt-0.5 h-4 w-4 text-white/90" strokeWidth={4} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-xl font-black text-black/40 dark:text-white/10"
                            >
                                {new Date().getDate()}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={cn(
                            "text-[10px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-full border",
                            colors.text,
                            colors.bg.replace("/10", "/05"),
                            "border-current/20"
                        )}>
                            {habit.category}
                        </span>
                        {habit.streak.current > 0 && (
                            <div className="flex items-center gap-1 text-[#FBBF24]">
                                <Flame className="h-3 w-3" fill="currentColor" />
                                <span className="text-[10px] font-black">{habit.streak.current}</span>
                            </div>
                        )}
                    </div>
                    <h3
                        className={cn(
                            "font-black text-base sm:text-xl text-black transition-all duration-500 dark:text-white truncate tracking-tight",
                            isCompleted && "opacity-60 line-through decoration-2"
                        )}
                    >
                        {habit.title}
                    </h3>
                </div>

                {/* Premium Icon & Menu */}
                <div className="flex items-center gap-2">
                    <div
                        className={cn(
                            "hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-500",
                            isCompleted ? "bg-black/5 dark:bg-white/5 opacity-50" : colors.bg,
                            "shadow-inner"
                        )}
                    >
                        <HabitIcon name={habit.icon} size={24} className={colors.text} />
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="rounded-xl p-2 transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-90"
                        >
                            <MoreVertical className="h-5 w-5 text-black/60 dark:text-white/20" />
                        </button>

                        <AnimatePresence>
                            {showMenu && (
                                <>
                                    <div
                                        className="fixed inset-0 z-[60]"
                                        onClick={() => setShowMenu(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95, y: 10, x: 10 }}
                                        animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95, y: 10, x: 10 }}
                                        className="absolute right-0 bottom-full sm:top-full sm:bottom-auto mb-2 sm:mb-0 sm:mt-2 w-48 overflow-hidden rounded-[1.5rem] border border-black/5 bg-white/95 p-1.5 shadow-2xl backdrop-blur-xl dark:border-white/[0.05] dark:bg-[#1A1A24]/95 z-[70]"
                                    >
                                        <button
                                            onClick={() => {
                                                setShowMenu(false);
                                                onEdit();
                                            }}
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-black/70 transition-all hover:bg-black/5 dark:text-white/70 dark:hover:bg-white/5"
                                        >
                                            <Edit className="h-4 w-4" />
                                            <span>Edit Habit</span>
                                        </button>
                                        <button
                                            onClick={() => {
                                                setShowMenu(false);
                                                onDelete();
                                            }}
                                            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-500/10"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            <span>Delete</span>
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Premium Progress Bar */}
            {habit.targetCount > 1 && (
                <div className="mt-5 sm:mt-6">
                    <div className="mb-2 flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-widest text-black/70 dark:text-white/20">Momentum</span>
                        <span className={cn("text-xs font-black", colors.text)}>
                            {habit.todayLog?.count ?? 0} <span className="opacity-60">/ {habit.targetCount}</span>
                        </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-black/5 dark:bg-white/5 p-0.5 shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width: `${Math.min(((habit.todayLog?.count ?? 0) / habit.targetCount) * 100, 100)}%`,
                            }}
                            className={cn("h-full rounded-full bg-gradient-to-r shadow-sm transition-all duration-1000", colors.gradient)}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
}
