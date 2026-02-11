"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
    User,
    Bell,
    Palette,
    Shield,
    Download,
    LogOut,
    Sun,
    Moon,
    Monitor,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(session?.user?.name || "");

    const handleUpdateProfile = async () => {
        setIsLoading(true);
        try {
            // Update profile API call
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportData = async () => {
        toast.success("Export started! Check your email.");
    };

    const themes = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
    ];

    return (
        <div className="page-container max-w-3xl">
            <div className="page-header">
                <h1 className="page-title">Settings</h1>
                <p className="page-subtitle">Control profile, theme, notifications, and data in one place.</p>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <User className="w-5 h-5 text-primary-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Profile
                        </h2>
                    </div>

                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-3xl font-bold">
                            {session?.user?.name?.[0] || "U"}
                        </div>
                        <div>
                            <p className="font-semibold text-surface-900 dark:text-white">
                                {session?.user?.name}
                            </p>
                            <p className="text-sm text-surface-200/50">
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Display Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                        />
                        <Button
                            onClick={handleUpdateProfile}
                            isLoading={isLoading}
                        >
                            Save Changes
                        </Button>
                    </div>
                </motion.div>

                {/* Appearance Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Palette className="w-5 h-5 text-primary-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Appearance
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {themes.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => setTheme(t.value)}
                                className={cn(
                                    "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                                    theme === t.value
                                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                                        : "border-surface-200 dark:border-surface-800 hover:border-primary-300"
                                )}
                            >
                                <t.icon
                                    className={cn(
                                        "w-6 h-6",
                                        theme === t.value
                                            ? "text-primary-500"
                                            : "text-surface-200/50"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        theme === t.value
                                            ? "text-primary-600 dark:text-primary-400"
                                            : "text-surface-600 dark:text-surface-200/50"
                                    )}
                                >
                                    {t.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Notifications Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="w-5 h-5 text-primary-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Notifications
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: "Daily reminders", description: "Get reminded to complete your habits" },
                            { label: "Weekly summary", description: "Receive a weekly progress report" },
                            { label: "Streak alerts", description: "Be notified when your streak is at risk" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50"
                            >
                                <div>
                                    <p className="font-medium text-surface-900 dark:text-white">
                                        {item.label}
                                    </p>
                                    <p className="text-sm text-surface-200/50">
                                        {item.description}
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-surface-200 dark:bg-surface-800 rounded-full peer peer-checked:bg-primary-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                                </label>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Data Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Download className="w-5 h-5 text-primary-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Your Data
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleExportData}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        >
                            <div className="text-left">
                                <p className="font-medium text-surface-900 dark:text-white">
                                    Export Data
                                </p>
                                <p className="text-sm text-surface-200/50">
                                    Download all your habit data as CSV
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-surface-200/50" />
                        </button>
                    </div>
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card p-6 border-red-200 dark:border-red-900/50"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-5 h-5 text-red-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Account
                        </h2>
                    </div>

                    <Button
                        variant="danger"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        leftIcon={<LogOut className="w-5 h-5" />}
                    >
                        Sign Out
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}


