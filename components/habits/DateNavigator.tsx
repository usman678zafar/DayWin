"use client";

import { format, addDays, subDays, isToday, isFuture } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/DatePicker";

interface DateNavigatorProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    className?: string;
}

export function DateNavigator({ selectedDate, onDateChange, className }: DateNavigatorProps) {
    const goToPreviousDay = () => {
        onDateChange(subDays(selectedDate, 1));
    };

    const goToNextDay = () => {
        const nextDay = addDays(selectedDate, 1);
        if (!isFuture(nextDay) || isToday(nextDay)) {
            onDateChange(nextDay);
        }
    };

    const goToToday = () => {
        onDateChange(new Date());
    };

    const isSelectedToday = isToday(selectedDate);
    const canGoNext = !isFuture(addDays(selectedDate, 1)) || isToday(addDays(selectedDate, 1));

    const getDateLabel = () => {
        if (isToday(selectedDate)) return "Today";
        if (isToday(addDays(selectedDate, 1))) return "Yesterday";
        return format(selectedDate, "EEEE");
    };

    return (
        <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
            <div className="flex items-center gap-3">
                {/* Previous Day */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToPreviousDay}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 bg-white text-black transition hover:border-black/30 hover:bg-black hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white dark:hover:text-black"
                >
                    <ChevronLeft className="h-5 w-5" />
                </motion.button>

                {/* Date Display */}
                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                        {getDateLabel()}
                    </span>
                    <span className="text-lg font-bold text-black dark:text-white">
                        {format(selectedDate, "MMM d, yyyy")}
                    </span>
                </div>

                {/* Next Day */}
                <motion.button
                    whileHover={canGoNext ? { scale: 1.05 } : undefined}
                    whileTap={canGoNext ? { scale: 0.95 } : undefined}
                    onClick={goToNextDay}
                    disabled={!canGoNext}
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 bg-white text-black transition dark:border-white/15 dark:bg-white/5 dark:text-white",
                        canGoNext
                            ? "hover:border-black/30 hover:bg-black hover:text-white dark:hover:border-white/30 dark:hover:bg-white dark:hover:text-black"
                            : "cursor-not-allowed opacity-30"
                    )}
                >
                    <ChevronRight className="h-5 w-5" />
                </motion.button>
            </div>

            <div className="flex items-center gap-3">
                {/* Date Picker */}
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        if (!isFuture(date) || isToday(date)) {
                            onDateChange(date);
                        }
                    }}
                />

                {/* Today Button */}
                {!isSelectedToday && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={goToToday}
                        className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                    >
                        <CalendarDays className="h-4 w-4" />
                        Today
                    </motion.button>
                )}
            </div>
        </div>
    );
}
