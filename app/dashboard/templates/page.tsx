"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { TemplateGallery } from "@/components/templates/TemplateGallery";

export default function TemplatesPage() {
    return (
        <div className="page-container">
            {/* Header Section */}
            <div className="mb-12">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 mb-4"
                >
                    <div className="h-6 w-6 rounded-lg bg-black dark:bg-white flex items-center justify-center">
                        <FileText className="h-3.5 w-3.5 text-white dark:text-black" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-black/40 dark:text-white/40">Resource Library</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-4xl md:text-5xl font-black text-black dark:text-white mb-4 tracking-tighter"
                >
                    Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4D7CFE] to-purple-500">Habit Templates.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="max-w-2xl text-lg text-black/60 dark:text-white/40 font-medium leading-relaxed"
                >
                    Sometimes analog is better. Download our high-resolution, designer-crafted habit trackers
                    ready for printing. Perfect for your desk, fridge, or bullet journal.
                </motion.p>
            </div>

            {/* Main Content */}
            <TemplateGallery />


        </div>
    );
}


