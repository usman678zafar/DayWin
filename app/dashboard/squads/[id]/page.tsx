"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
    X,
    Plus,
    Edit2,
    Check,
    TrendingUp,
    MoreVertical
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Modal } from "@/components/ui/Modal";
import { HabitForm } from "@/components/habits/HabitForm";
import { Habit, habitColors } from "@/types";
import { 
    format, 
    eachDayOfInterval, 
    isToday, 
    isFuture,
} from "date-fns";
import { HabitIcon } from "@/components/habits/HabitIcon";
import toast from "react-hot-toast";
import { SquadDetailSkeleton } from "@/components/ui/PageSkeletons";

export default function SquadDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [squad, setSquad] = useState<any>(null);
    const [logs, setLogs] = useState<any[]>([]);
    const [userHabits, setUserHabits] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMembersModal, setShowMembersModal] = useState(false);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteLoading, setInviteLoading] = useState(false);
    const [inviteError, setInviteError] = useState("");

    const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);
    const [editingHabitIndex, setEditingHabitIndex] = useState<number | null>(null);
    const [savingHabit, setSavingHabit] = useState(false);
    const [editingHabitData, setEditingHabitData] = useState<Partial<Habit> | undefined>(undefined);
    const [menuOpenFor, setMenuOpenFor] = useState<number | null>(null);
    const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
    const [memberToDelete, setMemberToDelete] = useState<{id: string, name: string} | null>(null);

    const fetchSquadDetails = useCallback(async () => {
        try {
            const res = await fetch(`/api/squads/${id}`);
            if (!res.ok) throw new Error("Squad not found");
            const data = await res.json();
            setSquad(data.squad);
            setLogs(data.logs || []);
            setUserHabits(data.userHabits || []);
        } catch (error) {
            console.error(error);
            router.push("/dashboard/squads");
        } finally {
            setLoading(false);
        }
    }, [id, router]);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inviteEmail.trim()) return;
        setInviteLoading(true);
        setInviteError("");
        try {
            const res = await fetch(`/api/squads/${id}/invite`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: inviteEmail.trim() }),
            });
            const data = await res.json();
            if (!res.ok) {
                setInviteError(data.error || "Something went wrong.");
            } else {
                toast.success(data.message);
                setInviteEmail("");
                setShowInviteModal(false);
                fetchSquadDetails();
            }
        } catch {
            setInviteError("Network error. Please try again.");
        } finally {
            setInviteLoading(false);
        }
    };

    const handleToggle = async (habitId: string, date: Date, currentCompleted: boolean) => {
        if (isFuture(date) && !isToday(date)) return;

        // Optimistic update
        const dateStr = format(date, "yyyy-MM-dd");
        const newLogs = [...logs];
        
        if (!currentCompleted) {
            newLogs.push({ habitId, date: date.toISOString(), completed: true });
        } else {
            const index = newLogs.findIndex(l => l.habitId === habitId && format(new Date(l.date), "yyyy-MM-dd") === dateStr);
            if (index > -1) newLogs.splice(index, 1);
        }
        setLogs(newLogs);

        try {
            await fetch(`/api/habits/${habitId}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed: !currentCompleted, date: dateStr }),
            });
            // Re-fetch to ensure sync
            const res = await fetch(`/api/squads/${id}`);
            const data = await res.json();
            setLogs(data.logs || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update");
            fetchSquadDetails(); // Rollback
        }
    };

    const openHabitModal = (habit?: any, index?: number) => {
        if (habit) {
            setEditingHabitData(habit);
            setEditingHabitIndex(index as number);
        } else {
            setEditingHabitData({
                startDate: squad?.startDate ? new Date(squad.startDate) : new Date(),
                endDate: squad?.endDate ? new Date(squad.endDate) : undefined
            });
            setEditingHabitIndex(null);
        }
        setIsHabitModalOpen(true);
    };

    const handleSubmitHabit = async (data: Partial<Habit>) => {
        setSavingHabit(true);
        try {
            const updatedTemplates = [...(squad.habitTemplates || [])];
            if (editingHabitIndex !== null) {
                updatedTemplates[editingHabitIndex] = { ...updatedTemplates[editingHabitIndex], ...data };
            } else {
                updatedTemplates.push(data);
            }

            const res = await fetch(`/api/squads/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ habitTemplates: updatedTemplates })
            });

            if (res.ok) {
                await fetchSquadDetails();
                setIsHabitModalOpen(false);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSavingHabit(false);
        }
    };

    const deleteHabit = async (index: number) => {
        if (!confirm("Are you sure you want to delete this habit template?")) return;
        try {
            const updatedTemplates = [...(squad.habitTemplates || [])];
            updatedTemplates.splice(index, 1);

            const res = await fetch(`/api/squads/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ habitTemplates: updatedTemplates })
            });

            if (res.ok) {
                await fetchSquadDetails();
            }
        } catch (error) {
            console.error(error);
        }
    };

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

    const handleRemoveMember = async (memberId: string, memberName: string) => {
        setMemberToDelete({ id: memberId, name: memberName });
        setShowDeleteConfirmModal(true);
    };

    const confirmRemoveMember = async () => {
        if (!memberToDelete) return;
        
        try {
            const res = await fetch(`/api/squads/${id}/members/${memberToDelete.id}`, { method: "DELETE" });
            if (res.ok) {
                toast.success("Member removed successfully");
                fetchSquadDetails();
                setShowDeleteConfirmModal(false);
                setMemberToDelete(null);
            } else {
                const data = await res.json();
                toast.error(data.error || "Failed to remove member");
            }
        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.");
        }
    };

    // Matrix Days - ALL days from squad startDate to endDate
    const days = squad ? eachDayOfInterval({
        start: new Date(squad.startDate),
        end: squad.endDate ? new Date(squad.endDate) : new Date()
    }) : [];

    // Auto-scroll to today on mount
    const scrollRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (scrollRef.current && squad) {
            const todayCol = scrollRef.current.querySelector('[data-today="true"]');
            if (todayCol) {
                todayCol.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
            } else {
                scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
            }
        }
    }, [squad]);

    if (loading) {
        return <SquadDetailSkeleton />;
    }

    if (!squad) return null;

    const isOwner = squad?.ownerId?._id === session?.user?.id;

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
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
                                    {format(new Date(squad.startDate), "MMM d, yyyy")} - {squad.endDate ? format(new Date(squad.endDate), "MMM d, yyyy") : "Ongoing"}
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
                                            <Image src={member.image} alt="" fill sizes="32px" className="object-cover" />
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

                            {isOwner && (
                                <button
                                    onClick={() => { setShowInviteModal(true); setInviteError(""); setInviteEmail(""); }}
                                    className="flex items-center justify-center gap-1.5 rounded-lg bg-surface-900 px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-black dark:bg-white dark:text-black dark:hover:bg-surface-200"
                                >
                                    <Share2 className="h-3.5 w-3.5" />
                                    Invite Friends
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Background decoration */}
                    <div className="absolute right-0 top-0 -mr-12 -mt-12 h-32 w-32 rounded-full bg-primary-500/5 blur-[40px]" />
                </div>
            </div>

            {/* Daily Progress Matrix - High Density Style */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1.5">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary-500 shadow-sm shadow-primary-500/50" />
                            <h3 className="text-xl font-black text-surface-900 dark:text-white">Squad <span className="text-primary-600">Habits</span></h3>
                        </div>
                        <div className="h-px w-20 bg-gradient-to-r from-surface-200 to-transparent dark:from-white/10 dark:to-transparent hidden sm:block" />
                        <span className="text-[9px] font-bold text-surface-400 uppercase tracking-widest">
                            {squad.habitTemplates?.length || 0} Total
                        </span>
                    </div>
                    {isOwner && (
                        <button
                            onClick={() => openHabitModal()}
                            className="flex items-center gap-1.5 rounded-lg bg-primary-50 px-3 py-1.5 text-[11px] font-black text-primary-600 hover:bg-primary-100 dark:bg-primary-900/20 dark:hover:bg-primary-900/40 transition-colors"
                        >
                            <Plus className="h-3 w-3" />
                            ADD HABIT
                        </button>
                    )}
                </div>

                {squad.habitTemplates?.length > 0 ? (
                    <div className="overflow-hidden rounded-2xl border border-surface-200/50 bg-white shadow-sm dark:border-white/5 dark:bg-[#0A0A0F]">
                        <div ref={scrollRef} className="overflow-x-auto" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(139,92,246,0.3) transparent' }}>
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.01]">
                                        <th className="sticky left-0 z-20 bg-white dark:bg-[#0A0A0F] px-4 py-3 text-left border-r border-black/5 dark:border-white/5 shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)]">
                                            <span className="text-[9px] font-black uppercase tracking-widest text-black/40 dark:text-white/40">Habit</span>
                                        </th>
                                        {days.map(day => (
                                            <th key={day.toISOString()} data-today={isToday(day) ? "true" : undefined} className={cn(
                                                "px-1 py-3 text-center min-w-[40px] transition-colors",
                                                isToday(day) && "bg-primary-500/5 dark:bg-primary-500/10"
                                            )}>
                                                <div className="flex flex-col items-center">
                                                    <span className={cn(
                                                        "text-[8px] font-black uppercase leading-none mb-0.5",
                                                        isFuture(day) && !isToday(day) ? "text-black/15 dark:text-white/15" : "text-black/40 dark:text-white/40"
                                                    )}>
                                                        {format(day, "EEE")}
                                                    </span>
                                                    <span className={cn(
                                                        "text-[11px] font-black",
                                                        isToday(day) ? "text-primary-600" : (isFuture(day) && !isToday(day) ? "text-black/15 dark:text-white/15" : "text-black/80 dark:text-white/80")
                                                    )}>
                                                        {format(day, "d")}
                                                    </span>
                                                </div>
                                            </th>
                                        ))}
                                        <th className={cn(
                                            "sticky z-20 px-3 py-3 text-center bg-white dark:bg-[#0A0A0F] border-l border-black/5 dark:border-white/5 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)]",
                                            isOwner ? "right-10" : "right-0"
                                        )}>
                                            <TrendingUp className="h-3 w-3 mx-auto text-primary-400" />
                                        </th>
                                        {isOwner && (
                                            <th className="sticky right-0 z-20 w-10 bg-white dark:bg-[#0A0A0F] border-l border-black/5 dark:border-white/5" />
                                        )}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-surface-100 dark:divide-white/5">
                                    {(squad.habitTemplates || []).map((template: any, index: number) => {
                                        // Match template with userHabit to get marking capability
                                        const habit = userHabits.find(h => h.title === template.title);
                                        const colors = habitColors[template.color as keyof typeof habitColors] || habitColors.purple;
                                        const habitLogs = habit ? logs.filter(l => l.habitId === habit._id) : [];
                                        const completedCount = habitLogs.filter(l => l.completed).length;
                                        const elapsedDays = days.filter(d => !isFuture(d) || isToday(d)).length;
                                        const completionRate = elapsedDays > 0 ? Math.round((completedCount / elapsedDays) * 100) : 0;

                                        return (
                                            <tr key={index} className="group hover:bg-black/[0.01] dark:hover:bg-white/[0.01] transition-colors">
                                                <td className="sticky left-0 z-10 bg-white dark:bg-[#0A0A0F] px-4 py-2 border-r border-black/5 dark:border-white/5 group-hover:bg-surface-50 dark:group-hover:bg-white/[0.02] shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] transition-colors">
                                                    <div className="flex items-center justify-between gap-2.5">
                                                        <div className="flex items-center gap-2.5 overflow-hidden">
                                                            <div className="relative h-8 w-8 flex-shrink-0">
                                                                <svg className="h-8 w-8 -rotate-90 transform" viewBox="0 0 36 36">
                                                                    <circle cx="18" cy="18" r="16" fill="none" className="stroke-black/5 dark:stroke-white/5" strokeWidth="3" />
                                                                    <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray={`${completionRate} 100`} strokeLinecap="round" className={colors.text} />
                                                                </svg>
                                                                <div className="absolute inset-0 flex items-center justify-center">
                                                                    <HabitIcon name={template.icon} size={11} className={colors.text} />
                                                                </div>
                                                            </div>
                                                            <span className="truncate text-[11px] font-black text-black/90 dark:text-white/90">{template.title}</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                {days.map(day => {
                                                    const dateStr = format(day, "yyyy-MM-dd");
                                                    const isCompleted = logs.some(l => l.habitId === habit?._id && format(new Date(l.date), "yyyy-MM-dd") === dateStr);
                                                    const isFutureDay = isFuture(day) && !isToday(day);

                                                    return (
                                                        <td key={day.toISOString()} className={cn("px-0.5 py-1 text-center", isToday(day) && "bg-primary-500/[0.02] dark:bg-primary-500/[0.05]")}>
                                                            <div className="flex items-center justify-center">
                                                                <motion.button
                                                                    whileHover={habit && !isFutureDay ? { scale: 1.1 } : undefined}
                                                                    whileTap={habit && !isFutureDay ? { scale: 0.9 } : undefined}
                                                                    onClick={() => habit && handleToggle(habit._id, day, isCompleted)}
                                                                    disabled={!habit || isFutureDay}
                                                                    className={cn(
                                                                        "mx-auto h-6 w-6 rounded-[6px] flex items-center justify-center transition-all",
                                                                        isCompleted 
                                                                            ? cn("shadow-sm text-white", colors.gradient) 
                                                                            : (isFutureDay || !habit ? "bg-black/[0.02] dark:bg-white/[0.02]" : "bg-black/[0.04] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10"),
                                                                        isToday(day) && !isCompleted && "ring-1 ring-primary-500/30",
                                                                        !habit && "cursor-wait opacity-50"
                                                                    )}
                                                                >
                                                                    {isCompleted ? (
                                                                        <Check className="h-3 w-3" strokeWidth={5} />
                                                                    ) : !isFutureDay && habit ? (
                                                                        <span className="text-[8px] font-bold text-black/20 dark:text-white/30">{format(day, "d")}</span>
                                                                    ) : (
                                                                        <div className="opacity-10 scale-75">
                                                                            <HabitIcon name={template.icon} size={10} />
                                                                        </div>
                                                                    )}
                                                                </motion.button>
                                                            </div>
                                                        </td>
                                                    );
                                                })}
                                                <td className={cn(
                                                    "sticky z-10 px-2 py-2 text-center bg-white dark:bg-[#0A0A0F] group-hover:bg-surface-50 dark:group-hover:bg-white/[0.02] border-l border-black/5 dark:border-white/5 shadow-[-2px_0_5px_-2px_rgba(0,0,0,0.05)] transition-colors",
                                                    isOwner ? "right-10" : "right-0"
                                                )}>
                                                    <span className={cn(
                                                        "text-[10px] font-black",
                                                        completionRate >= 80 ? "text-green-500" : completionRate >= 50 ? "text-yellow-500" : "text-red-400"
                                                    )}>{completionRate}%</span>
                                                </td>
                                                {isOwner && (
                                                <td className={cn(
                                                    "sticky right-0 z-10 px-1 py-1.5 align-middle bg-white dark:bg-[#0A0A0F] group-hover:bg-surface-50 dark:group-hover:bg-white/[0.02] border-l border-black/5 dark:border-white/5 transition-colors",
                                                    menuOpenFor === index && "z-30"
                                                )}>
                                                    <div className="relative flex justify-center">
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setMenuOpenFor(menuOpenFor === index ? null : index);
                                                            }} 
                                                            className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-black/20 hover:text-black/60 dark:text-white/20 dark:hover:text-white/60 transition-all"
                                                        >
                                                            <MoreVertical className="h-3.5 w-3.5" />
                                                        </button>
                                                        <AnimatePresence>
                                                            {menuOpenFor === index && (
                                                                <>
                                                                    <div className="fixed inset-0 z-10" onClick={() => setMenuOpenFor(null)} />
                                                                    <motion.div 
                                                                        initial={{ opacity: 0, scale: 0.95, y: 6 }} 
                                                                        animate={{ opacity: 1, scale: 1, y: 0 }} 
                                                                        exit={{ opacity: 0, scale: 0.95, y: 6 }} 
                                                                        className="absolute right-0 bottom-full z-[100] mb-1 w-32 bg-white dark:bg-surface-900 border border-black/10 dark:border-white/10 rounded-lg shadow-2xl p-1 backdrop-blur-xl origin-bottom-right"
                                                                    >
                                                                        <button onClick={() => { openHabitModal(template, index); setMenuOpenFor(null); }} className="flex w-full items-center gap-2 px-2 py-1.5 text-[10px] font-bold hover:bg-black/5 dark:hover:bg-white/5 rounded text-black/70 dark:text-white/70"><Edit2 className="h-3 w-3" /> Edit</button>
                                                                        <button onClick={() => { deleteHabit(index); setMenuOpenFor(null); }} className="flex w-full items-center gap-2 px-2 py-1.5 text-[10px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded"><Trash2 className="h-3 w-3" /> Delete</button>
                                                                    </motion.div>
                                                                </>
                                                            )}
                                                        </AnimatePresence>
                                                    </div>
                                                </td>
                                                )}
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-surface-200 p-12 text-center dark:border-surface-800">
                        <Trophy className="mb-3 h-10 w-10 text-surface-200 dark:text-surface-700" />
                        <p className="text-sm font-bold text-surface-500">No squad habits to track yet</p>
                        {isOwner && (
                            <p className="mt-1 text-xs text-surface-400">Add some habits below to get started</p>
                        )}
                    </div>
                )}

                {/* Summary Row - Compact (matching personal dashboard) */}
                <div className="mt-2 flex items-center justify-between px-1">
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-[10px] font-semibold text-black/40 dark:text-white/40 uppercase tracking-widest">Success {" > "} 80%</span>
                        </div>
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-black/30 dark:text-white/30">Momentum Tracking Active</span>
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
                                                <Image src={member.image} alt="" fill sizes="48px" className="object-cover" />
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
                                        <div className="flex items-center gap-2">
                                            {squad.ownerId?._id === member._id && (
                                                <span className="rounded-full bg-orange-100 px-2.5 py-1 text-[10px] font-black text-orange-600 dark:bg-orange-500/20">
                                                    OWNER
                                                </span>
                                            )}
                                            {isOwner && squad.ownerId?._id !== member._id && (
                                                <button
                                                    onClick={() => handleRemoveMember(member._id, member.name)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-colors dark:border-red-900/20 dark:bg-red-900/10 dark:hover:bg-red-900/20"
                                                    title="Remove member"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteConfirmModal && memberToDelete && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-surface-200 bg-white shadow-2xl dark:border-surface-800 dark:bg-[#0A0A0F]"
                        >
                            <div className="flex items-center justify-between border-b border-surface-100 p-5 dark:border-surface-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/20">
                                        <Trash2 className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-surface-900 dark:text-white">Remove Member</h3>
                                        <p className="text-[11px] font-medium text-surface-400">Confirm member removal</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => { setShowDeleteConfirmModal(false); setMemberToDelete(null); }}
                                    className="rounded-full p-2 text-surface-400 hover:bg-surface-100 hover:text-surface-900 dark:hover:bg-surface-800 dark:hover:text-white transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="p-5 space-y-4">
                                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 dark:border-red-900/20 dark:bg-red-900/10">
                                    <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                                        Are you sure you want to remove <span className="font-bold">{memberToDelete.name}</span> from the squad?
                                    </p>
                                    <p className="mt-2 text-xs text-red-700 dark:text-red-300">
                                        This action cannot be undone. The member will lose access to all squad habits and progress.
                                    </p>
                                </div>

                                <div className="flex gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => { setShowDeleteConfirmModal(false); setMemberToDelete(null); }}
                                        className="flex-1 rounded-xl border border-surface-200 bg-transparent py-2.5 text-xs font-bold text-surface-600 transition-all hover:bg-surface-50 dark:border-surface-700 dark:text-surface-400 dark:hover:bg-surface-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        onClick={confirmRemoveMember}
                                        className="flex-1 items-center justify-center gap-2 rounded-xl bg-red-600 py-2.5 text-xs font-black text-white shadow-md shadow-red-500/20 transition-all hover:bg-red-700"
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                        Remove Member
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Invite Friends Modal */}
            <AnimatePresence>
                {showInviteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="w-full max-w-sm overflow-hidden rounded-[2rem] border border-surface-200 bg-white shadow-2xl dark:border-surface-800 dark:bg-[#0A0A0F]"
                        >
                            <div className="flex items-center justify-between border-b border-surface-100 p-5 dark:border-surface-800">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/20">
                                        <Share2 className="h-4 w-4" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-surface-900 dark:text-white">Invite to Squad</h3>
                                        <p className="text-[11px] font-medium text-surface-400">Add a member by email</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowInviteModal(false)}
                                    className="rounded-full p-2 text-surface-400 hover:bg-surface-100 hover:text-surface-900 dark:hover:bg-surface-800 dark:hover:text-white transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <form onSubmit={handleInvite} className="p-5 space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-black uppercase tracking-widest text-surface-400">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={inviteEmail}
                                        onChange={(e) => { setInviteEmail(e.target.value); setInviteError(""); }}
                                        placeholder="friend@example.com"
                                        autoFocus
                                        className="w-full rounded-xl border border-surface-200 bg-surface-50 px-4 py-3 text-sm font-semibold text-surface-900 outline-none placeholder:text-surface-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20 dark:border-surface-700 dark:bg-surface-900 dark:text-white dark:placeholder:text-surface-600 dark:focus:border-primary-500 transition-all"
                                    />
                                    <AnimatePresence>
                                        {inviteError && (
                                            <motion.p
                                                initial={{ opacity: 0, y: -4 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -4 }}
                                                className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-red-500"
                                            >
                                                <X className="h-3 w-3 shrink-0" />
                                                {inviteError}
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>

                                <p className="text-[10px] text-surface-400 dark:text-surface-500 leading-relaxed">
                                    The person must already have a <span className="font-bold text-surface-500 dark:text-surface-400">Day Win account</span> registered with this email.
                                </p>

                                <div className="flex gap-2 pt-1">
                                    <button
                                        type="button"
                                        onClick={() => setShowInviteModal(false)}
                                        className="flex-1 rounded-xl border border-surface-200 bg-transparent py-2.5 text-xs font-bold text-surface-600 transition-all hover:bg-surface-50 dark:border-surface-700 dark:text-surface-400 dark:hover:bg-surface-800"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={inviteLoading || !inviteEmail.trim()}
                                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary-600 py-2.5 text-xs font-black text-white shadow-md shadow-primary-500/20 transition-all hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {inviteLoading ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <Plus className="h-3.5 w-3.5" />
                                        )}
                                        {inviteLoading ? "Adding..." : "Add to Squad"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Habit Modal */}
            <Modal 
                isOpen={isHabitModalOpen} 
                onClose={() => { setIsHabitModalOpen(false); setEditingHabitData(undefined); }} 
                title={editingHabitIndex !== null ? "Edit Squad Habit" : "Add Squad Habit"} 
                size="sm"
            >
                {savingHabit ? (
                    <div className="flex h-40 flex-col items-center justify-center gap-4">
                        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
                        <p className="text-sm font-bold text-surface-500">Saving habit...</p>
                    </div>
                ) : (
                    <HabitForm 
                        habit={editingHabitData} 
                        onSubmit={handleSubmitHabit} 
                        onCancel={() => { setIsHabitModalOpen(false); setEditingHabitData(undefined); }} 
                        isSquadHabit={true}
                    />
                )}
            </Modal>
        </div>
    );
}
