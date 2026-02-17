"use client";

import { useState, useEffect, useCallback } from "react";
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
    FileJson,
    FileSpreadsheet,
    Loader2,
    BellRing,
    BellOff,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useNotifications } from "@/hooks/usePWA";

export default function SettingsPage() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [name, setName] = useState(session?.user?.name || "");
    const { requestPermission, isSupported, permission, sendDailyReminder } = useNotifications();

    const [notifSettings, setNotifSettings] = useState({
        dailyReminders: true,
        weeklySummary: true,
        streakAlerts: true,
    });
    const [notifPermission, setNotifPermission] = useState<string>("default");

    // Sync notification permission state
    useEffect(() => {
        if (isSupported) {
            setNotifPermission(permission);
        }
    }, [isSupported, permission]);

    // Load notification settings from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("daywin-notifications");
        if (saved) {
            try {
                setNotifSettings(JSON.parse(saved));
            } catch (e) {
                // ignore
            }
        }
    }, []);

    const handleUpdateProfile = async () => {
        if (!name.trim()) {
            toast.error("Name cannot be empty");
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch("/api/auth/update-profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: name.trim() }),
            });

            if (!response.ok) throw new Error("Failed to update");
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportData = async (format: "csv" | "json") => {
        setIsExporting(true);
        try {
            const response = await fetch(`/api/export?format=${format}`);

            if (!response.ok) throw new Error("Export failed");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `daywin-export-${new Date().toISOString().split("T")[0]}.${format}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);

            toast.success(`Data exported as ${format.toUpperCase()}!`);
        } catch (error) {
            toast.error("Failed to export data. Please try again.");
        } finally {
            setIsExporting(false);
        }
    };

    const handleToggleNotification = useCallback(
        async (key: keyof typeof notifSettings) => {
            // Request permission first if not granted
            if (notifPermission !== "granted") {
                const granted = await requestPermission();
                setNotifPermission(granted ? "granted" : "denied");
                if (!granted) {
                    toast.error("Notification permission denied. Enable it in browser settings.");
                    return;
                }
            }

            const newSettings = {
                ...notifSettings,
                [key]: !notifSettings[key],
            };
            setNotifSettings(newSettings);
            localStorage.setItem("daywin-notifications", JSON.stringify(newSettings));

            if (newSettings[key]) {
                toast.success("Notifications enabled!");
                // Send a test notification for daily reminders
                if (key === "dailyReminders") {
                    sendDailyReminder();
                }
            } else {
                toast("Notifications disabled", { icon: "🔕" });
            }
        },
        [notifSettings, notifPermission, requestPermission, sendDailyReminder]
    );

    const themes = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
    ];

    const notificationItems = [
        {
            key: "dailyReminders" as const,
            label: "Daily reminders",
            description: "Get reminded to complete your habits",
            icon: BellRing,
        },
        {
            key: "weeklySummary" as const,
            label: "Weekly summary",
            description: "Receive a weekly progress report",
            icon: Bell,
        },
        {
            key: "streakAlerts" as const,
            label: "Streak alerts",
            description: "Be notified when your streak is at risk",
            icon: BellOff,
        },
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
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <Bell className="w-5 h-5 text-primary-500" />
                            <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                                Notifications
                            </h2>
                        </div>
                        {!isSupported && (
                            <span className="text-xs text-red-500 bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded-full">
                                Not supported
                            </span>
                        )}
                        {isSupported && notifPermission === "denied" && (
                            <span className="text-xs text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 px-2 py-1 rounded-full">
                                Blocked in browser
                            </span>
                        )}
                    </div>

                    <div className="space-y-4">
                        {notificationItems.map((item) => (
                            <div
                                key={item.key}
                                className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50"
                            >
                                <div className="flex items-center gap-3">
                                    <item.icon className="w-4 h-4 text-black/40 dark:text-white/40" />
                                    <div>
                                        <p className="font-medium text-surface-900 dark:text-white">
                                            {item.label}
                                        </p>
                                        <p className="text-sm text-surface-200/50">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={notifSettings[item.key]}
                                        onChange={() => handleToggleNotification(item.key)}
                                        disabled={!isSupported}
                                    />
                                    <div className="w-11 h-6 bg-surface-200 dark:bg-surface-800 rounded-full peer peer-checked:bg-primary-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-disabled:opacity-50 peer-disabled:cursor-not-allowed" />
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

                    <div className="space-y-3">
                        <button
                            onClick={() => handleExportData("csv")}
                            disabled={isExporting}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors disabled:opacity-50"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="font-medium text-surface-900 dark:text-white">
                                        Export as CSV
                                    </p>
                                    <p className="text-sm text-surface-200/50">
                                        Download spreadsheet-compatible file
                                    </p>
                                </div>
                            </div>
                            {isExporting ? (
                                <Loader2 className="w-5 h-5 animate-spin text-surface-200/50" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-surface-200/50" />
                            )}
                        </button>
                        <button
                            onClick={() => handleExportData("json")}
                            disabled={isExporting}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors disabled:opacity-50"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <FileJson className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="font-medium text-surface-900 dark:text-white">
                                        Export as JSON
                                    </p>
                                    <p className="text-sm text-surface-200/50">
                                        Download raw data backup
                                    </p>
                                </div>
                            </div>
                            {isExporting ? (
                                <Loader2 className="w-5 h-5 animate-spin text-surface-200/50" />
                            ) : (
                                <ChevronRight className="w-5 h-5 text-surface-200/50" />
                            )}
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
