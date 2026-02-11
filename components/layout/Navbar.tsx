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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/habits", label: "Habits", icon: LayoutGrid },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/stats", label: "Analytics", icon: BarChart3 },
];

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();

    return (
        <>
            <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-72 flex-col border-r border-black/10 bg-white/85 px-5 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b14]/85 z-40">
                <Link href="/" className="mb-7">
                    <DailyWinLogo
                        label="DAILY WIN"
                        iconClassName="h-10 w-10 rounded-lg"
                        textClassName="text-sm font-bold tracking-[0.14em] text-black dark:text-white"
                    />
                </Link>

                <div className="mb-6 rounded-2xl border border-black/10 bg-black px-4 py-4 text-white dark:border-white/10">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Daily System</p>
                    <p className="mt-2 text-xl font-bold leading-tight">Consistency Wins</p>
                    <p className="mt-2 text-sm text-white/70">Track habits, build streaks, and review trends faster.</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                                    isActive
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "text-black/65 hover:bg-black/5 hover:text-black dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white"
                                )}
                            >
                                <item.icon className="h-4.5 w-4.5" />
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active-pill"
                                        className="absolute right-3 h-2 w-2 rounded-full bg-[#e8d774] dark:bg-black"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                            {session?.user?.name?.[0] || "U"}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-black dark:text-white">
                                {session?.user?.name || "User"}
                            </p>
                            <p className="truncate text-xs text-black/50 dark:text-white/50">
                                {session?.user?.email || "user@example.com"}
                            </p>
                        </div>
                    </div>

                    <div className="mb-3 grid grid-cols-3 gap-2">
                        <button
                            onClick={() => setTheme("light")}
                            className={cn(
                                "flex items-center justify-center rounded-lg border px-2 py-2 transition",
                                theme === "light"
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/15 text-black/60 hover:border-black/40 dark:border-white/15 dark:text-white/60 dark:hover:border-white/40"
                            )}
                            aria-label="Light mode"
                        >
                            <Sun className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setTheme("dark")}
                            className={cn(
                                "flex items-center justify-center rounded-lg border px-2 py-2 transition",
                                theme === "dark"
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/15 text-black/60 hover:border-black/40 dark:border-white/15 dark:text-white/60 dark:hover:border-white/40"
                            )}
                            aria-label="Dark mode"
                        >
                            <Moon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setTheme("system")}
                            className={cn(
                                "flex items-center justify-center rounded-lg border px-2 py-2 transition",
                                theme === "system"
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/15 text-black/60 hover:border-black/40 dark:border-white/15 dark:text-white/60 dark:hover:border-white/40"
                            )}
                            aria-label="System mode"
                        >
                            <Monitor className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href="/dashboard/settings"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-black/70 transition hover:border-black hover:text-black dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
                        >
                            <Settings className="h-3.5 w-3.5" />
                            Settings
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center justify-center rounded-lg border border-red-500/40 px-3 py-2 text-red-600 transition hover:bg-red-500 hover:text-white"
                            aria-label="Sign out"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </aside>

            <nav className="md:hidden fixed bottom-2 left-2 right-2 z-40 rounded-2xl border border-black/10 bg-white/92 px-2 py-2 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#0a0f19]/92">
                <ul className="grid grid-cols-5 items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold transition",
                                        isActive
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
                                    )}
                                >
                                    <item.icon className="h-4.5 w-4.5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <Link
                            href="/dashboard/settings"
                            className={cn(
                                "flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold transition",
                                pathname === "/dashboard/settings"
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
                            )}
                        >
                            <User className="h-4.5 w-4.5" />
                            <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
