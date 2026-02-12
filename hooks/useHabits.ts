// hooks/useHabits.ts

import { create } from "zustand";
import { HabitWithLog, Habit } from "@/types";
import { startOfDay, isToday } from "date-fns";
import toast from "react-hot-toast";

interface HabitsState {
    habits: HabitWithLog[];
    isLoading: boolean;
    error: string | null;
    fetchHabits: () => Promise<void>;
    addHabit: (habit: Partial<Habit>) => Promise<void>;
    updateHabit: (id: string, data: Partial<Habit>) => Promise<void>;
    deleteHabit: (id: string) => Promise<void>;
    completeHabit: (
        id: string,
        completed: boolean,
        count?: number
    ) => Promise<{ streak?: { current: number; longest: number } }>;
    completeHabitForDate: (
        id: string,
        date: Date,
        completed: boolean,
        count?: number
    ) => Promise<{ streak?: { current: number; longest: number } }>;
}

export const useHabits = create<HabitsState>((set, get) => ({
    habits: [],
    isLoading: false,
    error: null,

    fetchHabits: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch("/api/habits");
            if (!response.ok) throw new Error("Failed to fetch habits");
            const data = await response.json();
            set({ habits: data.habits, isLoading: false });
        } catch (error) {
            set({ error: "Failed to fetch habits", isLoading: false });
            toast.error("Failed to fetch habits");
        }
    },

    addHabit: async (habit) => {
        try {
            const response = await fetch("/api/habits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(habit),
            });
            if (!response.ok) throw new Error("Failed to create habit");
            const data = await response.json();
            set((state) => ({
                habits: [...state.habits, { ...data.habit, todayLog: null }],
            }));
            toast.success("Habit created!");
        } catch (error) {
            toast.error("Failed to create habit");
            throw error;
        }
    },

    updateHabit: async (id, data) => {
        try {
            const response = await fetch(`/api/habits/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to update habit");
            const result = await response.json();
            set((state) => ({
                habits: state.habits.map((h) =>
                    h._id === id ? { ...h, ...result.habit } : h
                ),
            }));
            toast.success("Habit updated!");
        } catch (error) {
            toast.error("Failed to update habit");
            throw error;
        }
    },

    deleteHabit: async (id) => {
        try {
            const response = await fetch(`/api/habits/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete habit");
            set((state) => ({
                habits: state.habits.filter((h) => h._id !== id),
            }));
            toast.success("Habit deleted!");
        } catch (error) {
            toast.error("Failed to delete habit");
            throw error;
        }
    },

    // Complete habit for TODAY (original method - kept for backward compatibility)
    completeHabit: async (id, completed, count) => {
        // Optimistic update
        set((state) => ({
            habits: state.habits.map((h) =>
                h._id === id
                    ? {
                        ...h,
                        todayLog: {
                            ...h.todayLog,
                            _id: h.todayLog?._id || "temp",
                            habitId: id,
                            userId: "",
                            date: new Date(),
                            completed,
                            count: count ?? (completed ? 1 : 0),
                            skipped: false,
                            createdAt: new Date(),
                        },
                    }
                    : h
            ),
        }));

        try {
            const response = await fetch(`/api/habits/${id}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed, count }),
            });
            if (!response.ok) throw new Error("Failed to update habit");

            const result = await response.json();

            // Update with actual data including streak
            set((state) => ({
                habits: state.habits.map((h) =>
                    h._id === id
                        ? {
                            ...h,
                            todayLog: result.log,
                            streak: result.streak || h.streak,
                        }
                        : h
                ),
            }));

            return { streak: result.streak };
        } catch (error) {
            // Revert on error
            get().fetchHabits();
            toast.error("Failed to update habit");
            throw error;
        }
    },

    // Complete habit for ANY DATE (new method)
    completeHabitForDate: async (id, date, completed, count) => {
        const targetDate = startOfDay(date);
        const isTargetToday = isToday(targetDate);

        // If completing for today, also do optimistic update on todayLog
        if (isTargetToday) {
            set((state) => ({
                habits: state.habits.map((h) =>
                    h._id === id
                        ? {
                            ...h,
                            todayLog: {
                                ...h.todayLog,
                                _id: h.todayLog?._id || "temp",
                                habitId: id,
                                userId: "",
                                date: targetDate,
                                completed,
                                count: count ?? (completed ? 1 : 0),
                                skipped: false,
                                createdAt: new Date(),
                            },
                        }
                        : h
                ),
            }));
        }

        try {
            const response = await fetch(`/api/habits/${id}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    completed,
                    count,
                    date: targetDate.toISOString(),
                }),
            });

            if (!response.ok) throw new Error("Failed to update habit");

            const result = await response.json();

            // If it's today, update the todayLog and streak in state
            if (isTargetToday) {
                set((state) => ({
                    habits: state.habits.map((h) =>
                        h._id === id
                            ? {
                                ...h,
                                todayLog: result.log,
                                streak: result.streak || h.streak,
                            }
                            : h
                    ),
                }));
            } else {
                // For other dates, just update the streak if returned
                if (result.streak) {
                    set((state) => ({
                        habits: state.habits.map((h) =>
                            h._id === id
                                ? {
                                    ...h,
                                    streak: result.streak,
                                }
                                : h
                        ),
                    }));
                }
            }

            return { streak: result.streak };
        } catch (error) {
            // Revert on error - refetch habits
            if (isTargetToday) {
                get().fetchHabits();
            }
            toast.error("Failed to update habit");
            throw error;
        }
    },
}));
