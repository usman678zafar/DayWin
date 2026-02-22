"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Users,
    Plus,
    ChevronRight,
    Trophy,
    Clock,
    User as UserIcon,
    Loader2,
    Search,
    Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SquadsPage() {
    const [squads, setSquads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchSquads();
    }, []);

    const fetchSquads = async () => {
        try {
            const res = await fetch("/api/squads");
            const data = await res.json();
            setSquads(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const filteredSquads = squads.filter(squad =>
        squad.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header Section */}
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-surface-900 dark:text-white sm:text-4xl">
                        Your <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">Squads</span>
                    </h1>
                    <p className="mt-2 text-surface-500 dark:text-surface-400">
                        Collaborate and compete with friends to build better habits together.
                    </p>
                </div>
                <Link
                    href="/dashboard/squads/new"
                    className="flex items-center justify-center gap-2 rounded-2xl bg-primary-600 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-primary-500/20 transition-all duration-300 hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Plus className="h-5 w-5" />
                    Create New Squad
                </Link>
            </div>

            {/* Quick Stats & Search */}
            <div className="grid gap-6 md:grid-cols-12">
                <div className="md:col-span-8">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400 transition-colors group-focus-within:text-primary-500" />
                        <input
                            type="text"
                            placeholder="Search your squads..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-2xl border border-surface-200/50 bg-white/50 py-4 pl-12 pr-4 text-sm outline-none backdrop-blur-sm transition-all focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5 dark:border-white/[0.05] dark:bg-white/[0.02]"
                        />
                    </div>
                </div>
                <div className="md:col-span-4 flex gap-4">
                    <div className="flex-1 rounded-2xl border border-surface-200/50 bg-white/50 p-4 backdrop-blur-sm dark:border-white/[0.05] dark:bg-white/[0.02]">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-surface-400">Total Teams</p>
                        <p className="text-2xl font-black text-surface-900 dark:text-white">{squads.length}</p>
                    </div>
                    <div className="flex-1 rounded-2xl border border-surface-200/50 bg-white/50 p-4 backdrop-blur-sm dark:border-white/[0.05] dark:bg-white/[0.02]">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-surface-400">Active Now</p>
                        <p className="text-2xl font-black text-primary-600">{squads.filter(s => s.status === 'active').length}</p>
                    </div>
                </div>
            </div>

            {/* Squads Grid */}
            {loading ? (
                <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                    <p className="text-sm font-medium text-surface-500">Loading your squads...</p>
                </div>
            ) : filteredSquads.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredSquads.map((squad, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            key={squad._id}
                        >
                            <Link
                                href={`/dashboard/squads/${squad._id}`}
                                className="group block relative overflow-hidden rounded-3xl border border-surface-200/50 bg-white/50 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/10 dark:border-white/[0.05] dark:bg-white/[0.02]"
                            >
                                <div className="flex items-start justify-between mb-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100/50 text-primary-600 dark:bg-primary-900/20">
                                        <Users className="h-6 w-6" />
                                    </div>
                                    <div className="flex -space-x-3">
                                        {squad.members.slice(0, 3).map((member: any, i: number) => (
                                            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-surface-100 dark:border-[#0A0A0F] dark:bg-surface-800 flex items-center justify-center overflow-hidden">
                                                {member.image ? (
                                                    <img src={member.image} alt="" className="h-full w-full object-cover" />
                                                ) : (
                                                    <UserIcon className="h-4 w-4 text-surface-400" />
                                                )}
                                            </div>
                                        ))}
                                        {squad.members.length > 3 && (
                                            <div className="h-8 w-8 rounded-full border-2 border-white bg-primary-600 text-[10px] font-bold text-white flex items-center justify-center dark:border-[#0A0A0F]">
                                                +{squad.members.length - 3}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-surface-900 dark:text-white group-hover:text-primary-600 transition-colors">
                                    {squad.title}
                                </h3>
                                <p className="mt-2 line-clamp-2 text-sm text-surface-500 dark:text-surface-400">
                                    {squad.description || "No description provided."}
                                </p>

                                <div className="mt-8 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-surface-400">
                                            <Trophy className="h-3.5 w-3.5" />
                                            {squad.habitTemplates?.length || 0} Habits
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-surface-400">
                                            <Clock className="h-3.5 w-3.5" />
                                            {new Date(squad.startDate).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-surface-300 transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-surface-200 p-12 text-center dark:border-white/10">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-surface-50 text-surface-400 dark:bg-white/[0.02]">
                        <Users className="h-8 w-8" />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-surface-900 dark:text-white">No squads found</h3>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-surface-500 dark:text-surface-400">
                        Join a squad or create your own to start building habits with your friends.
                    </p>
                    <Link
                        href="/dashboard/squads/new"
                        className="mt-8 rounded-2xl bg-surface-900 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-black dark:bg-white dark:text-black dark:hover:bg-surface-200"
                    >
                        Get Started
                    </Link>
                </div>
            )}
        </div>
    );
}
