"use client";

import React from "react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitIconName } from "@/types";

interface HabitIconProps {
    name: string;
    className?: string;
    size?: number;
}

export function HabitIcon({ name, className, size = 20 }: HabitIconProps) {
    // Check if it's a valid Lucide icon name
    const IconComponent = (Icons as any)[name];

    if (IconComponent) {
        return <IconComponent className={className} size={size} />;
    }

    // Fallback for emojis or unknown strings
    return (
        <span className={cn("inline-flex items-center justify-center", className)} style={{ fontSize: `${size}px` }}>
            {name || "✨"}
        </span>
    );
}
