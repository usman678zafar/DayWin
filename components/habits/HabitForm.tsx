"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronRight, ChevronLeft, Search, X, Check, CalendarDays, Settings, Calendar, Plus
} from "lucide-react";
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
                customPeriodDays: formData.habitType === "custom" ? formData.customPeriodDays : undefined,
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
            case "custom": return formData.customPeriodDays;
            default: return 7;
        }
    };

    const steps: FormStep[] = ["type", "basics", "schedule", "review"];

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Progress Steps - Mobile Optimized */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 pb-2 overflow-x-auto">
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
                            "flex items-center gap-1.5 sm:gap-2 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap",
                            currentStep === step
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "text-black/40 hover:text-black/70 dark:text-white/40 dark:hover:text-white/70"
                        )}
                    >
                        <span
                            className={cn(
                                "flex h-4 w-4 sm:h-5 sm:w-5 items-center justify-center rounded-full text-[9px] sm:text-[10px]",
                                currentStep === step
                                    ? "bg-white text-black dark:bg-black dark:text-white"
                                    : "bg-black/10 dark:bg-white/10"
                            )}
                        >
                            {index + 1}
                        </span>
                        <span className="hidden sm:inline">
                            {step === "type" && "Type"}
                            {step === "basics" && "Basics"}
                            {step === "schedule" && "Schedule"}
                            {step === "review" && "Review"}
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
                            <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white">
                                Choose Habit Type
                            </h3>
                            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-black/60 dark:text-white/60">
                                Select the tracking period for your habit
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
                                            "relative flex items-start gap-3 sm:gap-4 rounded-xl sm:rounded-2xl border-2 p-4 sm:p-5 text-left transition-all",
                                            isSelected
                                                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                : "border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0 items-center justify-center rounded-lg sm:rounded-xl",
                                                isSelected
                                                    ? "bg-white/20 dark:bg-black/20"
                                                    : "bg-black/5 dark:bg-white/5"
                                            )}
                                        >
                                            <HabitIcon name={option.icon} size={24} />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <p className="text-base sm:text-lg font-bold">{option.label}</p>
                                                {option.value !== "custom" && (
                                                    <span
                                                        className={cn(
                                                            "rounded-full px-2 py-0.5 text-[10px] sm:text-xs font-semibold",
                                                            isSelected
                                                                ? "bg-white/20 dark:bg-black/20"
                                                                : "bg-black/10 dark:bg-white/10"
                                                        )}
                                                    >
                                                        {option.periodDays} days
                                                    </span>
                                                )}
                                            </div>
                                            <p
                                                className={cn(
                                                    "mt-0.5 sm:mt-1 text-xs sm:text-sm",
                                                    isSelected
                                                        ? "text-white/70 dark:text-black/70"
                                                        : "text-black/60 dark:text-white/60"
                                                )}
                                            >
                                                {option.description}
                                            </p>
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

                        {/* Custom Period Input */}
                        {formData.habitType === "custom" && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="rounded-xl border border-black/10 bg-white/50 p-3 sm:p-4 dark:border-white/10 dark:bg-white/5"
                            >
                                <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-semibold text-black dark:text-white">
                                    Custom Period (days)
                                </label>
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <input
                                        type="range"
                                        min={1}
                                        max={90}
                                        value={formData.customPeriodDays}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                customPeriodDays: parseInt(e.target.value),
                                            })
                                        }
                                        className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-black/10 dark:bg-white/10"
                                    />
                                    <div className="flex items-center gap-2 rounded-lg border border-black/15 px-2 sm:px-3 py-1.5 sm:py-2 dark:border-white/15">
                                        <input
                                            type="number"
                                            min={1}
                                            max={365}
                                            value={formData.customPeriodDays}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    customPeriodDays: Math.min(365, Math.max(1, parseInt(e.target.value) || 1)),
                                                })
                                            }
                                            className="w-12 sm:w-16 bg-transparent text-center font-bold text-black outline-none dark:text-white"
                                        />
                                        <span className="text-xs sm:text-sm text-black/60 dark:text-white/60">days</span>
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
                        {/* Habit Type Badge */}
                        <div className="flex items-center justify-center">
                            <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/5 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black/70 dark:bg-white/5 dark:text-white/70">
                                {formData.habitType === "weekly" && <CalendarDays className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                                {formData.habitType === "monthly" && <Calendar className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                                {formData.habitType === "custom" && <Settings className="h-3 w-3 sm:h-3.5 sm:w-3.5" />}
                                {formData.habitType} habit ({getPeriodDays()} days)
                            </span>
                        </div>

                        {/* Habit Name */}
                        <div>
                            <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm font-semibold text-black dark:text-white">
                                What habit do you want to build?
                            </label>
                            <Input
                                placeholder="e.g., Read for 30 minutes"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="text-base sm:text-lg"
                                autoFocus
                            />
                        </div>

                        {/* Category - Mobile Optimized Grid */}
                        <div>
                            <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-semibold text-black dark:text-white">
                                Category
                            </label>
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 sm:grid-cols-5">
                                {habitCategories.map((cat) => {
                                    return (
                                        <button
                                            key={cat.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, category: cat.value })}
                                            className={cn(
                                                "flex flex-col items-center gap-1.5 sm:gap-2 rounded-lg sm:rounded-xl border-2 p-2 sm:p-3 transition",
                                                formData.category === cat.value
                                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                    : "border-black/10 text-black/70 hover:border-black/30 dark:border-white/10 dark:text-white/70 dark:hover:border-white/30"
                                            )}
                                        >
                                            <HabitIcon name={cat.icon} size={20} />
                                            <span className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wider">
                                                {cat.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Icon Selection */}
                        <div>
                            <div className="mb-2 sm:mb-3 flex items-center justify-between">
                                <label className="text-xs sm:text-sm font-semibold text-black dark:text-white">Icon</label>
                                <button
                                    type="button"
                                    onClick={() => setShowAllIcons(!showAllIcons)}
                                    className="text-[10px] sm:text-xs font-medium text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                                >
                                    {showAllIcons ? "Show less" : "Browse all"}
                                </button>
                            </div>

                            {/* Current Selection Preview */}
                            <div className="mb-3 sm:mb-4 flex items-center gap-3 sm:gap-4">
                                <div
                                    className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 shadow-inner"
                                    style={{ backgroundColor: selectedColorConfig.colors.bg }}
                                >
                                    <HabitIcon name={formData.icon} size={32} style={{ color: selectedColorConfig.colors.text }} />
                                </div>
                                <div>
                                    <p className="text-xs sm:text-sm font-bold text-black dark:text-white">
                                        Selected: {formData.icon}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-black/50 dark:text-white/50">
                                        Click an icon below to change
                                    </p>
                                </div>
                            </div>

                            {/* Quick Suggestions */}
                            {!showAllIcons && (
                                <div className="rounded-lg sm:rounded-xl border border-black/10 bg-white/50 p-3 sm:p-4 dark:border-white/10 dark:bg-white/5">
                                    <p className="mb-2 sm:mb-3 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Suggested for {formData.category}
                                    </p>
                                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                        {suggestedIcons.map((icon) => {
                                            return (
                                                <button
                                                    key={icon.name}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, icon: icon.name })}
                                                    className={cn(
                                                        "flex items-center gap-1.5 sm:gap-2 rounded-lg border px-2 sm:px-3 py-1.5 sm:py-2 transition",
                                                        formData.icon === icon.name
                                                            ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                            : "border-black/15 text-black/70 hover:border-black/30 dark:border-white/15 dark:text-white/70 dark:hover:border-white/30"
                                                    )}
                                                >
                                                    <HabitIcon name={icon.name} size={16} />
                                                    <span className="text-[10px] sm:text-xs font-medium">{icon.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* All Icons Browser */}
                            {showAllIcons && (
                                <div className="rounded-lg sm:rounded-xl border border-black/10 bg-white/50 p-3 sm:p-4 dark:border-white/10 dark:bg-white/5">
                                    <div className="mb-3 sm:mb-4">
                                        <Input
                                            placeholder="Search icons..."
                                            value={iconSearch}
                                            onChange={(e) => setIconSearch(e.target.value)}
                                            leftIcon={<Search className="h-4 w-4" />}
                                            rightIcon={
                                                iconSearch && (
                                                    <button onClick={() => setIconSearch("")}>
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="max-h-48 sm:max-h-64 space-y-3 sm:space-y-4 overflow-y-auto">
                                        {Object.entries(filteredIcons).map(([category, icons]) => (
                                            <div key={category}>
                                                <p className="mb-1.5 sm:mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">
                                                    {category}
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {icons.map((icon) => {
                                                        return (
                                                            <button
                                                                key={icon.name}
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData({ ...formData, icon: icon.name });
                                                                    setShowAllIcons(false);
                                                                }}
                                                                title={icon.label}
                                                                className={cn(
                                                                    "flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border transition",
                                                                    formData.icon === icon.name
                                                                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                                        : "border-black/10 text-black/60 hover:border-black/30 hover:text-black dark:border-white/10 dark:text-white/60 dark:hover:border-white/30 dark:hover:text-white"
                                                                )}
                                                            >
                                                                <HabitIcon name={icon.name} size={20} />
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Color Selection - Mobile Optimized */}
                        <div>
                            <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-semibold text-black dark:text-white">
                                Color Theme
                            </label>
                            <div className="flex flex-wrap gap-2 sm:gap-3">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, color: color.value })}
                                        title={color.label}
                                        className={cn(
                                            "relative h-8 w-8 sm:h-10 sm:w-10 rounded-lg sm:rounded-xl transition-all duration-200",
                                            formData.color === color.value
                                                ? "scale-110 ring-2 ring-black ring-offset-2 dark:ring-white dark:ring-offset-surface-900"
                                                : "hover:scale-105"
                                        )}
                                        style={{
                                            background: `linear-gradient(135deg, ${color.colors.from} 0%, ${color.colors.to} 100%)`,
                                        }}
                                    >
                                        {formData.color === color.value && (
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <Check className="h-4 w-4 sm:h-5 sm:w-5 text-white drop-shadow-md" strokeWidth={3} />
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => goToStep("type")}
                                leftIcon={<ChevronLeft className="h-4 w-4" />}
                            >
                                Back
                            </Button>
                            <Button
                                type="button"
                                onClick={() => goToStep("schedule")}
                                disabled={!formData.title.trim()}
                                className="flex-1"
                                rightIcon={<ChevronRight className="h-4 w-4" />}
                            >
                                Continue
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
                        {/* Frequency Type */}
                        <div>
                            <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-semibold text-black dark:text-white">
                                How often within the {getPeriodDays()}-day period?
                            </label>
                            <div className="grid gap-2 sm:gap-3 sm:grid-cols-3">
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
                                            "rounded-lg sm:rounded-xl border-2 p-3 sm:p-4 text-left transition",
                                            formData.frequency.type === option.value
                                                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                : "border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
                                        )}
                                    >
                                        <p className="text-sm sm:text-base font-semibold">{option.label}</p>
                                        <p
                                            className={cn(
                                                "mt-0.5 text-[10px] sm:text-xs",
                                                formData.frequency.type === option.value
                                                    ? "text-white/70 dark:text-black/70"
                                                    : "text-black/50 dark:text-white/50"
                                            )}
                                        >
                                            {option.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Days of Week for Weekly Frequency */}
                        {formData.frequency.type === "weekly" && (
                            <div>
                                <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-semibold text-black dark:text-white">
                                    Which days?
                                </label>
                                <div className="flex justify-between gap-1 sm:gap-2">
                                    {daysOfWeek.map((day) => (
                                        <button
                                            key={day.value}
                                            type="button"
                                            onClick={() => toggleDay(day.value)}
                                            className={cn(
                                                "flex h-10 w-10 sm:h-12 sm:w-12 flex-col items-center justify-center rounded-lg sm:rounded-xl border-2 text-[10px] sm:text-xs font-semibold transition",
                                                formData.frequency.daysOfWeek?.includes(day.value)
                                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                    : "border-black/15 text-black/60 hover:border-black/30 dark:border-white/15 dark:text-white/60 dark:hover:border-white/30"
                                            )}
                                        >
                                            {day.label}
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

                        {/* Daily Target */}
                        <div>
                            <label className="mb-2 sm:mb-3 block text-xs sm:text-sm font-semibold text-black dark:text-white">
                                Daily target (optional)
                            </label>
                            <div className="flex items-center gap-3 sm:gap-4">
                                <div className="flex items-center rounded-lg sm:rounded-xl border border-black/15 dark:border-white/15">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                targetCount: Math.max(1, formData.targetCount - 1),
                                            })
                                        }
                                        className="px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                                    >
                                        −
                                    </button>
                                    <span className="min-w-[2.5rem] sm:min-w-[3rem] text-center text-lg sm:text-xl font-bold text-black dark:text-white">
                                        {formData.targetCount}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                targetCount: Math.min(100, formData.targetCount + 1),
                                            })
                                        }
                                        className="px-3 sm:px-4 py-2 sm:py-3 text-base sm:text-lg font-bold text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-xs sm:text-sm text-black/60 dark:text-white/60">
                                    {formData.targetCount === 1 ? "time per day" : "times per day"}
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

                        {/* Navigation */}
                        <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => goToStep("basics")}
                                leftIcon={<ChevronLeft className="h-4 w-4" />}
                            >
                                Back
                            </Button>
                            <Button
                                type="button"
                                onClick={() => goToStep("review")}
                                className="flex-1"
                                rightIcon={<ChevronRight className="h-4 w-4" />}
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
                            <p className="mb-1 sm:mb-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                Review your habit
                            </p>
                        </div>

                        {/* Preview Card */}
                        <div className="rounded-xl sm:rounded-2xl border border-black/10 bg-white p-4 sm:p-6 dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-start gap-3 sm:gap-4">
                                <div
                                    className="flex h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0 items-center justify-center rounded-xl sm:rounded-2xl"
                                    style={{ backgroundColor: selectedColorConfig.colors.bg }}
                                >
                                    <HabitIcon name={formData.icon} size={32} style={{ color: selectedColorConfig.colors.text }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white truncate">
                                        {formData.title}
                                    </h3>
                                    {formData.description && (
                                        <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-black/60 dark:text-white/60 line-clamp-2">
                                            {formData.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-6 grid gap-3 sm:gap-4 grid-cols-2">
                                {/* Habit Type */}
                                <div className="rounded-lg sm:rounded-xl bg-black/5 p-3 sm:p-4 dark:bg-white/5">
                                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Type
                                    </p>
                                    <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold capitalize text-black dark:text-white">
                                        {formData.habitType}
                                    </p>
                                </div>

                                {/* Category */}
                                <div className="rounded-lg sm:rounded-xl bg-black/5 p-3 sm:p-4 dark:bg-white/5">
                                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Category
                                    </p>
                                    <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold text-black dark:text-white">
                                        {habitCategories.find((c) => c.value === formData.category)?.label}
                                    </p>
                                </div>

                                {/* Frequency */}
                                <div className="rounded-lg sm:rounded-xl bg-black/5 p-3 sm:p-4 dark:bg-white/5">
                                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Frequency
                                    </p>
                                    <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold text-black dark:text-white">
                                        {formData.frequency.type === "daily" && "Every day"}
                                        {formData.frequency.type === "weekly" &&
                                            `${formData.frequency.daysOfWeek?.length} days/week`}
                                        {formData.frequency.type === "custom" &&
                                            `${formData.frequency.timesPerPeriod}x per period`}
                                    </p>
                                </div>

                                {/* Period */}
                                <div className="rounded-lg sm:rounded-xl bg-black/5 p-3 sm:p-4 dark:bg-white/5">
                                    <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Period
                                    </p>
                                    <p className="mt-0.5 sm:mt-1 text-sm sm:text-base font-semibold text-black dark:text-white">
                                        {getPeriodDays()} days
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 sm:gap-3 pt-2 sm:pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => goToStep("schedule")}
                                leftIcon={<ChevronLeft className="h-4 w-4" />}
                            >
                                Back
                            </Button>
                            <Button type="button" onClick={handleSubmit} isLoading={isLoading} className="flex-1">
                                {habit?._id ? "Save Changes" : "Create Habit"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
