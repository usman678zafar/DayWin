"use client";

import { Calendar, CalendarDays, CalendarRange, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "daily" | "weekly" | "monthly" | "custom";

interface ViewModeSelectorProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    className?: string;
}

const viewModes: { value: ViewMode; label: string; icon: React.ElementType }[] = [
    { value: "daily", label: "Daily", icon: Calendar },
    { value: "weekly", label: "Weekly", icon: CalendarDays },
    { value: "monthly", label: "Monthly", icon: LayoutGrid },
    { value: "custom", label: "Custom", icon: CalendarRange },
];

export function ViewModeSelector({ viewMode, onViewModeChange, className }: ViewModeSelectorProps) {
    return (
        <div className={cn("flex items-center gap-1 rounded-xl border border-black/10 bg-white p-1 dark:border-white/10 dark:bg-white/5", className)}>
            {viewModes.map((mode) => (
                <button
                    key={mode.value}
                    onClick={() => onViewModeChange(mode.value)}
                    className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition",
                        viewMode === mode.value
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "text-black/60 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                    )}
                >
                    <mode.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{mode.label}</span>
                </button>
            ))}
        </div>
    );
}
