"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";
import { cn } from "@/lib/utils";

interface WeeklyChartProps {
    data: {
        date: string;
        completed: number;
        total: number;
        percentage: number;
    }[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
    const { resolvedTheme } = useTheme();
    const isDark = resolvedTheme === "dark";

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-surface-900 px-3 py-2 rounded-lg shadow-xl border border-black/10 dark:border-white/10">
                    <p className="font-semibold text-[11px] uppercase tracking-widest text-black/40 dark:text-white/40">{label}</p>
                    <p className="text-xs font-semibold text-black dark:text-white">
                        {payload[0].value} / {payload[0].payload.total}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-black/5 bg-gradient-to-br from-slate-50 to-white p-6 dark:from-slate-950/20 dark:to-white/[0.02] dark:border-white/5"
        >
            <div className="mb-4 flex items-center justify-between">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">Weekly Activity</h3>
                <div className="flex gap-1.5">
                   {[100, 50, 0].map(v => (
                       <div key={v} className={cn("h-1.5 w-1.5 rounded-full", v === 100 ? "bg-green-500" : v === 50 ? "bg-purple-500" : "bg-black/10 dark:bg-white/15")} />
                   ))}
                </div>
            </div>
            <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={24}>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: isDark ? "rgba(255,255,255,0.4)" : "#71717a", fontSize: 11, fontWeight: 600 }}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Bar dataKey="completed" radius={[6, 6, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        entry.percentage === 100
                                            ? "#22c55e"
                                            : entry.percentage >= 50
                                                ? "#a855f7"
                                                : entry.percentage > 0
                                                    ? "#f97316"
                                                    : isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
}

