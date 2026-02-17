"use client";

import { motion } from "framer-motion";
import { FileText, Sparkles, Download, Info, CheckCircle2 } from "lucide-react";
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

            {/* Tips Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-black/5 dark:border-white/5 pt-12 mb-12"
            >
                <div className="space-y-3">
                    <div className="h-10 w-10 rounded-2xl bg-blue-500/10 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-blue-500" />
                    </div>
                    <h4 className="font-bold text-black dark:text-white uppercase tracking-tight text-sm">Print High Quality</h4>
                    <p className="text-xs text-black/50 dark:text-white/30 leading-relaxed font-medium">
                        Our templates are generated as vector-quality PDFs. For the best experience, use 100gsm paper and
                        print at 100% scale (no scaling).
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="h-10 w-10 rounded-2xl bg-purple-500/10 flex items-center justify-center">
                        <Info className="h-5 w-5 text-purple-500" />
                    </div>
                    <h4 className="font-bold text-black dark:text-white uppercase tracking-tight text-sm">Psychology of Paper</h4>
                    <p className="text-xs text-black/50 dark:text-white/30 leading-relaxed font-medium">
                        Physically checking off a box triggers a higher dopamine release than a digital tap. Use these
                        for your most critical "keystone" habits.
                    </p>
                </div>
                <div className="space-y-3">
                    <div className="h-10 w-10 rounded-2xl bg-green-500/10 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                    </div>
                    <h4 className="font-bold text-black dark:text-white uppercase tracking-tight text-sm">Aesthetic Tracking</h4>
                    <p className="text-xs text-black/50 dark:text-white/30 leading-relaxed font-medium">
                        A beautiful tracker creates a "commitment device." You will be more likely to maintain your streak
                        simply to avoid "breaking" the beautiful pattern.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}


