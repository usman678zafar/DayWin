"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight, ChevronLeft, Search, X, Check, CalendarDays, Settings, Calendar, Plus, CalendarRange
} from "lucide-react";
import { format, differenceInDays, addDays } from "date-fns";
import { DatePicker } from "@/components/ui/DatePicker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { HabitIcon } from "./HabitIcon";
import {
    Habit,
    HabitColor,
    HabitCategory,
    HabitType,
    habitCategories,
    habitTypeOptions,
} from "@/types";

interface HabitFormProps {
    habit?: Partial<Habit>;
    onSubmit: (data: Partial<Habit>) => Promise<void>;
    onCancel: () => void;
    defaultHabitType?: HabitType;
}

// Organized icons by category
const iconsByCategory: Record<string, { name: string; label: string }[]> = {
    fitness: [
        { name: "Dumbbell", label: "Workout" },
        { name: "Activity", label: "Exercise" },
        { name: "Bike", label: "Cycling" },
        { name: "Walk", label: "Walking" },
        { name: "Flame", label: "Cardio" },
    ],
    health: [
        { name: "Heart", label: "Health" },
        { name: "Apple", label: "Nutrition" },
        { name: "Droplets", label: "Water" },
        { name: "Pill", label: "Medication" },
        { name: "Moon", label: "Sleep" },
        { name: "Cigarette", label: "Quit Smoking" },
        { name: "Wine", label: "No Alcohol" },
    ],
    mindfulness: [
        { name: "Brain", label: "Meditation" },
        { name: "Sun", label: "Morning" },
        { name: "Smile", label: "Gratitude" },
        { name: "Leaf", label: "Nature" },
        { name: "Sparkles", label: "Self-care" },
    ],
    learning: [
        { name: "Book", label: "Reading" },
        { name: "Pen", label: "Writing" },
        { name: "Code", label: "Coding" },
    ],
    productivity: [
        { name: "Target", label: "Goals" },
        { name: "CheckCircle", label: "Tasks" },
        { name: "ListTodo", label: "To-do" },
        { name: "Clock", label: "Time" },
        { name: "Calendar", label: "Planning" },
        { name: "Briefcase", label: "Work" },
        { name: "Zap", label: "Energy" },
    ],
    creativity: [
        { name: "Music", label: "Music" },
        { name: "Palette", label: "Art" },
        { name: "Camera", label: "Photo" },
    ],
    finance: [
        { name: "DollarSign", label: "Money" },
        { name: "PiggyBank", label: "Savings" },
        { name: "TrendingUp", label: "Investing" },
    ],
    social: [
        { name: "Users", label: "Social" },
        { name: "MessageCircle", label: "Chat" },
        { name: "Phone", label: "Calls" },
        { name: "Home", label: "Family" },
    ],
    other: [
        { name: "Star", label: "Favorite" },
        { name: "Trophy", label: "Achievement" },
        { name: "Coffee", label: "Coffee" },
    ],
};

// Color options with actual CSS color values
const colorOptions: {
    value: HabitColor;
    label: string;
    colors: { from: string; to: string; bg: string; text: string };
}[] = [
        { value: "violet", label: "Violet", colors: { from: "#8b5cf6", to: "#7c3aed", bg: "#ede9fe", text: "#7c3aed" } },
        { value: "purple", label: "Purple", colors: { from: "#a855f7", to: "#9333ea", bg: "#f3e8ff", text: "#9333ea" } },
        { value: "blue", label: "Blue", colors: { from: "#3b82f6", to: "#2563eb", bg: "#dbeafe", text: "#2563eb" } },
        { value: "cyan", label: "Cyan", colors: { from: "#06b6d4", to: "#0891b2", bg: "#cffafe", text: "#0891b2" } },
        { value: "teal", label: "Teal", colors: { from: "#14b8a6", to: "#0d9488", bg: "#ccfbf1", text: "#0d9488" } },
        { value: "green", label: "Green", colors: { from: "#22c55e", to: "#16a34a", bg: "#dcfce7", text: "#16a34a" } },
        { value: "lime", label: "Lime", colors: { from: "#84cc16", to: "#65a30d", bg: "#ecfccb", text: "#65a30d" } },
        { value: "yellow", label: "Yellow", colors: { from: "#eab308", to: "#ca8a04", bg: "#fef9c3", text: "#ca8a04" } },
        { value: "orange", label: "Orange", colors: { from: "#f97316", to: "#ea580c", bg: "#ffedd5", text: "#ea580c" } },
        { value: "red", label: "Red", colors: { from: "#ef4444", to: "#dc2626", bg: "#fee2e2", text: "#dc2626" } },
        { value: "pink", label: "Pink", colors: { from: "#ec4899", to: "#db2777", bg: "#fce7f3", text: "#db2777" } },
        { value: "rose", label: "Rose", colors: { from: "#f43f5e", to: "#e11d48", bg: "#ffe4e6", text: "#e11d48" } },
    ];

const frequencyOptions = [
    { value: "daily", label: "Every Day", description: "Repeat daily" },
    { value: "weekly", label: "Specific Days", description: "Choose days of week" },
    { value: "custom", label: "Custom", description: "Set your own schedule" },
];

const daysOfWeek = [
    { value: 0, label: "Sun", fullLabel: "Sunday" },
    { value: 1, label: "Mon", fullLabel: "Monday" },
    { value: 2, label: "Tue", fullLabel: "Tuesday" },
    { value: 3, label: "Wed", fullLabel: "Wednesday" },
    { value: 4, label: "Thu", fullLabel: "Thursday" },
    { value: 5, label: "Fri", fullLabel: "Friday" },
    { value: 6, label: "Sat", fullLabel: "Saturday" },
];

type FormStep = "type" | "basics" | "schedule" | "review";

export function HabitForm({ habit, onSubmit, onCancel, defaultHabitType }: HabitFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<FormStep>("type");
    const [iconSearch, setIconSearch] = useState("");
    const [showAllIcons, setShowAllIcons] = useState(false);

    const [formData, setFormData] = useState({
        title: habit?.title || "",
        description: habit?.description || "",
        icon: habit?.icon || "Star",
        color: (habit?.color as HabitColor) || "purple",
        category: (habit?.category as HabitCategory) || "other",
        habitType: (habit?.habitType as HabitType) || defaultHabitType || "weekly",
        customPeriodDays: habit?.customPeriodDays || 14,
        frequency: {
            type: habit?.frequency?.type || "daily",
            daysOfWeek: habit?.frequency?.daysOfWeek || [0, 1, 2, 3, 4, 5, 6],
            timesPerPeriod: habit?.frequency?.timesPerPeriod || 1,
            periodDays: habit?.frequency?.periodDays || 7,
        },
        targetCount: habit?.targetCount || 1,
        startDate: habit?.startDate ? new Date(habit.startDate) : new Date(),
        endDate: habit?.endDate ? new Date(habit.endDate) : addDays(new Date(), 13),
    });

    // Get selected color configuration
    const selectedColorConfig = colorOptions.find((c) => c.value === formData.color) || colorOptions[1];

    // Filter icons based on search
    const filteredIcons = useMemo(() => {
        if (!iconSearch) return iconsByCategory;
        const searchLower = iconSearch.toLowerCase();
        const filtered: typeof iconsByCategory = {};
        Object.entries(iconsByCategory).forEach(([category, icons]) => {
            const matchingIcons = icons.filter(
                (icon) =>
                    icon.name.toLowerCase().includes(searchLower) ||
                    icon.label.toLowerCase().includes(searchLower) ||
                    category.toLowerCase().includes(searchLower)
            );
            if (matchingIcons.length > 0) {
                filtered[category] = matchingIcons;
            }
        });
        return filtered;
    }, [iconSearch]);

    // Get suggested icons based on category
    const suggestedIcons = useMemo(() => {
        return iconsByCategory[formData.category] || iconsByCategory.other;
    }, [formData.category]);

    const handleSubmit = async () => {
        if (!formData.title.trim()) return;
        setIsLoading(true);
        try {
            await onSubmit({
                ...formData,
                customPeriodDays: formData.habitType === "custom"
                    ? differenceInDays(formData.endDate, formData.startDate) + 1
                    : undefined,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const toggleDay = (day: number) => {
        const days = formData.frequency.daysOfWeek || [];
        if (days.includes(day)) {
            setFormData({
                ...formData,
                frequency: { ...formData.frequency, daysOfWeek: days.filter((d) => d !== day) },
            });
        } else {
            setFormData({
                ...formData,
                frequency: { ...formData.frequency, daysOfWeek: [...days, day].sort() },
            });
        }
    };

    const goToStep = (step: FormStep) => {
        if (step === "basics" && currentStep === "type") {
            setCurrentStep(step);
            return;
        }
        if (step === "schedule" && !formData.title.trim()) return;
        setCurrentStep(step);
    };

    // Get period days based on habit type
    const getPeriodDays = () => {
        switch (formData.habitType) {
            case "weekly": return 7;
            case "monthly": return 30;
            case "custom": return differenceInDays(formData.endDate, formData.startDate) + 1;
            default: return 7;
        }
    };

    const steps: FormStep[] = ["type", "basics", "schedule", "review"];

    return (
        <div className="space-y-3 sm:space-y-4">
            {/* Progress Steps - Ultra Compact */}
            <div className="flex items-center justify-center gap-1 pb-1 overflow-x-auto">
                {steps.map((step, index) => (
                    <button
                        key={step}
                        onClick={() => {
                            if (step === "type" || (step === "basics") ||
                                (step === "schedule" && formData.title.trim()) ||
                                (step === "review" && formData.title.trim())) {
                                goToStep(step);
                            }
                        }}
                        disabled={step !== "type" && step !== "basics" && !formData.title.trim()}
                        className={cn(
                            "flex items-center gap-1 rounded-full px-2 py-1 text-[9px] font-semibold uppercase tracking-widest transition whitespace-nowrap",
                            currentStep === step
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "text-black/30 hover:text-black/60 dark:text-white/30 dark:hover:text-white/60"
                        )}
                    >
                        <span
                            className={cn(
                                "flex h-3.5 w-3.5 items-center justify-center rounded-full text-[8px]",
                                currentStep === step
                                    ? "bg-white text-black dark:bg-black dark:text-white"
                                    : "bg-black/5 dark:bg-white/5"
                            )}
                        >
                            {index + 1}
                        </span>
                        <span className="hidden xs:inline">
                            {step}
                        </span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* Step 1: Habit Type Selection */}
                {currentStep === "type" && (
                    <motion.div
                        key="type"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4 sm:space-y-6"
                    >
                        <div className="text-center">
                            <h3 className="text-base font-semibold text-black dark:text-white uppercase tracking-tight">
                                Select Cycle
                            </h3>
                            <p className="mt-0.5 text-[10px] font-semibold text-black/30 dark:text-white/40 uppercase tracking-widest">
                                When does this habit repeat?
                            </p>
                        </div>

                        <div className="grid gap-3 sm:gap-4">
                            {habitTypeOptions.map((option) => {
                                const isSelected = formData.habitType === option.value;

                                return (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, habitType: option.value })}
                                        className={cn(
                                            "relative flex items-center gap-3 rounded-xl border-2 p-3 text-left transition-all",
                                            isSelected
                                                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                : "border-black/5 hover:border-black/10 dark:border-white/5 dark:hover:border-white/10"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg",
                                                isSelected
                                                    ? "bg-white/20 dark:bg-black/20"
                                                    : "bg-black/5 dark:bg-white/5"
                                            )}
                                        >
                                            <HabitIcon name={option.icon} size={20} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-baseline gap-2">
                                                <p className="text-sm font-semibold uppercase tracking-tight">{option.label}</p>
                                                {option.value !== "custom" && (
                                                    <span className="text-[9px] font-semibold opacity-30">{option.periodDays}D</span>
                                                )}
                                            </div>
                                            <p className="text-[11px] font-medium opacity-60 leading-tight">{option.description}</p>
                                        </div>
                                        {isSelected && (
                                            <div className="absolute right-3 sm:right-4 top-3 sm:top-4">
                                                <Check className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Custom Period Date Range Picker */}
                        {formData.habitType === "custom" && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="rounded-xl border border-black/10 bg-white/50 p-3 sm:p-5 dark:border-white/10 dark:bg-white/5"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CalendarRange className="h-4 w-4 text-[#4D7CFE]" />
                                        <h4 className="text-sm font-bold text-black dark:text-white uppercase tracking-wider">
                                            Tracking Period
                                        </h4>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                        <DatePicker
                                            label="Start Date"
                                            value={formData.startDate}
                                            onChange={(date) => {
                                                setFormData({ ...formData, startDate: date });
                                                if (date > formData.endDate) {
                                                    setFormData({ ...formData, startDate: date, endDate: addDays(date, 1) });
                                                }
                                            }}
                                            className="relative"
                                            align="left"
                                        />
                                        <DatePicker
                                            label="End Date"
                                            value={formData.endDate}
                                            onChange={(date) => {
                                                if (date >= formData.startDate) {
                                                    setFormData({ ...formData, endDate: date });
                                                }
                                            }}
                                            className="relative"
                                            align="right"
                                        />
                                    </div>

                                    <div className="flex items-center justify-between px-1 pt-2">
                                        <span className="text-xs font-semibold text-black/50 dark:text-white/40">
                                            Total duration:
                                        </span>
                                        <span className="text-xs font-black text-[#4D7CFE]">
                                            {differenceInDays(formData.endDate, formData.startDate) + 1} Days
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Next Button */}
                        <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={() => goToStep("basics")}
                                className="flex-1"
                                rightIcon={<ChevronRight className="h-4 w-4" />}
                            >
                                Continue
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Basics */}
                {currentStep === "basics" && (
                    <motion.div
                        key="basics"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-4 sm:space-y-6"
                    >
                        {/* Habit Type Badge - Mini */}
                        <div className="flex justify-center">
                            <span className="flex items-center gap-1 rounded bg-black/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest text-black/40">
                                {formData.habitType} ({getPeriodDays()}D)
                            </span>
                        </div>

                        {/* Habit Name */}
                        <div>
                            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-black/30 dark:text-white/40">
                                Habit Name
                            </label>
                            <input
                                placeholder="e.g., Meditation"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-black/[0.03] dark:bg-white/[0.03] border-none rounded-lg px-3 py-2 text-sm font-semibold uppercase tracking-tight outline-none focus:ring-1 focus:ring-black/20 dark:focus:ring-white/20 text-black dark:text-white"
                                autoFocus
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-widest text-black/30 dark:text-white/40">
                                Category
                            </label>
                            <div className="flex flex-wrap gap-1">
                                {habitCategories.map((cat) => (
                                    <button
                                        key={cat.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, category: cat.value })}
                                        className={cn(
                                            "rounded-md border px-2 py-1 text-[9px] font-semibold uppercase tracking-widest transition",
                                            formData.category === cat.value
                                                ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white"
                                                : "bg-transparent text-black/30 border-black/5 hover:border-black/10 dark:text-white/40 dark:border-white/10 dark:hover:border-white/20"
                                        )}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>
                        </div>



                        {/* Color Selection - Minimal row */}
                        <div>
                            <label className="mb-1 block text-[10px] font-semibold uppercase tracking-widest text-black/30 dark:text-white/40">
                                Theme
                            </label>
                            <div className="flex flex-wrap gap-1">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, color: color.value })}
                                        className={cn(
                                            "h-5 w-5 rounded-full transition-all border-2",
                                            formData.color === color.value
                                                ? "border-black scale-110"
                                                : "border-transparent opacity-40 hover:opacity-100"
                                        )}
                                        style={{ backgroundColor: color.colors.from }}
                                    >
                                        {formData.color === color.value && (
                                            <div className="h-1 w-1 bg-white rounded-full mx-auto" />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation - Compact */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => goToStep("type")}
                                leftIcon={<ChevronLeft className="h-3 w-3" />}
                                size="sm"
                            >
                                Back
                            </Button>
                            <Button
                                type="button"
                                onClick={() => goToStep("schedule")}
                                disabled={!formData.title.trim()}
                                className="flex-1"
                                size="sm"
                                rightIcon={<ChevronRight className="h-3 w-3" />}
                            >
                                CONTINUE
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Schedule */}
                {currentStep === "schedule" && (
                    <motion.div
                        key="schedule"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4 sm:space-y-6"
                    >
                        {/* Frequency Type - Compact */}
                        <div>
                            <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-black/30">
                                Cycle Frequency
                            </label>
                            <div className="grid gap-1.5 sm:grid-cols-3">
                                {frequencyOptions.map((option) => (
                                    <button
                                        key={option.value}
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                frequency: { ...formData.frequency, type: option.value as any },
                                            })
                                        }
                                        className={cn(
                                            "rounded-xl border-2 p-2.5 text-left transition",
                                            formData.frequency.type === option.value
                                                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                : "border-black/5 hover:border-black/10 dark:border-white/5 dark:hover:border-white/10"
                                        )}
                                    >
                                        <p className="text-[11px] font-semibold uppercase tracking-tight">{option.label}</p>
                                        <p className="text-[9px] font-medium opacity-50 leading-none mt-0.5">{option.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Days of Week - Compact */}
                        {formData.frequency.type === "weekly" && (
                            <div>
                                <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-black/30">
                                    Specific Days
                                </label>
                                <div className="flex justify-between gap-1">
                                    {daysOfWeek.map((day) => (
                                        <button
                                            key={day.value}
                                            type="button"
                                            onClick={() => toggleDay(day.value)}
                                            className={cn(
                                                "flex h-9 w-9 flex-col items-center justify-center rounded-lg border-2 text-[10px] font-semibold transition",
                                                formData.frequency.daysOfWeek?.includes(day.value)
                                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                    : "border-black/10 text-black/40 hover:border-black/20 dark:border-white/10 dark:text-white/30"
                                            )}
                                        >
                                            {day.label[0]}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Custom Frequency */}
                        {formData.frequency.type === "custom" && (
                            <div className="rounded-lg sm:rounded-xl border border-black/10 bg-white/50 p-3 sm:p-4 dark:border-white/10 dark:bg-white/5">
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                                    <span className="text-xs sm:text-sm text-black/70 dark:text-white/70">Complete</span>
                                    <input
                                        type="number"
                                        min={1}
                                        max={30}
                                        value={formData.frequency.timesPerPeriod}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                frequency: {
                                                    ...formData.frequency,
                                                    timesPerPeriod: parseInt(e.target.value) || 1,
                                                },
                                            })
                                        }
                                        className="w-14 sm:w-16 rounded-lg border border-black/20 bg-white px-2 sm:px-3 py-1.5 sm:py-2 text-center font-semibold dark:border-white/20 dark:bg-surface-900"
                                    />
                                    <span className="text-xs sm:text-sm text-black/70 dark:text-white/70">
                                        time(s) per period
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Daily Target - Compact */}
                        <div>
                            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/50">
                                Goal Target (Daily)
                            </label>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center rounded-lg border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, targetCount: Math.max(1, formData.targetCount - 1) })}
                                        className="px-3 py-1.5 text-base font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                                    >
                                        −
                                    </button>
                                    <span className="min-w-[2rem] text-center text-sm font-semibold text-black dark:text-white">
                                        {formData.targetCount}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, targetCount: Math.min(100, formData.targetCount + 1) })}
                                        className="px-3 py-1.5 text-base font-semibold text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
                                    per day
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-semibold text-black dark:text-white">
                                Notes or motivation (optional)
                            </label>
                            <textarea
                                placeholder="Why is this habit important to you?"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="input-field min-h-[60px] sm:min-h-[80px] resize-none"
                            />
                        </div>

                        {/* Navigation - Compact */}
                        <div className="flex gap-2 pt-2">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => goToStep("basics")}
                                leftIcon={<ChevronLeft className="h-3 w-3" />}
                                size="sm"
                            >
                                Back
                            </Button>
                            <Button
                                type="button"
                                onClick={() => goToStep("review")}
                                className="flex-1"
                                size="sm"
                                rightIcon={<ChevronRight className="h-3 w-3" />}
                            >
                                Review
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Step 4: Review */}
                {currentStep === "review" && (
                    <motion.div
                        key="review"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-4 sm:space-y-6"
                    >
                        <div className="text-center">
                            <p className="mb-1 sm:mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-black/60 dark:text-white/50">
                                Review your habit
                            </p>
                        </div>

                        {/* Preview Card - Compact Text-Only */}
                        <div className="rounded-xl border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-center gap-3">
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-semibold uppercase tracking-tight text-black dark:text-white truncate">
                                        {formData.title}
                                    </h3>
                                </div>
                            </div>

                            <div className="mt-3 grid gap-2 grid-cols-2">
                                {/* Summary Grid - Pro Labels */}
                                {[
                                    { label: "Cycle", value: formData.habitType },
                                    { label: "Category", value: habitCategories.find((c) => c.value === formData.category)?.label },
                                    { 
                                        label: "Frequency", 
                                        value: formData.frequency.type === "daily" ? "Daily" : 
                                               formData.frequency.type === "weekly" ? `${formData.frequency.daysOfWeek?.length} Days` :
                                               `${formData.frequency.timesPerPeriod}x Period`
                                    },
                                    { label: "Period", value: `${getPeriodDays()} Days` }
                                ].map((item, i) => (
                                    <div key={i} className="rounded-lg bg-black/[0.03] p-2 dark:bg-white/5">
                                        <p className="text-[9px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
                                            {item.label}
                                        </p>
                                        <p className="mt-0.5 text-[11px] font-semibold uppercase text-black dark:text-white">
                                            {item.value}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation - Compact */}
                        <div className="flex gap-2 pt-2 border-t border-black/5 dark:border-white/5">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => goToStep("schedule")}
                                leftIcon={<ChevronLeft className="h-3 w-3" />}
                                size="sm"
                                className="dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
                            >
                                BACK
                            </Button>
                            <Button type="button" onClick={handleSubmit} isLoading={isLoading} className="flex-1 dark:bg-white dark:text-black dark:hover:bg-white/90" size="sm">
                                {habit?._id ? "SAVE" : "CREATE"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
