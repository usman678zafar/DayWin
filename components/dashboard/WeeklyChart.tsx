"use client";

import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface WeeklyChartProps {
    data: {
        date: string;
        completed: number;
        total: number;
        percentage: number;
    }[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-surface-900 px-3 sm:px-4 py-2 sm:py-3 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800">
                    <p className="font-semibold text-sm text-surface-900 dark:text-white">{label}</p>
                    <p className="text-xs text-surface-200/50">
                        {payload[0].value} / {payload[0].payload.total} completed
                    </p>
                    <p className="text-xs font-medium text-primary-500">
                        {payload[0].payload.percentage}%
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
        >
            <h3 className="text-base sm:text-lg font-semibold text-surface-900 dark:text-white mb-4 sm:mb-6">
                This Week
            </h3>
            <div className="h-48 sm:h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={28}>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717a", fontSize: 10 }}
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
                                                    : "#e4e4e7"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend - Mobile Optimized */}
            <div className="flex items-center justify-center gap-4 sm:gap-6 mt-3 sm:mt-4 flex-wrap">
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-success-500" />
                    <span className="text-[10px] sm:text-xs text-surface-200/50">100%</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary-500" />
                    <span className="text-[10px] sm:text-xs text-surface-200/50">50%+</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-secondary-500" />
                    <span className="text-[10px] sm:text-xs text-surface-200/50">&lt;50%</span>
                </div>
            </div>
        </motion.div>
    );
}
