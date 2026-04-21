"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { TemplateGallery } from "@/components/templates/TemplateGallery";

export default function TemplatesPage() {
    return (
        <div className="page-container">
            {/* Header Section - Compact */}
            <div className="mb-6">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 mb-1"
                >
                    <div className="h-5 w-5 rounded-md bg-black dark:bg-white flex items-center justify-center">
                        <FileText className="h-3 w-3 text-white dark:text-black" />
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">Resource Library</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-xl md:text-2xl font-black text-black dark:text-white mb-1 tracking-tight"
                >
                    Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D7CFE] to-purple-500">Habit Templates.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-xl text-[11px] sm:text-xs text-black/60 dark:text-white/40 font-medium"
                >
                    Designer-crafted habit trackers ready for printing. Perfect for your desk or journal.
                </motion.p>
            </div>

            {/* Main Content */}
            <TemplateGallery />
        </div>
    );
}
