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
            className="mb-8"
        >
            <p className="text-surface-200/50 text-sm mb-1">{today}</p>
            <h1 className="text-3xl md:text-4xl font-bold text-surface-900 dark:text-white">
                {greeting},{" "}
                <span className="text-gradient">
                    {session?.user?.name?.split(" ")[0] || "Champion"}
                </span>
                ! 👋
            </h1>
            <p className="text-surface-200/50 mt-2">
                Let's make today count. You've got this!
            </p>
        </motion.header>
    );
}
