"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
    Users,
    Loader2,
    CheckCircle2,
    ArrowRight,
    Trophy,
    ShieldCheck
} from "lucide-react";
import Link from "next/link";

export default function PublicJoinPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session, status } = useSession();
    const [squad, setSquad] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [joining, setJoining] = useState(false);

    const fetchSquadInfo = async () => {
        try {
            // We use the same API but it should be accessible or we need a public info API
            // For now let's assume the ID is enough to fetch basic info
            const res = await fetch(`/api/squads/${id}`);
            if (!res.ok) throw new Error("Squad not found");
            const data = await res.json();
            setSquad(data);
        } catch (error) {
            console.error(error);
            router.push("/dashboard/squads");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchSquadInfo();
    }, [id, fetchSquadInfo]);

    const handleJoin = async () => {
        if (status !== "authenticated") {
            router.push(`/register?redirect=/squads/join/${id}`);
            return;
        }

        setJoining(true);
        try {
            const res = await fetch(`/api/squads/${id}/join`, { method: "POST" });
            if (res.ok) {
                router.push(`/dashboard/squads/${id}`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setJoining(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#030305]">
                <Loader2 className="h-10 w-10 animate-spin text-primary-600" />
            </div>
        );
    }

    if (!squad) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#030305] text-white">
                <h1 className="text-2xl font-bold">Squad not found</h1>
                <Link href="/" className="text-primary-500 underline">Go back home</Link>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#030305] p-6 text-white">
            <div className="relative w-full max-w-lg overflow-hidden rounded-[3rem] border border-white/[0.05] bg-white/[0.02] p-10 backdrop-blur-3xl">
                {/* Decorative gradients */}
                <div className="absolute -top-24 -left-24 h-48 w-48 rounded-full bg-primary-600/20 blur-[80px]" />
                <div className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-purple-600/20 blur-[80px]" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br from-primary-600 to-primary-700 shadow-2xl shadow-primary-500/20">
                        <Users className="h-10 w-10 text-white" />
                    </div>

                    <div className="space-y-2">
                        <p className="text-xs font-black uppercase tracking-[0.3em] text-primary-500">You&apos;ve been invited</p>
                        <h1 className="text-4xl font-black tracking-tight">{squad.title}</h1>
                    </div>

                    <p className="text-surface-400">
                        {squad.ownerId.name} invited you to join their squad on DayWin. Start tracking habits and competing for the top spot!
                    </p>

                    <div className="grid w-full grid-cols-2 gap-4 py-4">
                        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4 border border-white/5">
                            <Trophy className="h-5 w-5 text-orange-500" />
                            <span className="text-xs font-bold text-surface-300">{squad.habitTemplates.length} Habits</span>
                        </div>
                        <div className="flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4 border border-white/5">
                            <ShieldCheck className="h-5 w-5 text-success-500" />
                            <span className="text-xs font-bold text-surface-300">{squad.members.length} Members</span>
                        </div>
                    </div>

                    <button
                        onClick={handleJoin}
                        disabled={joining}
                        className="group flex w-full items-center justify-center gap-3 rounded-[2rem] bg-white py-5 text-lg font-black text-black transition-all hover:bg-surface-200 active:scale-[0.98] disabled:opacity-50"
                    >
                        {joining ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            <>
                                Join the Squad
                                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                            </>
                        )}
                    </button>

                    {status !== "authenticated" && (
                        <p className="text-sm text-surface-500">
                            Already have an account? <Link href={`/login?redirect=/squads/join/${id}`} className="font-bold text-white hover:underline">Log in</Link>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
