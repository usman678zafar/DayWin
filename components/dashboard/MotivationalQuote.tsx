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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-3 relative overflow-hidden"
        >
            <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-black/30 dark:text-white/20">
                    <Sparkles className="h-3 w-3" />
                    <span className="text-[9px] font-black uppercase tracking-widest">Daily Motivation</span>
                </div>
                <button
                    onClick={changeQuote}
                    disabled={isChanging}
                    className="rounded p-1 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                >
                    <RefreshCw className={`h-3 w-3 ${isChanging ? "animate-spin" : ""}`} />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={quote.text}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                >
                    <p className="text-xs sm:text-sm font-bold leading-tight text-black dark:text-white">
                        "{quote.text}"
                    </p>
                    <p className="mt-1 text-[9px] font-black uppercase tracking-widest text-black/20 dark:text-white/10">- {quote.author}</p>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
