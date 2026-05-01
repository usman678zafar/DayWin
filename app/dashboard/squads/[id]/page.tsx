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
    Crown
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function SquadDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [squad, setSquad] = useState<any>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSquadDetails = useCallback(async () => {
        try {
            const res = await fetch(`/api/squads/${id}`);
            if (!res.ok) throw new Error("Squad not found");
            const data = await res.json();
            setSquad(data);
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

    const isOwner = squad?.ownerId?._id === session?.user?.id;

    // Calculate Leaderboard
    const leaderboard = squad.members.map((member: any) => {
        const memberLogs = logs.filter(log => log.userId === member._id && log.completed);
        return {
            ...member,
            points: memberLogs.length * 10,
            completionCount: memberLogs.length
        };
    }).sort((a: any, b: any) => b.points - a.points);

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                    <Link
                        href="/dashboard/squads"
                        className="inline-flex items-center gap-2 text-sm font-bold text-surface-400 transition-colors hover:text-primary-600"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Squads
                    </Link>
                    {isOwner && (
                        <div className="flex items-center gap-2">
                            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-surface-200 bg-white/50 text-surface-500 hover:text-primary-600 dark:border-white/10 dark:bg-white/5">
                                <Settings className="h-5 w-5" />
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 dark:border-red-900/20 dark:bg-red-900/10"
                            >
                                <Trash2 className="h-5 w-5" />
                            </button>
                        </div>
                    )}
                </div>

                <div className="relative overflow-hidden rounded-[3rem] border border-surface-200/50 bg-gradient-to-br from-white to-surface-50/50 p-10 dark:border-white/[0.05] dark:from-white/[0.03] dark:to-transparent">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div className="space-y-4">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-xl shadow-primary-500/30">
                                <Users className="h-8 w-8" />
                            </div>
                            <h1 className="text-4xl font-black tracking-tight text-surface-900 dark:text-white sm:text-5xl">
                                {squad.title}
                            </h1>
                            <p className="max-w-xl text-surface-500 dark:text-surface-400">
                                {squad.description || "Building habits together is better. Stay consistent and win the day."}
                            </p>
                            <div className="flex flex-wrap items-center gap-6 pt-2">
                                <div className="flex items-center gap-2 text-sm font-bold text-surface-400">
                                    <Calendar className="h-4 w-4 text-primary-500" />
                                    Started {new Date(squad.startDate).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-surface-400">
                                    <Trophy className="h-4 w-4 text-orange-500" />
                                    {squad.habitTemplates.length} Active Challenges
                                </div>
                                <div className="flex items-center gap-2 text-sm font-bold text-surface-400">
                                    <Users className="h-4 w-4 text-blue-500" />
                                    {squad.members.length} Members
                                </div>
                            </div>
                        </div>

                        <button className="flex items-center justify-center gap-3 rounded-2xl bg-surface-900 px-8 py-5 text-sm font-black text-white shadow-2xl transition-all hover:bg-black dark:bg-white dark:text-black dark:hover:bg-surface-200">
                            <Share2 className="h-5 w-5" />
                            Invite Friends
                        </button>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary-500/5 blur-[80px]" />
                </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
                {/* Leaderboard Section */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-2xl font-black text-surface-900 dark:text-white">Squad <span className="text-primary-600">Leaderboard</span></h3>
                        <div className="rounded-full bg-primary-50 px-4 py-1.5 text-xs font-black text-primary-600 dark:bg-primary-900/20">
                            UPDATED REAL-TIME
                        </div>
                    </div>

                    <div className="space-y-4">
                        {leaderboard.map((member: any, index: number) => (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                key={member._id}
                                className={cn(
                                    "relative group flex items-center justify-between overflow-hidden rounded-[2rem] border p-6 transition-all duration-300",
                                    index === 0
                                        ? "border-orange-200 bg-gradient-to-r from-orange-50 to-white dark:border-orange-500/20 dark:from-orange-500/5 dark:to-transparent"
                                        : "border-surface-200/50 bg-white/50 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02]"
                                )}
                            >
                                <div className="flex items-center gap-6">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-100 text-sm font-black text-surface-400 dark:bg-white/5">
                                        #{index + 1}
                                    </div>
                                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl border-2 border-white bg-surface-100 shadow-md dark:border-[#0A0A0F]">
                                        {member.image ? (
                                            <Image src={member.image} alt="" fill className="object-cover" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center bg-primary-100 text-primary-600 dark:bg-primary-900/20">
                                                <UserIcon className="h-6 w-6" />
                                            </div>
                                        )}
                                        {index === 0 && (
                                            <div className="absolute -right-1 -top-1 rounded-full bg-orange-500 p-1 text-white shadow-lg">
                                                <Crown className="h-3 w-3" />
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-surface-900 dark:text-white">
                                            {member.name} {member._id === session?.user?.id && "(You)"}
                                        </h4>
                                        <div className="flex items-center gap-3 mt-1">
                                            <div className="flex items-center gap-1.5 text-xs font-bold text-success-600">
                                                <CheckCircle2 className="h-3.5 w-3.5" />
                                                {member.completionCount} completions
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-black text-surface-900 dark:text-white">{member.points}</p>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-surface-400">Total Points</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Challenge Details Siderbar */}
                <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-2xl font-black text-surface-900 dark:text-white">The <span className="text-primary-600">Challenge</span></h3>

                    <div className="rounded-[2rem] border border-surface-200/50 bg-white/50 p-6 backdrop-blur-sm dark:border-white/5 dark:bg-white/[0.02]">
                        <p className="text-sm font-bold text-surface-400 uppercase tracking-wider mb-4">Tracking Habits</p>
                        <div className="space-y-4">
                            {squad.habitTemplates.map((habit: any, i: number) => (
                                <div key={i} className="flex items-center gap-3 rounded-2xl bg-surface-50 p-3 dark:bg-white/5">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm dark:bg-white/10">
                                        <Trophy className="h-4 w-4 text-primary-600" />
                                    </div>
                                    <span className="text-sm font-bold text-surface-700 dark:text-surface-200">{habit.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-[2rem] border border-surface-200/50 bg-gradient-to-br from-primary-600 to-primary-700 p-8 text-white shadow-xl shadow-primary-500/20">
                        <Trophy className="h-10 w-10 mb-4 opacity-50" />
                        <h4 className="text-xl font-bold">Squad Goals</h4>
                        <p className="mt-2 text-sm text-primary-100">
                            The first member to reach 1000 points wins the &quot;Champion&quot; title for this month!
                        </p>
                        <button className="mt-6 flex w-full items-center justify-center rounded-xl bg-white/10 py-3 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/20">
                            View Prize Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
