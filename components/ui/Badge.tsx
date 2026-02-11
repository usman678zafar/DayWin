import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "info";
    size?: "sm" | "md";
    className?: string;
}

export function Badge({
    children,
    variant = "default",
    size = "sm",
    className,
}: BadgeProps) {
    const variants = {
        default: "bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-white",
        success: "bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400",
        warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
        danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
        info: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center font-medium rounded-full",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </span>
    );
}
