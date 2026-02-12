# DAY WIN - Project Documentation

## Table of Contents

1. [next.config.js](#next-config-js)
2. [package.json](#package-json)
3. [postcss.config.js](#postcss-config-js)
4. [tailwind.config.ts](#tailwind-config-ts)
5. [tsconfig.json](#tsconfig-json)
6. [app/globals.css](#app-globals-css)
7. [app/layout.tsx](#app-layout-tsx)
8. [app/page.tsx](#app-page-tsx)
9. [app/(auth)/login/page.tsx](#app-(auth)-login-page-tsx)
10. [app/(auth)/signup/page.tsx](#app-(auth)-signup-page-tsx)
11. [app/api/auth/register/route.ts](#app-api-auth-register-route-ts)
12. [app/api/auth/[...nextauth]/route.ts](#app-api-auth-[---nextauth]-route-ts)
13. [app/api/habits/route.ts](#app-api-habits-route-ts)
14. [app/api/habits/[id]/route.ts](#app-api-habits-[id]-route-ts)
15. [app/api/habits/[id]/complete/route.ts](#app-api-habits-[id]-complete-route-ts)
16. [app/api/logs/route.ts](#app-api-logs-route-ts)
17. [app/api/stats/route.ts](#app-api-stats-route-ts)
18. [app/dashboard/layout.tsx](#app-dashboard-layout-tsx)
19. [app/dashboard/page.tsx](#app-dashboard-page-tsx)
20. [app/dashboard/calendar/page.tsx](#app-dashboard-calendar-page-tsx)
21. [app/dashboard/habits/page.tsx](#app-dashboard-habits-page-tsx)
22. [app/dashboard/settings/page.tsx](#app-dashboard-settings-page-tsx)
23. [app/dashboard/stats/page.tsx](#app-dashboard-stats-page-tsx)
24. [components/brand/DailyWinLogo.tsx](#components-brand-dailywinlogo-tsx)
25. [components/dashboard/DailyProgress.tsx](#components-dashboard-dailyprogress-tsx)
26. [components/dashboard/MotivationalQuote.tsx](#components-dashboard-motivationalquote-tsx)
27. [components/dashboard/QuickStats.tsx](#components-dashboard-quickstats-tsx)
28. [components/dashboard/WeeklyChart.tsx](#components-dashboard-weeklychart-tsx)
29. [components/habits/HabitCard.tsx](#components-habits-habitcard-tsx)
30. [components/habits/HabitForm.tsx](#components-habits-habitform-tsx)
31. [components/habits/HabitList.tsx](#components-habits-habitlist-tsx)
32. [components/landing/CtaFooter.tsx](#components-landing-ctafooter-tsx)
33. [components/landing/FeatureRow.tsx](#components-landing-featurerow-tsx)
34. [components/landing/Hero.tsx](#components-landing-hero-tsx)
35. [components/landing/Testimonials.tsx](#components-landing-testimonials-tsx)
36. [components/layout/Header.tsx](#components-layout-header-tsx)
37. [components/layout/Navbar.tsx](#components-layout-navbar-tsx)
38. [components/ui/Badge.tsx](#components-ui-badge-tsx)
39. [components/ui/Button.tsx](#components-ui-button-tsx)
40. [components/ui/Card.tsx](#components-ui-card-tsx)
41. [components/ui/Input.tsx](#components-ui-input-tsx)
42. [components/ui/Modal.tsx](#components-ui-modal-tsx)
43. [components/ui/ProgressRing.tsx](#components-ui-progressring-tsx)
44. [hooks/useHabits.ts](#hooks-usehabits-ts)
45. [lib/auth.ts](#lib-auth-ts)
46. [lib/confetti.ts](#lib-confetti-ts)
47. [lib/mongodb-client.ts](#lib-mongodb-client-ts)
48. [lib/mongodb.ts](#lib-mongodb-ts)
49. [lib/utils.ts](#lib-utils-ts)
50. [models/Habit.ts](#models-habit-ts)
51. [models/HabitLog.ts](#models-habitlog-ts)
52. [models/User.ts](#models-user-ts)
53. [providers/index.tsx](#providers-index-tsx)
54. [providers/theme-provider.tsx](#providers-theme-provider-tsx)
55. [types/index.ts](#types-index-ts)

---

## next.config.js

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com"],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
    },
};

module.exports = nextConfig;

```

---

## package.json

```json
{
    "name": "day-win",
    "version": "1.0.0",
    "private": true,
    "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
    },
    "dependencies": {
        "@auth/mongodb-adapter": "^2.6.0",
        "@radix-ui/react-dialog": "^1.1.15",
        "@radix-ui/react-dropdown-menu": "^2.1.16",
        "@radix-ui/react-select": "^2.2.6",
        "@radix-ui/react-switch": "^1.2.6",
        "@radix-ui/react-tabs": "^1.1.13",
        "bcryptjs": "^2.4.3",
        "canvas-confetti": "^1.9.4",
        "clsx": "^2.1.1",
        "date-fns": "^3.6.0",
        "framer-motion": "^11.18.2",
        "lucide-react": "^0.323.0",
        "mongoose": "^8.22.0",
        "next": "^14.2.0",
        "next-auth": "^5.0.0-beta.4",
        "next-themes": "^0.4.6",
        "react": "^18.2.0",
        "react-circular-progressbar": "^2.2.0",
        "react-dom": "^18.2.0",
        "react-hot-toast": "^2.6.0",
        "recharts": "^2.15.4",
        "tailwind-merge": "^2.6.1",
        "zustand": "^4.5.7"
    },
    "devDependencies": {
        "@types/bcryptjs": "^2.4.6",
        "@types/canvas-confetti": "^1.9.0",
        "@types/node": "^20.11.16",
        "@types/react": "^18.2.52",
        "@types/react-dom": "^18.2.18",
        "autoprefixer": "^10.4.17",
        "eslint": "^8.56.0",
        "eslint-config-next": "14.1.0",
        "postcss": "^8.4.34",
        "tailwindcss": "^3.4.1",
        "typescript": "^5.3.3"
    }
}

```

---

## postcss.config.js

```javascript
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}

```

---

## tailwind.config.ts

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: "class",
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary palette - Vibrant purple to blue gradient
                primary: {
                    50: "#faf5ff",
                    100: "#f3e8ff",
                    200: "#e9d5ff",
                    300: "#d8b4fe",
                    400: "#c084fc",
                    500: "#a855f7",
                    600: "#9333ea",
                    700: "#7c3aed",
                    800: "#6b21a8",
                    900: "#581c87",
                },
                // Secondary - Warm coral/orange
                secondary: {
                    50: "#fff7ed",
                    100: "#ffedd5",
                    200: "#fed7aa",
                    300: "#fdba74",
                    400: "#fb923c",
                    500: "#f97316",
                    600: "#ea580c",
                    700: "#c2410c",
                    800: "#9a3412",
                    900: "#7c2d12",
                },
                // Accent - Teal/Cyan
                accent: {
                    50: "#ecfeff",
                    100: "#cffafe",
                    200: "#a5f3fc",
                    300: "#67e8f9",
                    400: "#22d3ee",
                    500: "#06b6d4",
                    600: "#0891b2",
                    700: "#0e7490",
                    800: "#155e75",
                    900: "#164e63",
                },
                // Success - Green
                success: {
                    50: "#f0fdf4",
                    100: "#dcfce7",
                    200: "#bbf7d0",
                    300: "#86efac",
                    400: "#4ade80",
                    500: "#22c55e",
                    600: "#16a34a",
                    700: "#15803d",
                    800: "#166534",
                    900: "#14532d",
                },
                // Surface colors for cards/backgrounds
                surface: {
                    50: "#fafafa",
                    100: "#f4f4f5",
                    200: "#e4e4e7",
                    300: "#d4d4d8",
                    400: "#a1a1aa",
                    500: "#71717a",
                    600: "#52525b",
                    700: "#3f3f46",
                    800: "#27272a",
                    900: "#18181b",
                    950: "#09090b",
                },
            },
            fontFamily: {
                sans: ["var(--font-inter)", "system-ui", "sans-serif"],
                display: ["var(--font-cabinet)", "var(--font-inter)", "system-ui"],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-gradient":
                    "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
                "card-gradient":
                    "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                "mesh-gradient":
                    "radial-gradient(at 40% 20%, hsla(280,100%,74%,0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,0.3) 0px, transparent 50%)",
            },
            boxShadow: {
                glow: "0 0 40px rgba(168, 85, 247, 0.4)",
                "glow-sm": "0 0 20px rgba(168, 85, 247, 0.3)",
                "card": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
                "card-hover": "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            },
            animation: {
                "fade-in": "fadeIn 0.5s ease-out",
                "slide-up": "slideUp 0.5s ease-out",
                "slide-down": "slideDown 0.3s ease-out",
                "scale-in": "scaleIn 0.2s ease-out",
                "bounce-in": "bounceIn 0.6s ease-out",
                "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                "gradient": "gradient 8s ease infinite",
                "float": "float 6s ease-in-out infinite",
                "shimmer": "shimmer 2s linear infinite",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                slideUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                slideDown: {
                    "0%": { opacity: "0", transform: "translateY(-10px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                scaleIn: {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                bounceIn: {
                    "0%": { opacity: "0", transform: "scale(0.3)" },
                    "50%": { transform: "scale(1.05)" },
                    "70%": { transform: "scale(0.9)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
                gradient: {
                    "0%, 100%": { backgroundPosition: "0% 50%" },
                    "50%": { backgroundPosition: "100% 50%" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "-200% 0" },
                    "100%": { backgroundPosition: "200% 0" },
                },
            },
            borderRadius: {
                "4xl": "2rem",
                "5xl": "2.5rem",
            },
        },
    },
    plugins: [],
};

export default config;

```

---

## tsconfig.json

```json
{
    "compilerOptions": {
        "lib": [
            "dom",
            "dom.iterable",
            "esnext"
        ],
        "allowJs": true,
        "skipLibCheck": true,
        "strict": true,
        "noEmit": true,
        "esModuleInterop": true,
        "module": "esnext",
        "moduleResolution": "bundler",
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "preserve",
        "incremental": true,
        "plugins": [
            {
                "name": "next"
            }
        ],
        "paths": {
            "@/*": [
                "./*"
            ]
        }
    },
    "include": [
        "next-env.d.ts",
        "**/*.ts",
        "**/*.tsx",
        ".next/types/**/*.ts"
    ],
    "exclude": [
        "node_modules",
        "day-win"
    ]
}

```

---

## app/globals.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

:root {
    --font-inter: 'Inter', system-ui, sans-serif;

    /* Custom properties for theming */
    --background: 250 250 250;
    --foreground: 9 9 11;
    --card: 255 255 255;
    --card-foreground: 9 9 11;
    --primary: 168 85 247;
    --primary-foreground: 255 255 255;
    --secondary: 249 115 22;
    --muted: 244 244 245;
    --muted-foreground: 113 113 122;
    --border: 228 228 231;
    --ring: 168 85 247;
    --radius: 1rem;
}

.dark {
    --background: 9 9 11;
    --foreground: 250 250 250;
    --card: 24 24 27;
    --card-foreground: 250 250 250;
    --muted: 39 39 42;
    --muted-foreground: 161 161 170;
    --border: 39 39 42;
}

* {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: var(--font-inter);
    background: rgb(var(--background));
    color: rgb(var(--foreground));
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar */
::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgb(var(--muted-foreground) / 0.3);
    border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgb(var(--muted-foreground) / 0.5);
}

/* Utility classes */
@layer utilities {
    .text-gradient {
        @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500;
    }

    .text-gradient-primary {
        @apply bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600;
    }

    .bg-glass {
        @apply bg-white/70 dark:bg-surface-900/70 backdrop-blur-xl;
    }

    .bg-glass-strong {
        @apply bg-white/90 dark:bg-surface-900/90 backdrop-blur-2xl;
    }

    .border-glass {
        @apply border border-white/20 dark:border-white/10;
    }

    .shadow-glass {
        @apply shadow-xl shadow-black/5 dark:shadow-black/20;
    }

    .card-interactive {
        @apply bg-white dark:bg-surface-900 rounded-2xl border border-surface-200 dark:border-surface-800 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1;
    }

    .btn-primary {
        @apply bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-primary-500/25 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed;
    }

    .btn-secondary {
        @apply bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-800/80 text-surface-900 dark:text-white font-medium px-6 py-3 rounded-xl border border-surface-200 dark:border-surface-800 transition-all duration-300 active:scale-[0.98];
    }

    .btn-ghost {
        @apply hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-600 dark:text-surface-200 font-medium px-4 py-2 rounded-xl transition-all duration-300;
    }

    .input-field {
        @apply w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-800 bg-white dark:bg-surface-900 text-surface-900 dark:text-white placeholder:text-surface-200/50 dark:placeholder:text-surface-200/30 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300;
    }

    .habit-card {
        @apply relative overflow-hidden rounded-2xl p-5 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-800 shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer hover:-translate-y-0.5 active:scale-[0.99];
    }

    .gradient-border {
        @apply relative;
        background: linear-gradient(white, white) padding-box,
            linear-gradient(135deg, #a855f7, #06b6d4, #f97316) border-box;
        border: 2px solid transparent;
    }

    .dark .gradient-border {
        background: linear-gradient(#18181b, #18181b) padding-box,
            linear-gradient(135deg, #a855f7, #06b6d4, #f97316) border-box;
    }

    /* Animation utilities */
    .animate-in {
        animation: fadeIn 0.5s ease-out forwards;
    }

    .stagger-1 {
        animation-delay: 0.1s;
    }

    .stagger-2 {
        animation-delay: 0.2s;
    }

    .stagger-3 {
        animation-delay: 0.3s;
    }

    .stagger-4 {
        animation-delay: 0.4s;
    }

    .stagger-5 {
        animation-delay: 0.5s;
    }

    /* Checkbox custom styles */
    .habit-checkbox {
        @apply w-7 h-7 rounded-lg border-2 border-surface-300 dark:border-surface-800 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-primary-400 hover:scale-110 active:scale-95;
    }

    .habit-checkbox.completed {
        @apply bg-gradient-to-br from-success-400 to-success-500 border-success-500 shadow-lg shadow-success-500/30;
    }

    /* Progress ring animation */
    .progress-ring {
        transition: stroke-dashoffset 0.5s ease-out;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
    }

    /* Streak fire effect */
    .streak-fire {
        @apply relative;
    }

    .streak-fire::after {
        content: '🔥';
        @apply absolute -top-1 -right-1 text-lg animate-bounce-in;
    }
}

/* Page transitions */
@layer components {
    .page-container {
        @apply min-h-screen pb-24 md:pb-8 px-4 md:px-8 pt-6;
    }

    .page-header {
        @apply mb-8 rounded-2xl border border-black/10 bg-white/85 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5;
    }

    .page-title {
        @apply text-3xl md:text-4xl font-black tracking-tight text-black dark:text-white;
    }

    .page-subtitle {
        @apply text-black/60 dark:text-white/60 mt-2;
    }

    .section-title {
        @apply text-xl font-semibold text-black dark:text-white mb-4;
    }

    .card {
        @apply rounded-2xl border border-black/10 bg-white/90 p-6 shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl dark:border-white/10 dark:bg-white/5 dark:shadow-[0_14px_44px_rgba(0,0,0,0.32)];
    }

    .card-header {
        @apply flex items-center justify-between mb-4;
    }

    .card-title {
        @apply text-lg font-semibold text-black dark:text-white;
    }
}

/* Confetti canvas */
#confetti-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 9999;
}

/* Toast customization */
.toast-custom {
    @apply bg-white dark:bg-surface-900 text-surface-900 dark:text-white border border-surface-200 dark:border-surface-800 shadow-xl rounded-xl;
}

```

---

## app/layout.tsx

```tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/providers";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
    title: "Day Win - Build Better Habits",
    description: "Track your habits, build streaks, and become your best self with Day Win.",
    keywords: ["habit tracker", "productivity", "self improvement", "daily habits"],
    authors: [{ name: "Day Win" }],
    manifest: "/manifest.json",
};

export const viewport: Viewport = {
    themeColor: [
        { media: "(prefers-color-scheme: light)", color: "#ffffff" },
        { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${inter.variable} font-sans antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}

```

---

## app/page.tsx

```tsx
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Hero } from "@/components/landing/Hero";
import { FeatureRow } from "@/components/landing/FeatureRow";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaFooter } from "@/components/landing/CtaFooter";
import winTheDayImage from "@/assets/win-the-day.jpg";

export default async function LandingPage() {
    const session = await auth();

    if (session) {
        redirect("/dashboard");
    }

    return (
        <main className="min-h-screen bg-white">
            <Hero />

            <FeatureRow
                category="WIN THE DAY"
                title="Transform Your Habits. Transform Your Life."
                description="Day Win helps you build lasting consistency through visual progress, smart notifications, and streak milestones. Turn your goals into effortless everyday actions."
                imageSrc={winTheDayImage}
            />

            <FeatureRow
                category="ANALYTICS & INSIGHTS"
                title="Visualize Your Success"
                description="See exactly how far you've come with intuitive charts and detailed habit strength metrics. Knowledge is the key to maintaining your momentum."
                imageSrc="/trends-phone.png"
                reverse={true}
            />

            <Testimonials />

            <CtaFooter />
        </main>
    );
}


```

---

## app/(auth)/login/page.tsx

```tsx
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
                email: formData.email.trim().toLowerCase(),
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

                </section>
            </div>
        </div>
    );
}

```

---

## app/(auth)/signup/page.tsx

```tsx
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

```

---

## app/api/auth/register/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
    try {
        const { name, email, password } = await req.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        await dbConnect();

        const existingUser = await User.findOne({ email: email.toLowerCase() });

        if (existingUser) {
            return NextResponse.json(
                { error: "Email already registered" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
        });

        return NextResponse.json(
            {
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}

```

---

## app/api/auth/[...nextauth]/route.ts

```typescript
import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers;

```

---

## app/api/habits/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay } from "date-fns";

// GET all habits for user
export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const habits = await Habit.find({
            userId: session.user.id,
            isArchived: false,
        }).sort({ order: 1, createdAt: -1 });

        // Get today's logs
        const today = new Date();
        const logs = await HabitLog.find({
            userId: session.user.id,
            date: {
                $gte: startOfDay(today),
                $lte: endOfDay(today),
            },
        });

        const habitsWithLogs = habits.map((habit) => {
            const todayLog = logs.find(
                (log) => log.habitId.toString() === habit._id.toString()
            );
            return {
                ...habit.toObject(),
                todayLog: todayLog?.toObject() || null,
            };
        });

        return NextResponse.json({ habits: habitsWithLogs });
    } catch (error) {
        console.error("Error fetching habits:", error);
        return NextResponse.json(
            { error: "Failed to fetch habits" },
            { status: 500 }
        );
    }
}

// CREATE new habit
export async function POST(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        await dbConnect();

        // Get the highest order number
        const lastHabit = await Habit.findOne({ userId: session.user.id }).sort({
            order: -1,
        });

        const habit = await Habit.create({
            ...body,
            userId: session.user.id,
            order: lastHabit ? lastHabit.order + 1 : 0,
        });

        return NextResponse.json({ habit }, { status: 201 });
    } catch (error) {
        console.error("Error creating habit:", error);
        return NextResponse.json(
            { error: "Failed to create habit" },
            { status: 500 }
        );
    }
}

```

---

## app/api/habits/[id]/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";

// GET single habit
export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const habit = await Habit.findOne({
            _id: params.id,
            userId: session.user.id,
        });

        if (!habit) {
            return NextResponse.json({ error: "Habit not found" }, { status: 404 });
        }

        return NextResponse.json({ habit });
    } catch (error) {
        console.error("Error fetching habit:", error);
        return NextResponse.json(
            { error: "Failed to fetch habit" },
            { status: 500 }
        );
    }
}

// UPDATE habit
export async function PATCH(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();

        await dbConnect();

        const habit = await Habit.findOneAndUpdate(
            { _id: params.id, userId: session.user.id },
            { $set: body },
            { new: true }
        );

        if (!habit) {
            return NextResponse.json({ error: "Habit not found" }, { status: 404 });
        }

        return NextResponse.json({ habit });
    } catch (error) {
        console.error("Error updating habit:", error);
        return NextResponse.json(
            { error: "Failed to update habit" },
            { status: 500 }
        );
    }
}

// DELETE habit
export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const habit = await Habit.findOneAndDelete({
            _id: params.id,
            userId: session.user.id,
        });

        if (!habit) {
            return NextResponse.json({ error: "Habit not found" }, { status: 404 });
        }

        // Also delete all logs for this habit
        await HabitLog.deleteMany({ habitId: params.id });

        return NextResponse.json({ message: "Habit deleted successfully" });
    } catch (error) {
        console.error("Error deleting habit:", error);
        return NextResponse.json(
            { error: "Failed to delete habit" },
            { status: 500 }
        );
    }
}

```

---

## app/api/habits/[id]/complete/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay, differenceInDays } from "date-fns";

export async function POST(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { completed, count, note, date } = await req.json();
        const targetDate = date ? new Date(date) : new Date();

        await dbConnect();

        // Find or create log for the day
        let log = await HabitLog.findOne({
            habitId: params.id,
            userId: session.user.id,
            date: {
                $gte: startOfDay(targetDate),
                $lte: endOfDay(targetDate),
            },
        });

        if (log) {
            log.completed = completed;
            log.count = count ?? log.count;
            log.note = note ?? log.note;
            log.completedAt = completed ? new Date() : undefined;
            await log.save();
        } else {
            log = await HabitLog.create({
                habitId: params.id,
                userId: session.user.id,
                date: startOfDay(targetDate),
                completed,
                count: count ?? 1,
                note,
                completedAt: completed ? new Date() : undefined,
            });
        }

        // Update habit streak
        const habit = await Habit.findById(params.id);

        if (habit && completed) {
            const lastCompleted = habit.streak.lastCompletedDate;
            const today = startOfDay(new Date());
            const targetDay = startOfDay(targetDate);

            // Only update streak if completing for today or yesterday
            if (targetDay.getTime() >= today.getTime() - 86400000) {
                if (!lastCompleted) {
                    habit.streak.current = 1;
                } else {
                    const daysSinceLastCompletion = differenceInDays(
                        targetDay,
                        startOfDay(new Date(lastCompleted))
                    );

                    if (daysSinceLastCompletion === 1) {
                        habit.streak.current += 1;
                    } else if (daysSinceLastCompletion > 1) {
                        habit.streak.current = 1;
                    }
                    // If 0, already completed today, don't change
                }

                habit.streak.lastCompletedDate = targetDate;

                if (habit.streak.current > habit.streak.longest) {
                    habit.streak.longest = habit.streak.current;
                }

                await habit.save();
            }
        } else if (habit && !completed) {
            // Handle uncomplete
            const targetDay = startOfDay(targetDate);
            const lastCompleted = habit.streak.lastCompletedDate;

            if (lastCompleted && startOfDay(new Date(lastCompleted)).getTime() === targetDay.getTime()) {
                // Find the previous completion
                const previousLog = await HabitLog.findOne({
                    habitId: params.id,
                    completed: true,
                    date: { $lt: targetDay },
                }).sort({ date: -1 });

                if (previousLog) {
                    habit.streak.lastCompletedDate = previousLog.date;
                    // Recalculate streak would be complex, simplify for now
                    habit.streak.current = Math.max(0, habit.streak.current - 1);
                } else {
                    habit.streak.current = 0;
                    habit.streak.lastCompletedDate = undefined;
                }

                await habit.save();
            }
        }

        return NextResponse.json({
            log,
            streak: habit?.streak,
        });
    } catch (error) {
        console.error("Error completing habit:", error);
        return NextResponse.json(
            { error: "Failed to complete habit" },
            { status: 500 }
        );
    }
}

```

---

## app/api/logs/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay, subDays } from "date-fns";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const habitId = searchParams.get("habitId");
        const startDate = searchParams.get("startDate");
        const endDate = searchParams.get("endDate");
        const days = searchParams.get("days");

        await dbConnect();

        const query: any = { userId: session.user.id };

        if (habitId) {
            query.habitId = habitId;
        }

        if (startDate && endDate) {
            query.date = {
                $gte: startOfDay(new Date(startDate)),
                $lte: endOfDay(new Date(endDate)),
            };
        } else if (days) {
            query.date = {
                $gte: startOfDay(subDays(new Date(), parseInt(days))),
                $lte: endOfDay(new Date()),
            };
        }

        const logs = await HabitLog.find(query).sort({ date: -1 });

        return NextResponse.json({ logs });
    } catch (error) {
        console.error("Error fetching logs:", error);
        return NextResponse.json(
            { error: "Failed to fetch logs" },
            { status: 500 }
        );
    }
}

```

---

## app/api/stats/route.ts

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay, subDays, format } from "date-fns";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const today = new Date();
        const thirtyDaysAgo = subDays(today, 30);
        const sevenDaysAgo = subDays(today, 7);

        // Get all habits
        const habits = await Habit.find({
            userId: session.user.id,
            isArchived: false,
        });

        // Get logs for the last 30 days
        const logs = await HabitLog.find({
            userId: session.user.id,
            date: {
                $gte: startOfDay(thirtyDaysAgo),
                $lte: endOfDay(today),
            },
        });

        // Calculate statistics
        const totalHabits = habits.length;
        const completedToday = logs.filter(
            (log) =>
                log.completed &&
                log.date >= startOfDay(today) &&
                log.date <= endOfDay(today)
        ).length;

        // Current streak (days with at least one completion)
        let currentStreak = 0;
        for (let i = 0; i <= 365; i++) {
            const date = subDays(today, i);
            const dayLogs = logs.filter(
                (log) =>
                    log.completed &&
                    log.date >= startOfDay(date) &&
                    log.date <= endOfDay(date)
            );
            if (dayLogs.length > 0) {
                currentStreak++;
            } else if (i > 0) {
                break;
            }
        }

        // Longest streak from habits
        const longestStreak = Math.max(
            ...habits.map((h) => h.streak.longest),
            0
        );

        // Total completions
        const totalCompletions = logs.filter((log) => log.completed).length;

        // Weekly completion rate
        const weeklyLogs = logs.filter((log) => log.date >= startOfDay(sevenDaysAgo));
        const weeklyCompleted = weeklyLogs.filter((log) => log.completed).length;
        const weeklyTotal = habits.length * 7;
        const weeklyCompletionRate = weeklyTotal > 0
            ? Math.round((weeklyCompleted / weeklyTotal) * 100)
            : 0;

        // Daily completion data for chart
        const dailyData = [];
        for (let i = 6; i >= 0; i--) {
            const date = subDays(today, i);
            const dayLogs = logs.filter(
                (log) =>
                    log.date >= startOfDay(date) &&
                    log.date <= endOfDay(date)
            );
            const completed = dayLogs.filter((log) => log.completed).length;
            dailyData.push({
                date: format(date, "EEE"),
                completed,
                total: habits.length,
                percentage: habits.length > 0 ? Math.round((completed / habits.length) * 100) : 0,
            });
        }

        // Best performing habits
        const habitStats = await Promise.all(
            habits.map(async (habit) => {
                const habitLogs = logs.filter(
                    (log) => log.habitId.toString() === habit._id.toString()
                );
                const completed = habitLogs.filter((log) => log.completed).length;
                return {
                    id: habit._id,
                    title: habit.title,
                    icon: habit.icon,
                    color: habit.color,
                    completionRate: habitLogs.length > 0
                        ? Math.round((completed / habitLogs.length) * 100)
                        : 0,
                    streak: habit.streak.current,
                };
            })
        );

        const topHabits = habitStats
            .sort((a, b) => b.completionRate - a.completionRate)
            .slice(0, 5);

        return NextResponse.json({
            overview: {
                totalHabits,
                completedToday,
                currentStreak,
                longestStreak,
                totalCompletions,
                weeklyCompletionRate,
            },
            dailyData,
            topHabits,
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}

```

---

## app/dashboard/layout.tsx

```tsx
﻿import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f3f5f8] dark:bg-[#04070f]">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_14%_12%,rgba(0,0,0,0.06),transparent_35%),radial-gradient(circle_at_85%_88%,rgba(0,0,0,0.08),transparent_35%)] dark:opacity-30 dark:[background:radial-gradient(circle_at_14%_12%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_85%_88%,rgba(255,255,255,0.06),transparent_35%)]" />
            <Navbar />
            <main className="relative md:ml-72 min-h-screen pb-24 md:pb-8">
                {children}
            </main>
        </div>
    );
}


```

---

## app/dashboard/page.tsx

```tsx
﻿"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { DailyProgress } from "@/components/dashboard/DailyProgress";
import { WeeklyChart } from "@/components/dashboard/WeeklyChart";
import { MotivationalQuote } from "@/components/dashboard/MotivationalQuote";
import { HabitList } from "@/components/habits/HabitList";
import { useHabits } from "@/hooks/useHabits";
import { Loader2, Plus, BarChart3 } from "lucide-react";

export default function DashboardPage() {
    const { habits, isLoading, fetchHabits } = useHabits();

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const completedCount = habits.filter((h) => h.todayLog?.completed).length;
    const totalCount = habits.length;

    const weeklyData = [
        { date: "Mon", completed: 4, total: 5, percentage: 80 },
        { date: "Tue", completed: 5, total: 5, percentage: 100 },
        { date: "Wed", completed: 3, total: 5, percentage: 60 },
        { date: "Thu", completed: 5, total: 5, percentage: 100 },
        { date: "Fri", completed: 4, total: 5, percentage: 80 },
        { date: "Sat", completed: 2, total: 5, percentage: 40 },
        { date: "Sun", completed: completedCount, total: totalCount, percentage: totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0 },
    ];

    const currentStreak = Math.max(...habits.map((h) => h.streak?.current || 0), 0);
    const longestStreak = Math.max(...habits.map((h) => h.streak?.longest || 0), 0);

    if (isLoading && habits.length === 0) {
        return (
            <div className="page-container flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-black dark:text-white" />
            </div>
        );
    }

    return (
        <div className="page-container">
            <Header />

            <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Active Habits</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{totalCount}</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Completed Today</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{completedCount}</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Completion Rate</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0}%</p>
                </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-3">
                <Link href="/dashboard/habits" className="inline-flex items-center gap-2 rounded-xl border border-black bg-black px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black dark:border-white dark:bg-white dark:text-black dark:hover:bg-black dark:hover:text-white">
                    <Plus className="h-4 w-4" />
                    New Habit
                </Link>
                <Link href="/dashboard/stats" className="inline-flex items-center gap-2 rounded-xl border border-black/25 px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] text-black transition hover:border-black dark:border-white/25 dark:text-white dark:hover:border-white">
                    <BarChart3 className="h-4 w-4" />
                    View Analytics
                </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <DailyProgress
                        completed={completedCount}
                        total={totalCount}
                        currentStreak={currentStreak}
                        longestStreak={longestStreak}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <h2 className="section-title">Today&apos;s Habits</h2>
                        <HabitList />
                    </motion.div>
                </div>

                <div className="space-y-6">
                    <MotivationalQuote />
                    <WeeklyChart data={weeklyData} />
                </div>
            </div>
        </div>
    );
}


```

---

## app/dashboard/calendar/page.tsx

```tsx
﻿"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameMonth,
    isSameDay,
    addMonths,
    subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHabits } from "@/hooks/useHabits";
import { Button } from "@/components/ui/Button";

export default function CalendarPage() {
    const { habits, fetchHabits } = useHabits();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logs, setLogs] = useState<any[]>([]);

    useEffect(() => {
        fetchHabits();
        fetchLogs();
    }, [currentMonth]);

    const fetchLogs = async () => {
        const start = startOfMonth(currentMonth);
        const end = endOfMonth(currentMonth);

        try {
            const response = await fetch(
                `/api/logs?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
            );
            const data = await response.json();
            setLogs(data.logs || []);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
        }
    };

    const renderHeader = () => (
        <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-surface-900 dark:text-white">
                {format(currentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center gap-2">
                <Button
                    variant="ghost"
                    onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                    variant="secondary"
                    onClick={() => setCurrentMonth(new Date())}
                >
                    Today
                </Button>
                <Button
                    variant="ghost"
                    onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                    <ChevronRight className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );

    const renderDays = () => {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return (
            <div className="grid grid-cols-7 mb-2">
                {days.map((day) => (
                    <div
                        key={day}
                        className="py-3 text-center text-sm font-semibold text-surface-200/50"
                    >
                        {day}
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const rows = [];
        let days = [];
        let day = startDate;

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
                const dayLogs = logs.filter((log) =>
                    isSameDay(new Date(log.date), day)
                );
                const completedCount = dayLogs.filter((log) => log.completed).length;
                const totalHabits = habits.length;
                const completionRate = totalHabits > 0 ? (completedCount / totalHabits) * 100 : 0;
                const cloneDay = day;
                const isToday = isSameDay(day, new Date());
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);

                days.push(
                    <motion.div
                        key={day.toString()}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedDate(cloneDay)}
                        className={cn(
                            "relative aspect-square p-2 cursor-pointer rounded-xl transition-all duration-300",
                            !isCurrentMonth && "opacity-30",
                            isSelected && "ring-2 ring-primary-500",
                            isToday && "bg-primary-50 dark:bg-primary-900/20"
                        )}
                    >
                        <div
                            className={cn(
                                "w-full h-full rounded-lg flex flex-col items-center justify-center",
                                completionRate === 100 && "bg-success-100 dark:bg-success-900/30",
                                completionRate > 0 && completionRate < 100 && "bg-yellow-100 dark:bg-yellow-900/30",
                                completionRate === 0 && totalHabits > 0 && dayLogs.length > 0 && "bg-red-100 dark:bg-red-900/30"
                            )}
                        >
                            <span
                                className={cn(
                                    "text-sm font-semibold",
                                    isToday
                                        ? "text-primary-600 dark:text-primary-400"
                                        : "text-surface-900 dark:text-white"
                                )}
                            >
                                {format(day, "d")}
                            </span>
                            {totalHabits > 0 && isCurrentMonth && (
                                <div className="mt-1 flex gap-0.5">
                                    {completionRate === 100 ? (
                                        <Check className="w-3 h-3 text-success-500" />
                                    ) : completionRate > 0 ? (
                                        <span className="text-[10px] text-yellow-600 dark:text-yellow-400">
                                            {Math.round(completionRate)}%
                                        </span>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </motion.div>
                );
                day = addDays(day, 1);
            }
            rows.push(
                <div key={day.toString()} className="grid grid-cols-7 gap-1">
                    {days}
                </div>
            );
            days = [];
        }
        return <div className="space-y-1">{rows}</div>;
    };

    const selectedDateLogs = logs.filter((log) =>
        isSameDay(new Date(log.date), selectedDate)
    );

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Calendar</h1>
                <p className="page-subtitle">Track completion patterns across every day and spot streak trends.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <div className="card p-6">
                        {renderHeader()}
                        {renderDays()}
                        {renderCells()}
                    </div>

                    {/* Legend */}
                    <div className="flex items-center justify-center gap-6 mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-success-100 dark:bg-success-900/30" />
                            <span className="text-sm text-surface-200/50">All complete</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-yellow-100 dark:bg-yellow-900/30" />
                            <span className="text-sm text-surface-200/50">Partial</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded bg-red-100 dark:bg-red-900/30" />
                            <span className="text-sm text-surface-200/50">None</span>
                        </div>
                    </div>
                </div>

                {/* Selected Date Details */}
                <div className="card p-6 h-fit sticky top-6">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">
                        {format(selectedDate, "EEEE, MMMM d")}
                    </h3>

                    {selectedDateLogs.length > 0 ? (
                        <div className="space-y-3">
                            {habits.map((habit) => {
                                const log = selectedDateLogs.find(
                                    (l) => l.habitId === habit._id
                                );
                                return (
                                    <div
                                        key={habit._id}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-surface-50 dark:bg-surface-800/50"
                                    >
                                        <div className="text-xl">{habit.icon}</div>
                                        <div className="flex-1">
                                            <p className="font-medium text-surface-900 dark:text-white">
                                                {habit.title}
                                            </p>
                                        </div>
                                        <div
                                            className={cn(
                                                "w-6 h-6 rounded-full flex items-center justify-center",
                                                log?.completed
                                                    ? "bg-success-500"
                                                    : "bg-surface-200 dark:bg-surface-800"
                                            )}
                                        >
                                            {log?.completed ? (
                                                <Check className="w-4 h-4 text-white" />
                                            ) : (
                                                <X className="w-4 h-4 text-surface-200/50" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-surface-200/50 text-center py-8">
                            {isSameDay(selectedDate, new Date())
                                ? "Start completing your habits!"
                                : "No activity on this day"}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}



```

---

## app/dashboard/habits/page.tsx

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, LayoutGrid, List, Sparkles, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { HabitCard } from "@/components/habits/HabitCard";
import { HabitForm } from "@/components/habits/HabitForm";
import { Modal } from "@/components/ui/Modal";
import { useHabits } from "@/hooks/useHabits";
import { habitCategories, Habit, HabitWithLog } from "@/types";
import { cn } from "@/lib/utils";

export default function HabitsPage() {
    const { habits, fetchHabits, addHabit, updateHabit, deleteHabit, completeHabit } = useHabits();
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    const filteredHabits = useMemo(() => {
        return habits.filter((habit) => {
            const matchesSearch = habit.title.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = !selectedCategory || habit.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [habits, searchQuery, selectedCategory]);

    const completedToday = habits.filter((h) => h.todayLog?.completed).length;
    const activeCount = habits.length;
    const completionRate = activeCount > 0 ? Math.round((completedToday / activeCount) * 100) : 0;
    const topStreak = Math.max(...habits.map((h) => h.streak?.current || 0), 0);

    const handleSubmit = async (data: Partial<Habit>) => {
        if (editingHabit) {
            await updateHabit(editingHabit._id, data);
        } else {
            await addHabit(data);
        }
        setShowForm(false);
        setEditingHabit(null);
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="page-title">My Habits</h1>
                        <p className="page-subtitle">A modern command center for your daily consistency system.</p>
                    </div>
                    <Button onClick={() => setShowForm(true)} leftIcon={<Plus className="w-5 h-5" />}>
                        Create Habit
                    </Button>
                </div>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Active Habits</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{activeCount}</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Completed Today</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{completedToday}</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Completion Rate</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{completionRate}%</p>
                </div>
                <div className="card p-4">
                    <p className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">Top Streak</p>
                    <p className="mt-2 text-3xl font-black text-black dark:text-white">{topStreak}</p>
                </div>
            </div>

            <div className="card mb-6 p-4 sm:p-5">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
                        <div className="flex-1">
                            <Input
                                placeholder="Search habits..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                leftIcon={<Search className="w-5 h-5" />}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setViewMode("list")}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition",
                                    viewMode === "list"
                                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                        : "border-black/20 text-black/60 hover:border-black dark:border-white/20 dark:text-white/60 dark:hover:border-white"
                                )}
                            >
                                <List className="h-4 w-4" />
                                List
                            </button>
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cn(
                                    "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition",
                                    viewMode === "grid"
                                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                        : "border-black/20 text-black/60 hover:border-black dark:border-white/20 dark:text-white/60 dark:hover:border-white"
                                )}
                            >
                                <LayoutGrid className="h-4 w-4" />
                                Grid
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={cn(
                                "rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition",
                                !selectedCategory
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/20 text-black/60 hover:border-black dark:border-white/20 dark:text-white/60 dark:hover:border-white"
                            )}
                        >
                            All
                        </button>
                        {habitCategories.slice(0, 6).map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setSelectedCategory(cat.value)}
                                className={cn(
                                    "rounded-lg border px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition",
                                    selectedCategory === cat.value
                                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                        : "border-black/20 text-black/60 hover:border-black dark:border-white/20 dark:text-white/60 dark:hover:border-white"
                                )}
                            >
                                {cat.icon} {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-black/55 dark:text-white/55">
                    Showing {filteredHabits.length} of {habits.length} habits
                </p>
                {(searchQuery || selectedCategory) && (
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setSelectedCategory(null);
                        }}
                        className="inline-flex items-center gap-2 rounded-lg border border-black/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-black/60 transition hover:border-black hover:text-black dark:border-white/20 dark:text-white/60 dark:hover:border-white dark:hover:text-white"
                    >
                        <RotateCcw className="h-3.5 w-3.5" />
                        Reset Filters
                    </button>
                )}
            </div>

            {filteredHabits.length > 0 ? (
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        viewMode === "grid" ? "grid gap-4 md:grid-cols-2 xl:grid-cols-3" : "space-y-3"
                    )}
                >
                    {filteredHabits.map((habit, index) => (
                        <HabitCard
                            key={habit._id}
                            habit={habit}
                            index={index}
                            onComplete={(completed) => completeHabit(habit._id, completed)}
                            onEdit={() => {
                                setEditingHabit(habit);
                                setShowForm(true);
                            }}
                            onDelete={() => deleteHabit(habit._id)}
                        />
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card py-16 text-center"
                >
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-black/15 text-black/60 dark:border-white/15 dark:text-white/60">
                        {searchQuery || selectedCategory ? <Search className="h-7 w-7" /> : <Sparkles className="h-7 w-7" />}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                        {searchQuery || selectedCategory ? "No matching habits" : "Start your first habit"}
                    </h3>
                    <p className="mx-auto max-w-md text-black/60 dark:text-white/60">
                        {searchQuery || selectedCategory
                            ? "Try a different keyword or category filter."
                            : "Create a habit and begin building streaks with daily actions."}
                    </p>
                    {!searchQuery && !selectedCategory && (
                        <div className="mt-6">
                            <Button onClick={() => setShowForm(true)} leftIcon={<CheckCircle2 className="w-5 h-5" />}>
                                Create Your First Habit
                            </Button>
                        </div>
                    )}
                </motion.div>
            )}

            <Modal
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditingHabit(null);
                }}
                title={editingHabit ? "Edit Habit" : "Create Habit"}
                size="lg"
            >
                <HabitForm
                    habit={editingHabit || undefined}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingHabit(null);
                    }}
                />
            </Modal>
        </div>
    );
}

```

---

## app/dashboard/settings/page.tsx

```tsx
﻿"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
    User,
    Bell,
    Palette,
    Shield,
    Download,
    LogOut,
    Sun,
    Moon,
    Monitor,
    ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

export default function SettingsPage() {
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState(session?.user?.name || "");

    const handleUpdateProfile = async () => {
        setIsLoading(true);
        try {
            // Update profile API call
            toast.success("Profile updated!");
        } catch (error) {
            toast.error("Failed to update profile");
        } finally {
            setIsLoading(false);
        }
    };

    const handleExportData = async () => {
        toast.success("Export started! Check your email.");
    };

    const themes = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
    ];

    return (
        <div className="page-container max-w-3xl">
            <div className="page-header">
                <h1 className="page-title">Settings</h1>
                <p className="page-subtitle">Control profile, theme, notifications, and data in one place.</p>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <User className="w-5 h-5 text-primary-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Profile
                        </h2>
                    </div>

                    <div className="flex items-center gap-6 mb-6">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white text-3xl font-bold">
                            {session?.user?.name?.[0] || "U"}
                        </div>
                        <div>
                            <p className="font-semibold text-surface-900 dark:text-white">
                                {session?.user?.name}
                            </p>
                            <p className="text-sm text-surface-200/50">
                                {session?.user?.email}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Input
                            label="Display Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                        />
                        <Button
                            onClick={handleUpdateProfile}
                            isLoading={isLoading}
                        >
                            Save Changes
                        </Button>
                    </div>
                </motion.div>

                {/* Appearance Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Palette className="w-5 h-5 text-primary-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Appearance
                        </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        {themes.map((t) => (
                            <button
                                key={t.value}
                                onClick={() => setTheme(t.value)}
                                className={cn(
                                    "flex flex-col items-center gap-3 p-4 rounded-xl border-2 transition-all",
                                    theme === t.value
                                        ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20"
                                        : "border-surface-200 dark:border-surface-800 hover:border-primary-300"
                                )}
                            >
                                <t.icon
                                    className={cn(
                                        "w-6 h-6",
                                        theme === t.value
                                            ? "text-primary-500"
                                            : "text-surface-200/50"
                                    )}
                                />
                                <span
                                    className={cn(
                                        "text-sm font-medium",
                                        theme === t.value
                                            ? "text-primary-600 dark:text-primary-400"
                                            : "text-surface-600 dark:text-surface-200/50"
                                    )}
                                >
                                    {t.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Notifications Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Bell className="w-5 h-5 text-primary-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Notifications
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: "Daily reminders", description: "Get reminded to complete your habits" },
                            { label: "Weekly summary", description: "Receive a weekly progress report" },
                            { label: "Streak alerts", description: "Be notified when your streak is at risk" },
                        ].map((item) => (
                            <div
                                key={item.label}
                                className="flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50"
                            >
                                <div>
                                    <p className="font-medium text-surface-900 dark:text-white">
                                        {item.label}
                                    </p>
                                    <p className="text-sm text-surface-200/50">
                                        {item.description}
                                    </p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked />
                                    <div className="w-11 h-6 bg-surface-200 dark:bg-surface-800 rounded-full peer peer-checked:bg-primary-500 after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                                </label>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Data Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card p-6"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Download className="w-5 h-5 text-primary-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Your Data
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={handleExportData}
                            className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                        >
                            <div className="text-left">
                                <p className="font-medium text-surface-900 dark:text-white">
                                    Export Data
                                </p>
                                <p className="text-sm text-surface-200/50">
                                    Download all your habit data as CSV
                                </p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-surface-200/50" />
                        </button>
                    </div>
                </motion.div>

                {/* Danger Zone */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card p-6 border-red-200 dark:border-red-900/50"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="w-5 h-5 text-red-500" />
                        <h2 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Account
                        </h2>
                    </div>

                    <Button
                        variant="danger"
                        onClick={() => signOut({ callbackUrl: "/" })}
                        leftIcon={<LogOut className="w-5 h-5" />}
                    >
                        Sign Out
                    </Button>
                </motion.div>
            </div>
        </div>
    );
}



```

---

## app/dashboard/stats/page.tsx

```tsx
﻿"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Area,
    AreaChart,
} from "recharts";
import { TrendingUp, Award, Target, Flame, Calendar, Zap } from "lucide-react";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { cn } from "@/lib/utils";

export default function StatsPage() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await fetch("/api/stats");
            const data = await response.json();
            setStats(data);
        } catch (error) {
            console.error("Failed to fetch stats:", error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="page-container flex items-center justify-center min-h-screen">
                <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-surface-900 px-4 py-3 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800">
                    <p className="font-semibold text-surface-900 dark:text-white">{label}</p>
                    <p className="text-sm text-primary-500">
                        {payload[0].value} completed
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Statistics</h1>
                <p className="page-subtitle">Deep performance metrics across habits, streaks, and consistency.</p>
            </div>

            {/* Overview Stats */}
            <QuickStats stats={stats?.overview || {}} />

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
                {/* Weekly Completion Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card p-6"
                >
                    <h3 className="card-title mb-6">Weekly Progress</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.dailyData || []}>
                                <defs>
                                    <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="date"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: "#71717a", fontSize: 12 }}
                                />
                                <YAxis hide />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="completed"
                                    stroke="#a855f7"
                                    strokeWidth={3}
                                    fill="url(#colorCompleted)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Completion Rate Pie Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card p-6"
                >
                    <h3 className="card-title mb-6">Completion Rate</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: "Completed", value: stats?.overview?.weeklyCompletionRate || 0 },
                                        { name: "Remaining", value: 100 - (stats?.overview?.weeklyCompletionRate || 0) },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="#a855f7" />
                                    <Cell fill="#e4e4e7" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute text-center">
                            <div className="text-4xl font-bold text-surface-900 dark:text-white">
                                {stats?.overview?.weeklyCompletionRate || 0}%
                            </div>
                            <div className="text-sm text-surface-200/50">This week</div>
                        </div>
                    </div>
                </motion.div>

                {/* Top Habits */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card p-6"
                >
                    <h3 className="card-title mb-6">Top Performing Habits</h3>
                    <div className="space-y-4">
                        {(stats?.topHabits || []).map((habit: any, index: number) => (
                            <div
                                key={habit.id}
                                className="flex items-center gap-4"
                            >
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-surface-100 dark:bg-surface-800 text-sm font-bold text-surface-600 dark:text-surface-200/50">
                                    {index + 1}
                                </div>
                                <div className="text-xl">{habit.icon}</div>
                                <div className="flex-1">
                                    <p className="font-medium text-surface-900 dark:text-white">
                                        {habit.title}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${habit.completionRate}%` }}
                                                transition={{ duration: 1, delay: index * 0.1 }}
                                                className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
                                            />
                                        </div>
                                        <span className="text-sm font-medium text-primary-500">
                                            {habit.completionRate}%
                                        </span>
                                    </div>
                                </div>
                                {habit.streak > 0 && (
                                    <div className="flex items-center gap-1 text-orange-500">
                                        <Flame className="w-4 h-4" />
                                        <span className="text-sm font-semibold">{habit.streak}</span>
                                    </div>
                                )}
                            </div>
                        ))}

                        {(!stats?.topHabits || stats.topHabits.length === 0) && (
                            <p className="text-center text-surface-200/50 py-8">
                                Complete some habits to see your stats!
                            </p>
                        )}
                    </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card p-6"
                >
                    <h3 className="card-title mb-6">Achievements</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            {
                                icon: "ðŸ”¥",
                                title: "On Fire",
                                description: "7 day streak",
                                unlocked: (stats?.overview?.currentStreak || 0) >= 7,
                            },
                            {
                                icon: "âš¡",
                                title: "Momentum",
                                description: "30 day streak",
                                unlocked: (stats?.overview?.longestStreak || 0) >= 30,
                            },
                            {
                                icon: "ðŸŽ¯",
                                title: "Focused",
                                description: "100% weekly",
                                unlocked: (stats?.overview?.weeklyCompletionRate || 0) === 100,
                            },
                            {
                                icon: "ðŸ†",
                                title: "Champion",
                                description: "100 completions",
                                unlocked: (stats?.overview?.totalCompletions || 0) >= 100,
                            },
                        ].map((achievement) => (
                            <div
                                key={achievement.title}
                                className={cn(
                                    "p-4 rounded-xl border-2 transition-all",
                                    achievement.unlocked
                                        ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20"
                                        : "border-surface-200 dark:border-surface-800 opacity-50"
                                )}
                            >
                                <div className="text-3xl mb-2">{achievement.icon}</div>
                                <p className="font-semibold text-surface-900 dark:text-white">
                                    {achievement.title}
                                </p>
                                <p className="text-sm text-surface-200/50">
                                    {achievement.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}



```

---

## components/brand/DailyWinLogo.tsx

```tsx
import { cn } from "@/lib/utils";

type DailyWinLogoProps = {
    className?: string;
    textClassName?: string;
    iconClassName?: string;
    label?: string;
};

export function DailyWinLogo({
    className,
    textClassName,
    iconClassName,
    label = "DAILY WIN",
}: DailyWinLogoProps) {
    return (
        <div className={cn("inline-flex items-center gap-2.5", className)}>
            <span
                className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#e8d774]",
                    iconClassName
                )}
                aria-hidden="true"
            >
                <svg viewBox="0 0 64 64" className="h-5 w-5" fill="none">
                    <g stroke="#000" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(45 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(90 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(135 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(180 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(225 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(270 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(315 32 32)" />
                    </g>
                </svg>
            </span>
            <span className={cn("text-xs font-bold uppercase tracking-[0.16em] text-white", textClassName)}>
                {label}
            </span>
        </div>
    );
}

```

---

## components/dashboard/DailyProgress.tsx

```tsx
﻿"use client";

import { motion } from "framer-motion";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Flame, Trophy, Target } from "lucide-react";

interface DailyProgressProps {
    completed: number;
    total: number;
    currentStreak: number;
    longestStreak: number;
}

export function DailyProgress({
    completed,
    total,
    currentStreak,
    longestStreak,
}: DailyProgressProps) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return (
        <div className="card">
            <div className="mb-5 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-black dark:text-white">Daily Progress</h3>
                <span className="rounded-full border border-black/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-black/60 dark:border-white/15 dark:text-white/60">
                    {completed}/{total} completed
                </span>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                    <ProgressRing progress={percentage} size={150} strokeWidth={11}>
                        <div className="text-center">
                            <motion.div
                                key={percentage}
                                initial={{ scale: 0.7, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-4xl font-black text-black dark:text-white"
                            >
                                {percentage}%
                            </motion.div>
                        </div>
                    </ProgressRing>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="mb-2 flex items-center gap-2 text-black/60 dark:text-white/60">
                            <Flame className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-[0.1em]">Current Streak</span>
                        </div>
                        <div className="text-3xl font-black text-black dark:text-white">{currentStreak}</div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                        <div className="mb-2 flex items-center gap-2 text-black/60 dark:text-white/60">
                            <Trophy className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-[0.1em]">Best Streak</span>
                        </div>
                        <div className="text-3xl font-black text-black dark:text-white">{longestStreak}</div>
                    </motion.div>

                    <motion.div whileHover={{ y: -2 }} className="col-span-2 rounded-xl border border-black/10 bg-black p-4 text-white dark:border-white/10 dark:bg-white dark:text-black">
                        <div className="mb-2 flex items-center gap-2 opacity-80">
                            <Target className="h-4 w-4" />
                            <span className="text-xs font-semibold uppercase tracking-[0.1em]">Today&apos;s Goal</span>
                        </div>
                        <div className="text-base font-semibold">
                            {completed} of {total} habits completed
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}


```

---

## components/dashboard/MotivationalQuote.tsx

```tsx
﻿"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";

const quotes = [
    { text: "Small daily improvements are the key to staggering long-term results.", author: "Unknown" },
    { text: "Excellence is not an act, but a habit.", author: "Aristotle" },
    { text: "The secret of your future is hidden in your daily routine.", author: "Mike Murdock" },
    { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier" },
    { text: "Habits are the compound interest of self-improvement.", author: "James Clear" },
];

export function MotivationalQuote() {
    const [quote, setQuote] = useState(quotes[0]);
    const [isChanging, setIsChanging] = useState(false);

    useEffect(() => {
        setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }, []);

    const changeQuote = () => {
        setIsChanging(true);
        setTimeout(() => {
            const newQuote = quotes[Math.floor(Math.random() * quotes.length)];
            setQuote(newQuote);
            setIsChanging(false);
        }, 220);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card relative overflow-hidden"
        >
            <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-black/65 dark:text-white/65">
                    <Sparkles className="h-4.5 w-4.5" />
                    <span className="text-xs font-semibold uppercase tracking-[0.12em]">Daily Motivation</span>
                </div>
                <button
                    onClick={changeQuote}
                    disabled={isChanging}
                    className="rounded-lg border border-black/15 p-2 text-black/70 transition hover:border-black hover:text-black dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
                    aria-label="Refresh quote"
                >
                    <RefreshCw className={`h-4 w-4 ${isChanging ? "animate-spin" : ""}`} />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={quote.text}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                >
                    <p className="text-lg font-semibold leading-relaxed text-black dark:text-white">
                        "{quote.text}"
                    </p>
                    <p className="mt-3 text-sm text-black/55 dark:text-white/55">- {quote.author}</p>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}


```

---

## components/dashboard/QuickStats.tsx

```tsx
﻿"use client";

import { motion } from "framer-motion";
import { TrendingUp, Calendar, Zap, Award } from "lucide-react";

interface QuickStatsProps {
    stats: {
        totalHabits: number;
        completedToday: number;
        weeklyCompletionRate: number;
        totalCompletions: number;
    };
}

export function QuickStats({ stats }: QuickStatsProps) {
    const statItems = [
        {
            label: "Total Habits",
            value: stats.totalHabits,
            icon: Calendar,
        },
        {
            label: "Done Today",
            value: stats.completedToday,
            icon: Zap,
        },
        {
            label: "Weekly Rate",
            value: `${stats.weeklyCompletionRate}%`,
            icon: TrendingUp,
        },
        {
            label: "All Time",
            value: stats.totalCompletions,
            icon: Award,
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {statItems.map((item, index) => (
                <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    whileHover={{ y: -3 }}
                    className="card p-4"
                >
                    <div className="mb-3 inline-flex rounded-lg border border-black/15 p-2 text-black dark:border-white/15 dark:text-white">
                        <item.icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="text-2xl font-black text-black dark:text-white">{item.value}</div>
                    <div className="text-xs uppercase tracking-[0.12em] text-black/55 dark:text-white/55">{item.label}</div>
                </motion.div>
            ))}
        </div>
    );
}


```

---

## components/dashboard/WeeklyChart.tsx

```tsx
"use client";

import { motion } from "framer-motion";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

interface WeeklyChartProps {
    data: {
        date: string;
        completed: number;
        total: number;
        percentage: number;
    }[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-surface-900 px-4 py-3 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800">
                    <p className="font-semibold text-surface-900 dark:text-white">{label}</p>
                    <p className="text-sm text-surface-200/50">
                        {payload[0].value} / {payload[0].payload.total} completed
                    </p>
                    <p className="text-sm font-medium text-primary-500">
                        {payload[0].payload.percentage}%
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
        >
            <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-6">
                This Week
            </h3>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} barSize={40}>
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#71717a", fontSize: 12 }}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} cursor={false} />
                        <Bar dataKey="completed" radius={[8, 8, 0, 0]}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        entry.percentage === 100
                                            ? "#22c55e"
                                            : entry.percentage >= 50
                                                ? "#a855f7"
                                                : entry.percentage > 0
                                                    ? "#f97316"
                                                    : "#e4e4e7"
                                    }
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success-500" />
                    <span className="text-xs text-surface-200/50">100%</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary-500" />
                    <span className="text-xs text-surface-200/50">50%+</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary-500" />
                    <span className="text-xs text-surface-200/50">&lt;50%</span>
                </div>
            </div>
        </motion.div>
    );
}

```

---

## components/habits/HabitCard.tsx

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MoreVertical, Flame, Edit, Trash2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import { fireSmallConfetti, fireStreakConfetti } from "@/lib/confetti";

interface HabitCardProps {
    habit: HabitWithLog;
    onComplete: (completed: boolean) => Promise<{ streak?: { current: number } }>;
    onEdit: () => void;
    onDelete: () => void;
    index: number;
}

export function HabitCard({
    habit,
    onComplete,
    onEdit,
    onDelete,
    index,
}: HabitCardProps) {
    const [isCompleted, setIsCompleted] = useState(habit.todayLog?.completed ?? false);
    const [isLoading, setIsLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showStreak, setShowStreak] = useState(false);

    const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;

    const handleComplete = async () => {
        if (isLoading) return;

        setIsLoading(true);
        const newCompleted = !isCompleted;
        setIsCompleted(newCompleted);

        try {
            const result = await onComplete(newCompleted);

            if (newCompleted) {
                fireSmallConfetti();

                // Check for streak milestone
                if (result.streak?.current && result.streak.current % 7 === 0) {
                    fireStreakConfetti();
                    setShowStreak(true);
                    setTimeout(() => setShowStreak(false), 3000);
                }
            }
        } catch (error) {
            setIsCompleted(!newCompleted);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="habit-card group"
        >
            {/* Streak celebration overlay */}
            <AnimatePresence>
                {showStreak && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-r from-orange-500/90 to-red-500/90 rounded-2xl z-10"
                    >
                        <div className="text-center text-white">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                                className="text-5xl mb-2"
                            >
                                🔥
                            </motion.div>
                            <p className="text-xl font-bold">{habit.streak.current} Day Streak!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-4">
                {/* Checkbox */}
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleComplete}
                    disabled={isLoading}
                    className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0",
                        "border-2 transition-all duration-300",
                        isCompleted
                            ? `bg-gradient-to-br ${colors.gradient} border-transparent shadow-lg`
                            : "border-surface-300 dark:border-surface-800 hover:border-primary-400"
                    )}
                >
                    <AnimatePresence mode="wait">
                        {isCompleted ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <Check className="w-6 h-6 text-white" strokeWidth={3} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="w-6 h-6"
                            />
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Icon */}
                <div
                    className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
                        colors.bg
                    )}
                >
                    {habit.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <h3
                        className={cn(
                            "font-semibold text-surface-900 dark:text-white transition-all duration-300",
                            isCompleted && "line-through opacity-60"
                        )}
                    >
                        {habit.title}
                    </h3>
                    <div className="flex items-center gap-3 mt-1">
                        {/* Category badge */}
                        <span className={cn("text-xs font-medium", colors.text)}>
                            {habit.category}
                        </span>

                        {/* Streak */}
                        {habit.streak.current > 0 && (
                            <div className="flex items-center gap-1 text-orange-500">
                                <Flame className="w-3.5 h-3.5" />
                                <span className="text-xs font-semibold">{habit.streak.current}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-surface-100 dark:hover:bg-surface-800 transition-all"
                    >
                        <MoreVertical className="w-5 h-5 text-surface-200/50" />
                    </button>

                    <AnimatePresence>
                        {showMenu && (
                            <>
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setShowMenu(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                    className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-surface-900 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800 z-20 overflow-hidden"
                                >
                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            onEdit();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    >
                                        <Edit className="w-4 h-4 text-surface-200/50" />
                                        <span className="text-surface-900 dark:text-white">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            onDelete();
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        <span>Delete</span>
                                    </button>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Progress bar for target count > 1 */}
            {habit.targetCount > 1 && (
                <div className="mt-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-surface-200/50">Progress</span>
                        <span className={colors.text}>
                            {habit.todayLog?.count ?? 0} / {habit.targetCount}
                        </span>
                    </div>
                    <div className="h-2 bg-surface-100 dark:bg-surface-800 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{
                                width: `${Math.min(((habit.todayLog?.count ?? 0) / habit.targetCount) * 100, 100)}%`,
                            }}
                            className={cn("h-full rounded-full bg-gradient-to-r", colors.gradient)}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    );
}

```

---

## components/habits/HabitForm.tsx

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
    Habit,
    HabitColor,
    HabitCategory,
    habitColors,
    habitIcons,
    habitCategories,
} from "@/types";

interface HabitFormProps {
    habit?: Partial<Habit>;
    onSubmit: (data: Partial<Habit>) => Promise<void>;
    onCancel: () => void;
}

const colorOptions: HabitColor[] = [
    "violet", "purple", "blue", "cyan", "teal", "green",
    "lime", "yellow", "orange", "red", "pink", "rose",
];

const frequencyOptions = [
    { value: "daily", label: "Every day" },
    { value: "weekly", label: "Specific days" },
    { value: "custom", label: "Custom" },
];

const daysOfWeek = [
    { value: 0, label: "S" },
    { value: 1, label: "M" },
    { value: 2, label: "T" },
    { value: 3, label: "W" },
    { value: 4, label: "T" },
    { value: 5, label: "F" },
    { value: 6, label: "S" },
];

export function HabitForm({ habit, onSubmit, onCancel }: HabitFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: habit?.title || "",
        description: habit?.description || "",
        icon: habit?.icon || "⭐",
        color: (habit?.color as HabitColor) || "purple",
        category: (habit?.category as HabitCategory) || "other",
        frequency: {
            type: habit?.frequency?.type || "daily",
            daysOfWeek: habit?.frequency?.daysOfWeek || [1, 2, 3, 4, 5],
            timesPerPeriod: habit?.frequency?.timesPerPeriod || 1,
            periodDays: habit?.frequency?.periodDays || 7,
        },
        targetCount: habit?.targetCount || 1,
    });

    const [showIconPicker, setShowIconPicker] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setIsLoading(true);
        try {
            await onSubmit(formData);
        } finally {
            setIsLoading(false);
        }
    };

    const toggleDay = (day: number) => {
        const days = formData.frequency.daysOfWeek || [];
        if (days.includes(day)) {
            setFormData({
                ...formData,
                frequency: {
                    ...formData.frequency,
                    daysOfWeek: days.filter((d) => d !== day),
                },
            });
        } else {
            setFormData({
                ...formData,
                frequency: {
                    ...formData.frequency,
                    daysOfWeek: [...days, day].sort(),
                },
            });
        }
    };

    const selectedColors = habitColors[formData.color];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Icon and Title */}
            <div className="flex gap-4">
                {/* Icon Picker */}
                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowIconPicker(!showIconPicker)}
                        className={cn(
                            "w-16 h-16 rounded-xl flex items-center justify-center text-3xl",
                            "border-2 border-dashed border-surface-300 dark:border-surface-800",
                            "hover:border-primary-400 transition-colors",
                            selectedColors.bg
                        )}
                    >
                        {formData.icon}
                    </button>

                    {showIconPicker && (
                        <>
                            <div
                                className="fixed inset-0 z-10"
                                onClick={() => setShowIconPicker(false)}
                            />
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute left-0 top-full mt-2 p-3 bg-white dark:bg-surface-900 rounded-xl shadow-xl border border-surface-200 dark:border-surface-800 z-20 grid grid-cols-8 gap-2 w-72"
                            >
                                {habitIcons.map((icon) => (
                                    <button
                                        key={icon}
                                        type="button"
                                        onClick={() => {
                                            setFormData({ ...formData, icon });
                                            setShowIconPicker(false);
                                        }}
                                        className={cn(
                                            "w-8 h-8 rounded-lg flex items-center justify-center text-lg",
                                            "hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors",
                                            formData.icon === icon && "bg-primary-100 dark:bg-primary-900/30"
                                        )}
                                    >
                                        {icon}
                                    </button>
                                ))}
                            </motion.div>
                        </>
                    )}
                </div>

                <div className="flex-1">
                    <Input
                        label="Habit Name"
                        placeholder="e.g., Drink 8 glasses of water"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        required
                    />
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                    Description (optional)
                </label>
                <textarea
                    placeholder="Add a description or motivation..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="input-field min-h-[80px] resize-none"
                />
            </div>

            {/* Color */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-3">
                    Color
                </label>
                <div className="flex flex-wrap gap-2">
                    {colorOptions.map((color) => {
                        const colors = habitColors[color];
                        return (
                            <button
                                key={color}
                                type="button"
                                onClick={() => setFormData({ ...formData, color })}
                                className={cn(
                                    "w-10 h-10 rounded-xl transition-all duration-300",
                                    `bg-gradient-to-br ${colors.gradient}`,
                                    formData.color === color
                                        ? "ring-2 ring-offset-2 ring-offset-white dark:ring-offset-surface-900 ring-primary-500 scale-110"
                                        : "hover:scale-105"
                                )}
                            />
                        );
                    })}
                </div>
            </div>

            {/* Category */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-3">
                    Category
                </label>
                <div className="flex flex-wrap gap-2">
                    {habitCategories.map((cat) => (
                        <button
                            key={cat.value}
                            type="button"
                            onClick={() => setFormData({ ...formData, category: cat.value })}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                                "border",
                                formData.category === cat.value
                                    ? "bg-primary-100 dark:bg-primary-900/30 border-primary-300 dark:border-primary-700 text-primary-700 dark:text-primary-300"
                                    : "bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-200/50 hover:border-primary-300"
                            )}
                        >
                            {cat.icon} {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Frequency */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-3">
                    Frequency
                </label>
                <div className="flex gap-2 mb-4">
                    {frequencyOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    frequency: { ...formData.frequency, type: option.value as any },
                                })
                            }
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                                "border",
                                formData.frequency.type === option.value
                                    ? "bg-primary-500 border-primary-500 text-white"
                                    : "bg-white dark:bg-surface-900 border-surface-200 dark:border-surface-800 text-surface-600 dark:text-surface-200/50 hover:border-primary-300"
                            )}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>

                {/* Days of week selector for weekly */}
                {formData.frequency.type === "weekly" && (
                    <div className="flex gap-2">
                        {daysOfWeek.map((day) => (
                            <button
                                key={day.value}
                                type="button"
                                onClick={() => toggleDay(day.value)}
                                className={cn(
                                    "w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-300",
                                    formData.frequency.daysOfWeek?.includes(day.value)
                                        ? "bg-primary-500 text-white"
                                        : "bg-surface-100 dark:bg-surface-800 text-surface-600 dark:text-surface-200/50 hover:bg-surface-200"
                                )}
                            >
                                {day.label}
                            </button>
                        ))}
                    </div>
                )}

                {/* Custom frequency */}
                {formData.frequency.type === "custom" && (
                    <div className="flex items-center gap-4">
                        <Input
                            type="number"
                            min={1}
                            max={30}
                            value={formData.frequency.timesPerPeriod}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    frequency: {
                                        ...formData.frequency,
                                        timesPerPeriod: parseInt(e.target.value) || 1,
                                    },
                                })
                            }
                            className="w-20"
                        />
                        <span className="text-surface-600 dark:text-surface-200/50">times per</span>
                        <Input
                            type="number"
                            min={1}
                            max={30}
                            value={formData.frequency.periodDays}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    frequency: {
                                        ...formData.frequency,
                                        periodDays: parseInt(e.target.value) || 7,
                                    },
                                })
                            }
                            className="w-20"
                        />
                        <span className="text-surface-600 dark:text-surface-200/50">days</span>
                    </div>
                )}
            </div>

            {/* Target Count */}
            <div>
                <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                    Daily Target
                </label>
                <div className="flex items-center gap-4">
                    <Input
                        type="number"
                        min={1}
                        max={100}
                        value={formData.targetCount}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                targetCount: parseInt(e.target.value) || 1,
                            })
                        }
                        className="w-24"
                    />
                    <span className="text-surface-600 dark:text-surface-200/50">
                        {formData.targetCount === 1 ? "time" : "times"} per day
                    </span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
                <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
                    Cancel
                </Button>
                <Button type="submit" isLoading={isLoading} className="flex-1">
                    {habit?._id ? "Save Changes" : "Create Habit"}
                </Button>
            </div>
        </form>
    );
}

```

---

## components/habits/HabitList.tsx

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";
import { HabitCard } from "./HabitCard";
import { HabitForm } from "./HabitForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useHabits } from "@/hooks/useHabits";
import { HabitWithLog, Habit } from "@/types";

export function HabitList() {
    const { habits, completeHabit, addHabit, updateHabit, deleteHabit } = useHabits();
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [deletingHabit, setDeletingHabit] = useState<HabitWithLog | null>(null);

    const handleSubmit = async (data: Partial<Habit>) => {
        if (editingHabit) {
            await updateHabit(editingHabit._id, data);
        } else {
            await addHabit(data);
        }
        setShowForm(false);
        setEditingHabit(null);
    };

    const handleDelete = async () => {
        if (deletingHabit) {
            await deleteHabit(deletingHabit._id);
            setDeletingHabit(null);
        }
    };

    // Separate completed and pending habits
    const pendingHabits = habits.filter((h) => !h.todayLog?.completed);
    const completedHabits = habits.filter((h) => h.todayLog?.completed);

    return (
        <div className="space-y-8">
            {/* Add Habit Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="w-full p-4 rounded-2xl border-2 border-dashed border-surface-300 dark:border-surface-800 hover:border-primary-400 dark:hover:border-primary-600 transition-colors group"
            >
                <div className="flex items-center justify-center gap-3 text-surface-200/50 group-hover:text-primary-500 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span className="font-medium">Add new habit</span>
                </div>
            </motion.button>

            {/* Pending Habits */}
            {pendingHabits.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                        <span>To Do</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-sm">
                            {pendingHabits.length}
                        </span>
                    </h2>
                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {pendingHabits.map((habit, index) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={habit}
                                    index={index}
                                    onComplete={(completed) => completeHabit(habit._id, completed)}
                                    onEdit={() => {
                                        setEditingHabit(habit);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => setDeletingHabit(habit)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Completed Habits */}
            {completedHabits.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-success-500" />
                        <span>Completed</span>
                        <span className="px-2 py-0.5 rounded-full bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400 text-sm">
                            {completedHabits.length}
                        </span>
                    </h2>
                    <div className="space-y-3 opacity-75">
                        <AnimatePresence mode="popLayout">
                            {completedHabits.map((habit, index) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={habit}
                                    index={index}
                                    onComplete={(completed) => completeHabit(habit._id, completed)}
                                    onEdit={() => {
                                        setEditingHabit(habit);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => setDeletingHabit(habit)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {habits.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-16"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
                        <span className="text-5xl">🌱</span>
                    </div>
                    <h3 className="text-xl font-semibold text-surface-900 dark:text-white mb-2">
                        Start your journey
                    </h3>
                    <p className="text-surface-200/50 mb-6 max-w-sm mx-auto">
                        Create your first habit and begin building a better version of yourself.
                    </p>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="w-5 h-5" />
                        Create your first habit
                    </Button>
                </motion.div>
            )}

            {/* Habit Form Modal */}
            <Modal
                isOpen={showForm}
                onClose={() => {
                    setShowForm(false);
                    setEditingHabit(null);
                }}
                title={editingHabit ? "Edit Habit" : "Create New Habit"}
                size="lg"
            >
                <HabitForm
                    habit={editingHabit || undefined}
                    onSubmit={handleSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingHabit(null);
                    }}
                />
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deletingHabit}
                onClose={() => setDeletingHabit(null)}
                title="Delete Habit"
                size="sm"
            >
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                        <span className="text-3xl">{deletingHabit?.icon}</span>
                    </div>
                    <p className="text-surface-600 dark:text-surface-200/50 mb-6">
                        Are you sure you want to delete <strong>"{deletingHabit?.title}"</strong>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <Button
                            variant="secondary"
                            onClick={() => setDeletingHabit(null)}
                            className="flex-1"
                        >
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDelete} className="flex-1">
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

```

---

## components/landing/CtaFooter.tsx

```tsx
"use client";

import { DailyWinLogo } from "@/components/brand/DailyWinLogo";

export function CtaFooter() {
    return (
        <footer className="relative overflow-hidden bg-black text-white">
            <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:44px_44px]" />

            <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 md:px-8">
                <div className="rounded-2xl border border-white/20 bg-black p-8 md:p-10">
                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                                DAILY WIN MOBILE TRACKER
                            </p>
                            <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl">
                                Keep Every Habit
                                <br />
                                <span className="text-white/70">In One App</span>
                            </h2>
                            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                                Track routines, protect streaks, and get daily clarity with a focused mobile dashboard built for consistency.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <a
                                    href="#"
                                    className="inline-flex items-center rounded-md border border-white bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
                                >
                                    Download App
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center rounded-md border border-white/40 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition hover:border-white"
                                >
                                    Product Roadmap
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                                    Product
                                </h3>
                                <ul className="space-y-3 text-white">
                                    <li><a href="#tracker-vision" className="transition hover:text-white/70">Tracker Vision</a></li>
                                    <li><a href="#habit-technology" className="transition hover:text-white/70">Habit Technology</a></li>
                                    <li><a href="#streak-manifesto" className="transition hover:text-white/70">Streak Manifesto</a></li>
                                    <li><a href="#" className="transition hover:text-white/70">Changelog</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                                    Company
                                </h3>
                                <ul className="space-y-3 text-white">
                                    <li><a href="#" className="transition hover:text-white/70">About</a></li>
                                    <li><a href="#" className="transition hover:text-white/70">Privacy Policy</a></li>
                                    <li><a href="#" className="transition hover:text-white/70">Terms</a></li>
                                    <li><a href="#" className="transition hover:text-white/70">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-white/20 pt-6">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <DailyWinLogo
                                label="DAILY WIN"
                                iconClassName="h-9 w-9 rounded-md"
                                textClassName="text-xs font-semibold uppercase tracking-[0.14em] text-white"
                            />
                            <div className="flex items-center gap-5 text-xs uppercase tracking-[0.12em] text-white/80">
                                <a href="#" className="transition hover:text-white">Instagram</a>
                                <a href="#" className="transition hover:text-white">X</a>
                                <a href="#" className="transition hover:text-white">YouTube</a>
                            </div>
                            <p className="text-xs text-white/60">© 2026 Daily Win. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

```

---

## components/landing/FeatureRow.tsx

```tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface FeatureRowProps {
    category: string;
    title: string;
    description: string;
    imageSrc: string | import("next/image").StaticImageData;
    reverse?: boolean;
}

export function FeatureRow({ category, title, description, imageSrc, reverse = false }: FeatureRowProps) {
    return (
        <section className={`py-24 ${reverse ? 'bg-[#f8faff]' : 'bg-white'}`}>
            <div className="container mx-auto px-6">
                <div className={`flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-16`}>
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: reverse ? 50 : -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <p className="text-[#3b82f6] font-bold uppercase tracking-wider mb-4 opacity-70">
                                {category}
                            </p>
                            <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8 leading-tight">
                                {title}
                            </h2>
                            <p className="text-xl text-[#6b7280] leading-relaxed">
                                {description}
                            </p>
                        </motion.div>
                    </div>
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: reverse ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative"
                        >
                            <Image
                                src={imageSrc}
                                alt={title}
                                width={500}
                                height={1000}
                                className="mx-auto"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}


```

---

## components/landing/Hero.tsx

```tsx
"use client";

import Image from "next/image";
import heroImage from "@/assets/hero-image.jpg";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white text-black">
            <div className="mx-auto w-full max-w-[1400px] px-4 py-6 sm:px-6 md:px-8 md:py-10">
                <div className="rounded-2xl border border-black/10 bg-white p-4 sm:p-6 md:p-8">
                    <div className="mb-8 flex items-center justify-between">
                        <DailyWinLogo
                            label="DAILY WIN"
                            iconClassName="h-7 w-7 rounded-sm"
                            textClassName="text-[11px] tracking-[0.14em] text-black"
                        />
                        <nav className="hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.14em] text-black/70 md:flex">
                            <a href="#tracker-vision" className="hover:text-black">Tracker Vision</a>
                            <a href="#habit-technology" className="hover:text-black">Habit Technology</a>
                            <a href="#streak-manifesto" className="hover:text-black">Streak Manifesto</a>
                        </nav>
                        <div className="flex items-center gap-2 sm:gap-3">
                            <a
                                href="/login"
                                className="border border-black/25 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-black hover:border-black"
                            >
                                Login
                            </a>
                            <a
                                href="/signup"
                                className="border border-black bg-black px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white hover:bg-white hover:text-black"
                            >
                                Sign Up
                            </a>
                        </div>
                    </div>

                    <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
                        <div className="max-w-[620px]">
                            <p className="mb-4 inline-flex border border-black/20 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-black/70">
                                Mobile Habit Tracker
                            </p>
                            <h1 className="font-black uppercase leading-[0.9] tracking-tight text-[clamp(1.65rem,6.8vw,4.6rem)]">
                                Track Every
                                <br />
                                <span className="text-black/65">Mobile Habit</span>
                                <br />
                                Daily
                            </h1>
                            <p className="mt-5 max-w-[560px] text-base leading-relaxed text-black/70 md:text-xl">
                                Build streaks, log routines, and view your progress in one focused mobile-first dashboard.
                            </p>
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <a
                                    href="#"
                                    className="w-full border border-black bg-black px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-white hover:bg-white hover:text-black sm:w-auto"
                                >
                                    Start Tracking
                                </a>
                                <a
                                    href="#"
                                    className="w-full border border-black/30 px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-black hover:border-black sm:w-auto"
                                >
                                    View Demo
                                </a>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="overflow-hidden rounded-2xl border border-black/15 bg-[#f5f5f5]">
                                <Image
                                    src={heroImage}
                                    alt="Habit tracker app usage preview"
                                    width={1200}
                                    height={900}
                                    priority
                                    className="h-[290px] w-full object-cover sm:h-[390px] lg:h-[480px]"
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

```

---

## components/landing/Testimonials.tsx

```tsx
"use client";

import { motion } from "framer-motion";

const reviews = [
    {
        name: "Marcus",
        type: "Fitness Enthusiast",
        text: "I've tried every habit tracker out there, but Day Win is the only one that actually stuck. The streak system is incredibly motivating and the interface is just beautiful.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=marcus"
    },
    {
        name: "Elena",
        type: "Productivity Lead",
        text: "Day Win has completely transformed how I approach my morning routine. It's simple, efficient, and the notifications are perfectly timed. I've recommended it to my entire team!",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=elena"
    },
    {
        name: "David",
        type: "Creative Director",
        text: "The best habit tracker I've ever used. The visual progress charts in Day Win help me see my growth at a glance. It keeps me on track every day without fail.",
        rating: 5,
        image: "https://i.pravatar.cc/150?u=david"
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 text-center">
                <p className="text-[#3b82f6] font-bold uppercase tracking-wider mb-4 opacity-70">
                    USER EXPERIENCES
                </p>
                <h2 className="text-4xl font-extrabold text-[#1f2937] mb-16">
                    How Day Win Changes Lives
                </h2>

                <div className="relative">
                    {/* Background strip */}
                    <div className="absolute top-1/2 left-0 w-full h-32 bg-gradient-to-r from-[#a855f7] to-[#3b82f6] -translate-y-1/2 rounded-3xl opacity-80" />

                    <div className="grid md:grid-cols-3 gap-8 relative z-10">
                        {reviews.map((review, i) => (
                            <motion.div
                                key={review.name + i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-8 rounded-3xl shadow-xl text-left border border-gray-100"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <img src={review.image} alt={review.name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
                                    <div>
                                        <h4 className="font-bold text-[#1f2937]">{review.name}</h4>
                                        <p className="text-sm text-gray-500">{review.type}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1 mb-4">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <svg key={i} viewBox="0 0 24 24" width="16" height="16" className="fill-[#a855f7]">
                                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-gray-600 leading-relaxed italic">
                                    "{review.text}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

```

---

## components/layout/Header.tsx

```tsx
﻿"use client";

import { motion } from "framer-motion";
import { getGreeting } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

export function Header() {
    const { data: session } = useSession();
    const greeting = getGreeting();
    const today = format(new Date(), "EEEE, MMMM d");

    return (
        <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 rounded-2xl border border-black/10 bg-white/85 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5"
        >
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/50 dark:text-white/50">{today}</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-black dark:text-white md:text-4xl">
                {greeting}, {session?.user?.name?.split(" ")[0] || "Champion"}
            </h1>
            <p className="mt-2 text-sm text-black/60 dark:text-white/60">
                Focus on momentum. Small actions today create long streaks tomorrow.
            </p>
        </motion.header>
    );
}


```

---

## components/layout/Navbar.tsx

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import {
    Home,
    LayoutGrid,
    Calendar,
    BarChart3,
    Settings,
    LogOut,
    Sun,
    Moon,
    User,
    Monitor,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";

const navItems = [
    { href: "/dashboard", label: "Overview", icon: Home },
    { href: "/dashboard/habits", label: "Habits", icon: LayoutGrid },
    { href: "/dashboard/calendar", label: "Calendar", icon: Calendar },
    { href: "/dashboard/stats", label: "Analytics", icon: BarChart3 },
];

export function Navbar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const { theme, setTheme } = useTheme();

    return (
        <>
            <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-72 flex-col border-r border-black/10 bg-white/85 px-5 py-5 backdrop-blur-xl dark:border-white/10 dark:bg-[#070b14]/85 z-40">
                <Link href="/" className="mb-7">
                    <DailyWinLogo
                        label="DAILY WIN"
                        iconClassName="h-10 w-10 rounded-lg"
                        textClassName="text-sm font-bold tracking-[0.14em] text-black dark:text-white"
                    />
                </Link>

                <div className="mb-6 rounded-2xl border border-black/10 bg-black px-4 py-4 text-white dark:border-white/10">
                    <p className="text-[11px] uppercase tracking-[0.16em] text-white/70">Daily System</p>
                    <p className="mt-2 text-xl font-bold leading-tight">Consistency Wins</p>
                    <p className="mt-2 text-sm text-white/70">Track habits, build streaks, and review trends faster.</p>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition",
                                    isActive
                                        ? "bg-black text-white dark:bg-white dark:text-black"
                                        : "text-black/65 hover:bg-black/5 hover:text-black dark:text-white/65 dark:hover:bg-white/10 dark:hover:text-white"
                                )}
                            >
                                <item.icon className="h-4.5 w-4.5" />
                                <span>{item.label}</span>
                                {isActive && (
                                    <motion.span
                                        layoutId="nav-active-pill"
                                        className="absolute right-3 h-2 w-2 rounded-full bg-[#e8d774] dark:bg-black"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-5 rounded-2xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="mb-3 flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-bold text-white dark:bg-white dark:text-black">
                            {session?.user?.name?.[0] || "U"}
                        </div>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-black dark:text-white">
                                {session?.user?.name || "User"}
                            </p>
                            <p className="truncate text-xs text-black/50 dark:text-white/50">
                                {session?.user?.email || "user@example.com"}
                            </p>
                        </div>
                    </div>

                    <div className="mb-3 grid grid-cols-3 gap-2">
                        <button
                            onClick={() => setTheme("light")}
                            className={cn(
                                "flex items-center justify-center rounded-lg border px-2 py-2 transition",
                                theme === "light"
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/15 text-black/60 hover:border-black/40 dark:border-white/15 dark:text-white/60 dark:hover:border-white/40"
                            )}
                            aria-label="Light mode"
                        >
                            <Sun className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setTheme("dark")}
                            className={cn(
                                "flex items-center justify-center rounded-lg border px-2 py-2 transition",
                                theme === "dark"
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/15 text-black/60 hover:border-black/40 dark:border-white/15 dark:text-white/60 dark:hover:border-white/40"
                            )}
                            aria-label="Dark mode"
                        >
                            <Moon className="h-4 w-4" />
                        </button>
                        <button
                            onClick={() => setTheme("system")}
                            className={cn(
                                "flex items-center justify-center rounded-lg border px-2 py-2 transition",
                                theme === "system"
                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                    : "border-black/15 text-black/60 hover:border-black/40 dark:border-white/15 dark:text-white/60 dark:hover:border-white/40"
                            )}
                            aria-label="System mode"
                        >
                            <Monitor className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href="/dashboard/settings"
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-black/15 px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-black/70 transition hover:border-black hover:text-black dark:border-white/15 dark:text-white/70 dark:hover:border-white dark:hover:text-white"
                        >
                            <Settings className="h-3.5 w-3.5" />
                            Settings
                        </Link>
                        <button
                            onClick={() => signOut({ callbackUrl: "/" })}
                            className="flex items-center justify-center rounded-lg border border-red-500/40 px-3 py-2 text-red-600 transition hover:bg-red-500 hover:text-white"
                            aria-label="Sign out"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </aside>

            <nav className="md:hidden fixed bottom-2 left-2 right-2 z-40 rounded-2xl border border-black/10 bg-white/92 px-2 py-2 shadow-xl backdrop-blur dark:border-white/10 dark:bg-[#0a0f19]/92">
                <ul className="grid grid-cols-5 items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold transition",
                                        isActive
                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                            : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
                                    )}
                                >
                                    <item.icon className="h-4.5 w-4.5" />
                                    <span>{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <li>
                        <Link
                            href="/dashboard/settings"
                            className={cn(
                                "flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-semibold transition",
                                pathname === "/dashboard/settings"
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "text-black/55 hover:text-black dark:text-white/55 dark:hover:text-white"
                            )}
                        >
                            <User className="h-4.5 w-4.5" />
                            <span>Profile</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

```

---

## components/ui/Badge.tsx

```tsx
import { cn } from "@/lib/utils";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "success" | "warning" | "danger" | "info";
    size?: "sm" | "md";
    className?: string;
}

export function Badge({
    children,
    variant = "default",
    size = "sm",
    className,
}: BadgeProps) {
    const variants = {
        default: "bg-surface-100 dark:bg-surface-800 text-surface-900 dark:text-white",
        success: "bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-400",
        warning: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400",
        danger: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
        info: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
    };

    const sizes = {
        sm: "px-2 py-0.5 text-xs",
        md: "px-3 py-1 text-sm",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center font-medium rounded-full",
                variants[variant],
                sizes[size],
                className
            )}
        >
            {children}
        </span>
    );
}

```

---

## components/ui/Button.tsx

```tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "ghost" | "danger";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = "primary",
            size = "md",
            isLoading,
            leftIcon,
            rightIcon,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        const variants = {
            primary: "btn-primary",
            secondary: "btn-secondary",
            ghost: "btn-ghost",
            danger:
                "bg-red-500 hover:bg-red-600 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/30",
        };

        const sizes = {
            sm: "px-4 py-2 text-sm rounded-lg",
            md: "px-6 py-3 text-base rounded-xl",
            lg: "px-8 py-4 text-lg rounded-xl",
        };

        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center gap-2 font-medium transition-all duration-300",
                    "active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed",
                    variants[variant],
                    sizes[size],
                    className
                )}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    leftIcon
                )}
                {children}
                {!isLoading && rightIcon}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button };

```

---

## components/ui/Card.tsx

```tsx
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    gradient?: boolean;
    onClick?: () => void;
}

export function Card({
    children,
    className,
    hover = false,
    gradient = false,
    onClick,
}: CardProps) {
    return (
        <motion.div
            whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
            whileTap={onClick ? { scale: 0.99 } : undefined}
            className={cn(
                "bg-white dark:bg-surface-900 rounded-2xl",
                "border border-surface-200 dark:border-surface-800",
                "shadow-card",
                hover && "hover:shadow-card-hover transition-shadow duration-300",
                gradient && "gradient-border",
                onClick && "cursor-pointer",
                className
            )}
            onClick={onClick}
        >
            {children}
        </motion.div>
    );
}

```

---

## components/ui/Input.tsx

```tsx
"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, leftIcon, rightIcon, ...props }, ref) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-200/50">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "input-field",
                            leftIcon && "pl-12",
                            rightIcon && "pr-12",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500/50",
                            className
                        )}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-surface-200/50">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };

```

---

## components/ui/Modal.tsx

```tsx
"use client";

import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
}: ModalProps) {
    const sizes = {
        sm: "sm:max-w-sm",
        md: "sm:max-w-md",
        lg: "sm:max-w-lg",
        xl: "sm:max-w-xl",
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Fragment>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className={cn(
                                "w-full bg-white dark:bg-surface-900 shadow-2xl",
                                "border border-surface-200 dark:border-surface-800",
                                "max-h-[92svh] overflow-hidden rounded-t-2xl sm:rounded-2xl",
                                sizes[size]
                            )}
                        >
                            {/* Header */}
                            {title && (
                                <div className="flex items-center justify-between border-b border-surface-200 px-4 py-3 dark:border-surface-800 sm:px-6 sm:py-4">
                                    <h2 className="text-lg font-semibold text-surface-900 dark:text-white sm:text-xl">
                                        {title}
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-surface-200/50" />
                                    </button>
                                </div>
                            )}

                            {/* Content */}
                            <div className="max-h-[calc(92svh-72px)] overflow-y-auto p-4 sm:max-h-[calc(92svh-88px)] sm:p-6">
                                {children}
                            </div>
                        </motion.div>
                    </div>
                </Fragment>
            )}
        </AnimatePresence>
    );
}

```

---

## components/ui/ProgressRing.tsx

```tsx
"use client";

import { motion } from "framer-motion";

interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
    children?: React.ReactNode;
}

export function ProgressRing({
    progress,
    size = 120,
    strokeWidth = 8,
    className,
    children,
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className={`relative inline-flex items-center justify-center ${className}`}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="fill-none stroke-surface-200 dark:stroke-surface-800"
                />
                {/* Progress circle */}
                <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="fill-none stroke-primary-500"
                    strokeLinecap="round"
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        strokeDasharray: circumference,
                    }}
                />
                {/* Gradient definition */}
                <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="50%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                </defs>
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
                {children}
            </div>
        </div>
    );
}

```

---

## hooks/useHabits.ts

```typescript
import { create } from "zustand";
import { HabitWithLog, Habit } from "@/types";
import toast from "react-hot-toast";

interface HabitsState {
    habits: HabitWithLog[];
    isLoading: boolean;
    error: string | null;
    fetchHabits: () => Promise<void>;
    addHabit: (habit: Partial<Habit>) => Promise<void>;
    updateHabit: (id: string, data: Partial<Habit>) => Promise<void>;
    deleteHabit: (id: string) => Promise<void>;
    completeHabit: (id: string, completed: boolean, count?: number) => Promise<{ streak?: { current: number; longest: number } }>;
}

export const useHabits = create<HabitsState>((set, get) => ({
    habits: [],
    isLoading: false,
    error: null,

    fetchHabits: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch("/api/habits");
            if (!response.ok) throw new Error("Failed to fetch habits");
            const data = await response.json();
            set({ habits: data.habits, isLoading: false });
        } catch (error) {
            set({ error: "Failed to fetch habits", isLoading: false });
            toast.error("Failed to fetch habits");
        }
    },

    addHabit: async (habit) => {
        try {
            const response = await fetch("/api/habits", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(habit),
            });
            if (!response.ok) throw new Error("Failed to create habit");
            const data = await response.json();
            set((state) => ({
                habits: [...state.habits, { ...data.habit, todayLog: null }],
            }));
            toast.success("Habit created!");
        } catch (error) {
            toast.error("Failed to create habit");
            throw error;
        }
    },

    updateHabit: async (id, data) => {
        try {
            const response = await fetch(`/api/habits/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error("Failed to update habit");
            const result = await response.json();
            set((state) => ({
                habits: state.habits.map((h) =>
                    h._id === id ? { ...h, ...result.habit } : h
                ),
            }));
            toast.success("Habit updated!");
        } catch (error) {
            toast.error("Failed to update habit");
            throw error;
        }
    },

    deleteHabit: async (id) => {
        try {
            const response = await fetch(`/api/habits/${id}`, {
                method: "DELETE",
            });
            if (!response.ok) throw new Error("Failed to delete habit");
            set((state) => ({
                habits: state.habits.filter((h) => h._id !== id),
            }));
            toast.success("Habit deleted!");
        } catch (error) {
            toast.error("Failed to delete habit");
            throw error;
        }
    },

    completeHabit: async (id, completed, count) => {
        // Optimistic update
        set((state) => ({
            habits: state.habits.map((h) =>
                h._id === id
                    ? {
                        ...h,
                        todayLog: {
                            ...h.todayLog,
                            _id: h.todayLog?._id || "temp",
                            habitId: id,
                            userId: "",
                            date: new Date(),
                            completed,
                            count: count ?? (completed ? 1 : 0),
                            skipped: false,
                            createdAt: new Date(),
                        },
                    }
                    : h
            ),
        }));

        try {
            const response = await fetch(`/api/habits/${id}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ completed, count }),
            });
            if (!response.ok) throw new Error("Failed to update habit");

            const result = await response.json();

            // Update with actual data including streak
            set((state) => ({
                habits: state.habits.map((h) =>
                    h._id === id
                        ? {
                            ...h,
                            todayLog: result.log,
                            streak: result.streak || h.streak,
                        }
                        : h
                ),
            }));

            return { streak: result.streak };
        } catch (error) {
            // Revert on error
            get().fetchHabits();
            toast.error("Failed to update habit");
            throw error;
        }
    },
}));

```

---

## lib/auth.ts

```typescript
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

```

---

## lib/confetti.ts

```typescript
import confetti from "canvas-confetti";

export function fireConfetti() {
    const count = 200;
    const defaults = {
        origin: { y: 0.7 },
        zIndex: 9999,
    };

    function fire(particleRatio: number, opts: confetti.Options) {
        confetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
        });
    }

    fire(0.25, {
        spread: 26,
        startVelocity: 55,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });

    fire(0.2, {
        spread: 60,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });

    fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });

    fire(0.1, {
        spread: 120,
        startVelocity: 45,
        colors: ["#a855f7", "#22d3ee", "#f97316"],
    });
}

export function fireSmallConfetti() {
    confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#a855f7", "#22d3ee", "#f97316", "#22c55e"],
        zIndex: 9999,
    });
}

export function fireStreakConfetti() {
    const end = Date.now() + 1000;

    const colors = ["#f97316", "#ef4444", "#eab308"];

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: colors,
            zIndex: 9999,
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: colors,
            zIndex: 9999,
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    })();
}

```

---

## lib/mongodb-client.ts

```typescript
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error("Please add MONGODB_URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
    let globalWithMongo = global as typeof globalThis & {
        _mongoClientPromise?: Promise<MongoClient>;
    };

    if (!globalWithMongo._mongoClientPromise) {
        client = new MongoClient(uri, options);
        globalWithMongo._mongoClientPromise = client.connect();
    }
    clientPromise = globalWithMongo._mongoClientPromise;
} else {
    client = new MongoClient(uri, options);
    clientPromise = client.connect();
}

export default clientPromise;

```

---

## lib/mongodb.ts

```typescript
import mongoose, { type Mongoose } from "mongoose";

declare global {
    var mongooseCache: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
    };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

async function dbConnect(): Promise<Mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default dbConnect;

```

---

## lib/utils.ts

```typescript
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isYesterday, startOfDay, differenceInDays } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
    const d = new Date(date);
    if (isToday(d)) return "Today";
    if (isYesterday(d)) return "Yesterday";
    return format(d, "MMM d, yyyy");
}

export function formatTime(date: Date | string): string {
    return format(new Date(date), "h:mm a");
}

export function getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
}

export function calculateStreak(logs: { date: Date; completed: boolean }[]): number {
    if (!logs.length) return 0;

    const sortedLogs = logs
        .filter((log) => log.completed)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (!sortedLogs.length) return 0;

    let streak = 0;
    let currentDate = startOfDay(new Date());

    // Check if completed today
    const lastLogDate = startOfDay(new Date(sortedLogs[0].date));
    const daysDiff = differenceInDays(currentDate, lastLogDate);

    if (daysDiff > 1) return 0;
    if (daysDiff === 1) currentDate = lastLogDate;

    for (const log of sortedLogs) {
        const logDate = startOfDay(new Date(log.date));
        const diff = differenceInDays(currentDate, logDate);

        if (diff === 0) {
            streak++;
            currentDate = new Date(currentDate.setDate(currentDate.getDate() - 1));
        } else if (diff === 1) {
            streak++;
            currentDate = logDate;
        } else {
            break;
        }
    }

    return streak;
}

export function getCompletionRate(logs: { completed: boolean }[]): number {
    if (!logs.length) return 0;
    const completed = logs.filter((log) => log.completed).length;
    return Math.round((completed / logs.length) * 100);
}

export function getDayName(day: number): string {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

export function getFullDayName(day: number): string {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return days[day];
}

export function isHabitDueToday(frequency: {
    type: string;
    daysOfWeek?: number[];
    timesPerPeriod?: number;
    periodDays?: number;
}): boolean {
    const today = new Date().getDay();

    switch (frequency.type) {
        case "daily":
            return true;
        case "weekly":
            return frequency.daysOfWeek?.includes(today) ?? false;
        case "custom":
            // For custom, we'd need to check based on start date and period
            return true;
        default:
            return true;
    }
}

export function generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

```

---

## models/Habit.ts

```typescript
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

```

---

## models/HabitLog.ts

```typescript
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

```

---

## models/User.ts

```typescript
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

```

---

## providers/index.tsx

```tsx
"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster
                    position="top-center"
                    toastOptions={{
                        className: "toast-custom",
                        duration: 3000,
                        style: {
                            padding: "16px",
                            borderRadius: "12px",
                        },
                    }}
                />
            </ThemeProvider>
        </SessionProvider>
    );
}

```

---

## providers/theme-provider.tsx

```tsx
"use client";

import * as React from "react";
import {
    ThemeProvider as NextThemesProvider,
    type ThemeProviderProps,
} from "next-themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

```

---

## types/index.ts

```typescript
import { ObjectId } from "mongoose";

export interface User {
    _id: string;
    email: string;
    name: string;
    image?: string;
    timezone: string;
    preferences: UserPreferences;
    stats: UserStats;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserPreferences {
    theme: "light" | "dark" | "system";
    weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    reminderTime: string;
    soundEnabled: boolean;
    celebrationsEnabled: boolean;
}

export interface UserStats {
    totalHabits: number;
    completedToday: number;
    currentStreak: number;
    longestStreak: number;
    totalCompletions: number;
}

export type HabitFrequency = "daily" | "weekly" | "custom";

export type HabitCategory =
    | "health"
    | "fitness"
    | "productivity"
    | "learning"
    | "mindfulness"
    | "social"
    | "creativity"
    | "finance"
    | "other";

export interface Habit {
    _id: string;
    userId: string;
    title: string;
    description?: string;
    icon: string;
    color: HabitColor;
    category: HabitCategory;
    frequency: {
        type: HabitFrequency;
        daysOfWeek?: number[]; // 0-6, Sunday-Saturday
        timesPerPeriod?: number;
        periodDays?: number;
    };
    targetCount: number;
    reminders: Reminder[];
    startDate: Date;
    endDate?: Date;
    isArchived: boolean;
    streak: {
        current: number;
        longest: number;
        lastCompletedDate?: Date;
    };
    completionRate: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface Reminder {
    id: string;
    time: string;
    enabled: boolean;
    days: number[];
}

export interface HabitLog {
    _id: string;
    habitId: string;
    userId: string;
    date: Date;
    completed: boolean;
    count: number;
    note?: string;
    skipped: boolean;
    skipReason?: string;
    completedAt?: Date;
    createdAt: Date;
}

export interface HabitWithLog extends Habit {
    todayLog?: HabitLog;
}

export type HabitColor =
    | "violet"
    | "purple"
    | "blue"
    | "cyan"
    | "teal"
    | "green"
    | "lime"
    | "yellow"
    | "orange"
    | "red"
    | "pink"
    | "rose";

export const habitColors: Record<HabitColor, { bg: string; text: string; gradient: string }> = {
    violet: {
        bg: "bg-violet-100 dark:bg-violet-900/30",
        text: "text-violet-600 dark:text-violet-400",
        gradient: "from-violet-400 to-violet-600",
    },
    purple: {
        bg: "bg-purple-100 dark:bg-purple-900/30",
        text: "text-purple-600 dark:text-purple-400",
        gradient: "from-purple-400 to-purple-600",
    },
    blue: {
        bg: "bg-blue-100 dark:bg-blue-900/30",
        text: "text-blue-600 dark:text-blue-400",
        gradient: "from-blue-400 to-blue-600",
    },
    cyan: {
        bg: "bg-cyan-100 dark:bg-cyan-900/30",
        text: "text-cyan-600 dark:text-cyan-400",
        gradient: "from-cyan-400 to-cyan-600",
    },
    teal: {
        bg: "bg-teal-100 dark:bg-teal-900/30",
        text: "text-teal-600 dark:text-teal-400",
        gradient: "from-teal-400 to-teal-600",
    },
    green: {
        bg: "bg-green-100 dark:bg-green-900/30",
        text: "text-green-600 dark:text-green-400",
        gradient: "from-green-400 to-green-600",
    },
    lime: {
        bg: "bg-lime-100 dark:bg-lime-900/30",
        text: "text-lime-600 dark:text-lime-400",
        gradient: "from-lime-400 to-lime-600",
    },
    yellow: {
        bg: "bg-yellow-100 dark:bg-yellow-900/30",
        text: "text-yellow-600 dark:text-yellow-400",
        gradient: "from-yellow-400 to-yellow-600",
    },
    orange: {
        bg: "bg-orange-100 dark:bg-orange-900/30",
        text: "text-orange-600 dark:text-orange-400",
        gradient: "from-orange-400 to-orange-600",
    },
    red: {
        bg: "bg-red-100 dark:bg-red-900/30",
        text: "text-red-600 dark:text-red-400",
        gradient: "from-red-400 to-red-600",
    },
    pink: {
        bg: "bg-pink-100 dark:bg-pink-900/30",
        text: "text-pink-600 dark:text-pink-400",
        gradient: "from-pink-400 to-pink-600",
    },
    rose: {
        bg: "bg-rose-100 dark:bg-rose-900/30",
        text: "text-rose-600 dark:text-rose-400",
        gradient: "from-rose-400 to-rose-600",
    },
};

export const habitIcons = [
    "💪", "🏃", "📚", "💧", "🧘", "😴", "🥗", "💊",
    "✍️", "🎨", "🎵", "🌱", "🧠", "💰", "📱", "🚭",
    "🏋️", "🚴", "🧹", "📝", "🎯", "⏰", "🌅", "🌙",
    "❤️", "🙏", "😊", "🔥", "⭐", "🌈", "🎉", "✨"
];

export const habitCategories: { value: HabitCategory; label: string; icon: string }[] = [
    { value: "health", label: "Health", icon: "❤️" },
    { value: "fitness", label: "Fitness", icon: "💪" },
    { value: "productivity", label: "Productivity", icon: "⚡" },
    { value: "learning", label: "Learning", icon: "📚" },
    { value: "mindfulness", label: "Mindfulness", icon: "🧘" },
    { value: "social", label: "Social", icon: "👥" },
    { value: "creativity", label: "Creativity", icon: "🎨" },
    { value: "finance", label: "Finance", icon: "💰" },
    { value: "other", label: "Other", icon: "📌" },
];

```

---
