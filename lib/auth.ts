import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "./mongodb-client";
import dbConnect from "./mongodb";
import User from "@/models/User";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    providers: [
        Credentials({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const rawEmail = credentials?.email as string | undefined;
                const rawPassword = credentials?.password as string | undefined;

                if (!rawEmail || !rawPassword) {
                    return null;
                }

                await dbConnect();

                const email = rawEmail.trim().toLowerCase();

                const user = await User.findOne({ email }).select(
                    "+password"
                );

                if (!user || !user.password) {
                    return null;
                }

                const isCorrectPassword = await bcrypt.compare(
                    rawPassword,
                    user.password
                );

                if (!isCorrectPassword) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    image: user.image,
                };
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }
            return session;
        },
    },
});
