"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Users,
    Plus,
    ChevronRight,
    Trophy,
    Clock,
    User as UserIcon,
    Search
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SquadsPage() {
    const [squads, setSquads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchSquads = useCallback(async () => {
        try {
            const res = await fetch("/api/squads");
            const data = await res.json();
            setSquads(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { fetchSquads(); }, [fetchSquads]);

    const filteredSquads = squads.filter(squad =>
        squad.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="page-container space-y-4">
            {/* Header Section - Compact */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-surface-900 dark:text-white">
                        Your <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Squads</span>
                    </h1>
                    <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">Collaborate & Compete</p>
                </div>
                <Link
                    href="/dashboard/squads/new"
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-primary-600 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-primary-700"
                >
                    <Plus className="h-3.5 w-3.5" />
                    New Squad
                </Link>
            </div>

            {/* Quick Stats & Search - Compact */}
            <div className="grid gap-3 md:grid-cols-12">
                <div className="md:col-span-8">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40 dark:text-white/40 transition-colors group-focus-within:text-primary-500" />
                        <input
                            type="text"
                            placeholder="Search your squads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-xl border border-surface-200/50 bg-white/50 py-2 pl-9 pr-4 text-[12px] font-semibold outline-none backdrop-blur-sm transition-all focus:border-primary-500/50 dark:border-white/[0.05] dark:bg-white/[0.02]"
                        />
                    </div>
                </div>
                <div className="md:col-span-4 flex gap-3">
                    <div className="flex-1 rounded-xl border border-surface-200/50 bg-white/50 p-2 dark:border-white/[0.05] dark:bg-white/[0.02]">
                        <p className="text-[8px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">Total</p>
                        <p className="text-lg font-semibold text-surface-900 dark:text-white leading-tight">{squads.length}</p>
                    </div>
                    <div className="flex-1 rounded-xl border border-surface-200/50 bg-white/50 p-2 dark:border-white/[0.05] dark:bg-white/[0.02]">
                        <p className="text-[8px] font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">Active</p>
                        <p className="text-lg font-semibold text-primary-600 leading-tight">{squads.filter(s => s.status === 'active').length}</p>
                    </div>
                </div>
            </div>

            {/* Squads Grid - High Density */}
            {loading ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="rounded-2xl border border-black/5 dark:border-white/[0.05] p-3 space-y-3 animate-pulse">
                            <div className="flex items-center justify-between">
                                <div className="h-8 w-8 rounded-lg bg-black/5 dark:bg-white/5" />
                                <div className="flex -space-x-2">
                                    {[...Array(3)].map((_, j) => (
                                        <div key={j} className="h-6 w-6 rounded-full bg-black/5 dark:bg-white/5 ring-2 ring-white dark:ring-[#0A0A0F]" />
                                    ))}
                                </div>
                            </div>
                            <div className="h-4 w-3/4 rounded-md bg-black/5 dark:bg-white/5" />
                            <div className="h-3 w-full rounded-md bg-black/5 dark:bg-white/5" />
                            <div className="flex items-center justify-between pt-1">
                                <div className="flex gap-3">
                                    <div className="h-3 w-16 rounded-md bg-black/5 dark:bg-white/5" />
                                    <div className="h-3 w-20 rounded-md bg-black/5 dark:bg-white/5" />
                                </div>
                                <div className="h-4 w-4 rounded bg-black/5 dark:bg-white/5" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredSquads.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSquads.map((squad, index) => (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={squad._id}>
                            <Link
                                href={`/dashboard/squads/${squad._id}`}
                                className="group block relative overflow-hidden rounded-2xl border border-surface-200/50 bg-white/50 p-3 backdrop-blur-sm transition-all duration-300 hover:border-primary-500/30 hover:shadow-lg hover:shadow-primary-500/5 dark:border-white/[0.05] dark:bg-white/[0.02]"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100/50 text-primary-600 dark:bg-primary-900/20">
                                        <Users className="h-4 w-4" />
                                    </div>
                                    <div className="flex -space-x-2">
                                        {squad.members.slice(0, 3).map((member: any, i: number) => (
                                            <div key={i} className="h-6 w-6 rounded-full border border-white bg-surface-100 dark:border-[#0A0A0F] dark:bg-surface-800 flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {member.image ? (
                                                    <img src={member.image} alt="" className="h-full w-full object-cover" />
                                                ) : <UserIcon className="h-3 w-3 text-surface-400" />}
                                            </div>
                                        ))}
                                        {squad.members.length > 3 && (
                                            <div className="h-6 w-6 rounded-full border border-white bg-surface-200 text-[8px] font-black text-surface-600 dark:border-[#0A0A0F] dark:bg-white/10 flex items-center justify-center">
                                                +{squad.members.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <h3 className="text-sm font-semibold text-surface-900 dark:text-white group-hover:text-primary-600 transition-colors uppercase tracking-tight">{squad.title}</h3>
                                <p className="mt-1 line-clamp-1 text-[11px] font-semibold text-black/60 dark:text-white/50 uppercase tracking-tight">{squad.description || "No description."}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-[9px] font-semibold uppercase text-black/50 dark:text-white/50">
                                            <Trophy className="h-3 w-3" /> {squad.habitTemplates?.length || 0} habits
                                        </div>
                                        <div className="flex items-center gap-1 text-[9px] font-semibold uppercase text-black/50 dark:text-white/50">
                                            <Clock className="h-3 w-3" />
                                            {new Date(squad.startDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                            {squad.endDate ? ` → ${new Date(squad.endDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}` : " → ongoing"}
                                        </div>
                                    </div>
                                    <ChevronRight className="h-4 w-4 text-black/20 dark:text-white/20 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-surface-200 p-8 text-center dark:border-white/10">
                    <h3 className="text-sm font-semibold text-surface-900 dark:text-white">No squads found</h3>
                    <Link href="/dashboard/squads/new" className="mt-4 rounded-lg bg-surface-900 px-4 py-2 text-[10px] font-semibold uppercase tracking-widest text-white dark:bg-white dark:text-black">Get Started</Link>
                </div>
            )}
        </div>
    );
}
