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
            <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-72 flex-col border-r border-black/5 bg-white/70 px-5 py-6 backdrop-blur-2xl dark:border-white/[0.03] dark:bg-[#030305]/70 z-40">
                <Link href="/" className="mb-10 px-4">
                    <DailyWinLogo
                        label="DAY WIN"
                        iconClassName="h-10 w-10 rounded-xl"
                        textClassName="text-sm font-black tracking-[0.2em] text-black dark:text-white"
                    />
                </Link>

                <nav className="flex-1 space-y-1.5">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-3.5 rounded-2xl px-5 py-3.5 text-sm font-bold transition-all duration-300",
                                    isActive
                                        ? "bg-black text-white shadow-lg shadow-black/10 dark:bg-white dark:text-black dark:shadow-white/10"
                                        : "text-black/50 hover:bg-black/5 hover:text-black dark:text-white/40 dark:hover:bg-white/[0.04] dark:hover:text-white"
                                )}
                            >
                                <item.icon className={cn("h-5 w-5 transition-transform duration-300", isActive && "scale-110")} />
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active-indicator"
                                        className="absolute right-4 h-1.5 w-1.5 rounded-full bg-[#4D7CFE] dark:bg-[#4D7CFE]"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8 rounded-[2.5rem] border border-black/5 bg-black/5 p-4 dark:border-white/[0.03] dark:bg-white/[0.02]">
                    <div className="mb-4 flex items-center gap-4 px-1">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-black shadow-inner ring-1 ring-white/10 dark:bg-white">
                            <span className="text-sm font-black text-white dark:text-black">
                                {session?.user?.name?.[0] || "U"}
                            </span>
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-black dark:text-white leading-tight">
                                {session?.user?.name || "User"}
                            </p>
                            <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/30">
                                Premium Goal Member
                            </p>
                        </div>
                    </div>

                    <div className="mb-4 flex items-center justify-between gap-1 p-1 bg-white/50 dark:bg-black/20 rounded-2xl border border-black/5 dark:border-white/[0.03]">
                        {["light", "dark", "system"].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTheme(t)}
                                className={cn(
                                    "flex flex-1 items-center justify-center rounded-xl py-2 transition-all duration-300",
                                    theme === t
                                        ? "bg-white text-black shadow-sm dark:bg-[#1A1A24] dark:text-white"
                                        : "text-black/40 hover:text-black dark:text-white/30 dark:hover:text-white"
                                )}
                                aria-label={`${t} mode`}
                            >
                                {t === "light" && <Sun className="h-4 w-4" />}
                                {t === "dark" && <Moon className="h-4 w-4" />}
                                {t === "system" && <Monitor className="h-4 w-4" />}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-2.5">
                        <Link
                            href="/dashboard/settings"
                            className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-black/5 bg-white py-3 text-[10px] font-black uppercase tracking-[0.14em] text-black transition-all hover:bg-black hover:text-white dark:border-white/[0.03] dark:bg-[#1A1A24] dark:text-white dark:hover:bg-white dark:hover:text-black shadow-sm"
                        >
                            <Settings className="h-3.5 w-3.5" />
                            Settings
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-red-500/10 bg-red-500/5 text-red-500 transition-all hover:bg-red-500 hover:text-white"
                            aria-label="Sign out"
                        >
                            <LogOut className="h-4.5 w-4.5" />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Premium Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50">
                <div className="rounded-[2.5rem] border border-black/5 bg-white/80 p-2 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-2xl dark:border-white/[0.05] dark:bg-[#0A0A10]/90 dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
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
                                                ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                                                : "text-black/40 hover:text-black dark:text-white/30 dark:hover:text-white"
                                        )}
                                    >
                                        <item.icon className={cn("h-5 w-5 transition-transform duration-500", isActive && "scale-110")} />
                                    </Link>
                                </li>
                            );
                        })}
                        <li className="flex-1">
                            <Link
                                href="/dashboard/settings"
                                className={cn(
                                    "flex flex-col items-center justify-center gap-1.5 rounded-[2rem] py-3.5 transition-all duration-500",
                                    pathname === "/dashboard/settings"
                                        ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                                        : "text-black/40 hover:text-black dark:text-white/30 dark:hover:text-white"
                                )}
                            >
                                <User className={cn("h-5 w-5 transition-transform duration-500", pathname === "/dashboard/settings" && "scale-110")} />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

