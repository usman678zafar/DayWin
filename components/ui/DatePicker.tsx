"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    selected: Date;
    onChange: (date: Date) => void;
    className?: string;
}

export function DatePicker({ selected, onChange, className }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(selected);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderDays = () => {
        const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        return (
            <div className="grid grid-cols-7 mb-1">
                {days.map((day) => (
                    <div key={day} className="py-2 text-center text-xs font-medium text-black/40 dark:text-white/40">
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const cloneDay = day;
                const isSelected = isSameDay(day, selected);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isToday = isSameDay(day, new Date());

                days.push(
                    <button
                        key={day.toString()}
                        type="button"
                        onClick={() => {
                            onChange(cloneDay);
                            setIsOpen(false);
                        }}
                        disabled={!isCurrentMonth}
                        className={cn(
                            "w-8 h-8 rounded-lg text-sm font-medium transition-all",
                            !isCurrentMonth && "opacity-30 cursor-not-allowed",
                            isCurrentMonth && !isSelected && "hover:bg-black/5 dark:hover:bg-white/10",
                            isSelected && "bg-black text-white dark:bg-white dark:text-black",
                            isToday && !isSelected && "ring-1 ring-black/20 dark:ring-white/20"
                        )}
                    >
                        {format(day, "d")}
                    </button>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day.toString()} className="grid grid-cols-7 gap-1">
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
    };

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:border-black/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
            >
                <Calendar className="h-4 w-4" />
                {format(selected, "MMM d, yyyy")}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-black/10 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-surface-900"
                    >
                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-semibold text-black dark:text-white">
                                {format(currentMonth, "MMMM yyyy")}
                            </span>
                            <button
                                type="button"
                                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        {renderDays()}
                        {renderCells()}

                        {/* Quick Actions */}
                        <div className="mt-4 flex gap-2 border-t border-black/10 pt-4 dark:border-white/10">
                            <button
                                type="button"
                                onClick={() => {
                                    onChange(new Date());
                                    setIsOpen(false);
                                }}
                                className="flex-1 rounded-lg bg-black/5 py-2 text-xs font-semibold uppercase tracking-wider text-black/70 transition hover:bg-black/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                            >
                                Today
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
