"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import {
    Home,
    LayoutGrid,
    Calendar,
    BarChart3,
    Settings,
    LogOut,
    Sun,
    Moon,
    User,
    Monitor,
    FileText,
    Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/habits", label: "Habits", icon: LayoutGrid },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/stats", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/templates", label: "Templates", icon: FileText },
    { href: "/dashboard/squads", label: "Squads", icon: Users },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { theme } = useTheme();

    return (
        <>
            <aside className="peer/sidebar group/sidebar hidden md:flex fixed left-0 top-0 bottom-0 w-20 hover:w-56 xl:hover:w-60 flex-col border-r border-surface-200/50 bg-white/80 px-3 py-5 backdrop-blur-xl dark:border-white/[0.05] dark:bg-[#0A0A0F]/80 z-40 transition-[width] duration-300">
                <Link href="/" className="mb-8 flex items-center gap-3 overflow-hidden px-1.5 group">
                    <DailyWinLogo
                        hideLabel
                        label="DAY WIN"
                        iconClassName="h-9 w-9 rounded-xl shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="pointer-events-none w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover/sidebar:w-24 group-hover/sidebar:opacity-100">
                        DAY WIN
                    </span>
                </Link>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold transition-all duration-300 group overflow-hidden",
                                    isActive
                                        ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25 dark:shadow-primary-500/15 ring-1 ring-white/10"
                                        : "text-surface-500 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-white/[0.05] dark:hover:text-white hover:translate-x-1"
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        "h-4.5 w-4.5 shrink-0 transition-transform duration-300",
                                        isActive ? "scale-110" : "group-hover:scale-110"
                                    )}
                                />
                                <span className="relative z-10 w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover/sidebar:w-24 group-hover/sidebar:opacity-100">
                                    {item.label}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="nav-glow"
                                        className="absolute inset-0 bg-white/20 dark:bg-white/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    />
                                )}
                            </Link>
                        );
                    })}

                    <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="relative flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-semibold text-surface-500 transition-all duration-300 group overflow-hidden hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-white/[0.05] dark:hover:text-white hover:translate-x-1"
                    >
                        <LogOut className="h-4.5 w-4.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span className="relative z-10 w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover/sidebar:w-24 group-hover/sidebar:opacity-100">
                            Sign Out
                        </span>
                    </button>
                </nav>

                <div className="mt-6">
                    <div className="relative overflow-hidden rounded-2xl border border-surface-200/50 bg-gradient-to-b from-white to-surface-50/50 p-3 dark:border-white/[0.05] dark:from-white/[0.03] dark:to-transparent backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 group cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="relative h-9 w-9 flex-shrink-0">
                                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 opacity-20 dark:opacity-30 blur-sm group-hover:opacity-40 transition-opacity duration-300" />
                                <div className="relative flex h-full w-full items-center justify-center rounded-xl bg-white dark:bg-[#1A1A20] border border-primary-500/10 shadow-sm">
                                    <span className="text-sm font-bold bg-gradient-to-br from-primary-600 to-primary-700 bg-clip-text text-transparent">
                                        {session?.user?.name?.[0] || "U"}
                                    </span>
                                </div>
                            </div>
                            <div className="min-w-0 w-0 flex-1 overflow-hidden opacity-0 transition-all duration-200 group-hover/sidebar:w-auto group-hover/sidebar:opacity-100">
                                <p className="truncate text-[13px] font-bold text-surface-900 dark:text-surface-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                                    {session?.user?.name || "User"}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <div className="h-1.5 w-1.5 rounded-full bg-success-500 animate-pulse" />
                                    <p className="truncate text-[10px] font-bold uppercase tracking-wider text-surface-400">
                                        Premium Pro
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </aside>

            {/* Premium Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                <div className="rounded-[2.5rem] border border-white/20 bg-white/90 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-white/[0.1] dark:bg-[#0A0A10]/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                    <ul className="flex items-center justify-around">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href} className="flex-1">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-1.5 rounded-[2rem] py-3.5 transition-all duration-500",
                                            isActive
                                                ? "bg-gradient-to-br from-primary-900 to-surface-800 text-white dark:from-white dark:to-surface-200 dark:text-black shadow-lg scale-105"
                                                : "text-surface-400 hover:text-surface-900 dark:text-surface-500 dark:hover:text-white"
                                        )}
                                    >
                                        <item.icon className={cn("h-5 w-5 transition-transform duration-500", isActive && "scale-110")} />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </nav>
        </>
    );
}

