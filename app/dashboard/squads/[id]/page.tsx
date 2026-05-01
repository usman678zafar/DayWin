"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import {
    Users,
    Trophy,
    Calendar,
    ArrowLeft,
    Settings,
    Trash2,
    Share2,
    User as UserIcon,
    Loader2,
    CheckCircle2,
    Crown,
    X
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SquadDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [squad, setSquad] = useState<any>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMembersModal, setShowMembersModal] = useState(false);

    const fetchSquadDetails = useCallback(async () => {
        try {
            const res = await fetch(`/api/squads/${id}`);
            if (!res.ok) throw new Error("Squad not found");
            const data = await res.json();
            setSquad(data.squad);
            setLogs(data.logs || []);
        } catch (error) {
            console.error(error);
            router.push("/dashboard/squads");
        } finally {
            setLoading(false);
        }
    }, [id, router]);

    useEffect(() => {
        if (id) fetchSquadDetails();
    }, [id, fetchSquadDetails]);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this squad?")) return;
        try {
            const res = await fetch(`/api/squads/${id}`, { method: "DELETE" });
            if (res.ok) router.push("/dashboard/squads");
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-[600px] flex-col items-center justify-center gap-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
                <p className="font-bold text-surface-500">Loading squad details...</p>
            </div>
        );
    }

    if (!squad) return null;

    const isOwner = squad?.ownerId?._id === session?.user?.id;

    // Calculate Leaderboard
    const leaderboard = (squad.members || []).map((member: any) => {
        const memberLogs = logs.filter(log => log.userId === member._id && log.completed);
        return {
            ...member,
            points: memberLogs.length * 10,
            completionCount: memberLogs.length
        };
    }).sort((a: any, b: any) => b.points - a.points);

    return (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between px-1">
                    <Link
                        href="/dashboard/squads"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-surface-400 transition-colors hover:text-primary-600"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to Squads
                    </Link>
                    {isOwner && (
                        <div className="flex items-center gap-1.5">
                            <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-surface-200 bg-white/50 text-surface-500 hover:text-primary-600 dark:border-white/10 dark:bg-white/5">
                                <Settings className="h-4 w-4" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 dark:border-red-900/20 dark:bg-red-900/10"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative overflow-hidden rounded-[1.5rem] border border-surface-200/50 bg-gradient-to-br from-white to-surface-50/50 p-5 dark:border-white/[0.05] dark:from-white/[0.03] dark:to-transparent">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md shadow-primary-500/20">
                                    <Users className="h-5 w-5" />
                                </div>
                                <h1 className="text-2xl font-black tracking-tight text-surface-900 dark:text-white sm:text-3xl">
                                    {squad.title}
                                </h1>
                            </div>
                            <p className="max-w-xl text-[13px] text-surface-500 dark:text-surface-400 md:ml-[52px]">
                                {squad.description || "Building habits together is better. Stay consistent and win the day."}
                            </p>
                            <div className="flex flex-wrap items-center gap-3 pt-0.5 md:ml-[52px]">
                                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-surface-400">
                                    <Calendar className="h-3.5 w-3.5 text-primary-500" />
                                    Started {new Date(squad.startDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-surface-400">
                                    <Trophy className="h-3.5 w-3.5 text-orange-500" />
                                    {squad.habitTemplates?.length || 0} Challenges
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 md:mt-0">
                            <button 
                                onClick={() => setShowMembersModal(true)}
                                className="flex -space-x-2.5 hover:scale-105 transition-transform"
                            >
                                {(squad.members || []).slice(0, 4).map((member: any, i: number) => (
                                    <div key={i} className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-white bg-surface-100 dark:border-[#0A0A0F]">
                                        {member.image ? (
                                            <Image src={member.image} alt="" fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-surface-200 text-surface-500 dark:bg-white/10 dark:text-surface-300">
                                                <UserIcon className="h-4 w-4" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                {(squad.members?.length || 0) > 4 && (
                                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-surface-100 text-[10px] font-bold text-surface-600 dark:border-[#0A0A0F] dark:bg-white/5 dark:text-surface-300">
                                        +{(squad.members?.length || 0) - 4}
                                    </div>
                                )}
                            </button>

                            <button className="flex items-center justify-center gap-1.5 rounded-lg bg-surface-900 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-black dark:bg-white dark:text-black dark:hover:bg-surface-200">
                                <Share2 className="h-3.5 w-3.5" />
                                Invite Friends
                            </button>
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute right-0 top-0 -mr-12 -mt-12 h-32 w-32 rounded-full bg-primary-500/5 blur-[40px]" />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-12">
                {/* Leaderboard Section */}
                <div className="lg:col-span-8 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-black text-surface-900 dark:text-white">Squad <span className="text-primary-600">Leaderboard</span></h3>
                        <div className="rounded-full bg-primary-50 px-3 py-1 text-[10px] font-black text-primary-600 dark:bg-primary-900/20">
                            UPDATED REAL-TIME
                        </div>
                    </div>

                    <div className="space-y-3">
                        {leaderboard.map((member: any, index: number) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={member._id}
                                className={cn(
                                    "relative group flex items-center justify-between overflow-hidden rounded-2xl border p-4 transition-all duration-300",
                                    index === 0
                                        ? "border-orange-200 bg-gradient-to-r from-orange-50 to-white dark:border-orange-500/20 dark:from-orange-500/5 dark:to-transparent"
                                        : "border-surface-200/50 bg-white/50 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02]"
                                )}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-100 text-xs font-black text-surface-400 dark:bg-white/5">
                                        #{index + 1}
                                    </div>
                                    <div className="relative h-10 w-10 overflow-hidden rounded-xl border-2 border-white bg-surface-100 shadow-sm dark:border-[#0A0A0F]">
                                        {member.image ? (
                                            <Image src={member.image} alt="" fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-600 dark:bg-primary-900/20">
                                                <UserIcon className="h-5 w-5" />
                                            </div>
                                        )}
                                        {index === 0 && (
                                            <div className="absolute -right-1 -top-1 rounded-full bg-orange-500 p-0.5 text-white shadow-md">
                                                <Crown className="h-2.5 w-2.5" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-surface-900 dark:text-white">
                                            {member.name} {member._id === session?.user?.id && "(You)"}
                                        </h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            <div className="flex items-center gap-1 text-[10px] font-bold text-success-600">
                                                <CheckCircle2 className="h-3 w-3" />
                                                {member.completionCount} completions
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-black text-surface-900 dark:text-white">{member.points}</p>
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-surface-400">Total Points</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Challenge Details Siderbar */}
                <div className="lg:col-span-4 space-y-4">
                    <h3 className="text-xl font-black text-surface-900 dark:text-white">The <span className="text-primary-600">Challenge</span></h3>

                    <div className="rounded-2xl border border-surface-200/50 bg-white/50 p-5 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02]">
                        <p className="text-[11px] font-bold text-surface-400 uppercase tracking-wider mb-3">Tracking Habits</p>
                        <div className="space-y-2.5">
                            {(squad.habitTemplates || []).map((habit: any, i: number) => (
                                <div key={i} className="flex items-center gap-2.5 rounded-xl bg-surface-50 p-2.5 dark:bg-white/5">
                                    <div className="flex h-7 w-7 items-center justify-center rounded bg-white shadow-sm dark:bg-white/10">
                                        <Trophy className="h-3.5 w-3.5 text-primary-600" />
                                    </div>
                                    <span className="text-xs font-bold text-surface-700 dark:text-surface-200">{habit.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border border-surface-200/50 bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-white shadow-lg shadow-primary-500/20">
                        <Trophy className="h-8 w-8 mb-3 opacity-50" />
                        <h4 className="text-lg font-bold">Squad Goals</h4>
                        <p className="mt-1.5 text-xs text-primary-100">
                            The first member to reach 1000 points wins the &quot;Champion&quot; title for this month!
                        </p>
                        <button className="mt-4 flex w-full items-center justify-center rounded-lg bg-white/10 py-2.5 text-xs font-bold backdrop-blur-md transition-all hover:bg-white/20">
                            View Prize Details
                        </button>
                    </div>
                </div>
            </div>

            {/* Members Modal */}
            <AnimatePresence>
                {showMembersModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-md overflow-hidden rounded-[2rem] border border-surface-200 bg-white shadow-2xl dark:border-surface-800 dark:bg-[#0A0A0F]"
                        >
                            <div className="flex items-center justify-between border-b border-surface-100 p-6 dark:border-surface-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/20">
                                        <Users className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-surface-900 dark:text-white">Squad Members</h3>
                                        <p className="text-xs font-bold text-surface-400">{squad.members?.length || 0} Total</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowMembersModal(false)}
                                    className="rounded-full p-2 text-surface-400 hover:bg-surface-100 hover:text-surface-900 dark:hover:bg-surface-800 dark:hover:text-white transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
                                {(squad.members || []).map((member: any) => (
                                    <div key={member._id} className="flex items-center gap-4 rounded-2xl border border-surface-100 bg-surface-50 p-3 dark:border-surface-800 dark:bg-surface-900/50">
                                        <div className="relative h-12 w-12 overflow-hidden rounded-full bg-surface-200 dark:bg-surface-800 border-2 border-white dark:border-[#0A0A0F]">
                                            {member.image ? (
                                                <Image src={member.image} alt="" fill className="object-cover" />
                                            ) : (
                                                <div className="flex h-full w-full items-center justify-center text-surface-500">
                                                    <UserIcon className="h-5 w-5" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-surface-900 dark:text-white">{member.name}</p>
                                            <p className="text-xs text-surface-500">{member.email}</p>
                                        </div>
                                        {squad.ownerId?._id === member._id && (
                                            <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-black text-orange-600 dark:bg-orange-500/20">
                                                OWNER
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
