"use client";

import Link from "next/link";
import Image from "next/image";
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

    return (
        <>
            <aside className="peer/sidebar group/sidebar hidden md:flex fixed left-0 top-0 bottom-0 w-60 flex-col border-r border-surface-200/50 bg-white/80 px-4 py-4 backdrop-blur-xl dark:border-white/[0.05] dark:bg-[#0A0A0F]/80 z-40 transition-all duration-300">
                <Link href="/" className="mb-6 flex items-center gap-3 px-1.5 group">
                    <DailyWinLogo
                        hideLabel={false}
                        label="DAY WIN"
                        iconClassName="h-7 w-7 rounded-lg shadow-lg shadow-primary-500/20 group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>

                <nav className="flex-1 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] font-semibold transition-all duration-300 group overflow-hidden",
                                    isActive
                                        ? "bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/25 dark:shadow-primary-500/15"
                                        : "text-surface-500 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-white/[0.05] dark:hover:text-white"
                                )}
                            >
                                <item.icon className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                                <span className="whitespace-nowrap">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-4 space-y-2">
                    <button
                        type="button"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[11px] font-semibold text-black/50 hover:text-black dark:text-white/40 dark:hover:text-white transition-all duration-300 group"
                    >
                        <LogOut className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
                        <span className="whitespace-nowrap uppercase tracking-widest">Sign Out</span>
                    </button>

                    <div className="relative overflow-hidden rounded-xl border border-surface-200/50 bg-white/50 p-2.5 dark:border-white/[0.05] dark:bg-white/[0.02] backdrop-blur-sm">
                        <div className="flex items-center gap-2.5">
                            <div className="relative h-8 w-8 flex-shrink-0">
                                <div className="relative flex h-full w-full items-center justify-center rounded-lg bg-white dark:bg-[#1A1A20] border border-primary-500/10 shadow-sm overflow-hidden">
                                    {session?.user?.image ? (
                                        <Image src={session.user.image} alt="" fill className="object-cover" />
                                    ) : (
                                        <span className="font-semibold text-xs text-primary-600">
                                            {session?.user?.name?.[0] || "U"}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-[11px] font-semibold text-surface-900 dark:text-surface-100 uppercase tracking-tight">
                                    {session?.user?.name || "User"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Premium Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
                <div className="rounded-[2rem] border border-white/20 bg-white/90 p-1.5 shadow-2xl backdrop-blur-2xl dark:border-white/[0.1] dark:bg-[#0A0A10]/90">
                    <ul className="flex items-center justify-around">
                        {navItems.slice(0, 5).map((item) => {
                            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                            return (
                                <li key={item.href} className="flex-1">
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex flex-col items-center justify-center gap-1 rounded-xl py-2 transition-all duration-300",
                                            isActive
                                                ? "bg-black text-white dark:bg-white dark:text-black shadow-lg"
                                                : "text-surface-400 hover:text-surface-900 dark:text-surface-500 dark:hover:text-white"
                                        )}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        <span className="text-[9px] font-semibold uppercase tracking-tighter">{item.label}</span>
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
