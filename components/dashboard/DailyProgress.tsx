"use client";

import { motion } from "framer-motion";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Flame, Trophy, Target } from "lucide-react";

interface DailyProgressProps {
    completed: number;
    total: number;
    currentStreak: number;
    longestStreak: number;
}

export function DailyProgress({
    completed,
    total,
    currentStreak,
    longestStreak,
}: DailyProgressProps) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="card">
            <div className="mb-4 sm:mb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <h3 className="text-base sm:text-lg font-semibold text-black dark:text-white">Daily Progress</h3>
                <span className="rounded-full border border-black/15 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.1em] text-black/60 dark:border-white/15 dark:text-white/60 self-start sm:self-auto">
                    {completed}/{total} completed
                </span>
            </div>

            <div className="flex flex-col items-center gap-6 sm:gap-8 md:flex-row">
                {/* Progress Ring - Smaller on mobile */}
                <div className="flex-shrink-0">
                    <ProgressRing
                        progress={percentage}
                        size={120}
                        strokeWidth={10}
                        className="sm:hidden"
                    >
                        <div className="text-center">
                            <motion.div
                                key={percentage}
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-3xl font-black text-black dark:text-white"
                            >
                                {percentage}%
                            </motion.div>
                        </div>
                    </ProgressRing>
                    <ProgressRing
                        progress={percentage}
                        size={150}
                        strokeWidth={11}
                        className="hidden sm:block"
                    >
                        <div className="text-center">
                            <motion.div
                                key={percentage}
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl font-black text-black dark:text-white"
                            >
                                {percentage}%
                            </motion.div>
                        </div>
                    </ProgressRing>
                </div>

                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-2 gap-3 sm:gap-4 w-full">
                    <motion.div
                        whileHover={{ y: -2 }}
                        className="rounded-xl border border-black/10 bg-white p-3 sm:p-4 dark:border-white/10 dark:bg-white/5"
                    >
                        <div className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-black/60 dark:text-white/60">
                            <Flame className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.1em]">Current</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-black dark:text-white">{currentStreak}</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -2 }}
                        className="rounded-xl border border-black/10 bg-white p-3 sm:p-4 dark:border-white/10 dark:bg-white/5"
                    >
                        <div className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 text-black/60 dark:text-white/60">
                            <Trophy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.1em]">Best</span>
                        </div>
                        <div className="text-2xl sm:text-3xl font-black text-black dark:text-white">{longestStreak}</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -2 }}
                        className="col-span-2 rounded-xl border border-black/10 bg-black p-3 sm:p-4 text-white dark:border-white/10 dark:bg-white dark:text-black"
                    >
                        <div className="mb-1.5 sm:mb-2 flex items-center gap-1.5 sm:gap-2 opacity-80">
                            <Target className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                            <span className="text-[9px] sm:text-xs font-semibold uppercase tracking-[0.1em]">Today&apos;s Goal</span>
                        </div>
                        <div className="text-sm sm:text-base font-semibold">
                            {completed} of {total} habits completed
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
