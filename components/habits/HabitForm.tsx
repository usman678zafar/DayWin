"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
    Habit,
    HabitColor,
    HabitCategory,
    habitColors,
    habitIcons,
    habitCategories,
} from "@/types";

interface HabitFormProps {
    habit?: Partial<Habit>;
    onSubmit: (data: Partial<Habit>) => Promise<void>;
    onCancel: () => void;
}

const colorOptions: HabitColor[] = [
    "violet", "purple", "blue", "cyan", "teal", "green",
    "lime", "yellow", "orange", "red", "pink", "rose",
];

const frequencyOptions = [
    { value: "daily", label: "Every day" },
    { value: "weekly", label: "Specific days" },
    { value: "custom", label: "Custom" },
];

const daysOfWeek = [
    { value: 0, label: "S" },
    { value: 1, label: "M" },
    { value: 2, label: "T" },
    { value: 3, label: "W" },
    { value: 4, label: "T" },
    { value: 5, label: "F" },
    { value: 6, label: "S" },
];

export function HabitForm({ habit, onSubmit, onCancel }: HabitFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: habit?.title || "",
        description: habit?.description || "",
        icon: habit?.icon || "⭐",
        color: (habit?.color as HabitColor) || "purple",
        category: (habit?.category as HabitCategory) || "other",
        frequency: {
            type: habit?.frequency?.type || "daily",
            daysOfWeek: habit?.frequency?.daysOfWeek || [1, 2, 3, 4, 5],
            timesPerPeriod: habit?.frequency?.timesPerPeriod || 1,
            periodDays: habit?.frequency?.periodDays || 7,
        },
        targetCount: habit?.targetCount || 1,
    });

    const [showIconPicker, setShowIconPicker] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setIsLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleDay = (day: number) => {
        const days = formData.frequency.daysOfWeek || [];
        if (days.includes(day)) {
            setFormData({
                ...formData,
                frequency: {
                    ...formData.frequency,
                    daysOfWeek: days.filter((d) => d !== day),
                },
            });
        } else {
            setFormData({
                ...formData,
                frequency: {
                    ...formData.frequency,
                    daysOfWeek: [...days, day].sort(),
                },
            });
        }
    };

    const selectedColors = habitColors[formData.color];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Icon and Title */}
            <div className="flex gap-4">
                {/* Icon Picker */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowIconPicker(!showIconPicker)}
                        className={cn(
                            "w-16 h-16 rounded-xl flex items-center justify-center text-3xl",
                            "border-2 border-dashed border-surface-300 dark:border-surface-800",
                            "hover:border-primary-400 transition-colors",
                            selectedColors.bg
                        )}
                    >
                        {formData.icon}
                    </button>

                    {showIconPicker && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowIconPicker(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute left-0 top-full mt-2 p-3 bg-white dark:bg-surface-900 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800 z-20 grid grid-cols-8 gap-2 w-72"
                            >
                                {habitIcons.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, icon });
                                            setShowIconPicker(false);
                                        }}
                                        className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center text-lg",
                                            "hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors",
                                            formData.icon === icon && "bg-primary-100 dark:bg-primary-900/30"
                                        )}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </motion.div>
                        </>
                    )}
                </div>

                <div className="flex-1">
                    <Input
                        label="Habit Name"
                        placeholder="e.g., Drink 8 glasses of water"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                    Description (optional)
                </label>
                <textarea
                    placeholder="Add a description or motivation..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field min-h-[80px] resize-none"
                />
            </div>

            {/* Color */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-3">
                    Color
                </label>
                <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => {
                        const colors = habitColors[color];
                        return (
                            <button
                                key={color}
                                type="button"
                                onClick={() => setFormData({ ...formData, color })}
                                className={cn(
                                    "w-10 h-10 rounded-xl transition-all duration-300",
                                    `bg-gradient-to-br ${colors.gradient}`,
                                    formData.color === color
                                        ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-900 ring-primary-500 scale-110"
                                        : "hover:scale-105"
                                )}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-3">
                    Category
                </label>
                <div className="flex flex-wrap gap-2">
                    {habitCategories.map((cat) => (
                        <button
                            key={cat.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, category: cat.value })}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                                "border",
                                formData.category === cat.value
                                    ? "bg-primary-100 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300"
                                    : "bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-200/50 hover:border-primary-300"
                            )}
                        >
                            {cat.icon} {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Frequency */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-3">
                    Frequency
                </label>
                <div className="flex gap-2 mb-4">
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
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                                "border",
                                formData.frequency.type === option.value
                                    ? "bg-primary-500 border-primary-500 text-white"
                                    : "bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-200/50 hover:border-primary-300"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {/* Days of week selector for weekly */}
                {formData.frequency.type === "weekly" && (
                    <div className="flex gap-2">
                        {daysOfWeek.map((day) => (
                            <button
                                key={day.value}
                                type="button"
                                onClick={() => toggleDay(day.value)}
                                className={cn(
                                    "w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300",
                                    formData.frequency.daysOfWeek?.includes(day.value)
                                        ? "bg-primary-500 text-white"
                                        : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-200/50 hover:bg-surface-200"
                                )}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Custom frequency */}
                {formData.frequency.type === "custom" && (
                    <div className="flex items-center gap-4">
                        <Input
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
                            className="w-20"
                        />
                        <span className="text-surface-600 dark:text-surface-200/50">times per</span>
                        <Input
                            type="number"
                            min={1}
                            max={30}
                            value={formData.frequency.periodDays}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    frequency: {
                                        ...formData.frequency,
                                        periodDays: parseInt(e.target.value) || 7,
                                    },
                                })
                            }
                            className="w-20"
                        />
                        <span className="text-surface-600 dark:text-surface-200/50">days</span>
                    </div>
                )}
            </div>

            {/* Target Count */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                    Daily Target
                </label>
                <div className="flex items-center gap-4">
                    <Input
                        type="number"
                        min={1}
                        max={100}
                        value={formData.targetCount}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                targetCount: parseInt(e.target.value) || 1,
                            })
                        }
                        className="w-24"
                    />
                    <span className="text-surface-600 dark:text-surface-200/50">
                        {formData.targetCount === 1 ? "time" : "times"} per day
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading} className="flex-1">
                    {habit?._id ? "Save Changes" : "Create Habit"}
                </Button>
            </div>
        </form>
    );
}
