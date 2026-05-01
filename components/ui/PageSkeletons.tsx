"use client";

import { Skeleton } from "./Skeleton";

// ─────────────────────────────────────────────
// Dashboard  /dashboard
// ─────────────────────────────────────────────
export function DashboardSkeleton() {
    return (
        <div className="page-container">
            {/* Header card */}
            <div className="mb-4 md:mb-5 rounded-2xl border border-black/5 bg-white/50 p-4 sm:p-5 dark:border-white/[0.02] dark:bg-white/[0.01]">
                <Skeleton className="h-3 w-28 mb-2 rounded-md" />
                <Skeleton className="h-8 w-56 mb-2 rounded-md" />
                <Skeleton className="h-3 w-64 rounded-md" />
            </div>

            {/* 3 stat cards */}
            <div className="mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="relative overflow-hidden rounded-2xl border border-black/5 dark:border-white/5 p-5 space-y-3">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-9 w-9 rounded-lg" />
                            <Skeleton className="h-3 w-24 rounded-md" />
                        </div>
                        <Skeleton className="h-8 w-16 rounded-md" />
                    </div>
                ))}
            </div>

            {/* Action buttons */}
            <div className="mb-8 flex flex-col sm:flex-row gap-3">
                <Skeleton className="h-11 w-36 rounded-xl" />
                <Skeleton className="h-11 w-28 rounded-xl" />
            </div>

            {/* Main grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    {/* Daily Progress */}
                    <div className="rounded-2xl border border-black/5 dark:border-white/5 p-6">
                        <div className="flex items-center gap-6">
                            <Skeleton className="h-[120px] w-[120px] rounded-full flex-shrink-0" />
                            <div className="flex-1 grid grid-cols-2 gap-4">
                                <Skeleton className="h-20 rounded-xl" />
                                <Skeleton className="h-20 rounded-xl" />
                                <Skeleton className="col-span-2 h-16 rounded-xl" />
                            </div>
                        </div>
                    </div>
                    {/* Habits section */}
                    <div className="space-y-3">
                        <Skeleton className="h-4 w-32 rounded-md" />
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="card flex items-center gap-4 sm:gap-6 p-4 sm:p-5">
                                <Skeleton className="h-12 w-12 rounded-2xl flex-shrink-0" />
                                <div className="flex-1 space-y-2">
                                    <Skeleton className="h-3 w-16 rounded-md" />
                                    <Skeleton className="h-5 w-40 rounded-md" />
                                </div>
                                <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Quote card */}
                    <div className="rounded-2xl border border-black/5 dark:border-white/5 p-6 space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-8 w-8 rounded-lg" />
                                <Skeleton className="h-3 w-28 rounded-md" />
                            </div>
                            <Skeleton className="h-8 w-8 rounded-lg" />
                        </div>
                        <Skeleton className="h-4 w-full rounded-md" />
                        <Skeleton className="h-4 w-5/6 rounded-md" />
                        <Skeleton className="h-3 w-20 rounded-md" />
                    </div>
                    {/* Weekly chart */}
                    <div className="rounded-2xl border border-black/5 dark:border-white/5 p-6 space-y-4">
                        <Skeleton className="h-4 w-32 rounded-md" />
                        <div className="h-48 flex items-end gap-2 pt-4">
                            {[60, 80, 45, 100, 70, 55, 90].map((h, i) => (
                                <Skeleton key={i} className="flex-1 rounded-t-md" style={{ height: `${h}%` }} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Habits  /dashboard/habits
// ─────────────────────────────────────────────
export function HabitsSkeleton() {
    const COLS = 7;
    return (
        <div className="page-container">
            {/* Tabs + button */}
            <div className="mb-2 flex items-center justify-between">
                <Skeleton className="h-8 w-52 rounded-lg" />
                <Skeleton className="h-7 w-24 rounded-md" />
            </div>

            {/* Matrix table */}
            <div className="rounded-2xl border border-black/[0.03] dark:border-white/[0.03] overflow-hidden shadow-sm">
                {/* Header */}
                <div className="flex items-center border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01] px-3 py-2 gap-1">
                    <Skeleton className="h-4 w-20 mr-4 flex-shrink-0 rounded" />
                    {[...Array(COLS)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-0.5 min-w-[32px] sm:min-w-[40px]">
                            <Skeleton className="h-2 w-6 rounded" />
                            <Skeleton className="h-3 w-4 rounded" />
                        </div>
                    ))}
                    <Skeleton className="h-3 w-6 ml-auto flex-shrink-0 rounded" />
                    <Skeleton className="h-6 w-6 flex-shrink-0 rounded ml-1" />
                </div>
                {/* Rows */}
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center border-b border-black/5 dark:border-white/5 last:border-0 px-3 py-2 gap-1">
                        <div className="flex items-center gap-2 mr-4 flex-shrink-0">
                            <Skeleton className="h-8 w-8 rounded-full flex-shrink-0" />
                            <Skeleton className="h-3 w-16 rounded hidden sm:block" />
                        </div>
                        {[...Array(COLS)].map((_, j) => (
                            <Skeleton key={j} className="h-5 w-5 sm:h-6 sm:w-9 rounded-[5px] flex-shrink-0 min-w-[20px] sm:min-w-[32px]" />
                        ))}
                        <Skeleton className="h-4 w-8 ml-auto flex-shrink-0 rounded" />
                        <Skeleton className="h-6 w-6 flex-shrink-0 rounded ml-1" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Squads list  /dashboard/squads
// ─────────────────────────────────────────────
export function SquadsSkeleton() {
    return (
        <div className="page-container space-y-4">
            {/* Header */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1.5">
                    <Skeleton className="h-7 w-36 rounded-md" />
                    <Skeleton className="h-3 w-24 rounded-md" />
                </div>
                <Skeleton className="h-8 w-28 rounded-lg" />
            </div>

            {/* Search + stat boxes */}
            <div className="grid gap-3 md:grid-cols-12">
                <Skeleton className="md:col-span-8 h-10 rounded-xl" />
                <div className="md:col-span-4 flex gap-3">
                    <Skeleton className="flex-1 h-14 rounded-xl" />
                    <Skeleton className="flex-1 h-14 rounded-xl" />
                </div>
            </div>

            {/* Cards */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="rounded-2xl border border-black/5 dark:border-white/[0.05] p-3 space-y-3">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-8 w-8 rounded-lg" />
                            <div className="flex -space-x-2">
                                {[...Array(3)].map((_, j) => (
                                    <Skeleton key={j} className="h-6 w-6 rounded-full ring-2 ring-white dark:ring-[#0A0A0F]" />
                                ))}
                            </div>
                        </div>
                        <Skeleton className="h-4 w-3/4 rounded-md" />
                        <Skeleton className="h-3 w-full rounded-md" />
                        <div className="flex items-center justify-between pt-1">
                            <div className="flex gap-3">
                                <Skeleton className="h-3 w-16 rounded-md" />
                                <Skeleton className="h-3 w-20 rounded-md" />
                            </div>
                            <Skeleton className="h-4 w-4 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Squad detail  /dashboard/squads/[id]
// ─────────────────────────────────────────────
export function SquadDetailSkeleton() {
    const COLS = 7;
    return (
        <div className="space-y-6 animate-in fade-in duration-300">
            {/* Back + action buttons */}
            <div className="flex items-center justify-between px-1">
                <Skeleton className="h-4 w-28 rounded-md" />
                <div className="flex gap-1.5">
                    <Skeleton className="h-8 w-8 rounded-lg" />
                    <Skeleton className="h-8 w-8 rounded-lg" />
                </div>
            </div>

            {/* Squad info card */}
            <div className="rounded-[1.5rem] border border-black/5 dark:border-white/[0.05] p-5 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
                            <Skeleton className="h-8 w-48 rounded-md" />
                        </div>
                        <Skeleton className="h-3 w-64 ml-[52px] rounded-md" />
                        <div className="flex gap-3 ml-[52px]">
                            <Skeleton className="h-3 w-36 rounded-md" />
                            <Skeleton className="h-3 w-20 rounded-md" />
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2.5">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-[#0A0A0F]" />
                            ))}
                        </div>
                        <Skeleton className="h-8 w-28 rounded-lg" />
                    </div>
                </div>
            </div>

            {/* Habits section header */}
            <div className="flex items-center justify-between px-1">
                <Skeleton className="h-6 w-44 rounded-md" />
                <Skeleton className="h-7 w-28 rounded-lg" />
            </div>

            {/* Habit matrix table */}
            <div className="rounded-2xl border border-black/5 dark:border-white/[0.05] overflow-hidden">
                {/* Header row */}
                <div className="flex items-center border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01] px-4 py-3 gap-1">
                    <Skeleton className="h-4 w-12 mr-6 flex-shrink-0 rounded" />
                    {[...Array(COLS)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-0.5 min-w-[40px]">
                            <Skeleton className="h-2 w-6 rounded" />
                            <Skeleton className="h-3 w-4 rounded" />
                        </div>
                    ))}
                    <Skeleton className="h-3 w-6 ml-auto flex-shrink-0 rounded" />
                    <Skeleton className="h-6 w-6 flex-shrink-0 rounded ml-2" />
                </div>
                {/* Body rows */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="flex items-center border-b border-black/5 dark:border-white/5 last:border-0 px-4 py-2 gap-1">
                        <div className="flex items-center gap-2.5 mr-6 flex-shrink-0">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-3 w-16 rounded" />
                        </div>
                        {[...Array(COLS)].map((_, j) => (
                            <Skeleton key={j} className="h-6 w-6 sm:w-9 rounded-[6px] flex-shrink-0 min-w-[24px] sm:min-w-[36px]" />
                        ))}
                        <Skeleton className="h-4 w-8 ml-auto flex-shrink-0 rounded" />
                        <Skeleton className="h-6 w-6 flex-shrink-0 rounded ml-2" />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Stats  /dashboard/stats
// ─────────────────────────────────────────────
export function StatsSkeleton() {
    return (
        <div className="page-container">
            {/* Header */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1.5">
                    <Skeleton className="h-7 w-28 rounded-md" />
                    <Skeleton className="h-3 w-44 rounded-md" />
                </div>
                <Skeleton className="h-9 w-36 rounded-lg" />
            </div>

            {/* Quick stats — 4 cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[...Array(4)].map((_, i) => (
                    <div key={i} className="card p-4 space-y-3">
                        <Skeleton className="h-9 w-9 rounded-lg" />
                        <Skeleton className="h-7 w-12 rounded-md" />
                        <Skeleton className="h-3 w-20 rounded-md" />
                    </div>
                ))}
            </div>

            {/* Charts grid */}
            <div className="grid lg:grid-cols-2 gap-4">
                {/* Area chart */}
                <div className="card p-4 space-y-4">
                    <Skeleton className="h-4 w-36 rounded-md" />
                    <Skeleton className="h-48 w-full rounded-lg" />
                </div>
                {/* Pie chart */}
                <div className="card p-4 space-y-4">
                    <Skeleton className="h-4 w-32 rounded-md" />
                    <div className="h-48 flex items-center justify-center">
                        <Skeleton className="h-40 w-40 rounded-full" />
                    </div>
                </div>
                {/* Top habits */}
                <div className="card p-6 space-y-4">
                    <Skeleton className="h-5 w-44 rounded-md" />
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="flex items-center gap-4">
                            <Skeleton className="h-10 w-10 rounded-xl flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                                <div className="flex justify-between">
                                    <Skeleton className="h-4 w-28 rounded-md" />
                                    <Skeleton className="h-4 w-10 rounded-md" />
                                </div>
                                <Skeleton className="h-1.5 w-full rounded-full" />
                            </div>
                        </div>
                    ))}
                </div>
                {/* Achievements */}
                <div className="card p-6 space-y-4">
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="rounded-xl border-2 border-black/5 dark:border-white/5 p-4 flex flex-col items-center gap-3">
                                <Skeleton className="h-14 w-14 rounded-xl" />
                                <Skeleton className="h-4 w-16 rounded-md" />
                                <Skeleton className="h-3 w-20 rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────
// Calendar grid cells  /dashboard/calendar
// (replaces only the cell area, not the whole page)
// ─────────────────────────────────────────────
export function CalendarCellsSkeleton() {
    return (
        <div className="border border-black/5 dark:border-white/5 rounded-lg overflow-hidden">
            {[...Array(5)].map((_, row) => (
                <div key={row} className="grid grid-cols-7">
                    {[...Array(7)].map((_, col) => (
                        <Skeleton key={col} className="aspect-square rounded-none" />
                    ))}
                </div>
            ))}
        </div>
    );
}

// ─────────────────────────────────────────────
// Settings  /dashboard/settings
// ─────────────────────────────────────────────
export function SettingsSkeleton() {
    return (
        <div className="page-container max-w-3xl">
            <div className="mb-4 space-y-2">
                <Skeleton className="h-7 w-24 rounded-md" />
                <Skeleton className="h-3 w-40 rounded-md" />
            </div>
            <div className="space-y-6">
                {/* Profile card */}
                <div className="card p-4 space-y-4">
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-14 w-14 rounded-xl flex-shrink-0" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32 rounded-md" />
                            <Skeleton className="h-3 w-44 rounded-md" />
                        </div>
                    </div>
                    <Skeleton className="h-10 w-full rounded-lg" />
                    <Skeleton className="h-10 w-32 rounded-lg" />
                </div>
                {/* Appearance card */}
                <div className="card p-6 space-y-4">
                    <Skeleton className="h-5 w-32 rounded-md" />
                    <div className="grid grid-cols-3 gap-3">
                        {[...Array(3)].map((_, i) => (
                            <Skeleton key={i} className="h-24 rounded-xl" />
                        ))}
                    </div>
                </div>
                {/* Notifications card */}
                <div className="card p-6 space-y-4">
                    <Skeleton className="h-5 w-36 rounded-md" />
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]">
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-4 w-4 rounded" />
                                <div className="space-y-1.5">
                                    <Skeleton className="h-4 w-32 rounded-md" />
                                    <Skeleton className="h-3 w-48 rounded-md" />
                                </div>
                            </div>
                            <Skeleton className="h-6 w-11 rounded-full" />
                        </div>
                    ))}
                </div>
                {/* Data card */}
                <div className="card p-6 space-y-3">
                    <Skeleton className="h-5 w-24 rounded-md" />
                    <Skeleton className="h-14 w-full rounded-xl" />
                    <Skeleton className="h-14 w-full rounded-xl" />
                </div>
            </div>
        </div>
    );
}
