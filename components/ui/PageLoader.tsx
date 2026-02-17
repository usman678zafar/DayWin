"use client";

import { motion } from "framer-motion";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";
import { cn } from "@/lib/utils";

interface PageLoaderProps {
    className?: string;
    fullScreen?: boolean;
}

export function PageLoader({ className, fullScreen = true }: PageLoaderProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center bg-white dark:bg-[#030305]",
                fullScreen ? "fixed inset-0 z-[100]" : "w-full h-full py-20",
                className
            )}
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.03, 0.06, 0.03]
                    }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#4D7CFE] blur-[120px]"
                />
            </div>

            <div className="relative flex flex-col items-center">
                {/* Rotating Ring */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-8 rounded-full border border-t-[#4D7CFE] border-r-transparent border-b-transparent border-l-transparent opacity-40"
                />

                {/* Second Counter-Rotating Ring */}
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute -inset-12 rounded-full border border-b-purple-500 border-r-transparent border-t-transparent border-l-transparent opacity-20"
                />

                {/* Logo with Bounce & Pulse */}
                <motion.div
                    animate={{
                        scale: [0.95, 1.05, 0.95],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    <DailyWinLogo
                        iconClassName="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl shadow-2xl"
                        textClassName="hidden"
                    />
                </motion.div>

                {/* Loading Text */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/30 ml-[0.4em]">
                        Preparing Your Day
                    </span>
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                                className="h-1 w-1 rounded-full bg-[#4D7CFE]"
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
