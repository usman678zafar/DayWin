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
            <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black dark:text-white">Daily Progress</h3>
                <span className="rounded-full border border-black/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-black/60 dark:border-white/15 dark:text-white/60">
                    {completed}/{total} completed
                </span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                    <ProgressRing progress={percentage} size={150} strokeWidth={11}>
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

                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="mb-2 flex items-center gap-2 text-black/60 dark:text-white/60">
                            <Flame className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-[0.1em]">Current Streak</span>
                        </div>
                        <div className="text-3xl font-black text-black dark:text-white">{currentStreak}</div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="mb-2 flex items-center gap-2 text-black/60 dark:text-white/60">
                            <Trophy className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-[0.1em]">Best Streak</span>
                        </div>
                        <div className="text-3xl font-black text-black dark:text-white">{longestStreak}</div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="col-span-2 rounded-xl border border-black/10 bg-black p-4 text-white dark:border-white/10 dark:bg-white dark:text-black">
                        <div className="mb-2 flex items-center gap-2 opacity-80">
                            <Target className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-[0.1em]">Today&apos;s Goal</span>
                        </div>
                        <div className="text-base font-semibold">
                            {completed} of {total} habits completed
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

