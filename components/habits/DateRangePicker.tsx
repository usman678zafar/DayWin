"use client";

import { useState } from "react";
import { format, subDays, subWeeks, subMonths, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";
import { CalendarRange, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/DatePicker";

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
    {
        label: "Last 7 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 6),
            endDate: new Date(),
            label: "Last 7 Days",
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
        label: "Last 90 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 89),
            endDate: new Date(),
            label: "Last 90 Days",
        }),
    },
];

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [customStart, setCustomStart] = useState(value.startDate);
    const [customEnd, setCustomEnd] = useState(value.endDate);

    const handlePresetSelect = (preset: typeof presetRanges[0]) => {
        const range = preset.getRange();
        onChange(range);
        setIsOpen(false);
    };

    const handleCustomApply = () => {
        onChange({
            startDate: customStart,
            endDate: customEnd,
            label: `${format(customStart, "MMM d")} - ${format(customEnd, "MMM d")}`,
        });
        setIsOpen(false);
    };

    return (
        <div className={cn("relative", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:border-black/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
            >
                <CalendarRange className="h-4 w-4" />
                <span>{value.label}</span>
                <ChevronDown className={cn("h-4 w-4 transition", isOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
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
                                                "rounded-lg px-3 py-2 text-sm font-medium transition",
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

                            {/* Custom Range */}
                            <div className="border-t border-black/10 pt-4 dark:border-white/10">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    Custom Range
                                </p>
                                <div className="space-y-3">
                                    <div>
                                        <label className="mb-1 block text-xs text-black/60 dark:text-white/60">
                                            From
                                        </label>
                                        <DatePicker
                                            selected={customStart}
                                            onChange={setCustomStart}
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1 block text-xs text-black/60 dark:text-white/60">
                                            To
                                        </label>
                                        <DatePicker
                                            selected={customEnd}
                                            onChange={setCustomEnd}
                                            className="w-full"
                                        />
                                    </div>
                                    <button
                                        onClick={handleCustomApply}
                                        className="w-full rounded-lg bg-black py-2.5 text-sm font-semibold text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                                    >
                                        Apply Range
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
