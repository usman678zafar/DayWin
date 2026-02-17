"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Application error:", error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f3f5f8] dark:bg-[#04070f] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md w-full text-center"
            >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                    <AlertTriangle className="h-10 w-10 text-red-500" />
                </div>

                <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
                    Something went wrong
                </h1>
                <p className="text-sm text-black/60 dark:text-white/60 mb-8">
                    An unexpected error occurred. Don&apos;t worry, your data is safe. Try refreshing or go back to the dashboard.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                    >
                        <RotateCcw className="h-4 w-4" />
                        Try Again
                    </button>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/20 px-6 py-3 text-sm font-bold text-black transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
                    >
                        <Home className="h-4 w-4" />
                        Dashboard
                    </Link>
                </div>

                {error.digest && (
                    <p className="mt-6 text-xs text-black/30 dark:text-white/30">
                        Error ID: {error.digest}
                    </p>
                )}
            </motion.div>
        </div>
    );
}
