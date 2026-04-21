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
    Check,
    CalendarDays,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { useNotifications } from "@/hooks/usePWA";
import { Modal } from "@/components/ui/Modal";
import { DatePicker } from "@/components/ui/DatePicker";
import { subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth } from "date-fns";

export default function SettingsPage() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [name, setName] = useState(session?.user?.name || "");
    const { requestPermission, isSupported, permission, sendDailyReminder } = useNotifications();

    // Export state
    const [showExportModal, setShowExportModal] = useState(false);
    const [exportFormat, setExportFormat] = useState<"csv" | "json">("csv");
    const [exportRange, setExportRange] = useState<"all" | "weekly" | "monthly" | "custom">("all");
    const [exportDates, setExportDates] = useState<{ start: Date; end: Date }>({
        start: subDays(new Date(), 30),
        end: new Date()
    });

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

    const handleExportData = async () => {
        setIsExporting(true);
        try {
            let url = `/api/export?format=${exportFormat}&range=${exportRange}`;
            if (exportRange === "custom") {
                url += `&startDate=${exportDates.start.toISOString()}&endDate=${exportDates.end.toISOString()}`;
            }

            const response = await fetch(url);

            if (!response.ok) throw new Error("Export failed");

            const blob = await response.blob();
            const urlBlob = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = urlBlob;
            a.download = `daywin-export-${new Date().toISOString().split("T")[0]}.${exportFormat}`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(urlBlob);
            document.body.removeChild(a);

            toast.success(`Data exported as ${exportFormat.toUpperCase()}!`);
            setShowExportModal(false);
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
            <div className="mb-4">
                <h1 className="text-xl sm:text-2xl font-black text-black dark:text-white">Settings</h1>
                <p className="text-[10px] sm:text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-widest mt-0.5">Control your experience</p>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-4"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-xl font-bold">
                            {session?.user?.name?.[0] || "U"}
                        </div>
                        <div>
                            <p className="font-semibold text-surface-900 dark:text-white">
                                {session?.user?.name}
                            </p>
                            <p className="text-sm text-black/60 dark:text-white/60">
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
                                            : "text-black/40 dark:text-white/40"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "text-sm font-black uppercase tracking-tight",
                                        theme === t.value
                                            ? "text-primary-600 dark:text-primary-400"
                                            : "text-black/60 dark:text-white/50"
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
                                        <p className="font-medium text-black dark:text-white">
                                            {item.label}
                                        </p>
                                        <p className="text-sm text-black/60 dark:text-white/50">
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
                        <Button
                            onClick={() => {
                                setExportFormat("csv");
                                setShowExportModal(true);
                            }}
                            variant="secondary"
                            className="w-full justify-between py-3 h-auto"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                <div>
                                    <p className="font-medium text-black dark:text-white">
                                        Export as CSV
                                    </p>
                                    <p className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-tight mt-0.5">
                                        Spreadsheet compatible with analysis
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-black/20 dark:text-white/20" />
                        </Button>

                        <Button
                            onClick={() => {
                                setExportFormat("json");
                                setShowExportModal(true);
                            }}
                            variant="secondary"
                            className="w-full justify-between py-3 h-auto"
                        >
                            <div className="flex items-center gap-3 text-left">
                                <FileJson className="w-5 h-5 text-blue-500" />
                                <div>
                                    <p className="font-medium text-black dark:text-white">
                                        Export as JSON
                                    </p>
                                    <p className="text-xs font-bold text-black/50 dark:text-white/50 uppercase tracking-tight mt-0.5">
                                        Raw data and stats for developers
                                    </p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-black/20 dark:text-white/20" />
                        </Button>
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
                        <h2 className="text-lg font-semibold text-black dark:text-white">
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

            {/* Export Options Modal */}
            <Modal
                isOpen={showExportModal}
                onClose={() => setShowExportModal(false)}
                title="Export Data"
                size="md"
            >
                <div className="space-y-6">
                    <p className="text-sm font-bold text-black/60 dark:text-white/50">
                        Choose the data range and format for your export. The exported file will include a detailed analysis summary.
                    </p>

                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase tracking-wider text-black/50 dark:text-white/40">
                            Select Range
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {[
                                { value: "weekly", label: "This Week", icon: CalendarDays },
                                { value: "monthly", label: "This Month", icon: Palette },
                                { value: "custom", label: "Custom Range", icon: Bell },
                                { value: "all", label: "All Time", icon: Monitor },
                            ].map((opt) => (
                                <button
                                    key={opt.value}
                                    onClick={() => setExportRange(opt.value as any)}
                                    className={cn(
                                        "flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-sm font-bold",
                                        exportRange === opt.value
                                            ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400"
                                            : "border-black/5 dark:border-white/5 text-black/60 dark:text-white/40 hover:border-black/10 dark:hover:border-white/10"
                                    )}
                                >
                                    {exportRange === opt.value && <Check className="w-4 h-4" />}
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {exportRange === "custom" && (
                            <div className="grid grid-cols-2 gap-4 mt-4 animate-in fade-in slide-in-from-top-2">
                                <DatePicker
                                    label="Start Date"
                                    value={exportDates.start}
                                    onChange={(date) => setExportDates(prev => ({ ...prev, start: date || new Date() }))}
                                />
                                <DatePicker
                                    label="End Date"
                                    value={exportDates.end}
                                    onChange={(date) => setExportDates(prev => ({ ...prev, end: date || new Date() }))}
                                />
                            </div>
                        )}
                    </div>

                    <div className="pt-4 flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setShowExportModal(false)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleExportData}
                            isLoading={isExporting}
                            className="flex-1"
                        >
                            Download {exportFormat.toUpperCase()}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
