"use client";

import { useState } from "react";
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
    ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/dashboard", label: "Today", icon: Home },
    { href: "/dashboard/habits", label: "Habits", icon: LayoutGrid },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/stats", label: "Stats", icon: BarChart3 },
];

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [showUserMenu, setShowUserMenu] = useState(false);

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col bg-white dark:bg-surface-900 border-r border-surface-200 dark:border-surface-800 z-40">
                {/* Logo */}
                <div className="p-6">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                            <span className="text-xl">🏆</span>
                        </div>
                        <span className="text-xl font-bold text-gradient">Day Win</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4">
                    <ul className="space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300",
                                            isActive
                                                ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                                                : "text-surface-600 dark:text-surface-200/50 hover:bg-surface-100 dark:hover:bg-surface-800"
                                        )}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span className="font-medium">{item.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute left-0 w-1 h-8 bg-primary-500 rounded-r-full"
                                            />
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User Section */}
                <div className="p-4 border-t border-surface-200 dark:border-surface-800">
                    {/* Theme Toggle */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-surface-600 dark:text-surface-200/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors mb-2"
                    >
                        {theme === "dark" ? (
                            <Sun className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                        <span className="font-medium">
                            {theme === "dark" ? "Light Mode" : "Dark Mode"}
                        </span>
                    </button>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-semibold text-sm">
                                {session?.user?.name?.[0] || "U"}
                            </div>
                            <div className="flex-1 text-left">
                                <p className="text-sm font-medium text-surface-900 dark:text-white truncate">
                                    {session?.user?.name || "User"}
                                </p>
                                <p className="text-xs text-surface-200/50 truncate">
                                    {session?.user?.email}
                                </p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-surface-200/50" />
                        </button>

                        {showUserMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowUserMenu(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-surface-900 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800 overflow-hidden z-20"
                                >
                                    <Link
                                        href="/dashboard/settings"
                                        onClick={() => setShowUserMenu(false)}
                                        className="flex items-center gap-3 px-4 py-3 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    >
                                        <Settings className="w-4 h-4 text-surface-200/50" />
                                        <span className="text-surface-900 dark:text-white">Settings</span>
                                    </Link>
                                    <button
                                        onClick={() => signOut()}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </div>
                </div>
            </aside>

            {/* Mobile Bottom Navigation */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-surface-900/90 backdrop-blur-xl border-t border-surface-200 dark:border-surface-800 z-40 safe-area-bottom">
                <ul className="flex items-center justify-around px-4 py-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                                        isActive
                                            ? "text-primary-600 dark:text-primary-400"
                                            : "text-surface-200/50"
                                    )}
                                >
                                    <item.icon className="w-6 h-6" />
                                    <span className="text-xs font-medium">{item.label}</span>
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeMobileNav"
                                            className="absolute bottom-0 w-12 h-1 bg-primary-500 rounded-t-full"
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <Link
                            href="/dashboard/settings"
                            className={cn(
                                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300",
                                pathname === "/dashboard/settings"
                                    ? "text-primary-600 dark:text-primary-400"
                                    : "text-surface-200/50"
                            )}
                        >
                            <User className="w-6 h-6" />
                            <span className="text-xs font-medium">Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
