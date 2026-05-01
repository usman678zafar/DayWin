"use client";

import { cn } from "@/lib/utils";

interface PageLoaderProps {
    className?: string;
    fullScreen?: boolean;
}

export function PageLoader({ className, fullScreen = true }: PageLoaderProps) {
    const pulse = "animate-pulse rounded-xl bg-black/[0.06] dark:bg-white/[0.08]";

    return (
        <div
            className={cn(
                "bg-white dark:bg-[#030305]",
                fullScreen ? "fixed inset-0 z-[100] overflow-y-auto" : "w-full min-h-screen",
                className
            )}
        >
            <div className="page-container py-6">
                <div className="mb-6 space-y-3">
                    <div className={cn(pulse, "h-8 w-48")} />
                    <div className={cn(pulse, "h-3 w-72 max-w-full")} />
                </div>

                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className={cn(pulse, "h-28")} />
                    <div className={cn(pulse, "h-28")} />
                    <div className={cn(pulse, "h-28")} />
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                        <div className={cn(pulse, "h-44")} />
                        <div className={cn(pulse, "h-44")} />
                        <div className={cn(pulse, "h-44")} />
                    </div>

                    <div className="space-y-4">
                        <div className={cn(pulse, "h-56")} />
                        <div className={cn(pulse, "h-56")} />
                    </div>
                </div>
            </div>
        </div>
    );
}
