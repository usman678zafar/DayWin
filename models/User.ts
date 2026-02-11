import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    email: string;
    name: string;
    password?: string;
    image?: string;
    emailVerified?: Date;
    timezone: string;
    preferences: {
        theme: "light" | "dark" | "system";
        weekStartsOn: number;
        reminderTime: string;
        soundEnabled: boolean;
        celebrationsEnabled: boolean;
    };
    stats: {
        totalHabits: number;
        completedToday: number;
        currentStreak: number;
        longestStreak: number;
        totalCompletions: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            select: false,
        },
        image: String,
        emailVerified: Date,
        timezone: {
            type: String,
            default: "UTC",
        },
        preferences: {
            theme: {
                type: String,
                enum: ["light", "dark", "system"],
                default: "system",
            },
            weekStartsOn: {
                type: Number,
                min: 0,
                max: 6,
                default: 1,
            },
            reminderTime: {
                type: String,
                default: "09:00",
            },
            soundEnabled: {
                type: Boolean,
                default: true,
            },
            celebrationsEnabled: {
                type: Boolean,
                default: true,
            },
        },
        stats: {
            totalHabits: { type: Number, default: 0 },
            completedToday: { type: Number, default: 0 },
            currentStreak: { type: Number, default: 0 },
            longestStreak: { type: Number, default: 0 },
            totalCompletions: { type: Number, default: 0 },
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
