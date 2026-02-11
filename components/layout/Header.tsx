"use client";

import { motion } from "framer-motion";
import { getGreeting } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

export function Header() {
    const { data: session } = useSession();
    const greeting = getGreeting();
    const today = format(new Date(), "EEEE, MMMM d");

    return (
        <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl border border-black/10 bg-white/85 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
        >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/50">{today}</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-black dark:text-white md:text-4xl">
                {greeting}, {session?.user?.name?.split(" ")[0] || "Champion"}
            </h1>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                Focus on momentum. Small actions today create long streaks tomorrow.
            </p>
        </motion.header>
    );
}

