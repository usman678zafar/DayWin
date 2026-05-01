"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";

const quotes = [
    { text: "Small daily improvements are the key to staggering results.", author: "James Clear" },
    { text: "Excellence is not an act, but a habit.", author: "Aristotle" },
    { text: "The secret of your future is hidden in your routine.", author: "Mike Murdock" },
    { text: "Success is the sum of small efforts repeated daily.", author: "Robert Collier" },
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
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="relative overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-purple-50 to-white p-6 dark:from-purple-950/20 dark:to-white/[0.02] dark:border-white/5"
        >
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-purple-500/10 blur-3xl" />
            <div className="relative">
                <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-black/30 dark:text-white/20">
                        <div className="rounded-lg bg-purple-500/10 p-2">
                            <Sparkles className="h-4 w-4 text-purple-500" />
                        </div>
                        <span className="text-xs font-black uppercase tracking-wider">Daily Motivation</span>
                    </div>
                    <button
                        onClick={changeQuote}
                        disabled={isChanging}
                        className="rounded-lg p-2 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                    >
                        <RefreshCw className={`h-4 w-4 ${isChanging ? "animate-spin" : ""}`} />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={quote.text}
                        initial={false}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                    >
                        <p className="text-sm sm:text-base font-bold leading-relaxed text-black dark:text-white">
                            &ldquo;{quote.text}&rdquo;
                        </p>
                        <p className="mt-2 text-xs font-black uppercase tracking-wider text-black/20 dark:text-white/10">- {quote.author}</p>
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
