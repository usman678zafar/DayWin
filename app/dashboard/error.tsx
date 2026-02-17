"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Dashboard error:", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-[60vh] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full text-center"
            >
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                    <AlertTriangle className="h-8 w-8 text-red-500" />
                </div>

                <h2 className="text-xl font-bold text-black dark:text-white mb-2">
                    Something went wrong
                </h2>
                <p className="text-sm text-black/60 dark:text-white/60 mb-6">
                    There was an error loading this page. Your data is safe.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Retry
                    </button>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 rounded-xl border border-black/20 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
                    >
                        <Home className="h-4 w-4" />
                        Home
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
