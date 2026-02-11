import mongoose, { Schema, Document } from "mongoose";

export interface IHabit extends Document {
    userId: mongoose.Types.ObjectId;
    title: string;
    description?: string;
    icon: string;
    color: string;
    category: string;
    frequency: {
        type: "daily" | "weekly" | "custom";
        daysOfWeek?: number[];
        timesPerPeriod?: number;
        periodDays?: number;
    };
    targetCount: number;
    reminders: {
        id: string;
        time: string;
        enabled: boolean;
        days: number[];
    }[];
    startDate: Date;
    endDate?: Date;
    isArchived: boolean;
    streak: {
        current: number;
        longest: number;
        lastCompletedDate?: Date;
    };
    completionRate: number;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const HabitSchema = new Schema<IHabit>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
        },
        icon: {
            type: String,
            default: "⭐",
        },
        color: {
            type: String,
            default: "purple",
        },
        category: {
            type: String,
            default: "other",
        },
        frequency: {
            type: {
                type: String,
                enum: ["daily", "weekly", "custom"],
                default: "daily",
            },
            daysOfWeek: [Number],
            timesPerPeriod: Number,
            periodDays: Number,
        },
        targetCount: {
            type: Number,
            default: 1,
            min: 1,
        },
        reminders: [
            {
                id: String,
                time: String,
                enabled: Boolean,
                days: [Number],
            },
        ],
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: Date,
        isArchived: {
            type: Boolean,
            default: false,
        },
        streak: {
            current: { type: Number, default: 0 },
            longest: { type: Number, default: 0 },
            lastCompletedDate: Date,
        },
        completionRate: {
            type: Number,
            default: 0,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for better query performance
HabitSchema.index({ userId: 1, isArchived: 1 });
HabitSchema.index({ userId: 1, createdAt: -1 });

export default mongoose.models.Habit || mongoose.model<IHabit>("Habit", HabitSchema);
