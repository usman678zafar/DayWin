import mongoose, { Schema, Document } from "mongoose";

export interface IChallenge extends Document {
    title: string;
    description?: string;
    ownerId: mongoose.Types.ObjectId;
    members: mongoose.Types.ObjectId[];
    invitedEmails: string[];
    habitTemplates: {
        title: string;
        icon: string;
        color: string;
        category: string;
        targetCount: number;
        frequency: {
            type: "daily" | "weekly" | "custom";
            daysOfWeek?: number[];
        };
    }[];
    startDate: Date;
    endDate?: Date;
    status: "active" | "completed" | "archived";
    createdAt: Date;
    updatedAt: Date;
}

const ChallengeSchema = new Schema<IChallenge>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        members: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        invitedEmails: [
            {
                type: String,
                lowercase: true,
                trim: true,
            },
        ],
        habitTemplates: [
            {
                title: String,
                icon: String,
                color: String,
                category: String,
                targetCount: { type: Number, default: 1 },
                frequency: {
                    type: { type: String, enum: ["daily", "weekly", "custom"], default: "daily" },
                    daysOfWeek: [Number],
                },
                startDate: Date,
                endDate: Date,
            },
        ],
        startDate: {
            type: Date,
            default: Date.now,
        },
        endDate: Date,
        status: {
            type: String,
            enum: ["active", "completed", "archived"],
            default: "active",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Challenge || mongoose.model<IChallenge>("Challenge", ChallengeSchema);
