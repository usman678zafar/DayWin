"use client";

import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}: ModalProps) {
    const sizes = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className={cn(
                                "w-full bg-white dark:bg-surface-900 shadow-2xl",
                                "border border-surface-200 dark:border-surface-800",
                                "max-h-[92svh] overflow-hidden rounded-t-2xl sm:rounded-2xl",
                                sizes[size]
                            )}
                        >
                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between border-b border-surface-200 px-4 py-3 dark:border-surface-800 sm:px-6 sm:py-4">
                                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white sm:text-xl">
                                        {title}
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-surface-200/50" />
                                    </button>
                                </div>
                            )}

                            {/* Content */}
                            <div className="max-h-[calc(92svh-72px)] overflow-y-auto p-4 sm:max-h-[calc(92svh-88px)] sm:p-6">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </Fragment>
            )}
        </AnimatePresence>
    );
}
