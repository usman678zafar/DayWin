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
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 md:mb-5 rounded-2xl border border-black/5 bg-white/50 p-4 sm:p-5 backdrop-blur-2xl dark:border-white/[0.02] dark:bg-white/[0.01]"
        >
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-black/70 dark:text-white/40">{today}</p>
            <h1 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-black tracking-[-0.04em] text-black dark:text-white leading-tight">
                {greeting}, <span className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent">{session?.user?.name?.split(" ")[0] || "Champion"}</span>
            </h1>
            <p className="mt-2 max-w-xl text-xs sm:text-sm font-medium text-black/60 dark:text-white/40">
                Small actions today create massive wins tomorrow.
            </p>
        </motion.header>
    );
}
