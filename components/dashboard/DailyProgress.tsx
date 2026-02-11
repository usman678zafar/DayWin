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
            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Progress Ring */}
                <div className="flex-shrink-0">
                    <ProgressRing progress={percentage} size={160} strokeWidth={12}>
                        <div className="text-center">
                            <motion.div
                                key={percentage}
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl font-bold text-surface-900 dark:text-white"
                            >
                                {percentage}%
                            </motion.div>
                            <div className="text-sm text-surface-200/50">
                                {completed}/{total}
                            </div>
                        </div>
                    </ProgressRing>
                </div>

                {/* Stats */}
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    {/* Current Streak */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border border-orange-100 dark:border-orange-900/30"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Flame className="w-5 h-5 text-orange-500" />
                            <span className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                Current Streak
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-surface-900 dark:text-white">
                            {currentStreak}
                            <span className="text-lg font-normal text-surface-200/50 ml-1">days</span>
                        </div>
                    </motion.div>

                    {/* Longest Streak */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border border-yellow-100 dark:border-yellow-900/30"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                Best Streak
                            </span>
                        </div>
                        <div className="text-3xl font-bold text-surface-900 dark:text-white">
                            {longestStreak}
                            <span className="text-lg font-normal text-surface-200/50 ml-1">days</span>
                        </div>
                    </motion.div>

                    {/* Today's Goal */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-900/30 col-span-2"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <Target className="w-5 h-5 text-green-500" />
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">
                                Today's Progress
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="text-lg font-semibold text-surface-900 dark:text-white">
                                {completed} of {total} habits completed
                            </div>
                            {percentage === 100 && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-2xl"
                                >
                                    🎉
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
