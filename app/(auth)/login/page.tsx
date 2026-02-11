"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
    const router = useRouter();
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
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Welcome back");
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("google", { callbackUrl: "/dashboard" });
        } catch {
            toast.error("Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white text-black">
            <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-10 px-4 py-10 md:grid-cols-2 md:px-8">
                <section className="hidden rounded-2xl border border-black/10 bg-black p-10 text-white md:block">
                    <DailyWinLogo
                        className="mb-8"
                        label="DAILY WIN"
                        textClassName="text-sm tracking-[0.15em] text-white"
                    />
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                        Welcome Back
                    </p>
                    <h1 className="text-5xl font-black uppercase leading-[0.9]">
                        Keep The
                        <br />
                        Streak
                        <br />
                        Alive
                    </h1>
                    <p className="mt-6 max-w-md text-lg text-white/75">
                        Sign in to continue tracking your habits, streaks, and daily progress.
                    </p>
                </section>

                <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <DailyWinLogo
                            label="DAILY WIN"
                            iconClassName="h-7 w-7 rounded-sm"
                            textClassName="text-[11px] tracking-[0.14em] text-black"
                        />
                        <Link href="/signup" className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60 hover:text-black">
                            Create account
                        </Link>
                    </div>

                    <h2 className="text-3xl font-black uppercase">Login</h2>
                    <p className="mt-2 text-sm text-black/60">Enter your credentials to access your dashboard.</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            leftIcon={<Mail className="h-5 w-5" />}
                            required
                        />

                        <Input
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
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
                            <Link href="/forgot-password" className="text-sm text-black/60 hover:text-black">
                                Forgot password?
                            </Link>
                        </div>

                        <Button type="submit" isLoading={isLoading} className="w-full">
                            Sign in
                        </Button>
                    </form>

                    <div className="my-6 flex items-center gap-3">
                        <span className="h-px flex-1 bg-black/15" />
                        <span className="text-xs uppercase tracking-[0.12em] text-black/50">or continue with</span>
                        <span className="h-px flex-1 bg-black/15" />
                    </div>

                    <Button type="button" variant="secondary" onClick={handleGoogleSignIn} disabled={isLoading} className="w-full">
                        Continue with Google
                    </Button>
                </section>
            </div>
        </div>
    );
}
