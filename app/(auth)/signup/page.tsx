"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { User, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import toast from "react-hot-toast";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/dashboard";
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const passwordRequirements = [
        { text: "At least 8 characters", met: formData.password.length >= 8 },
        { text: "Contains a number", met: /\d/.test(formData.password) },
        { text: "Contains uppercase letter", met: /[A-Z]/.test(formData.password) },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                toast.error(data.error || "Something went wrong");
                return;
            }

            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Account created but failed to sign in");
                router.push(`/login?redirect=${redirectTo}`);
            } else {
                toast.success("Account created successfully");
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
                        Start Today
                    </p>
                    <h1 className="text-5xl font-black uppercase leading-[0.9]">
                        Build Better
                        <br />
                        Habits
                        <br />
                        Daily
                    </h1>
                    <p className="mt-6 max-w-md text-lg text-white/85">
                        Create your account to track routines, maintain streaks, and improve every day.
                    </p>
                </section>

                <section className="rounded-2xl border border-black/15 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <DailyWinLogo
                            label="DAY WIN"
                            iconClassName="h-7 w-7 rounded-sm"
                            textClassName="text-[11px] tracking-[0.14em] text-black"
                        />
                        <Link href="/login" className="text-xs font-semibold uppercase tracking-[0.12em] text-black/75 hover:text-black">
                            Already a member
                        </Link>
                    </div>

                    <h2 className="text-3xl font-black uppercase">Sign Up</h2>
                    <p className="mt-2 text-sm text-black/75">Create your account and start tracking your habits.</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            leftIcon={<User className="h-5 w-5" />}
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email address"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            leftIcon={<Mail className="h-5 w-5" />}
                            required
                        />

                        <div>
                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a password (8+ characters)"
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

                            {formData.password && (
                                <div className="mt-3 space-y-2">
                                    {passwordRequirements.map((req) => (
                                        <div
                                            key={req.text}
                                            className={`flex items-center gap-2 text-sm ${req.met ? "text-black" : "text-black/60"}`}
                                        >
                                            <span
                                                className={`flex h-4 w-4 items-center justify-center rounded-full ${req.met ? "bg-black text-white" : "border border-black/25"}`}
                                            >
                                                {req.met && <Check className="h-3 w-3" />}
                                            </span>
                                            {req.text}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button type="submit" isLoading={isLoading} className="w-full">
                            Create account
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

                    <p className="mt-6 text-center text-xs text-black/65">
                        By creating an account, you agree to our{" "}
                        <Link href="/terms" className="text-black hover:underline">Terms</Link> and{" "}
                        <Link href="/privacy" className="text-black hover:underline">Privacy Policy</Link>.
                    </p>
                </section>
            </div>
        </div>
    );
}

