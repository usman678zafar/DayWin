"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Users,
    Plus,
    X,
    ArrowLeft,
    Mail,
    Trophy,
    Check,
    Loader2
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function NewSquadPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [invitedEmails, setInvitedEmails] = useState<string[]>([]);

    // Default habits that will be tracked in the squad
    const [habits, setHabits] = useState([
        { title: "Daily Exercise", icon: "Activity", color: "blue", category: "health", targetCount: 1, type: "daily" },
        { title: "Morning Reading", icon: "Book", color: "purple", category: "growth", targetCount: 1, type: "daily" }
    ]);

    const addEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && !invitedEmails.includes(email)) {
            setInvitedEmails([...invitedEmails, email.toLowerCase()]);
            setEmail("");
        }
    };

    const removeEmail = (emailToRemove: string) => {
        setInvitedEmails(invitedEmails.filter(e => e !== emailToRemove));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/squads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    invitedEmails,
                    habitTemplates: habits
                })
            });

            if (res.ok) {
                router.push("/dashboard/squads");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Link
                href="/dashboard/squads"
                className="inline-flex items-center gap-2 text-sm font-bold text-surface-400 transition-colors hover:text-primary-600"
            >
                <ArrowLeft className="h-4 w-4" />
                Back to Squads
            </Link>

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-black tracking-tight text-surface-900 dark:text-white sm:text-4xl">
                    Create a <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">New Squad</span>
                </h1>
                <p className="text-surface-500 dark:text-surface-400">
                    Set up your team and invite members to start the competition.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info Card */}
                <div className="rounded-[2.5rem] border border-surface-200/50 bg-white/50 p-8 backdrop-blur-sm dark:border-white/[0.05] dark:bg-white/[0.02]">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-surface-900 dark:text-white px-2">Squad Name</label>
                            <input
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g., Morning Warriors"
                                className="w-full rounded-2xl border border-surface-200/50 bg-white px-4 py-4 text-sm outline-none transition-all focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5 dark:border-white/[0.05] dark:bg-white/[0.05]"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-surface-900 dark:text-white px-2">Description (Optional)</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="What's this squad about?"
                                rows={3}
                                className="w-full rounded-2xl border border-surface-200/50 bg-white px-4 py-4 text-sm outline-none transition-all focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5 dark:border-white/[0.05] dark:bg-white/[0.05]"
                            />
                        </div>
                    </div>
                </div>

                {/* Invite Members Card */}
                <div className="rounded-[2.5rem] border border-surface-200/50 bg-white/50 p-8 backdrop-blur-sm dark:border-white/[0.05] dark:bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100/50 text-orange-600 dark:bg-orange-900/20">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-surface-900 dark:text-white">Invite Members</h3>
                            <p className="text-sm text-surface-500 dark:text-surface-400">Add members by email to join the squad.</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email address..."
                                className="w-full rounded-2xl border border-surface-200/50 bg-white px-4 py-4 text-sm outline-none transition-all focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/5 dark:border-white/[0.05] dark:bg-white/[0.05]"
                                onKeyPress={(e) => e.key === 'Enter' && addEmail(e)}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={addEmail}
                            className="rounded-2xl bg-surface-900 px-6 py-4 text-sm font-bold text-white transition-all hover:bg-black dark:bg-white dark:text-black"
                        >
                            Add
                        </button>
                    </div>

                    {invitedEmails.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2">
                            {invitedEmails.map((e) => (
                                <div key={e} className="flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-bold text-primary-600 dark:bg-primary-900/20">
                                    {e}
                                    <button type="button" onClick={() => removeEmail(e)}>
                                        <X className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Habit Tracking Card */}
                <div className="rounded-[2.5rem] border border-surface-200/50 bg-white/50 p-8 backdrop-blur-sm dark:border-white/[0.05] dark:bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100/50 text-blue-600 dark:bg-blue-900/20">
                            <Trophy className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-surface-900 dark:text-white">Challenge Habits</h3>
                            <p className="text-sm text-surface-500 dark:text-surface-400">These habits will be tracked by everyone in the squad.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {habits.map((habit, index) => (
                            <div key={index} className="flex items-center justify-between rounded-2xl border border-surface-200/50 bg-white p-4 dark:border-white/[0.05] dark:bg-white/[0.05]">
                                <div className="flex items-center gap-4">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-${habit.color}-100/50 text-${habit.color}-600 dark:bg-${habit.color}-900/20`}>
                                        <Check className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-surface-900 dark:text-white">{habit.title}</p>
                                        <p className="text-xs text-surface-500">{habit.category} • {habit.type}</p>
                                    </div>
                                </div>
                                <button type="button" onClick={() => setHabits(habits.filter((_, i) => i !== index))}>
                                    <X className="h-5 w-5 text-surface-300 hover:text-red-500" />
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-surface-200 py-4 text-sm font-bold text-surface-400 transition-all hover:border-primary-500/50 hover:text-primary-600 dark:border-white/10"
                        >
                            <Plus className="h-4 w-4" />
                            Add Challenge Habit
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading || !title}
                    className="flex w-full items-center justify-center gap-2 rounded-[2rem] bg-primary-600 py-5 text-lg font-black text-white shadow-2xl shadow-primary-500/25 transition-all hover:bg-primary-700 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:scale-100"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-6 w-6 animate-spin" />
                            Creating Squad...
                        </>
                    ) : (
                        <>
                            Launch Squad
                            <Users className="h-6 w-6" />
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
