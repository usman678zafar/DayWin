"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    gradient?: boolean;
    onClick?: () => void;
}

export function Card({
    children,
    className,
    hover = false,
    gradient = false,
    onClick,
}: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
            whileTap={onClick ? { scale: 0.99 } : undefined}
            className={cn(
                "bg-white dark:bg-surface-900 rounded-2xl",
                "border border-surface-200 dark:border-surface-800",
                "shadow-card",
                hover && "hover:shadow-card-hover transition-shadow duration-300",
                gradient && "gradient-border",
                onClick && "cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}
