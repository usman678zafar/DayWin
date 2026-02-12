"use client";

import {
    Dumbbell,
    Heart,
    Brain,
    Book,
    Droplets,
    Moon,
    Sun,
    Apple,
    Pill,
    Activity,
    Bike,
    Footprints,
    Flame,
    Target,
    Trophy,
    Star,
    Zap,
    Coffee,
    Cigarette,
    Wine,
    Music,
    Palette,
    Camera,
    Pen,
    Code,
    Briefcase,
    DollarSign,
    PiggyBank,
    TrendingUp,
    Users,
    MessageCircle,
    Phone,
    Home,
    Sparkles,
    Leaf,
    Smile,
    Clock,
    Calendar,
    CheckCircle,
    ListTodo,
    LucideIcon,
} from "lucide-react";
import { HabitIconName } from "@/types";
import { cn } from "@/lib/utils";

// Map icon names to actual Lucide components
const iconMap: Record<HabitIconName, LucideIcon> = {
    Dumbbell,
    Heart,
    Brain,
    Book,
    Droplets,
    Moon,
    Sun,
    Apple,
    Pill,
    Activity,
    Bike,
    Walk: Footprints,
    Flame,
    Target,
    Trophy,
    Star,
    Zap,
    Coffee,
    Cigarette,
    Wine,
    Music,
    Palette,
    Camera,
    Pen,
    Code,
    Briefcase,
    DollarSign,
    PiggyBank,
    TrendingUp,
    Users,
    MessageCircle,
    Phone,
    Home,
    Sparkles,
    Leaf,
    Smile,
    Clock,
    Calendar,
    CheckCircle,
    ListTodo,
};

interface HabitIconProps {
    icon: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

export function HabitIcon({ icon, className, size = "md" }: HabitIconProps) {
    const sizes = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
    };

    // Check if it's a Lucide icon name
    if (icon in iconMap) {
        const IconComponent = iconMap[icon as HabitIconName];
        return <IconComponent className={cn(sizes[size], className)} />;
    }

    // Fallback to emoji for backward compatibility
    return <span className={cn("text-center", size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : size === "xl" ? "text-2xl" : "text-base", className)}>{icon}</span>;
}
