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
        <div className="card p-3 sm:p-4">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-[11px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">Daily Progress</h3>
                <span className="text-[10px] font-semibold text-black/30 dark:text-white/30 uppercase tracking-widest">
                    {completed}/{total} DONE
                </span>
            </div>

            <div className="flex items-center gap-4 sm:gap-6">
                {/* Progress Ring - Compact */}
                <div className="flex-shrink-0">
                    <ProgressRing
                        progress={percentage}
                        size={84}
                        strokeWidth={8}
                    >
                        <div className="text-center">
                            <motion.div
                                key={percentage}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-xl font-semibold text-black dark:text-white"
                            >
                                {percentage}%
                            </motion.div>
                        </div>
                    </ProgressRing>
                </div>

                {/* Stats Grid - High Density */}
                <div className="flex-1 grid grid-cols-2 gap-2 sm:gap-3 w-full">
                    <motion.div
                        whileHover={{ y: -1 }}
                        className="rounded-lg border border-black/5 bg-black/[0.02] p-2 dark:border-white/5 dark:bg-white/5"
                    >
                        <div className="mb-1 flex items-center gap-1.5 text-black/30">
                            <Flame className="h-3 w-3" />
                            <span className="text-[9px] font-semibold uppercase tracking-widest">Current</span>
                        </div>
                        <div className="text-lg font-semibold text-black dark:text-white">{currentStreak}</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -1 }}
                        className="rounded-lg border border-black/5 bg-black/[0.02] p-2 dark:border-white/5 dark:bg-white/5"
                    >
                        <div className="mb-1 flex items-center gap-1.5 text-black/30">
                            <Trophy className="h-3 w-3" />
                            <span className="text-[9px] font-semibold uppercase tracking-widest">Best</span>
                        </div>
                        <div className="text-lg font-semibold text-black dark:text-white">{longestStreak}</div>
                    </motion.div>

                    <motion.div
                        whileHover={{ y: -1 }}
                        className="col-span-2 rounded-lg border border-black/5 bg-black p-2 text-white dark:border-white/5 dark:bg-white dark:text-black"
                    >
                        <div className="mb-1 flex items-center gap-1.5 opacity-40">
                            <Target className="h-3 w-3" />
                            <span className="text-[9px] font-semibold uppercase tracking-widest">Goal Status</span>
                        </div>
                        <div className="text-[11px] font-semibold uppercase tracking-tight">
                            {percentage === 100 ? "Limitless Achievement" : `${total - completed} MORE TO GO`}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
