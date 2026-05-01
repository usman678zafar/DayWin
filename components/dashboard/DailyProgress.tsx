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
        <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-slate-50 to-white p-6 dark:from-slate-950/20 dark:to-white/[0.02] dark:border-white/5"
        >
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">Daily Progress</h3>
                <span className="text-xs font-semibold text-black/30 dark:text-white/30 uppercase tracking-wider">
                    {completed}/{total} DONE
                </span>
            </div>

            <div className="flex items-center gap-6 sm:gap-8">
                {/* Progress Ring */}
                <div className="flex-shrink-0">
                    <ProgressRing
                        progress={percentage}
                        size={120}
                        strokeWidth={10}
                    >
                        <div className="text-center">
                            <motion.div
                                key={percentage}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-3xl font-bold text-black dark:text-white"
                            >
                                {percentage}%
                            </motion.div>
                        </div>
                    </ProgressRing>
                </div>

                {/* Stats Grid */}
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <motion.div
                        whileHover={{ y: -2 }}
                        className="rounded-xl border border-black/5 bg-gradient-to-br from-orange-50 to-white p-4 dark:from-orange-950/20 dark:to-white/[0.02] dark:border-white/5"
                    >
                        <div className="mb-2 flex items-center gap-2 text-black/30">
                            <Flame className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Current Streak</span>
                        </div>
                        <div className="text-2xl font-bold text-black dark:text-white">{currentStreak}</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -2 }}
                        className="rounded-xl border border-black/5 bg-gradient-to-br from-yellow-50 to-white p-4 dark:from-yellow-950/20 dark:to-white/[0.02] dark:border-white/5"
                    >
                        <div className="mb-2 flex items-center gap-2 text-black/30">
                            <Trophy className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Best Streak</span>
                        </div>
                        <div className="text-2xl font-bold text-black dark:text-white">{longestStreak}</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -2 }}
                        className="col-span-2 rounded-xl border border-black/5 bg-gradient-to-br from-slate-100 to-slate-50 p-4 dark:from-slate-800/50 dark:to-slate-900/50 dark:border-white/5"
                    >
                        <div className="mb-2 flex items-center gap-2 text-black/30">
                            <Target className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-wider">Goal Status</span>
                        </div>
                        <div className="text-sm font-bold uppercase tracking-tight text-black dark:text-white">
                            {percentage === 100 ? "🎉 Limitless Achievement" : `${total - completed} more to go`}
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
