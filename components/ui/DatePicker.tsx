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
    value: Date;
    onChange: (date: Date) => void;
    label?: string;
    className?: string;
    align?: "left" | "right" | "center";
}

export function DatePicker({ value, onChange, label, className, align = "left" }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value);
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
                    <div key={day} className="py-2 text-center text-[10px] sm:text-xs font-medium text-black/40 dark:text-white/40">
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
                const isSelected = isSameDay(day, value);
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
                            "w-8 h-8 sm:w-8 sm:h-8 flex items-center justify-center rounded-lg text-xs sm:text-sm font-medium transition-all",
                            !isCurrentMonth && "opacity-10 cursor-not-allowed",
                            isCurrentMonth && !isSelected && "hover:bg-black/5 dark:hover:bg-white/10",
                            isSelected && "bg-black text-white dark:bg-white dark:text-black shadow-lg",
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
        <div ref={containerRef} className={cn("relative w-full", className)}>
            {label && (
                <label className="block text-sm font-bold text-black dark:text-white mb-2 uppercase tracking-wide text-[10px]">
                    {label}
                </label>
            )}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center gap-2 rounded-xl border border-black/15 bg-white px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-black transition hover:border-black/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
            >
                <Calendar className="h-4 w-4 text-[#4D7CFE]" />
                <span className="truncate">
                    {format(value, "MMM d, yyyy")}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className={cn(
                            "fixed sm:absolute z-[100] mt-2 w-[calc(100vw-2.5rem)] sm:w-72 rounded-2xl border border-black/10 bg-white p-3 sm:p-4 shadow-2xl dark:border-white/10 dark:bg-[#1a1a1a]",
                            // Mobile positioning (centered)
                            "left-5 right-5 top-1/2 -translate-y-1/2 sm:top-full sm:translate-y-0",
                            // Desktop positioning (based on align prop)
                            align === "left" && "sm:left-0 sm:right-auto",
                            align === "right" && "sm:left-auto sm:right-0",
                            align === "center" && "sm:left-1/2 sm:-translate-x-1/2"
                        )}
                    >
                        {/* mobile backdrop for centered modal style */}
                        <div className="sm:hidden fixed inset-0 -z-10 bg-black/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-bold text-black dark:text-white">
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
