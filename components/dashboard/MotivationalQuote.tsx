"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";

const quotes = [
    { text: "Small daily improvements are the key to staggering long-term results.", author: "Unknown" },
    { text: "Excellence is not an act, but a habit.", author: "Aristotle" },
    { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "Habits are the compound interest of self-improvement.", author: "James Clear" },
];

export function MotivationalQuote() {
    const [quote, setQuote] = useState(quotes[0]);
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const changeQuote = () => {
        setIsChanging(true);
        setTimeout(() => {
            const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(newQuote);
            setIsChanging(false);
        }, 220);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card relative overflow-hidden"
        >
            <div className="mb-3 sm:mb-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5 sm:gap-2 text-black/65 dark:text-white/65">
                    <Sparkles className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-[0.12em]">Daily Motivation</span>
                </div>
                <button
                    onClick={changeQuote}
                    disabled={isChanging}
                    className="rounded-lg border border-black/15 p-1.5 sm:p-2 text-black/70 transition hover:border-black hover:text-black dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
                    aria-label="Refresh quote"
                >
                    <RefreshCw className={`h-3.5 w-3.5 sm:h-4 sm:w-4 ${isChanging ? "animate-spin" : ""}`} />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={quote.text}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                >
                    <p className="text-base sm:text-lg font-semibold leading-relaxed text-black dark:text-white">
                        "{quote.text}"
                    </p>
                    <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-black/55 dark:text-white/55">- {quote.author}</p>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
