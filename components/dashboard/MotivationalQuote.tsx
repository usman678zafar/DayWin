"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";

const quotes = [
    { text: "Small daily improvements are the key to staggering long-term results.", author: "Unknown" },
    { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle" },
    { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "You'll never change your life until you change something you do daily.", author: "John C. Maxwell" },
    { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
    { text: "First forget inspiration. Habit is more dependable.", author: "Octavia Butler" },
    { text: "The chains of habit are too weak to be felt until they are too strong to be broken.", author: "Samuel Johnson" },
    { text: "Your net worth to the world is usually determined by what remains after your bad habits are subtracted from your good ones.", author: "Benjamin Franklin" },
    { text: "Habits are the compound interest of self-improvement.", author: "James Clear" },
];

export function MotivationalQuote() {
    const [quote, setQuote] = useState(quotes[0]);
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
        // Random quote on mount
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const changeQuote = () => {
        setIsChanging(true);
        setTimeout(() => {
            const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(newQuote);
            setIsChanging(false);
        }, 300);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary-500 via-purple-500 to-secondary-500 p-6 text-white"
        >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" />
                    <span className="text-sm font-medium text-white/80">Daily Motivation</span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={quote.text}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <p className="text-lg md:text-xl font-medium mb-3 leading-relaxed">
                            "{quote.text}"
                        </p>
                        <p className="text-sm text-white/70">— {quote.author}</p>
                    </motion.div>
                </AnimatePresence>

                <button
                    onClick={changeQuote}
                    disabled={isChanging}
                    className="absolute top-0 right-0 p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <RefreshCw className={`w-4 h-4 ${isChanging ? "animate-spin" : ""}`} />
                </button>
            </div>
        </motion.div>
    );
}
