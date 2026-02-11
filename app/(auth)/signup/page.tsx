"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

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

            // Auto sign in after registration
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Account created but failed to sign in");
                router.push("/login");
            } else {
                toast.success("Welcome to Day Win! 🎉");
                router.push("/dashboard");
                router.refresh();
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("google", { callbackUrl: "/dashboard" });
        } catch (error) {
            toast.error("Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-surface-50 dark:bg-surface-950">
            <div className="fixed inset-0 bg-mesh-gradient opacity-30 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center">
                            <span className="text-2xl">🏆</span>
                        </div>
                        <span className="text-2xl font-bold text-gradient">Day Win</span>
                    </Link>
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-white">
                        Create your account
                    </h1>
                    <p className="text-surface-600 dark:text-surface-200/50 mt-2">
                        Start building better habits today
                    </p>
                </div>

                {/* Form */}
                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            leftIcon={<User className="w-5 h-5" />}
                            required
                        />

                        <Input
                            label="Email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            leftIcon={<Mail className="w-5 h-5" />}
                            required
                        />

                        <div>
                            <Input
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                leftIcon={<Lock className="w-5 h-5" />}
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="hover:text-primary-500 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                }
                                required
                            />

                            {/* Password requirements */}
                            {formData.password && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="mt-3 space-y-2"
                                >
                                    {passwordRequirements.map((req) => (
                                        <div
                                            key={req.text}
                                            className={`flex items-center gap-2 text-sm ${req.met
                                                    ? "text-success-600 dark:text-success-400"
                                                    : "text-surface-200/50"
                                                }`}
                                        >
                                            <div
                                                className={`w-4 h-4 rounded-full flex items-center justify-center ${req.met
                                                        ? "bg-success-500"
                                                        : "border border-surface-300 dark:border-surface-800"
                                                    }`}
                                            >
                                                {req.met && <Check className="w-3 h-3 text-white" />}
                                            </div>
                                            {req.text}
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>

                        <Button type="submit" isLoading={isLoading} className="w-full">
                            Create account
                        </Button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-surface-200 dark:border-surface-800" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-white dark:bg-surface-900 text-surface-200/50">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <Button
                        type="button"
                        variant="secondary"
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full"
                    >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Continue with Google
                    </Button>

                    <p className="text-xs text-center text-surface-200/50 mt-6">
                        By creating an account, you agree to our{" "}
                        <Link href="/terms" className="text-primary-500 hover:underline">
                            Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary-500 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>

                <p className="text-center mt-6 text-surface-600 dark:text-surface-200/50">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="text-primary-600 hover:text-primary-700 dark:text-primary-400 font-medium"
                    >
                        Sign in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
