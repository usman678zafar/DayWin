"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { User, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import toast from "react-hot-toast";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SignupPage() {
    const router = useRouter();
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
                router.push("/login");
            } else {
                toast.success("Account created successfully");
                router.push("/dashboard");
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
                <section className="hidden rounded-2xl border border-black/10 bg-black p-10 text-white md:block">
                    <DailyWinLogo
                        className="mb-8"
                        label="DAILY WIN"
                        textClassName="text-sm tracking-[0.15em] text-white"
                    />
                    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                        Start Today
                    </p>
                    <h1 className="text-5xl font-black uppercase leading-[0.9]">
                        Build Better
                        <br />
                        Habits
                        <br />
                        Daily
                    </h1>
                    <p className="mt-6 max-w-md text-lg text-white/75">
                        Create your account to track routines, maintain streaks, and improve every day.
                    </p>
                </section>

                <section className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm sm:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <DailyWinLogo
                            label="DAILY WIN"
                            iconClassName="h-7 w-7 rounded-sm"
                            textClassName="text-[11px] tracking-[0.14em] text-black"
                        />
                        <Link href="/login" className="text-xs font-semibold uppercase tracking-[0.12em] text-black/60 hover:text-black">
                            Already a member
                        </Link>
                    </div>

                    <h2 className="text-3xl font-black uppercase">Sign Up</h2>
                    <p className="mt-2 text-sm text-black/60">Create your account and start tracking your habits.</p>

                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            leftIcon={<User className="h-5 w-5" />}
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            leftIcon={<Mail className="h-5 w-5" />}
                            required
                        />

                        <div>
                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
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
                                            className={`flex items-center gap-2 text-sm ${req.met ? "text-black" : "text-black/45"}`}
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
                    </form>

                    <p className="mt-6 text-center text-xs text-black/50">
                        By creating an account, you agree to our{" "}
                        <Link href="/terms" className="text-black hover:underline">Terms</Link> and{" "}
                        <Link href="/privacy" className="text-black hover:underline">Privacy Policy</Link>.
                    </p>
                </section>
            </div>
        </div>
    );
}
