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
            className="mb-6 md:mb-8 rounded-[2rem] border border-black/5 bg-white/50 p-5 sm:p-6 md:p-7 backdrop-blur-2xl dark:border-white/[0.02] dark:bg-white/[0.01]"
        >
            <p className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.18em] text-black/70 dark:text-white/40">{today}</p>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-[3.5rem] font-black tracking-[-0.045em] text-black dark:text-white leading-[0.95]">
                {greeting}, <span className="bg-gradient-to-r from-[#FBBF24] to-[#F59E0B] bg-clip-text text-transparent">{session?.user?.name?.split(" ")[0] || "Champion"}</span>
            </h1>
            <p className="mt-3 max-w-xl text-sm font-medium leading-7 text-black/80 dark:text-white/40">
                Focus on momentum. Small actions today create the massive wins of tomorrow.
            </p>
        </motion.header>
    );
}
