"use client";

import { useState } from "react";
import {
    format,
    subDays,
    subWeeks,
    subMonths,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isSameDay,
    addMonths,
    subMonths as dateFnsSubMonths,
    startOfDay,
} from "date-fns";
import { CalendarRange, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DateRange {
    startDate: Date;
    endDate: Date;
    label: string;
}

interface DateRangePickerProps {
    value: DateRange;
    onChange: (range: DateRange) => void;
    className?: string;
}

const presetRanges: { label: string; getRange: () => DateRange }[] = [
    {
        label: "Last 7 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 6),
            endDate: new Date(),
            label: "Last 7 Days",
        }),
    },
    {
        label: "Last 14 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 13),
            endDate: new Date(),
            label: "Last 14 Days",
        }),
    },
    {
        label: "Last 30 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 29),
            endDate: new Date(),
            label: "Last 30 Days",
        }),
    },
    {
        label: "This Week",
        getRange: () => ({
            startDate: startOfWeek(new Date()),
            endDate: endOfWeek(new Date()),
            label: "This Week",
        }),
    },
    {
        label: "Last Week",
        getRange: () => ({
            startDate: startOfWeek(subWeeks(new Date(), 1)),
            endDate: endOfWeek(subWeeks(new Date(), 1)),
            label: "Last Week",
        }),
    },
    {
        label: "This Month",
        getRange: () => ({
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
            label: "This Month",
        }),
    },
    {
        label: "Last Month",
        getRange: () => ({
            startDate: startOfMonth(subMonths(new Date(), 1)),
            endDate: endOfMonth(subMonths(new Date(), 1)),
            label: "Last Month",
        }),
    },
];

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectingStart, setSelectingStart] = useState(true);
    const [tempStart, setTempStart] = useState<Date | null>(null);
    const [tempEnd, setTempEnd] = useState<Date | null>(null);
    const [viewMonth, setViewMonth] = useState(new Date());

    const handlePresetSelect = (preset: typeof presetRanges[0]) => {
        const range = preset.getRange();
        onChange(range);
        setIsOpen(false);
    };

    const handleDayClick = (date: Date) => {
        if (selectingStart) {
            setTempStart(date);
            setTempEnd(null);
            setSelectingStart(false);
        } else {
            if (tempStart && date >= tempStart) {
                setTempEnd(date);
                onChange({
                    startDate: tempStart,
                    endDate: date,
                    label: `${format(tempStart, "MMM d")} - ${format(date, "MMM d, yyyy")}`,
                });
                setIsOpen(false);
                setSelectingStart(true);
                setTempStart(null);
                setTempEnd(null);
            } else {
                // If end date is before start, swap them
                setTempStart(date);
                setSelectingStart(false);
            }
        }
    };

    const renderCalendar = () => {
        const monthStart = startOfMonth(viewMonth);
        const daysInMonth = new Date(
            viewMonth.getFullYear(),
            viewMonth.getMonth() + 1,
            0
        ).getDate();
        const startDay = monthStart.getDay();

        const days = [];

        // Empty cells for offset
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} />);
        }

        // Day cells
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i);
            const isSelected =
                (tempStart && isSameDay(date, tempStart)) ||
                (tempEnd && isSameDay(date, tempEnd));
            const isInRange =
                tempStart &&
                tempEnd &&
                date > tempStart &&
                date < tempEnd;
            const isStart = tempStart && isSameDay(date, tempStart);
            const isEnd = tempEnd && isSameDay(date, tempEnd);

            days.push(
                <button
                    key={i}
                    onClick={() => handleDayClick(date)}
                    className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition",
                        isSelected
                            ? "bg-[#4D7CFE] text-white"
                            : isInRange
                                ? "bg-[#4D7CFE]/20 text-[#4D7CFE]"
                                : "hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                >
                    {i}
                </button>
            );
        }

        return days;
    };

    return (
        <div className={cn("relative", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:border-black/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
            >
                <CalendarRange className="h-4 w-4" />
                <span>{value.label}</span>
                <ChevronDown
                    className={cn("h-4 w-4 transition", isOpen && "rotate-180")}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => {
                                setIsOpen(false);
                                setSelectingStart(true);
                                setTempStart(null);
                                setTempEnd(null);
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-black/10 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-surface-900"
                        >
                            {/* Presets */}
                            <div className="mb-4">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    Quick Select
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {presetRanges.map((preset) => (
                                        <button
                                            key={preset.label}
                                            onClick={() => handlePresetSelect(preset)}
                                            className={cn(
                                                "rounded-lg px-3 py-2 text-xs font-medium transition",
                                                value.label === preset.label
                                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                                    : "bg-black/5 text-black/70 hover:bg-black/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                                            )}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Range Calendar */}
                            <div className="border-t border-black/10 pt-4 dark:border-white/10">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    {selectingStart
                                        ? "Select Start Date"
                                        : "Select End Date"}
                                </p>

                                {/* Month Navigation */}
                                <div className="mb-3 flex items-center justify-between">
                                    <button
                                        onClick={() =>
                                            setViewMonth(dateFnsSubMonths(viewMonth, 1))
                                        }
                                        className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="text-sm font-semibold text-black dark:text-white">
                                        {format(viewMonth, "MMMM yyyy")}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setViewMonth(addMonths(viewMonth, 1))
                                        }
                                        className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Day Headers */}
                                <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-semibold text-black/40 dark:text-white/40">
                                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                                        (d) => (
                                            <div key={d} className="py-1">
                                                {d}
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {renderCalendar()}
                                </div>

                                {/* Selection Info */}
                                {(tempStart || tempEnd) && (
                                    <div className="mt-3 flex items-center justify-between rounded-lg bg-black/5 px-3 py-2 text-xs dark:bg-white/5">
                                        <span className="text-black/60 dark:text-white/60">
                                            {tempStart
                                                ? format(tempStart, "MMM d, yyyy")
                                                : "—"}
                                        </span>
                                        <span className="text-black/40 dark:text-white/40">
                                            →
                                        </span>
                                        <span className="text-black/60 dark:text-white/60">
                                            {tempEnd
                                                ? format(tempEnd, "MMM d, yyyy")
                                                : "Select end"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
