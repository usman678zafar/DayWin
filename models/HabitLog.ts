import mongoose, { Schema, Document } from "mongoose";

export interface IHabitLog extends Document {
    habitId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    date: Date;
    completed: boolean;
    count: number;
    note?: string;
    skipped: boolean;
    skipReason?: string;
    completedAt?: Date;
    createdAt: Date;
}

const HabitLogSchema = new Schema<IHabitLog>(
    {
        habitId: {
            type: Schema.Types.ObjectId,
            ref: "Habit",
            required: true,
            index: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        date: {
            type: Date,
            required: true,
        },
        completed: {
            type: Boolean,
            default: false,
        },
        count: {
            type: Number,
            default: 0,
        },
        note: {
            type: String,
            maxlength: 500,
        },
        skipped: {
            type: Boolean,
            default: false,
        },
        skipReason: String,
        completedAt: Date,
    },
    {
        timestamps: true,
    }
);

// Compound index for efficient lookups
HabitLogSchema.index({ habitId: 1, date: 1 }, { unique: true });
HabitLogSchema.index({ userId: 1, date: 1 });

export default mongoose.models.HabitLog || mongoose.model<IHabitLog>("HabitLog", HabitLogSchema);
