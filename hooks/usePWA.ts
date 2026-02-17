"use client";

import { useEffect, useCallback } from "react";

export function useServiceWorker() {
    useEffect(() => {
        if (typeof window === "undefined" || !("serviceWorker" in navigator)) {
            return;
        }

        navigator.serviceWorker
            .register("/sw.js")
            .then((registration) => {
                console.log("SW registered:", registration.scope);

                // Check for updates periodically
                setInterval(() => {
                    registration.update();
                }, 60 * 60 * 1000); // every hour
            })
            .catch((error) => {
                console.log("SW registration failed:", error);
            });
    }, []);
}

export function useNotifications() {
    const requestPermission = useCallback(async (): Promise<boolean> => {
        if (!("Notification" in window)) {
            return false;
        }

        if (Notification.permission === "granted") {
            return true;
        }

        if (Notification.permission === "denied") {
            return false;
        }

        const permission = await Notification.requestPermission();
        return permission === "granted";
    }, []);

    const scheduleNotification = useCallback(
        async (title: string, body: string, delayMs: number = 0) => {
            const hasPermission = await requestPermission();
            if (!hasPermission) return;

            if (delayMs > 0) {
                setTimeout(() => {
                    new Notification(title, {
                        body,
                        icon: "/icons/icon-192x192.png",
                        badge: "/icons/icon-96x96.png",
                    });
                }, delayMs);
            } else {
                new Notification(title, {
                    body,
                    icon: "/icons/icon-192x192.png",
                    badge: "/icons/icon-96x96.png",
                });
            }
        },
        [requestPermission]
    );

    const sendDailyReminder = useCallback(async () => {
        await scheduleNotification(
            "🏆 Day Win",
            "Don't forget to complete your habits today! Keep your streak going.",
        );
    }, [scheduleNotification]);

    return {
        requestPermission,
        scheduleNotification,
        sendDailyReminder,
        isSupported: typeof window !== "undefined" && "Notification" in window,
        permission:
            typeof window !== "undefined" && "Notification" in window
                ? Notification.permission
                : "default",
    };
}
