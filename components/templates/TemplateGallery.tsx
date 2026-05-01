"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Eye, FileText, CheckCircle2, Calendar, Star, Leaf, Flower2, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { format } from "date-fns";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { cn } from "@/lib/utils";

interface TemplateProps {
    id: string;
    title: string;
    description: string;
    preview: React.ReactNode;
    renderForPdf: () => React.ReactNode;
}

const MinimalistGrid = () => (
    <div className="bg-white p-8 text-black font-sans w-[794px] min-h-[1123px] relative mx-auto border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-end mb-12 border-b-2 border-black pb-4">
            <div>
                <h1 className="text-4xl font-black tracking-tighter uppercase italic">Zen Habit Tracker</h1>
                <p className="text-sm font-bold opacity-40 uppercase tracking-widest mt-1">MONTH: ____________________ YEAR: ________</p>
            </div>
            <div className="text-right">
                <div className="h-10 w-10 bg-black flex items-center justify-center rounded-lg mb-2 ml-auto">
                    <CheckCircle2 className="text-white h-6 w-6" />
                </div>
                <p className="text-[10px] font-black tracking-widest leading-none">DAY WIN</p>
                <p className="text-[8px] font-bold opacity-30 mt-0.5">EST. 2026</p>
            </div>
        </div>

        {/* Grid */}
        <div className="space-y-0.5">
            <div className="flex border-b border-black/20 pb-2 mb-2">
                <div className="w-[180px] text-[10px] font-black uppercase tracking-widest flex-shrink-0">Habit / Activity</div>
                <div className="flex-1 grid grid-cols-[repeat(31,minmax(0,1fr))] pl-4">
                    {Array.from({ length: 31 }).map((_, i) => (
                        <div key={i} className="text-center text-[8px] font-black opacity-30">{i + 1}</div>
                    ))}
                </div>
            </div>

            {Array.from({ length: 15 }).map((_, rowIndex) => (
                <div key={rowIndex} className="flex h-10 items-center border-b border-black/5 hover:bg-black/[0.02] transition-colors">
                    <div className="w-[180px] border-r border-black/5 pr-4 flex items-center gap-3 flex-shrink-0">
                        <div className="h-6 w-6 rounded border border-black/10 flex-shrink-0" />
                        <div className="h-0.5 w-full bg-black/5" />
                    </div>
                    <div className="flex-1 grid grid-cols-[repeat(31,minmax(0,1fr))] pl-4 place-items-center">
                        {Array.from({ length: 31 }).map((_, colIndex) => (
                            <div key={colIndex} className="w-4 h-4 rounded-full border border-black/10" />
                        ))}
                    </div>
                </div>
            ))}
        </div>

        {/* Footer */}
        <div className="mt-12 grid grid-cols-2 gap-8">
            <div className="border-t border-black/10 pt-4">
                <h3 className="text-xs font-black uppercase tracking-widest mb-3">Reflections</h3>
                <div className="space-y-4">
                    <div className="h-6 border-b border-black/10 w-full" />
                    <div className="h-6 border-b border-black/10 w-full" />
                    <div className="h-6 border-b border-black/10 w-full" />
                </div>
            </div>
            <div className="border-t border-black/10 pt-4">
                <h3 className="text-xs font-black uppercase tracking-widest mb-3">Rewards for Consistency</h3>
                <div className="space-y-4">
                    <div className="h-6 border-b border-black/10 w-full flex items-center gap-2">
                        <Star className="h-3 w-3 opacity-20" />
                        <span className="opacity-10 text-[8px] font-bold">10 DAYS:</span>
                    </div>
                    <div className="h-6 border-b border-black/10 w-full flex items-center gap-2">
                        <Star className="h-3 w-3 opacity-20" />
                        <span className="opacity-10 text-[8px] font-bold">20 DAYS:</span>
                    </div>
                    <div className="h-6 border-b border-black/10 w-full flex items-center gap-2 text-blue-500">
                        <Star className="h-3 w-3" />
                        <span className="opacity-40 text-[8px] font-bold">FULL MONTH:</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="absolute bottom-8 right-8 text-[8px] font-bold opacity-20 tracking-widest">
            WWW.DAYWIN.APP | PREMIUM TRACKER RESOURCE
        </div>
    </div>
);

const RadiantWheel = () => (
    <div className="bg-white p-10 text-black font-sans w-[794px] min-h-[1123px] relative mx-auto border shadow-2xl flex flex-col items-center">
        {/* Brand */}
        <div className="w-full flex justify-between items-start mb-20">
            <div>
                <h1 className="text-5xl font-black leading-none mb-1">RADIANT LIFE</h1>
                <p className="text-xs font-bold tracking-[0.3em] opacity-40 uppercase">31 Days of Momentum</p>
            </div>
            <div className="text-right border-l-4 border-black pl-4">
                <p className="text-2xl font-black leading-none">WIN</p>
                <p className="text-[10px] font-black opacity-30 mt-1">THE DAY</p>
            </div>
        </div>

        {/* Circular Guide - Visualization only for PDF */}
        <div className="relative w-[500px] h-[500px] flex items-center justify-center">
            {/* Concentric circles for days */}
            {Array.from({ length: 5 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full border border-black/5"
                    style={{ width: `${100 - i * 15}%`, height: `${100 - i * 15}%` }}
                />
            ))}

            {/* Radial lines for categories */}
            {Array.from({ length: 8 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute h-full w-[1px] bg-black/5"
                    style={{ transform: `rotate(${i * 45}deg)` }}
                />
            ))}

            <div className="z-10 bg-white p-8 rounded-full border-4 border-black text-center shadow-xl">
                <p className="text-sm font-black uppercase tracking-widest">Core Values</p>
                <div className="my-2 h-1 w-12 bg-black mx-auto" />
                <p className="text-[8px] font-bold opacity-40 uppercase">Centric Tracker</p>
            </div>
        </div>

        {/* Habit Legend */}
        <div className="mt-20 w-full grid grid-cols-2 gap-x-12 gap-y-6">
            {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4 border-b border-black/10 pb-2">
                    <div className="h-8 w-8 rounded-full bg-black/5 border border-black/10 flex items-center justify-center font-black text-xs">
                        {i + 1}
                    </div>
                    <div className="flex-1 h-0.5 bg-black/5" />
                    <span className="text-[10px] font-bold opacity-20 italic">Assign habit here</span>
                </div>
            ))}
        </div>

        {/* Motivation */}
        <div className="absolute bottom-12 left-10 right-10 flex justify-between items-end border-t border-black/20 pt-6">
            <p className="max-w-xs text-[9px] font-medium leading-relaxed italic opacity-60">
                &quot;&ldquo;We are what we repeatedly do. Excellence, then, is not an act, but a habit.&rdquo;&quot; — Aristotle
            </p>
            <div className="text-right">
                <p className="text-[8px] font-black tracking-widest opacity-20 mb-1 uppercase">Printed for personal use</p>
                <div className="bg-black text-white px-2 py-1 text-[10px] font-black uppercase tracking-tighter">DayWin Originals</div>
            </div>
        </div>
    </div>
);

const FloralBloom = () => (
    <div className="bg-[#BFA2DB] p-8 font-sans w-[794px] min-h-[1123px] relative mx-auto shadow-2xl overflow-hidden flex items-center justify-center">
        {/* Background Decor */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 text-white/20 transform rotate-45">
                <Leaf className="w-96 h-96" strokeWidth={1} />
            </div>
            <div className="absolute top-1/2 -right-32 text-white/20 transform -rotate-12">
                <Flower2 className="w-80 h-80" strokeWidth={1} />
            </div>
            <div className="absolute -bottom-20 left-20 text-white/20 transform rotate-180">
                <Leaf className="w-64 h-64" strokeWidth={1} />
            </div>
        </div>

        <div className="bg-white rounded-[2rem] p-10 w-full h-full min-h-[1000px] relative z-10 shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-end mb-8 border-b-2 border-[#8D99AE]/20 pb-6">
                <div className="space-y-4">
                    <h1 className="text-5xl font-bold text-[#5C6B9C] tracking-tight">HABIT TRACKER</h1>
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-[#5C6B9C] uppercase tracking-widest">Month:</span>
                        <div className="h-0.5 w-64 bg-[#5C6B9C]/30" />
                    </div>
                </div>
                <div className="text-right opacity-50">
                    <Flower2 className="w-12 h-12 text-[#5C6B9C] mb-2 ml-auto" />
                </div>
            </div>

            {/* Grid Header */}
            <div className="flex mb-4 px-2">
                <div className="w-[200px] flex-shrink-0 mr-4" />
                <div className="flex-1 grid grid-cols-[repeat(31,minmax(0,1fr))] gap-0.5">
                    {Array.from({ length: 31 }).map((_, i) => (
                        <div key={i} className="text-center text-[9px] font-bold text-[#5C6B9C]">{i + 1}</div>
                    ))}
                </div>
            </div>

            {/* Habit Rows */}
            <div className="flex-1 space-y-3">
                {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4 group">
                        <div className="w-[200px] flex-shrink-0">
                            <div className="border-b border-[#5C6B9C]/30 h-8 w-full group-hover:border-[#5C6B9C]/50 transition-colors" />
                        </div>
                        <div className="flex-1 grid grid-cols-[repeat(31,minmax(0,1fr))] gap-0.5">
                            {Array.from({ length: 31 }).map((_, d) => (
                                <div key={d} className="aspect-square rounded-full border border-[#5C6B9C]/30 group-hover:border-[#5C6B9C]/50 transition-colors" />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Footer */}
            <div className="mt-8 pt-4 border-t border-[#5C6B9C]/10 flex justify-between items-center text-[#5C6B9C]/40">
                <p className="text-[10px] font-bold uppercase tracking-widest">Designed for Consistency</p>
                <p className="text-[10px] font-bold uppercase tracking-widest">DayWin Collection</p>
            </div>
        </div>
    </div>
);

const templates: TemplateProps[] = [
    {
        id: "zen-grid",
        title: "The Zen Minimalist",
        description: "A clean, grid-based tracker designed for maximum clarity and space for reflections.",
        preview: <div className="scale-[0.4] origin-center shadow-2xl"><MinimalistGrid /></div>,
        renderForPdf: () => <MinimalistGrid />,
    },
    {
        id: "radiant-life",
        title: "Radiant Life Circle",
        description: "A unique circular visualization for tracking habits as concentric rings of success.",
        preview: <div className="scale-[0.4] origin-center shadow-2xl"><RadiantWheel /></div>,
        renderForPdf: () => <RadiantWheel />,
    },
    {
        id: "floral-bloom",
        title: "Floral Bloom",
        description: "A soft, inviting tracker with floral aesthetics to make habit building feel tailored and organic.",
        preview: <div className="scale-[0.4] origin-center shadow-2xl"><FloralBloom /></div>,
        renderForPdf: () => <FloralBloom />,
    }
];

export function TemplateGallery() {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
    const [scale, setScale] = useState(1);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateScale = () => {
            if (containerRef.current && selectedTemplate) {
                const parentWidth = containerRef.current.offsetWidth;
                const padding = 40; // 40px total horizontal padding for safe safety buffer
                const templateWidth = 794; // Fixed width of templates
                const availableWidth = parentWidth - padding;

                // Calculate scale to fit width, maxing out at 1
                const newScale = Math.min(1, availableWidth / templateWidth);
                setScale(newScale);
            }
        };

        // Initial calculation
        updateScale();

        // Add event listener
        window.addEventListener('resize', updateScale);

        // Cleanup
        return () => window.removeEventListener('resize', updateScale);
    }, [selectedTemplate]);

    const downloadPdf = async (templateId: string) => {

        // Find the template
        const template = templates.find(t => t.id === templateId);
        if (!template) return;

        // Render the hidden PDF version
        const element = document.createElement("div");
        element.style.position = "absolute";
        element.style.left = "-9999px";
        document.body.appendChild(element);

        // Simple way to render React inside normal DOM for html2canvas
        // This is a bit hacky, normally we'd use a portal or a dedicated hidden container
        // In a real app we'd probably use a library focused on SVG/PDF generation

        // Let's create a temporary root to render the component
        const { createRoot } = await import("react-dom/client");
        const root = createRoot(element);

        root.render(template.renderForPdf());

        // Wait for render
        setTimeout(async () => {
            try {
                const canvas = await html2canvas(element, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: "#ffffff",
                });
                const imgData = canvas.toDataURL("image/png");
                const pdf = new jsPDF("p", "mm", "a4");
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
                pdf.save(`${template.id}-daywin.pdf`);
            } catch (error) {
                console.error("PDF generation failed:", error);
            } finally {
                root.unmount();
                document.body.removeChild(element);
            }
        }, 500);
    };

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {templates.map((template, idx) => (
                    <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group relative"
                    >
                        <div className="card h-full p-6 flex flex-col gap-6 overflow-hidden border border-black/5 dark:border-white/5 bg-white shadow-xl dark:bg-surface-900 transition-all hover:scale-[1.01] hover:shadow-2xl">
                            <div className="relative aspect-[3/4] bg-gray-100 dark:bg-black/20 rounded-xl overflow-hidden shadow-inner border border-black/10 dark:border-white/10">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    {template.preview}
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Button
                                        variant="secondary"
                                        className="gap-2 backdrop-blur-md"
                                        onClick={() => setSelectedTemplate(template.id)}
                                    >
                                        <Eye className="h-4 w-4" /> Full Preview
                                    </Button>
                                </div>
                            </div>

                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-black dark:text-white mb-2">{template.title}</h3>
                                <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed mb-6">
                                    {template.description}
                                </p>

                                <div className="flex items-center gap-3">
                                    <Button
                                        onClick={() => downloadPdf(template.id)}
                                        className="flex-1 gap-2 bg-black text-white dark:bg-white dark:text-black hover:scale-[1.02] active:scale-[0.98] transition-transform"
                                    >
                                        <Download className="h-4 w-4" /> Download PDF
                                    </Button>
                                    <button className="h-11 w-11 flex items-center justify-center rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                        <Star className="h-5 w-5 text-yellow-500" />
                                    </button>
                                </div>
                            </div>

                            {idx === 0 && (
                                <div className="absolute -right-12 -top-12 h-24 w-24 rounded-full bg-blue-500/10 blur-2xl" />
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="card bg-gradient-to-br from-black to-gray-800 p-8 text-white dark:from-white dark:to-gray-200 dark:text-black">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="h-5 w-5 rounded-full bg-white/20 dark:bg-black/20 flex items-center justify-center">
                                <Calendar className="h-3 w-3" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Custom Built</span>
                        </div>
                        <h2 className="text-3xl font-black italic mb-2">Want a custom template?</h2>
                        <p className="text-sm opacity-60 font-medium">
                            Premium members can request custom formatted templates to match their exact tracking needs.
                            Our designers will create a high-resolution PDF tailored for you.
                        </p>
                    </div>
                    <Button variant="outline" className="text-white border-white/20 hover:bg-white hover:text-black dark:text-black dark:border-black/20 dark:hover:bg-black/5 dark:hover:text-black whitespace-nowrap">
                        Upgrade To Pro
                    </Button>
                </div>
            </div>

            {/* Full Screen Preview Modal */}
            <AnimatePresence>
                {selectedTemplate && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 md:p-8"
                        onClick={() => setSelectedTemplate(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-h-full w-full max-w-5xl overflow-hidden rounded-2xl bg-white dark:bg-surface-900 shadow-2xl flex flex-col"
                        >
                            <div className="flex items-center justify-between border-b border-black/5 p-4 dark:border-white/5 bg-white dark:bg-surface-900 z-10">
                                <h3 className="text-lg font-bold text-black dark:text-white">
                                    {templates.find((t) => t.id === selectedTemplate)?.title}
                                </h3>
                                <div className="flex items-center gap-2">
                                    <Button
                                        onClick={() => downloadPdf(selectedTemplate)}
                                        className="gap-2 h-9"
                                    >
                                        <Download className="h-4 w-4" /> Download
                                    </Button>
                                    <button
                                        onClick={() => setSelectedTemplate(null)}
                                        className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors"
                                    >
                                        <X className="h-5 w-5 text-black/50 dark:text-white/50" />
                                    </button>
                                </div>
                            </div>

                            <div
                                className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-100 dark:bg-black/50 p-4 md:p-8 flex items-start justify-center"
                                ref={containerRef}
                            >
                                <div
                                    className="shadow-2xl origin-top transition-transform duration-200"
                                    style={{ transform: `scale(${scale})`, marginBottom: `${(1123 * scale) - 1123}px` }}
                                >
                                    {templates.find((t) => t.id === selectedTemplate)?.renderForPdf()}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
