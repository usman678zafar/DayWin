"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/dashboard";
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email: formData.email.trim().toLowerCase(),
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Welcome back");
                router.push(redirectTo);
                router.refresh();
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:px-8">
                <section className="hidden rounded-2xl border border-white/15 bg-black p-10 text-white md:block">
                    <DailyWinLogo
                        className="mb-8"
                        label="DAY WIN"
                        textClassName="text-sm tracking-[0.15em] text-white"
                    />
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
                        Welcome Back
                    </p>
                    <h1 className="text-5xl font-black uppercase leading-[0.9]">
                        Keep The
                        <br />
                        Streak
                        <br />
                        Alive
                    </h1>
                    <p className="mt-6 max-w-md text-lg text-white/85">
                        Sign in to continue tracking your habits, streaks, and daily progress.
                    </p>
                </section>

                <section className="rounded-2xl border border-black/15 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <DailyWinLogo
                            label="DAY WIN"
                            iconClassName="h-7 w-7 rounded-sm"
                            textClassName="text-[11px] tracking-[0.14em] text-black"
                        />
                        <Link href="/signup" className="text-xs font-semibold uppercase tracking-[0.12em] text-black/75 hover:text-black">
                            Create account
                        </Link>
                    </div>

                    <h2 className="text-3xl font-black uppercase">Login</h2>
                    <p className="mt-2 text-sm text-black/75">Enter your credentials to access your dashboard.</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            leftIcon={<Mail className="h-5 w-5" />}
                            required
                        />

                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your account password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            leftIcon={<Lock className="h-5 w-5" />}
                            rightIcon={
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="hover:text-black">
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            }
                            required
                        />

                        <div className="flex items-center justify-end">
                            <Link href="/forgot-password" className="text-sm text-black/75 hover:text-black">
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" isLoading={isLoading} className="w-full">
                            Sign in
                        </Button>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-black/10"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-black/50">Or continue with</span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="w-full gap-3"
                            onClick={() => signIn("google", { callbackUrl: redirectTo })}
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Google
                        </Button>
                    </form>

                </section>
            </div>
        </div>
    );
}

