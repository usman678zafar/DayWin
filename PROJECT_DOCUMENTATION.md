# DayWin Project Documentation

**Auto-generated project documentation**

---

## Table of Contents

1. [Root](#root)

2. [app](#app)

3. [app\(auth)\login](#app-(auth)-login)

4. [app\(auth)\signup](#app-(auth)-signup)

5. [app\api\auth\[...nextauth]](#app-api-auth-[nextauth])

6. [app\api\auth\register](#app-api-auth-register)

7. [app\api\habits](#app-api-habits)

8. [app\api\habits\[id]](#app-api-habits-[id])

9. [app\api\habits\[id]\complete](#app-api-habits-[id]-complete)

10. [app\api\logs](#app-api-logs)

11. [app\api\stats](#app-api-stats)

12. [app\dashboard](#app-dashboard)

13. [app\dashboard\calendar](#app-dashboard-calendar)

14. [app\dashboard\habits](#app-dashboard-habits)

15. [app\dashboard\settings](#app-dashboard-settings)

16. [app\dashboard\stats](#app-dashboard-stats)

17. [components\brand](#components-brand)

18. [components\dashboard](#components-dashboard)

19. [components\habits](#components-habits)

20. [components\landing](#components-landing)

21. [components\layout](#components-layout)

22. [components\ui](#components-ui)

23. [hooks](#hooks)

24. [lib](#lib)

25. [models](#models)

26. [providers](#providers)

27. [types](#types)


---

## Root

### `next.config.js`

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



### `package.json`

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



### `postcss.config.js`

```javascript
module.exports = {
    plugins: {
        tailwindcss: {},
        autoprefixer: {},
    },
}

```



### `tailwind.config.ts`

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



### `tsconfig.json`

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

## app

### `app\globals.css`

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

    /* Day Win Dashboard Tokens */
    --dw-bg: #f3f5f8;
    --dw-card: #ffffff;
    --dw-card-border: rgba(0, 0, 0, 0.08);
    --dw-accent: #4D7CFE;
    --dw-accent-glow: rgba(77, 124, 254, 0.25);
    --dw-success: #22C55E;
    --dw-success-glow: rgba(34, 197, 94, 0.25);
    --dw-text-primary: #09090b;
    --dw-text-secondary: rgba(9, 9, 11, 0.6);
    --dw-text-muted: rgba(9, 9, 11, 0.4);
    --dw-streak: #F59E0B;
}

.dark {
    --background: 9 9 11;
    --foreground: 250 250 250;
    --card: 24 24 27;
    --card-foreground: 250 250 250;
    --muted: 39 39 42;
    --muted-foreground: 161 161 170;
    --border: 39 39 42;

    /* Day Win Dashboard Tokens - Dark */
    --dw-bg: #0F0F14;
    --dw-card: #1A1A24;
    --dw-card-border: rgba(255, 255, 255, 0.06);
    --dw-accent: #4D7CFE;
    --dw-accent-glow: rgba(77, 124, 254, 0.2);
    --dw-success: #22C55E;
    --dw-success-glow: rgba(34, 197, 94, 0.2);
    --dw-text-primary: #ffffff;
    --dw-text-secondary: rgba(255, 255, 255, 0.6);
    --dw-text-muted: rgba(255, 255, 255, 0.35);
    --dw-streak: #F59E0B;
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
    width: 4px;
    height: 4px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
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

/* ===== Day Win Dashboard Theme ===== */
@layer components {

    /* Dashboard-specific page container */
    .dw-page {
        min-height: 100vh;
        min-height: 100dvh;
        padding: 0 16px 96px;
        background: var(--dw-bg);
        color: var(--dw-text-primary);
    }

    /* Dashboard card */
    .dw-card {
        background: var(--dw-card);
        border: 1px solid var(--dw-card-border);
        border-radius: 16px;
        padding: 20px;
        backdrop-filter: blur(12px);
    }

    .dw-card-glow {
        background: var(--dw-card);
        border: 1px solid var(--dw-card-border);
        border-radius: 16px;
        padding: 20px;
        box-shadow: 0 0 40px var(--dw-accent-glow), 0 8px 32px rgba(0, 0, 0, 0.2);
    }

    /* Legacy page components (kept for non-dashboard pages) */
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

    /* FIXED: Removed spaces in rgba values */
    .card {
        @apply rounded-2xl border border-black/10 bg-white/90 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-white/5;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.06);
    }

    .dark .card {
        box-shadow: 0 14px 44px rgba(0, 0, 0, 0.32);
    }

    .card-header {
        @apply flex items-center justify-between mb-4;
    }

    .card-title {
        @apply text-lg font-semibold text-black dark:text-white;
    }
}

/* ===== Dashboard Animations ===== */

/* Checkbox bounce */
@keyframes checkBounce {
    0% {
        transform: scale(0);
    }

    50% {
        transform: scale(1.3);
    }

    70% {
        transform: scale(0.85);
    }

    100% {
        transform: scale(1);
    }
}

.animate-check-bounce {
    animation: checkBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Streak flame pulse */
@keyframes flamePulse {

    0%,
    100% {
        transform: scale(1);
        filter: brightness(1);
    }

    50% {
        transform: scale(1.15);
        filter: brightness(1.3);
    }
}

.animate-flame-pulse {
    animation: flamePulse 1.5s ease-in-out infinite;
}

/* Day Won celebration glow */
@keyframes celebrationGlow {

    0%,
    100% {
        box-shadow: 0 0 20px var(--dw-success-glow), 0 0 60px transparent;
    }

    50% {
        box-shadow: 0 0 30px var(--dw-success-glow), 0 0 80px var(--dw-success-glow);
    }
}

.animate-celebration-glow {
    animation: celebrationGlow 2s ease-in-out infinite;
}

/* Smooth slide in from bottom */
@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(24px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-slide-in-up {
    animation: slideInUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}

/* Progress ring gradient rotation */
@keyframes ringGradientRotate {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* FAB pulse */
@keyframes fabPulse {

    0%,
    100% {
        box-shadow: 0 4px 24px var(--dw-accent-glow);
    }

    50% {
        box-shadow: 0 4px 40px var(--dw-accent-glow), 0 0 60px var(--dw-accent-glow);
    }
}

.animate-fab-pulse {
    animation: fabPulse 3s ease-in-out infinite;
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

/* Heatmap cell transitions */
.heatmap-cell {
    transition: all 0.2s ease;
}

.heatmap-cell:hover {
    transform: scale(1.4);
    z-index: 10;
}

/* Habit Matrix Styles */
.habit-matrix-scroll {
    scroll-behavior: smooth;
    -webkit-overflow-scrolling: touch;
}

.habit-matrix-scroll::-webkit-scrollbar {
    height: 6px;
}

.habit-matrix-scroll::-webkit-scrollbar-track {
    background: transparent;
}

.habit-matrix-scroll::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
}

.dark .habit-matrix-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
}

.habit-matrix-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
}

.dark .habit-matrix-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.2);
}
```



### `app\layout.tsx`

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



### `app\page.tsx`

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

## app\(auth)\login

### `app\(auth)\login\page.tsx`

```tsx
﻿"use client";

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
                        label="DAY WIN"
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
                            label="DAY WIN"
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

## app\(auth)\signup

### `app\(auth)\signup\page.tsx`

```tsx
﻿"use client";

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
                        label="DAY WIN"
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
                            label="DAY WIN"
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

## app\api\auth\[...nextauth]

### `app\api\auth\[...nextauth]\route.ts`

```typescript
import { handlers } from "@/lib/auth";
export const { GET, POST } = handlers;

```



---

## app\api\auth\register

### `app\api\auth\register\route.ts`

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

## app\api\habits

### `app\api\habits\route.ts`

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

## app\api\habits\[id]

### `app\api\habits\[id]\route.ts`

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

## app\api\habits\[id]\complete

### `app\api\habits\[id]\complete\route.ts`

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

## app\api\logs

### `app\api\logs\route.ts`

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

## app\api\stats

### `app\api\stats\route.ts`

```typescript
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import dbConnect from "@/lib/mongodb";
import Habit from "@/models/Habit";
import HabitLog from "@/models/HabitLog";
import { startOfDay, endOfDay, subDays, format, differenceInDays } from "date-fns";

export async function GET(req: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await dbConnect();

        const { searchParams } = new URL(req.url);
        const startDateParam = searchParams.get("startDate");
        const endDateParam = searchParams.get("endDate");

        const today = new Date();
        const endDate = endDateParam ? new Date(endDateParam) : today;
        const startDate = startDateParam ? new Date(startDateParam) : subDays(today, 30);
        const daysDiff = differenceInDays(endDate, startDate) + 1;

        // Get all habits
        const habits = await Habit.find({
            userId: session.user.id,
            isArchived: false,
        });

        // Get logs for the selected date range
        const logs = await HabitLog.find({
            userId: session.user.id,
            date: {
                $gte: startOfDay(startDate),
                $lte: endOfDay(endDate),
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

        // Total completions in range
        const totalCompletions = logs.filter((log) => log.completed).length;

        // Completion rate for the selected range
        const rangeCompletedCount = logs.filter((log) => log.completed).length;
        const rangeTotalPossible = habits.length * daysDiff;
        const weeklyCompletionRate = rangeTotalPossible > 0
            ? Math.round((rangeCompletedCount / rangeTotalPossible) * 100)
            : 0;

        // Daily completion data for chart (last 7 days or based on range)
        const chartDays = Math.min(daysDiff, 14); // Max 14 days for chart
        const dailyData = [];
        for (let i = chartDays - 1; i >= 0; i--) {
            const date = subDays(endDate, i);
            const dayLogs = logs.filter(
                (log) =>
                    log.date >= startOfDay(date) &&
                    log.date <= endOfDay(date)
            );
            const completed = dayLogs.filter((log) => log.completed).length;
            dailyData.push({
                date: format(date, "MMM d"),
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
                const totalDays = daysDiff;
                return {
                    id: habit._id,
                    title: habit.title,
                    icon: habit.icon,
                    color: habit.color,
                    completionRate: totalDays > 0
                        ? Math.round((completed / totalDays) * 100)
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

## app\dashboard

### `app\dashboard\layout.tsx`

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



### `app\dashboard\page.tsx`

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

## app\dashboard\calendar

### `app\dashboard\calendar\page.tsx`

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
    isToday,
    isFuture,
} from "date-fns";
import { ChevronLeft, ChevronRight, Check, X, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { useHabits } from "@/hooks/useHabits";
import { Button } from "@/components/ui/Button";
import { habitColors } from "@/types";
import toast from "react-hot-toast";

export default function CalendarPage() {
    const { habits, fetchHabits, completeHabitForDate } = useHabits();
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [logs, setLogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchHabits();
    }, [fetchHabits]);

    useEffect(() => {
        fetchLogs();
    }, [currentMonth]);

    const fetchLogs = async () => {
        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleHabit = async (habitId: string, date: Date, currentCompleted: boolean) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark habits for future dates");
            return;
        }

        // Optimistic update
        const newCompleted = !currentCompleted;
        setLogs((prevLogs) => {
            const existingLogIndex = prevLogs.findIndex(
                (log) => log.habitId === habitId && isSameDay(new Date(log.date), date)
            );

            if (existingLogIndex >= 0) {
                const newLogs = [...prevLogs];
                newLogs[existingLogIndex] = { ...newLogs[existingLogIndex], completed: newCompleted };
                return newLogs;
            } else {
                return [...prevLogs, { habitId, date, completed: newCompleted }];
            }
        });

        try {
            await completeHabitForDate(habitId, date, newCompleted);
        } catch (error) {
            // Revert on error
            fetchLogs();
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
                    onClick={() => {
                        setCurrentMonth(new Date());
                        setSelectedDate(new Date());
                    }}
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
                const isTodayDate = isToday(day);
                const isSelected = isSameDay(day, selectedDate);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isFutureDate = isFuture(day) && !isToday(day);

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
                            isTodayDate && "bg-primary-50 dark:bg-primary-900/20"
                        )}
                    >
                        <div
                            className={cn(
                                "w-full h-full rounded-lg flex flex-col items-center justify-center",
                                completionRate === 100 && !isFutureDate && "bg-success-100 dark:bg-success-900/30",
                                completionRate > 0 && completionRate < 100 && !isFutureDate && "bg-yellow-100 dark:bg-yellow-900/30",
                                completionRate === 0 && totalHabits > 0 && dayLogs.length > 0 && !isFutureDate && "bg-red-100 dark:bg-red-900/30"
                            )}
                        >
                            <span
                                className={cn(
                                    "text-sm font-semibold",
                                    isTodayDate
                                        ? "text-primary-600 dark:text-primary-400"
                                        : "text-surface-900 dark:text-white"
                                )}
                            >
                                {format(day, "d")}
                            </span>
                            {totalHabits > 0 && isCurrentMonth && !isFutureDate && (
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
    const isSelectedFuture = isFuture(selectedDate) && !isToday(selectedDate);

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">Calendar</h1>
                <p className="page-subtitle">Track completion patterns across every day. Click any date to view and edit habits.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Calendar */}
                <div className="lg:col-span-2">
                    <div className="card p-6">
                        {renderHeader()}
                        {renderDays()}
                        {isLoading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
                            </div>
                        ) : (
                            renderCells()
                        )}
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

                {/* Selected Date Details - INTERACTIVE */}
                <div className="card p-6 h-fit sticky top-6">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-2">
                        {format(selectedDate, "EEEE, MMMM d")}
                    </h3>

                    {isSelectedFuture && (
                        <p className="text-xs text-yellow-600 dark:text-yellow-400 mb-4">
                            Future date - habits cannot be marked
                        </p>
                    )}

                    {habits.length > 0 ? (
                        <div className="space-y-3">
                            {habits.map((habit) => {
                                const log = selectedDateLogs.find(
                                    (l) => l.habitId === habit._id
                                );
                                const isCompleted = log?.completed || false;
                                const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;

                                return (
                                    <motion.button
                                        key={habit._id}
                                        whileHover={!isSelectedFuture ? { scale: 1.02 } : undefined}
                                        whileTap={!isSelectedFuture ? { scale: 0.98 } : undefined}
                                        onClick={() => handleToggleHabit(habit._id, selectedDate, isCompleted)}
                                        disabled={isSelectedFuture}
                                        className={cn(
                                            "w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left",
                                            isCompleted
                                                ? "bg-success-50 dark:bg-success-900/20 border border-success-200 dark:border-success-800"
                                                : "bg-surface-50 dark:bg-surface-800/50 border border-transparent hover:border-black/10 dark:hover:border-white/10",
                                            isSelectedFuture && "opacity-50 cursor-not-allowed"
                                        )}
                                    >
                                        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-xl", colors.bg)}>
                                            {habit.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className={cn(
                                                "font-medium",
                                                isCompleted
                                                    ? "text-success-700 dark:text-success-300"
                                                    : "text-surface-900 dark:text-white"
                                            )}>
                                                {habit.title}
                                            </p>
                                            {habit.streak.current > 0 && (
                                                <div className="flex items-center gap-1 mt-0.5 text-orange-500">
                                                    <Flame className="h-3 w-3" />
                                                    <span className="text-xs font-medium">{habit.streak.current} day streak</span>
                                                </div>
                                            )}
                                        </div>
                                        <div
                                            className={cn(
                                                "w-7 h-7 rounded-full flex items-center justify-center transition-all",
                                                isCompleted
                                                    ? "bg-success-500 text-white"
                                                    : "bg-surface-200 dark:bg-surface-700"
                                            )}
                                        >
                                            {isCompleted ? (
                                                <Check className="w-4 h-4" strokeWidth={3} />
                                            ) : (
                                                <span className="w-4 h-4" />
                                            )}
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-surface-200/50 text-center py-8">
                            No habits created yet
                        </p>
                    )}

                    {/* Summary for selected date */}
                    {habits.length > 0 && !isSelectedFuture && (
                        <div className="mt-4 pt-4 border-t border-black/10 dark:border-white/10">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-black/60 dark:text-white/60">Completion</span>
                                <span className="font-semibold text-black dark:text-white">
                                    {selectedDateLogs.filter(l => l.completed).length} / {habits.length}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

```



---

## app\dashboard\habits

### `app\dashboard\habits\page.tsx`

```tsx
"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    format,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    addWeeks,
    subWeeks,
    addMonths,
    subMonths,
    eachDayOfInterval,
    isSameDay,
    isToday,
    isFuture,
    subDays,
} from "date-fns";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Check,
    X,
    Flame,
    MoreVertical,
    Edit2,
    Trash2,
    Loader2,
    CalendarDays,
    LayoutGrid,
    CalendarRange,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useHabits } from "@/hooks/useHabits";
import { HabitWithLog, Habit, habitColors } from "@/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { HabitForm } from "@/components/habits/HabitForm";
import toast from "react-hot-toast";

// Types
type ViewMode = "weekly" | "monthly" | "custom";

interface DateRange {
    startDate: Date;
    endDate: Date;
    label: string;
}

interface DayLog {
    date: Date;
    completed: boolean;
}

interface HabitData {
    habit: HabitWithLog;
    logs: DayLog[];
    completionRate: number;
}

// Preset ranges for custom view
const presetRanges: { label: string; getRange: () => DateRange }[] = [
    {
        label: "Last 7 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 6),
            endDate: new Date(),
            label: "Last 7 Days",
        }),
    },
    {
        label: "Last 14 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 13),
            endDate: new Date(),
            label: "Last 14 Days",
        }),
    },
    {
        label: "Last 30 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 29),
            endDate: new Date(),
            label: "Last 30 Days",
        }),
    },
    {
        label: "This Week",
        getRange: () => ({
            startDate: startOfWeek(new Date(), { weekStartsOn: 0 }),
            endDate: endOfWeek(new Date(), { weekStartsOn: 0 }),
            label: "This Week",
        }),
    },
    {
        label: "This Month",
        getRange: () => ({
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
            label: "This Month",
        }),
    },
];

export default function HabitsPage() {
    const { habits, fetchHabits, addHabit, updateHabit, deleteHabit } = useHabits();

    // View mode state
    const [viewMode, setViewMode] = useState<ViewMode>("weekly");

    // Date navigation state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [customRange, setCustomRange] = useState<DateRange>({
        startDate: subDays(new Date(), 6),
        endDate: new Date(),
        label: "Last 7 Days",
    });

    // Data state
    const [habitsData, setHabitsData] = useState<HabitData[]>([]);
    const [isLoadingLogs, setIsLoadingLogs] = useState(false);

    // UI state
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [deletingHabit, setDeletingHabit] = useState<HabitWithLog | null>(null);
    const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
    const [showRangePicker, setShowRangePicker] = useState(false);

    // Calculate date range based on view mode
    const dateRange = useMemo(() => {
        switch (viewMode) {
            case "weekly":
                return {
                    start: startOfWeek(currentDate, { weekStartsOn: 0 }),
                    end: endOfWeek(currentDate, { weekStartsOn: 0 }),
                };
            case "monthly":
                return {
                    start: startOfMonth(currentDate),
                    end: endOfMonth(currentDate),
                };
            case "custom":
                return { start: customRange.startDate, end: customRange.endDate };
            default:
                return { start: currentDate, end: currentDate };
        }
    }, [viewMode, currentDate, customRange]);

    // Generate array of dates
    const days = useMemo(() => {
        return eachDayOfInterval({ start: dateRange.start, end: dateRange.end });
    }, [dateRange]);

    // Reverse for display (most recent first) if more than 7 days
    const displayDays = useMemo(() => {
        return days.length > 7 ? [...days].reverse() : days;
    }, [days]);

    // Fetch habits on mount
    useEffect(() => {
        fetchHabits().finally(() => setIsLoading(false));
    }, [fetchHabits]);

    // Fetch logs when date range or habits change
    useEffect(() => {
        if (habits.length > 0) {
            fetchLogs();
        } else {
            setHabitsData([]);
        }
    }, [dateRange, habits]);

    const fetchLogs = async () => {
        setIsLoadingLogs(true);
        try {
            const response = await fetch(
                `/api/logs?startDate=${dateRange.start.toISOString()}&endDate=${dateRange.end.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const habitsWithData: HabitData[] = habits.map((habit) => {
                const habitLogs: DayLog[] = days.map((day) => {
                    const dayLog = logs.find(
                        (log: any) =>
                            log.habitId === habit._id && isSameDay(new Date(log.date), day)
                    );
                    return {
                        date: day,
                        completed: dayLog?.completed || false,
                    };
                });

                const completedCount = habitLogs.filter((l) => l.completed).length;
                const validDays = habitLogs.filter(
                    (l) => !isFuture(l.date) || isToday(l.date)
                ).length;
                const completionRate =
                    validDays > 0 ? Math.round((completedCount / validDays) * 100) : 0;

                return { habit, logs: habitLogs, completionRate };
            });

            setHabitsData(habitsWithData);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
            toast.error("Failed to load habit data");
        } finally {
            setIsLoadingLogs(false);
        }
    };

    // Navigation handlers
    const goToPrevious = () => {
        switch (viewMode) {
            case "weekly":
                setCurrentDate(subWeeks(currentDate, 1));
                break;
            case "monthly":
                setCurrentDate(subMonths(currentDate, 1));
                break;
            default:
                break;
        }
    };

    const goToNext = () => {
        switch (viewMode) {
            case "weekly":
                setCurrentDate(addWeeks(currentDate, 1));
                break;
            case "monthly":
                setCurrentDate(addMonths(currentDate, 1));
                break;
            default:
                break;
        }
    };

    const goToToday = () => {
        setCurrentDate(new Date());
    };

    // Toggle habit completion
    const handleToggle = async (
        habitId: string,
        date: Date,
        currentCompleted: boolean
    ) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark future dates");
            return;
        }

        // Optimistic update
        setHabitsData((prev) =>
            prev.map((hd) => {
                if (hd.habit._id === habitId) {
                    const newLogs = hd.logs.map((log) =>
                        isSameDay(log.date, date)
                            ? { ...log, completed: !currentCompleted }
                            : log
                    );
                    const completedCount = newLogs.filter((l) => l.completed).length;
                    const validDays = newLogs.filter(
                        (l) => !isFuture(l.date) || isToday(l.date)
                    ).length;
                    return {
                        ...hd,
                        logs: newLogs,
                        completionRate:
                            validDays > 0
                                ? Math.round((completedCount / validDays) * 100)
                                : 0,
                    };
                }
                return hd;
            })
        );

        try {
            const response = await fetch(`/api/habits/${habitId}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    completed: !currentCompleted,
                    date: date.toISOString(),
                }),
            });

            if (!response.ok) throw new Error("Failed to update");

            if (!currentCompleted) {
                toast.success("Habit completed! 🎉", { duration: 1500 });
            }

            // Refresh habits to update streaks
            fetchHabits();
        } catch (error) {
            // Revert on error
            fetchLogs();
            toast.error("Failed to update habit");
        }
    };

    // Form handlers
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

    // Get title based on view mode
    const getTitle = () => {
        switch (viewMode) {
            case "weekly":
                return `${format(dateRange.start, "MMM d")} - ${format(dateRange.end, "MMM d, yyyy")}`;
            case "monthly":
                return format(currentDate, "MMMM yyyy");
            case "custom":
                return customRange.label;
            default:
                return format(currentDate, "MMMM d, yyyy");
        }
    };

    // Calculate column width based on number of days
    const getColumnWidth = () => {
        if (days.length <= 7) return "w-12";
        if (days.length <= 14) return "w-10";
        return "w-8";
    };

    const viewModes = [
        { value: "weekly" as ViewMode, label: "Weekly", icon: CalendarDays },
        { value: "monthly" as ViewMode, label: "Monthly", icon: LayoutGrid },
        { value: "custom" as ViewMode, label: "Custom", icon: CalendarRange },
    ];

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-[#4D7CFE]" />
            </div>
        );
    }

    return (
        <div className="page-container">
            {/* Header */}
            <div className="page-header">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="page-title">Habit Tracker</h1>
                        <p className="page-subtitle">
                            Track your habits across days, weeks, or custom date ranges.
                        </p>
                    </div>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-5 w-5" />
                        Add Habit
                    </Button>
                </div>
            </div>

            {/* View Mode Selector */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-1 rounded-xl border border-black/10 bg-white p-1 dark:border-white/10 dark:bg-white/5">
                    {viewModes.map((mode) => (
                        <button
                            key={mode.value}
                            onClick={() => setViewMode(mode.value)}
                            className={cn(
                                "flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold uppercase tracking-wider transition",
                                viewMode === mode.value
                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                    : "text-black/60 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                            )}
                        >
                            <mode.icon className="h-4 w-4" />
                            <span className="hidden sm:inline">{mode.label}</span>
                        </button>
                    ))}
                </div>

                {/* Date Navigation */}
                {viewMode !== "custom" ? (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={goToPrevious}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 text-black transition hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <div className="min-w-[200px] text-center">
                            <span className="text-lg font-bold text-black dark:text-white">
                                {getTitle()}
                            </span>
                        </div>

                        <button
                            onClick={goToNext}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 text-black transition hover:bg-black hover:text-white dark:border-white/15 dark:text-white dark:hover:bg-white dark:hover:text-black"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>

                        <button
                            onClick={goToToday}
                            className="rounded-xl bg-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                        >
                            Today
                        </button>
                    </div>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setShowRangePicker(!showRangePicker)}
                            className="flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:border-black/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
                        >
                            <CalendarRange className="h-4 w-4" />
                            <span>{customRange.label}</span>
                            <ChevronRight
                                className={cn(
                                    "h-4 w-4 transition",
                                    showRangePicker && "rotate-90"
                                )}
                            />
                        </button>

                        <AnimatePresence>
                            {showRangePicker && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setShowRangePicker(false)}
                                    />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-black/10 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-surface-900"
                                    >
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                            Quick Select
                                        </p>
                                        <div className="space-y-2">
                                            {presetRanges.map((preset) => (
                                                <button
                                                    key={preset.label}
                                                    onClick={() => {
                                                        setCustomRange(preset.getRange());
                                                        setShowRangePicker(false);
                                                    }}
                                                    className={cn(
                                                        "w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition",
                                                        customRange.label === preset.label
                                                            ? "bg-black text-white dark:bg-white dark:text-black"
                                                            : "bg-black/5 text-black/70 hover:bg-black/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                                                    )}
                                                >
                                                    {preset.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>
                )}
            </div>

            {/* Habit Matrix View */}
            {habits.length > 0 ? (
                <>
                    <div className="card overflow-hidden">
                        {isLoadingLogs ? (
                            <div className="flex items-center justify-center py-16">
                                <Loader2 className="h-8 w-8 animate-spin text-black/30 dark:text-white/30" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto habit-matrix-scroll">
                                <table className="w-full min-w-[600px]">
                                    {/* Header with dates */}
                                    <thead>
                                        <tr className="border-b border-black/10 dark:border-white/10">
                                            <th className="sticky left-0 z-10 bg-white px-4 py-4 text-left dark:bg-surface-900">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                                    Habit
                                                </span>
                                            </th>
                                            {displayDays.map((day) => (
                                                <th
                                                    key={day.toISOString()}
                                                    className={cn(
                                                        "px-1 py-3 text-center",
                                                        getColumnWidth()
                                                    )}
                                                >
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">
                                                            {format(day, "EEE")}
                                                        </span>
                                                        <span
                                                            className={cn(
                                                                "mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold",
                                                                isToday(day)
                                                                    ? "bg-[#4D7CFE] text-white"
                                                                    : "text-black/70 dark:text-white/70"
                                                            )}
                                                        >
                                                            {format(day, "d")}
                                                        </span>
                                                    </div>
                                                </th>
                                            ))}
                                            <th className="px-4 py-4 text-center">
                                                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                                    Rate
                                                </span>
                                            </th>
                                            <th className="w-12 px-2 py-4" />
                                        </tr>
                                    </thead>

                                    {/* Habit rows */}
                                    <tbody>
                                        {habitsData.map(
                                            ({ habit, logs, completionRate }, rowIndex) => {
                                                const colors =
                                                    habitColors[
                                                    habit.color as keyof typeof habitColors
                                                    ] || habitColors.purple;

                                                // Get logs in display order
                                                const displayLogs =
                                                    days.length > 7 ? [...logs].reverse() : logs;

                                                return (
                                                    <motion.tr
                                                        key={habit._id}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: rowIndex * 0.03 }}
                                                        className="group border-b border-black/5 last:border-0 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                                    >
                                                        {/* Habit info cell */}
                                                        <td className="sticky left-0 z-10 bg-white px-4 py-3 dark:bg-surface-900 group-hover:bg-gray-50 dark:group-hover:bg-surface-800/50">
                                                            <div className="flex items-center gap-3">
                                                                {/* Progress ring */}
                                                                <div className="relative h-10 w-10 flex-shrink-0">
                                                                    <svg
                                                                        className="h-10 w-10 -rotate-90 transform"
                                                                        viewBox="0 0 36 36"
                                                                    >
                                                                        <circle
                                                                            cx="18"
                                                                            cy="18"
                                                                            r="15"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            strokeWidth="3"
                                                                            className="text-black/10 dark:text-white/10"
                                                                        />
                                                                        <circle
                                                                            cx="18"
                                                                            cy="18"
                                                                            r="15"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            strokeWidth="3"
                                                                            strokeDasharray={`${completionRate} 100`}
                                                                            strokeLinecap="round"
                                                                            className={colors.text}
                                                                        />
                                                                    </svg>
                                                                    <div
                                                                        className={cn(
                                                                            "absolute inset-1 flex items-center justify-center rounded-full text-sm",
                                                                            colors.bg
                                                                        )}
                                                                    >
                                                                        {habit.icon}
                                                                    </div>
                                                                </div>

                                                                {/* Title and streak */}
                                                                <div className="min-w-0 flex-1">
                                                                    <p className="truncate font-semibold text-black dark:text-white">
                                                                        {habit.title}
                                                                    </p>
                                                                    {habit.streak.current > 0 && (
                                                                        <div className="flex items-center gap-1 text-orange-500">
                                                                            <Flame className="h-3 w-3" />
                                                                            <span className="text-xs font-semibold">
                                                                                {habit.streak.current}d streak
                                                                            </span>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </td>

                                                        {/* Day cells */}
                                                        {displayLogs.map((log, index) => {
                                                            const isFutureDay =
                                                                isFuture(log.date) && !isToday(log.date);
                                                            const isTodayDate = isToday(log.date);

                                                            return (
                                                                <td
                                                                    key={index}
                                                                    className={cn(
                                                                        "px-1 py-3 text-center",
                                                                        getColumnWidth()
                                                                    )}
                                                                >
                                                                    <motion.button
                                                                        whileHover={
                                                                            !isFutureDay
                                                                                ? { scale: 1.15 }
                                                                                : undefined
                                                                        }
                                                                        whileTap={
                                                                            !isFutureDay
                                                                                ? { scale: 0.9 }
                                                                                : undefined
                                                                        }
                                                                        onClick={() =>
                                                                            handleToggle(
                                                                                habit._id,
                                                                                log.date,
                                                                                log.completed
                                                                            )
                                                                        }
                                                                        disabled={isFutureDay}
                                                                        className={cn(
                                                                            "mx-auto flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                                                                            log.completed
                                                                                ? `bg-gradient-to-br ${colors.gradient} text-white shadow-md`
                                                                                : "text-black/30 dark:text-white/30",
                                                                            isFutureDay &&
                                                                            "cursor-not-allowed opacity-20",
                                                                            isTodayDate &&
                                                                            !log.completed &&
                                                                            "ring-2 ring-[#4D7CFE]/30"
                                                                        )}
                                                                    >
                                                                        {log.completed ? (
                                                                            <Check
                                                                                className="h-4 w-4"
                                                                                strokeWidth={3}
                                                                            />
                                                                        ) : isFutureDay ? null : (
                                                                            <X className="h-4 w-4 opacity-40" />
                                                                        )}
                                                                    </motion.button>
                                                                </td>
                                                            );
                                                        })}

                                                        {/* Completion rate */}
                                                        <td className="px-4 py-3 text-center">
                                                            <span
                                                                className={cn(
                                                                    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
                                                                    completionRate >= 80
                                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                                        : completionRate >= 50
                                                                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                                )}
                                                            >
                                                                {completionRate}%
                                                            </span>
                                                        </td>

                                                        {/* Actions menu */}
                                                        <td className="px-2 py-3">
                                                            <div className="relative">
                                                                <button
                                                                    onClick={() =>
                                                                        setMenuOpenFor(
                                                                            menuOpenFor === habit._id
                                                                                ? null
                                                                                : habit._id
                                                                        )
                                                                    }
                                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 opacity-0 transition-all hover:bg-black/5 hover:text-black/60 group-hover:opacity-100 dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white/60"
                                                                >
                                                                    <MoreVertical className="h-4 w-4" />
                                                                </button>

                                                                <AnimatePresence>
                                                                    {menuOpenFor === habit._id && (
                                                                        <>
                                                                            <div
                                                                                className="fixed inset-0 z-10"
                                                                                onClick={() =>
                                                                                    setMenuOpenFor(null)
                                                                                }
                                                                            />
                                                                            <motion.div
                                                                                initial={{
                                                                                    opacity: 0,
                                                                                    scale: 0.95,
                                                                                    y: -8,
                                                                                }}
                                                                                animate={{
                                                                                    opacity: 1,
                                                                                    scale: 1,
                                                                                    y: 0,
                                                                                }}
                                                                                exit={{
                                                                                    opacity: 0,
                                                                                    scale: 0.95,
                                                                                }}
                                                                                className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-surface-900"
                                                                            >
                                                                                <button
                                                                                    onClick={() => {
                                                                                        setMenuOpenFor(null);
                                                                                        setEditingHabit(habit);
                                                                                        setShowForm(true);
                                                                                    }}
                                                                                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-black/5 dark:hover:bg-white/5"
                                                                                >
                                                                                    <Edit2 className="h-4 w-4" />
                                                                                    Edit
                                                                                </button>
                                                                                <button
                                                                                    onClick={() => {
                                                                                        setMenuOpenFor(null);
                                                                                        setDeletingHabit(habit);
                                                                                    }}
                                                                                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                                >
                                                                                    <Trash2 className="h-4 w-4" />
                                                                                    Delete
                                                                                </button>
                                                                            </motion.div>
                                                                        </>
                                                                    )}
                                                                </AnimatePresence>
                                                            </div>
                                                        </td>
                                                    </motion.tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Legend */}
                        <div className="flex items-center justify-center gap-6 border-t border-black/10 px-4 py-4 dark:border-white/10">
                            <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-green-400 to-green-600 text-white">
                                    <Check className="h-3 w-3" strokeWidth={3} />
                                </div>
                                <span className="text-xs text-black/50 dark:text-white/50">
                                    Completed
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-6 w-6 items-center justify-center rounded-md text-black/30 dark:text-white/30">
                                    <X className="h-3 w-3" />
                                </div>
                                <span className="text-xs text-black/50 dark:text-white/50">
                                    Missed
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-6 w-6 rounded-md bg-black/5 dark:bg-white/5" />
                                <span className="text-xs text-black/50 dark:text-white/50">
                                    Future
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Summary Stats */}
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-black text-black dark:text-white">
                                {habitsData.length}
                            </p>
                            <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                                Total Habits
                            </p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-black text-black dark:text-white">
                                {days.length}
                            </p>
                            <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                                Days Tracked
                            </p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-black text-green-500">
                                {habitsData.reduce(
                                    (acc, hd) =>
                                        acc + hd.logs.filter((l) => l.completed).length,
                                    0
                                )}
                            </p>
                            <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                                Completions
                            </p>
                        </div>
                        <div className="card p-4 text-center">
                            <p className="text-2xl font-black text-[#4D7CFE]">
                                {habitsData.length > 0
                                    ? Math.round(
                                        habitsData.reduce(
                                            (acc, hd) => acc + hd.completionRate,
                                            0
                                        ) / habitsData.length
                                    )
                                    : 0}
                                %
                            </p>
                            <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                                Avg Rate
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="card py-16 text-center"
                >
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
                        <span className="text-4xl">🌱</span>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-black dark:text-white">
                        No habits yet
                    </h3>
                    <p className="mx-auto mb-6 max-w-sm text-black/60 dark:text-white/60">
                        Create your first habit and start building daily consistency.
                    </p>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-5 w-5" />
                        Create First Habit
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

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deletingHabit}
                onClose={() => setDeletingHabit(null)}
                title="Delete Habit"
                size="sm"
            >
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                        <span className="text-3xl">{deletingHabit?.icon}</span>
                    </div>
                    <p className="mb-6 text-black/60 dark:text-white/60">
                        Delete <strong>"{deletingHabit?.title}"</strong>? This will remove
                        all completion history. This cannot be undone.
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

## app\dashboard\settings

### `app\dashboard\settings\page.tsx`

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

## app\dashboard\stats

### `app\dashboard\stats\page.tsx`

```tsx
﻿"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { Flame } from "lucide-react";
import { subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, subWeeks, subMonths } from "date-fns";
import { QuickStats } from "@/components/dashboard/QuickStats";
import { DateRangePicker, DateRange } from "@/components/habits/DateRangePicker";
import { cn } from "@/lib/utils";

const defaultRange: DateRange = {
    startDate: subDays(new Date(), 29),
    endDate: new Date(),
    label: "Last 30 Days",
};

export default function StatsPage() {
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dateRange, setDateRange] = useState<DateRange>(defaultRange);

    useEffect(() => {
        fetchStats();
    }, [dateRange]);

    const fetchStats = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams({
                startDate: dateRange.startDate.toISOString(),
                endDate: dateRange.endDate.toISOString(),
            });
            const response = await fetch(`/api/stats?${params}`);
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
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <h1 className="page-title">Statistics</h1>
                        <p className="page-subtitle">Deep performance metrics across habits, streaks, and consistency.</p>
                    </div>
                    <DateRangePicker value={dateRange} onChange={setDateRange} />
                </div>
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
                    <h3 className="card-title mb-6">Progress Over Time</h3>
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
                    <h3 className="card-title mb-6">Completion Rate ({dateRange.label})</h3>
                    <div className="h-64 flex items-center justify-center relative">
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
                            <div className="text-sm text-surface-200/50">Completion</div>
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
                                icon: "🔥",
                                title: "On Fire",
                                description: "7 day streak",
                                unlocked: (stats?.overview?.currentStreak || 0) >= 7,
                            },
                            {
                                icon: "⚡",
                                title: "Momentum",
                                description: "30 day streak",
                                unlocked: (stats?.overview?.longestStreak || 0) >= 30,
                            },
                            {
                                icon: "🎯",
                                title: "Focused",
                                description: "100% weekly",
                                unlocked: (stats?.overview?.weeklyCompletionRate || 0) === 100,
                            },
                            {
                                icon: "🏆",
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

## components\brand

### `components\brand\DailyWinLogo.tsx`

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
    label = "DAY WIN",
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

## components\dashboard

### `components\dashboard\DailyProgress.tsx`

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



### `components\dashboard\MotivationalQuote.tsx`

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



### `components\dashboard\QuickStats.tsx`

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



### `components\dashboard\WeeklyChart.tsx`

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

## components\habits

### `components\habits\DailyHabitView.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { isSameDay, isToday, isFuture } from "date-fns";
import { Plus, Sparkles } from "lucide-react";
import { HabitCard } from "./HabitCard";
import { HabitForm } from "./HabitForm";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { HabitWithLog, Habit } from "@/types";
import toast from "react-hot-toast";

interface DailyHabitViewProps {
    habits: HabitWithLog[];
    selectedDate: Date;
    onToggleCompletion: (habitId: string, date: Date, completed: boolean) => Promise<void>;
    onAddHabit: (habit: Partial<Habit>) => Promise<void>;
    onUpdateHabit: (id: string, data: Partial<Habit>) => Promise<void>;
    onDeleteHabit: (id: string) => Promise<void>;
}

interface DayHabit extends HabitWithLog {
    dayCompleted: boolean;
}

export function DailyHabitView({
    habits,
    selectedDate,
    onToggleCompletion,
    onAddHabit,
    onUpdateHabit,
    onDeleteHabit,
}: DailyHabitViewProps) {
    const [habitsWithDayStatus, setHabitsWithDayStatus] = useState<DayHabit[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [editingHabit, setEditingHabit] = useState<HabitWithLog | null>(null);
    const [deletingHabit, setDeletingHabit] = useState<HabitWithLog | null>(null);

    const isViewingToday = isToday(selectedDate);
    const isViewingFuture = isFuture(selectedDate) && !isToday(selectedDate);

    useEffect(() => {
        if (isViewingToday) {
            // For today, use the todayLog from habits
            setHabitsWithDayStatus(
                habits.map((h) => ({
                    ...h,
                    dayCompleted: h.todayLog?.completed || false,
                }))
            );
        } else {
            // For other dates, fetch the logs
            fetchDayLogs();
        }
    }, [selectedDate, habits]);

    const fetchDayLogs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/logs?startDate=${selectedDate.toISOString()}&endDate=${selectedDate.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const habitsWithStatus: DayHabit[] = habits.map((habit) => {
                const dayLog = logs.find(
                    (log: any) => log.habitId === habit._id && isSameDay(new Date(log.date), selectedDate)
                );
                return {
                    ...habit,
                    dayCompleted: dayLog?.completed || false,
                    todayLog: dayLog || null,
                };
            });

            setHabitsWithDayStatus(habitsWithStatus);
        } catch (error) {
            console.error("Failed to fetch day logs:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleComplete = async (habitId: string, completed: boolean) => {
        if (isViewingFuture) {
            toast.error("Cannot mark habits for future dates");
            return { streak: undefined };
        }

        // Optimistic update
        setHabitsWithDayStatus((prev) =>
            prev.map((h) => (h._id === habitId ? { ...h, dayCompleted: completed } : h))
        );

        try {
            await onToggleCompletion(habitId, selectedDate, completed);
            return { streak: undefined };
        } catch (error) {
            // Revert on error
            setHabitsWithDayStatus((prev) =>
                prev.map((h) => (h._id === habitId ? { ...h, dayCompleted: !completed } : h))
            );
            throw error;
        }
    };

    const handleSubmit = async (data: Partial<Habit>) => {
        if (editingHabit) {
            await onUpdateHabit(editingHabit._id, data);
        } else {
            await onAddHabit(data);
        }
        setShowForm(false);
        setEditingHabit(null);
    };

    const handleDelete = async () => {
        if (deletingHabit) {
            await onDeleteHabit(deletingHabit._id);
            setDeletingHabit(null);
        }
    };

    const pendingHabits = habitsWithDayStatus.filter((h) => !h.dayCompleted);
    const completedHabits = habitsWithDayStatus.filter((h) => h.dayCompleted);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Warning for future dates */}
            {isViewingFuture && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-yellow-500/30 bg-yellow-50 p-4 text-center dark:bg-yellow-900/20"
                >
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                        You're viewing a future date. Habits cannot be marked for future dates.
                    </p>
                </motion.div>
            )}

            {/* Add Habit Button */}
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowForm(true)}
                className="w-full rounded-2xl border-2 border-dashed border-black/20 p-4 transition hover:border-black/40 dark:border-white/20 dark:hover:border-white/40"
            >
                <div className="flex items-center justify-center gap-3 text-black/50 dark:text-white/50">
                    <Plus className="h-5 w-5" />
                    <span className="font-medium">Add new habit</span>
                </div>
            </motion.button>

            {/* Pending Habits */}
            {pendingHabits.length > 0 && (
                <div className="space-y-4">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
                        <span>To Do</span>
                        <span className="rounded-full bg-primary-100 px-2 py-0.5 text-sm text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
                            {pendingHabits.length}
                        </span>
                    </h2>
                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {pendingHabits.map((habit, index) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={{ ...habit, todayLog: habit.dayCompleted ? habit.todayLog : undefined }}
                                    index={index}
                                    onComplete={(completed) => handleComplete(habit._id, completed)}
                                    onEdit={() => {
                                        setEditingHabit(habit);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => setDeletingHabit(habit)}
                                    disabled={isViewingFuture}
                                    isCompleted={habit.dayCompleted}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Completed Habits */}
            {completedHabits.length > 0 && (
                <div className="space-y-4">
                    <h2 className="flex items-center gap-2 text-lg font-semibold text-black dark:text-white">
                        <Sparkles className="h-5 w-5 text-success-500" />
                        <span>Completed</span>
                        <span className="rounded-full bg-success-100 px-2 py-0.5 text-sm text-success-600 dark:bg-success-900/30 dark:text-success-400">
                            {completedHabits.length}
                        </span>
                    </h2>
                    <div className="space-y-3 opacity-75">
                        <AnimatePresence mode="popLayout">
                            {completedHabits.map((habit, index) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={{ ...habit, todayLog: { ...habit.todayLog!, completed: true } }}
                                    index={index}
                                    onComplete={(completed) => handleComplete(habit._id, completed)}
                                    onEdit={() => {
                                        setEditingHabit(habit);
                                        setShowForm(true);
                                    }}
                                    onDelete={() => setDeletingHabit(habit)}
                                    disabled={isViewingFuture}
                                    isCompleted={habit.dayCompleted}
                                />
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {habitsWithDayStatus.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-16 text-center"
                >
                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30">
                        <span className="text-5xl">🌱</span>
                    </div>
                    <h3 className="mb-2 text-xl font-semibold text-black dark:text-white">
                        Start your journey
                    </h3>
                    <p className="mx-auto mb-6 max-w-sm text-black/60 dark:text-white/60">
                        Create your first habit and begin building a better version of yourself.
                    </p>
                    <Button onClick={() => setShowForm(true)}>
                        <Plus className="h-5 w-5" />
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
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                        <span className="text-3xl">{deletingHabit?.icon}</span>
                    </div>
                    <p className="mb-6 text-black/60 dark:text-white/60">
                        Are you sure you want to delete <strong>"{deletingHabit?.title}"</strong>? This action cannot be undone.
                    </p>
                    <div className="flex gap-3">
                        <Button variant="secondary" onClick={() => setDeletingHabit(null)} className="flex-1">
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



### `components\habits\DateNavigator.tsx`

```tsx
"use client";

import { format, addDays, subDays, isToday, isFuture } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DatePicker } from "@/components/ui/DatePicker";

interface DateNavigatorProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
    className?: string;
}

export function DateNavigator({ selectedDate, onDateChange, className }: DateNavigatorProps) {
    const goToPreviousDay = () => {
        onDateChange(subDays(selectedDate, 1));
    };

    const goToNextDay = () => {
        const nextDay = addDays(selectedDate, 1);
        if (!isFuture(nextDay) || isToday(nextDay)) {
            onDateChange(nextDay);
        }
    };

    const goToToday = () => {
        onDateChange(new Date());
    };

    const isSelectedToday = isToday(selectedDate);
    const canGoNext = !isFuture(addDays(selectedDate, 1)) || isToday(addDays(selectedDate, 1));

    const getDateLabel = () => {
        if (isToday(selectedDate)) return "Today";
        if (isToday(addDays(selectedDate, 1))) return "Yesterday";
        return format(selectedDate, "EEEE");
    };

    return (
        <div className={cn("flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between", className)}>
            <div className="flex items-center gap-3">
                {/* Previous Day */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={goToPreviousDay}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 bg-white text-black transition hover:border-black/30 hover:bg-black hover:text-white dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 dark:hover:bg-white dark:hover:text-black"
                >
                    <ChevronLeft className="h-5 w-5" />
                </motion.button>

                {/* Date Display */}
                <div className="flex flex-col items-center">
                    <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                        {getDateLabel()}
                    </span>
                    <span className="text-lg font-bold text-black dark:text-white">
                        {format(selectedDate, "MMM d, yyyy")}
                    </span>
                </div>

                {/* Next Day */}
                <motion.button
                    whileHover={canGoNext ? { scale: 1.05 } : undefined}
                    whileTap={canGoNext ? { scale: 0.95 } : undefined}
                    onClick={goToNextDay}
                    disabled={!canGoNext}
                    className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl border border-black/15 bg-white text-black transition dark:border-white/15 dark:bg-white/5 dark:text-white",
                        canGoNext
                            ? "hover:border-black/30 hover:bg-black hover:text-white dark:hover:border-white/30 dark:hover:bg-white dark:hover:text-black"
                            : "cursor-not-allowed opacity-30"
                    )}
                >
                    <ChevronRight className="h-5 w-5" />
                </motion.button>
            </div>

            <div className="flex items-center gap-3">
                {/* Date Picker */}
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        if (!isFuture(date) || isToday(date)) {
                            onDateChange(date);
                        }
                    }}
                />

                {/* Today Button */}
                {!isSelectedToday && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={goToToday}
                        className="flex items-center gap-2 rounded-xl bg-black px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                    >
                        <CalendarDays className="h-4 w-4" />
                        Today
                    </motion.button>
                )}
            </div>
        </div>
    );
}

```



### `components\habits\DateRangePicker.tsx`

```tsx
"use client";

import { useState } from "react";
import {
    format,
    subDays,
    subWeeks,
    subMonths,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    isSameDay,
    addMonths,
    subMonths as dateFnsSubMonths,
    startOfDay,
} from "date-fns";
import { CalendarRange, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export interface DateRange {
    startDate: Date;
    endDate: Date;
    label: string;
}

interface DateRangePickerProps {
    value: DateRange;
    onChange: (range: DateRange) => void;
    className?: string;
}

const presetRanges: { label: string; getRange: () => DateRange }[] = [
    {
        label: "Last 7 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 6),
            endDate: new Date(),
            label: "Last 7 Days",
        }),
    },
    {
        label: "Last 14 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 13),
            endDate: new Date(),
            label: "Last 14 Days",
        }),
    },
    {
        label: "Last 30 Days",
        getRange: () => ({
            startDate: subDays(new Date(), 29),
            endDate: new Date(),
            label: "Last 30 Days",
        }),
    },
    {
        label: "This Week",
        getRange: () => ({
            startDate: startOfWeek(new Date()),
            endDate: endOfWeek(new Date()),
            label: "This Week",
        }),
    },
    {
        label: "Last Week",
        getRange: () => ({
            startDate: startOfWeek(subWeeks(new Date(), 1)),
            endDate: endOfWeek(subWeeks(new Date(), 1)),
            label: "Last Week",
        }),
    },
    {
        label: "This Month",
        getRange: () => ({
            startDate: startOfMonth(new Date()),
            endDate: endOfMonth(new Date()),
            label: "This Month",
        }),
    },
    {
        label: "Last Month",
        getRange: () => ({
            startDate: startOfMonth(subMonths(new Date(), 1)),
            endDate: endOfMonth(subMonths(new Date(), 1)),
            label: "Last Month",
        }),
    },
];

export function DateRangePicker({ value, onChange, className }: DateRangePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectingStart, setSelectingStart] = useState(true);
    const [tempStart, setTempStart] = useState<Date | null>(null);
    const [tempEnd, setTempEnd] = useState<Date | null>(null);
    const [viewMonth, setViewMonth] = useState(new Date());

    const handlePresetSelect = (preset: typeof presetRanges[0]) => {
        const range = preset.getRange();
        onChange(range);
        setIsOpen(false);
    };

    const handleDayClick = (date: Date) => {
        if (selectingStart) {
            setTempStart(date);
            setTempEnd(null);
            setSelectingStart(false);
        } else {
            if (tempStart && date >= tempStart) {
                setTempEnd(date);
                onChange({
                    startDate: tempStart,
                    endDate: date,
                    label: `${format(tempStart, "MMM d")} - ${format(date, "MMM d, yyyy")}`,
                });
                setIsOpen(false);
                setSelectingStart(true);
                setTempStart(null);
                setTempEnd(null);
            } else {
                // If end date is before start, swap them
                setTempStart(date);
                setSelectingStart(false);
            }
        }
    };

    const renderCalendar = () => {
        const monthStart = startOfMonth(viewMonth);
        const daysInMonth = new Date(
            viewMonth.getFullYear(),
            viewMonth.getMonth() + 1,
            0
        ).getDate();
        const startDay = monthStart.getDay();

        const days = [];

        // Empty cells for offset
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} />);
        }

        // Day cells
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), i);
            const isSelected =
                (tempStart && isSameDay(date, tempStart)) ||
                (tempEnd && isSameDay(date, tempEnd));
            const isInRange =
                tempStart &&
                tempEnd &&
                date > tempStart &&
                date < tempEnd;
            const isStart = tempStart && isSameDay(date, tempStart);
            const isEnd = tempEnd && isSameDay(date, tempEnd);

            days.push(
                <button
                    key={i}
                    onClick={() => handleDayClick(date)}
                    className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition",
                        isSelected
                            ? "bg-[#4D7CFE] text-white"
                            : isInRange
                                ? "bg-[#4D7CFE]/20 text-[#4D7CFE]"
                                : "hover:bg-black/5 dark:hover:bg-white/5"
                    )}
                >
                    {i}
                </button>
            );
        }

        return days;
    };

    return (
        <div className={cn("relative", className)}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:border-black/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
            >
                <CalendarRange className="h-4 w-4" />
                <span>{value.label}</span>
                <ChevronDown
                    className={cn("h-4 w-4 transition", isOpen && "rotate-180")}
                />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40"
                            onClick={() => {
                                setIsOpen(false);
                                setSelectingStart(true);
                                setTempStart(null);
                                setTempEnd(null);
                            }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 top-full z-50 mt-2 w-80 rounded-2xl border border-black/10 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-surface-900"
                        >
                            {/* Presets */}
                            <div className="mb-4">
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    Quick Select
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {presetRanges.map((preset) => (
                                        <button
                                            key={preset.label}
                                            onClick={() => handlePresetSelect(preset)}
                                            className={cn(
                                                "rounded-lg px-3 py-2 text-xs font-medium transition",
                                                value.label === preset.label
                                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                                    : "bg-black/5 text-black/70 hover:bg-black/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                                            )}
                                        >
                                            {preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Custom Range Calendar */}
                            <div className="border-t border-black/10 pt-4 dark:border-white/10">
                                <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    {selectingStart
                                        ? "Select Start Date"
                                        : "Select End Date"}
                                </p>

                                {/* Month Navigation */}
                                <div className="mb-3 flex items-center justify-between">
                                    <button
                                        onClick={() =>
                                            setViewMonth(dateFnsSubMonths(viewMonth, 1))
                                        }
                                        className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>
                                    <span className="text-sm font-semibold text-black dark:text-white">
                                        {format(viewMonth, "MMMM yyyy")}
                                    </span>
                                    <button
                                        onClick={() =>
                                            setViewMonth(addMonths(viewMonth, 1))
                                        }
                                        className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/5"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Day Headers */}
                                <div className="mb-1 grid grid-cols-7 text-center text-[10px] font-semibold text-black/40 dark:text-white/40">
                                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
                                        (d) => (
                                            <div key={d} className="py-1">
                                                {d}
                                            </div>
                                        )
                                    )}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {renderCalendar()}
                                </div>

                                {/* Selection Info */}
                                {(tempStart || tempEnd) && (
                                    <div className="mt-3 flex items-center justify-between rounded-lg bg-black/5 px-3 py-2 text-xs dark:bg-white/5">
                                        <span className="text-black/60 dark:text-white/60">
                                            {tempStart
                                                ? format(tempStart, "MMM d, yyyy")
                                                : "—"}
                                        </span>
                                        <span className="text-black/40 dark:text-white/40">
                                            →
                                        </span>
                                        <span className="text-black/60 dark:text-white/60">
                                            {tempEnd
                                                ? format(tempEnd, "MMM d, yyyy")
                                                : "Select end"}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}

```



### `components\habits\HabitCard.tsx`

```tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, MoreVertical, Flame, Edit, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import { HabitIcon } from "./HabitIcon";
import { fireSmallConfetti, fireStreakConfetti } from "@/lib/confetti";

interface HabitCardProps {
    habit: HabitWithLog;
    onComplete: (completed: boolean) => Promise<{ streak?: { current: number } }>;
    onEdit: () => void;
    onDelete: () => void;
    index: number;
    disabled?: boolean;
    isCompleted?: boolean;
}

export function HabitCard({
    habit,
    onComplete,
    onEdit,
    onDelete,
    index,
    disabled = false,
    isCompleted: isCompletedProp,
}: HabitCardProps) {
    const [isCompleted, setIsCompleted] = useState(isCompletedProp ?? habit.todayLog?.completed ?? false);
    const [isLoading, setIsLoading] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [showStreak, setShowStreak] = useState(false);

    const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;

    const handleComplete = async () => {
        if (isLoading || disabled) return;

        setIsLoading(true);
        const newCompleted = !isCompleted;
        setIsCompleted(newCompleted);

        try {
            const result = await onComplete(newCompleted);

            if (newCompleted && !disabled) {
                fireSmallConfetti();

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
            className={cn("habit-card group", disabled && "opacity-60")}
        >
            {/* Streak celebration overlay */}
            <AnimatePresence>
                {showStreak && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-gradient-to-r from-orange-500/90 to-red-500/90"
                    >
                        <div className="text-center text-white">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                            >
                                <Flame className="mx-auto h-12 w-12" />
                            </motion.div>
                            <p className="mt-2 text-xl font-bold">{habit.streak.current} Day Streak!</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex items-center gap-4">
                {/* Checkbox */}
                <motion.button
                    whileHover={!disabled ? { scale: 1.1 } : undefined}
                    whileTap={!disabled ? { scale: 0.9 } : undefined}
                    onClick={handleComplete}
                    disabled={isLoading || disabled}
                    className={cn(
                        "flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl",
                        "border-2 transition-all duration-300",
                        isCompleted
                            ? `bg-gradient-to-br ${colors.gradient} border-transparent shadow-lg`
                            : "border-surface-300 hover:border-primary-400 dark:border-surface-800",
                        disabled && "cursor-not-allowed"
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
                                <Check className="h-6 w-6 text-white" strokeWidth={3} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="empty"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className="h-6 w-6"
                            />
                        )}
                    </AnimatePresence>
                </motion.button>

                {/* Icon */}
                <div
                    className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        colors.bg
                    )}
                >
                    <HabitIcon icon={habit.icon} size="lg" className={colors.text} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                    <h3
                        className={cn(
                            "font-semibold text-surface-900 transition-all duration-300 dark:text-white",
                            isCompleted && "line-through opacity-60"
                        )}
                    >
                        {habit.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-3">
                        <span className={cn("text-xs font-medium", colors.text)}>
                            {habit.category}
                        </span>

                        {habit.streak.current > 0 && (
                            <div className="flex items-center gap-1 text-orange-500">
                                <Flame className="h-3.5 w-3.5" />
                                <span className="text-xs font-semibold">{habit.streak.current}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Menu */}
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="rounded-lg p-2 opacity-0 transition-all hover:bg-surface-100 group-hover:opacity-100 dark:hover:bg-surface-800"
                    >
                        <MoreVertical className="h-5 w-5 text-surface-400" />
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
                                    className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-surface-200 bg-white shadow-xl dark:border-surface-800 dark:bg-surface-900"
                                >
                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            onEdit();
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 transition-colors hover:bg-surface-100 dark:hover:bg-surface-800"
                                    >
                                        <Edit className="h-4 w-4 text-surface-400" />
                                        <span className="text-surface-900 dark:text-white">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowMenu(false);
                                            onDelete();
                                        }}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-4 w-4" />
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
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-surface-400">Progress</span>
                        <span className={colors.text}>
                            {habit.todayLog?.count ?? 0} / {habit.targetCount}
                        </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-surface-100 dark:bg-surface-800">
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



### `components\habits\HabitForm.tsx`

```tsx
"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dumbbell,
    Heart,
    Brain,
    Book,
    Droplets,
    Moon,
    Sun,
    Apple,
    Pill,
    Activity,
    Bike,
    Footprints,
    Flame,
    Target,
    Trophy,
    Star,
    Zap,
    Coffee,
    Cigarette,
    Wine,
    Music,
    Palette,
    Camera,
    Pen,
    Code,
    Briefcase,
    DollarSign,
    PiggyBank,
    TrendingUp,
    Users,
    MessageCircle,
    Phone,
    Home,
    Sparkles,
    Leaf,
    Smile,
    Clock,
    Calendar,
    CheckCircle,
    ListTodo,
    ChevronRight,
    ChevronLeft,
    Search,
    X,
    Check,
    LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
    Habit,
    HabitColor,
    HabitCategory,
    habitCategories,
} from "@/types";

interface HabitFormProps {
    habit?: Partial<Habit>;
    onSubmit: (data: Partial<Habit>) => Promise<void>;
    onCancel: () => void;
}

// Icon map for rendering
const iconComponents: Record<string, LucideIcon> = {
    Dumbbell,
    Heart,
    Brain,
    Book,
    Droplets,
    Moon,
    Sun,
    Apple,
    Pill,
    Activity,
    Bike,
    Walk: Footprints,
    Flame,
    Target,
    Trophy,
    Star,
    Zap,
    Coffee,
    Cigarette,
    Wine,
    Music,
    Palette,
    Camera,
    Pen,
    Code,
    Briefcase,
    DollarSign,
    PiggyBank,
    TrendingUp,
    Users,
    MessageCircle,
    Phone,
    Home,
    Sparkles,
    Leaf,
    Smile,
    Clock,
    Calendar,
    CheckCircle,
    ListTodo,
};

// Organized icons by category
const iconsByCategory: Record<string, { name: string; label: string }[]> = {
    fitness: [
        { name: "Dumbbell", label: "Workout" },
        { name: "Activity", label: "Exercise" },
        { name: "Bike", label: "Cycling" },
        { name: "Walk", label: "Walking" },
        { name: "Flame", label: "Cardio" },
    ],
    health: [
        { name: "Heart", label: "Health" },
        { name: "Apple", label: "Nutrition" },
        { name: "Droplets", label: "Water" },
        { name: "Pill", label: "Medication" },
        { name: "Moon", label: "Sleep" },
        { name: "Cigarette", label: "Quit Smoking" },
        { name: "Wine", label: "No Alcohol" },
    ],
    mindfulness: [
        { name: "Brain", label: "Meditation" },
        { name: "Sun", label: "Morning" },
        { name: "Smile", label: "Gratitude" },
        { name: "Leaf", label: "Nature" },
        { name: "Sparkles", label: "Self-care" },
    ],
    learning: [
        { name: "Book", label: "Reading" },
        { name: "Pen", label: "Writing" },
        { name: "Code", label: "Coding" },
    ],
    productivity: [
        { name: "Target", label: "Goals" },
        { name: "CheckCircle", label: "Tasks" },
        { name: "ListTodo", label: "To-do" },
        { name: "Clock", label: "Time" },
        { name: "Calendar", label: "Planning" },
        { name: "Briefcase", label: "Work" },
        { name: "Zap", label: "Energy" },
    ],
    creativity: [
        { name: "Music", label: "Music" },
        { name: "Palette", label: "Art" },
        { name: "Camera", label: "Photo" },
    ],
    finance: [
        { name: "DollarSign", label: "Money" },
        { name: "PiggyBank", label: "Savings" },
        { name: "TrendingUp", label: "Investing" },
    ],
    social: [
        { name: "Users", label: "Social" },
        { name: "MessageCircle", label: "Chat" },
        { name: "Phone", label: "Calls" },
        { name: "Home", label: "Family" },
    ],
    other: [
        { name: "Star", label: "Favorite" },
        { name: "Trophy", label: "Achievement" },
        { name: "Coffee", label: "Coffee" },
    ],
};

// FIXED: Color options with actual CSS color values
const colorOptions: {
    value: HabitColor;
    label: string;
    colors: {
        from: string;
        to: string;
        bg: string;
        text: string;
    };
}[] = [
        {
            value: "violet",
            label: "Violet",
            colors: {
                from: "#8b5cf6",
                to: "#7c3aed",
                bg: "#ede9fe",
                text: "#7c3aed",
            },
        },
        {
            value: "purple",
            label: "Purple",
            colors: {
                from: "#a855f7",
                to: "#9333ea",
                bg: "#f3e8ff",
                text: "#9333ea",
            },
        },
        {
            value: "blue",
            label: "Blue",
            colors: {
                from: "#3b82f6",
                to: "#2563eb",
                bg: "#dbeafe",
                text: "#2563eb",
            },
        },
        {
            value: "cyan",
            label: "Cyan",
            colors: {
                from: "#06b6d4",
                to: "#0891b2",
                bg: "#cffafe",
                text: "#0891b2",
            },
        },
        {
            value: "teal",
            label: "Teal",
            colors: {
                from: "#14b8a6",
                to: "#0d9488",
                bg: "#ccfbf1",
                text: "#0d9488",
            },
        },
        {
            value: "green",
            label: "Green",
            colors: {
                from: "#22c55e",
                to: "#16a34a",
                bg: "#dcfce7",
                text: "#16a34a",
            },
        },
        {
            value: "lime",
            label: "Lime",
            colors: {
                from: "#84cc16",
                to: "#65a30d",
                bg: "#ecfccb",
                text: "#65a30d",
            },
        },
        {
            value: "yellow",
            label: "Yellow",
            colors: {
                from: "#eab308",
                to: "#ca8a04",
                bg: "#fef9c3",
                text: "#ca8a04",
            },
        },
        {
            value: "orange",
            label: "Orange",
            colors: {
                from: "#f97316",
                to: "#ea580c",
                bg: "#ffedd5",
                text: "#ea580c",
            },
        },
        {
            value: "red",
            label: "Red",
            colors: {
                from: "#ef4444",
                to: "#dc2626",
                bg: "#fee2e2",
                text: "#dc2626",
            },
        },
        {
            value: "pink",
            label: "Pink",
            colors: {
                from: "#ec4899",
                to: "#db2777",
                bg: "#fce7f3",
                text: "#db2777",
            },
        },
        {
            value: "rose",
            label: "Rose",
            colors: {
                from: "#f43f5e",
                to: "#e11d48",
                bg: "#ffe4e6",
                text: "#e11d48",
            },
        },
    ];

const frequencyOptions = [
    { value: "daily", label: "Every Day", description: "Repeat daily" },
    { value: "weekly", label: "Specific Days", description: "Choose days of week" },
    { value: "custom", label: "Custom", description: "Set your own schedule" },
];

const daysOfWeek = [
    { value: 0, label: "Sun", fullLabel: "Sunday" },
    { value: 1, label: "Mon", fullLabel: "Monday" },
    { value: 2, label: "Tue", fullLabel: "Tuesday" },
    { value: 3, label: "Wed", fullLabel: "Wednesday" },
    { value: 4, label: "Thu", fullLabel: "Thursday" },
    { value: 5, label: "Fri", fullLabel: "Friday" },
    { value: 6, label: "Sat", fullLabel: "Saturday" },
];

type FormStep = "basics" | "schedule" | "review";

export function HabitForm({ habit, onSubmit, onCancel }: HabitFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState<FormStep>("basics");
    const [iconSearch, setIconSearch] = useState("");
    const [showAllIcons, setShowAllIcons] = useState(false);

    const [formData, setFormData] = useState({
        title: habit?.title || "",
        description: habit?.description || "",
        icon: habit?.icon || "Star",
        color: (habit?.color as HabitColor) || "purple",
        category: (habit?.category as HabitCategory) || "other",
        frequency: {
            type: habit?.frequency?.type || "daily",
            daysOfWeek: habit?.frequency?.daysOfWeek || [0, 1, 2, 3, 4, 5, 6],
            timesPerPeriod: habit?.frequency?.timesPerPeriod || 1,
            periodDays: habit?.frequency?.periodDays || 7,
        },
        targetCount: habit?.targetCount || 1,
    });

    // Get selected color configuration
    const selectedColorConfig = colorOptions.find((c) => c.value === formData.color) || colorOptions[1];

    // Filter icons based on search
    const filteredIcons = useMemo(() => {
        if (!iconSearch) return iconsByCategory;

        const searchLower = iconSearch.toLowerCase();
        const filtered: typeof iconsByCategory = {};

        Object.entries(iconsByCategory).forEach(([category, icons]) => {
            const matchingIcons = icons.filter(
                (icon) =>
                    icon.name.toLowerCase().includes(searchLower) ||
                    icon.label.toLowerCase().includes(searchLower) ||
                    category.toLowerCase().includes(searchLower)
            );
            if (matchingIcons.length > 0) {
                filtered[category] = matchingIcons;
            }
        });

        return filtered;
    }, [iconSearch]);

    // Get suggested icons based on category
    const suggestedIcons = useMemo(() => {
        return iconsByCategory[formData.category] || iconsByCategory.other;
    }, [formData.category]);

    const handleSubmit = async () => {
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

    const goToStep = (step: FormStep) => {
        if (step === "schedule" && !formData.title.trim()) return;
        setCurrentStep(step);
    };

    const SelectedIcon = iconComponents[formData.icon] || Star;

    return (
        <div className="space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-2 pb-2">
                {(["basics", "schedule", "review"] as FormStep[]).map((step, index) => (
                    <button
                        key={step}
                        onClick={() => goToStep(step)}
                        disabled={step !== "basics" && !formData.title.trim()}
                        className={cn(
                            "flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition",
                            currentStep === step
                                ? "bg-black text-white dark:bg-white dark:text-black"
                                : "text-black/40 hover:text-black/70 dark:text-white/40 dark:hover:text-white/70"
                        )}
                    >
                        <span
                            className={cn(
                                "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                                currentStep === step
                                    ? "bg-white text-black dark:bg-black dark:text-white"
                                    : "bg-black/10 dark:bg-white/10"
                            )}
                        >
                            {index + 1}
                        </span>
                        {step === "basics" && "Basics"}
                        {step === "schedule" && "Schedule"}
                        {step === "review" && "Review"}
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {/* Step 1: Basics */}
                {currentStep === "basics" && (
                    <motion.div
                        key="basics"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="space-y-6"
                    >
                        {/* Habit Name */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
                                What habit do you want to build?
                            </label>
                            <Input
                                placeholder="e.g., Read for 30 minutes, Drink 8 glasses of water"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="text-lg"
                                autoFocus
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="mb-3 block text-sm font-semibold text-black dark:text-white">
                                Category
                            </label>
                            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                                {habitCategories.map((cat) => {
                                    const CatIcon = iconComponents[cat.icon] || Star;
                                    return (
                                        <button
                                            key={cat.value}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, category: cat.value })}
                                            className={cn(
                                                "flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition",
                                                formData.category === cat.value
                                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                    : "border-black/10 text-black/70 hover:border-black/30 dark:border-white/10 dark:text-white/70 dark:hover:border-white/30"
                                            )}
                                        >
                                            <CatIcon className="h-5 w-5" />
                                            <span className="text-[10px] font-semibold uppercase tracking-wider">
                                                {cat.label}
                                            </span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Icon Selection */}
                        <div>
                            <div className="mb-3 flex items-center justify-between">
                                <label className="text-sm font-semibold text-black dark:text-white">
                                    Icon
                                </label>
                                <button
                                    type="button"
                                    onClick={() => setShowAllIcons(!showAllIcons)}
                                    className="text-xs font-medium text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                                >
                                    {showAllIcons ? "Show less" : "Browse all"}
                                </button>
                            </div>

                            {/* Current Selection Preview */}
                            <div className="mb-4 flex items-center gap-4">
                                <div
                                    className="flex h-16 w-16 items-center justify-center rounded-2xl"
                                    style={{ backgroundColor: selectedColorConfig.colors.bg }}
                                >
                                    <SelectedIcon
                                        className="h-8 w-8"
                                        style={{ color: selectedColorConfig.colors.text }}
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-black dark:text-white">
                                        Selected: {formData.icon}
                                    </p>
                                    <p className="text-xs text-black/50 dark:text-white/50">
                                        Click an icon below to change
                                    </p>
                                </div>
                            </div>

                            {/* Quick Suggestions based on category */}
                            {!showAllIcons && (
                                <div className="rounded-xl border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                                    <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Suggested for {formData.category}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {suggestedIcons.map((icon) => {
                                            const IconComp = iconComponents[icon.name];
                                            return (
                                                <button
                                                    key={icon.name}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, icon: icon.name })}
                                                    className={cn(
                                                        "flex items-center gap-2 rounded-lg border px-3 py-2 transition",
                                                        formData.icon === icon.name
                                                            ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                            : "border-black/15 text-black/70 hover:border-black/30 dark:border-white/15 dark:text-white/70 dark:hover:border-white/30"
                                                    )}
                                                >
                                                    {IconComp && <IconComp className="h-4 w-4" />}
                                                    <span className="text-xs font-medium">{icon.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* All Icons Browser */}
                            {showAllIcons && (
                                <div className="rounded-xl border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                                    <div className="mb-4">
                                        <Input
                                            placeholder="Search icons..."
                                            value={iconSearch}
                                            onChange={(e) => setIconSearch(e.target.value)}
                                            leftIcon={<Search className="h-4 w-4" />}
                                            rightIcon={
                                                iconSearch && (
                                                    <button onClick={() => setIconSearch("")}>
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                )
                                            }
                                        />
                                    </div>

                                    <div className="max-h-64 space-y-4 overflow-y-auto">
                                        {Object.entries(filteredIcons).map(([category, icons]) => (
                                            <div key={category}>
                                                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">
                                                    {category}
                                                </p>
                                                <div className="flex flex-wrap gap-1">
                                                    {icons.map((icon) => {
                                                        const IconComp = iconComponents[icon.name];
                                                        return (
                                                            <button
                                                                key={icon.name}
                                                                type="button"
                                                                onClick={() => {
                                                                    setFormData({ ...formData, icon: icon.name });
                                                                    setShowAllIcons(false);
                                                                }}
                                                                title={icon.label}
                                                                className={cn(
                                                                    "flex h-10 w-10 items-center justify-center rounded-lg border transition",
                                                                    formData.icon === icon.name
                                                                        ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                                        : "border-black/10 text-black/60 hover:border-black/30 hover:text-black dark:border-white/10 dark:text-white/60 dark:hover:border-white/30 dark:hover:text-white"
                                                                )}
                                                            >
                                                                {IconComp && <IconComp className="h-5 w-5" />}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* FIXED: Color Selection with Inline Styles */}
                        <div>
                            <label className="mb-3 block text-sm font-semibold text-black dark:text-white">
                                Color Theme
                            </label>
                            <div className="flex flex-wrap gap-3">
                                {colorOptions.map((color) => (
                                    <button
                                        key={color.value}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, color: color.value })}
                                        title={color.label}
                                        className={cn(
                                            "relative h-10 w-10 rounded-xl transition-all duration-200",
                                            formData.color === color.value
                                                ? "scale-110 ring-2 ring-black ring-offset-2 dark:ring-white dark:ring-offset-surface-900"
                                                : "hover:scale-105"
                                        )}
                                        style={{
                                            background: `linear-gradient(135deg, ${color.colors.from} 0%, ${color.colors.to} 100%)`,
                                        }}
                                    >
                                        {formData.color === color.value && (
                                            <span className="absolute inset-0 flex items-center justify-center">
                                                <Check className="h-5 w-5 text-white drop-shadow-md" strokeWidth={3} />
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                            <p className="mt-2 text-xs text-black/50 dark:text-white/50">
                                Selected: {selectedColorConfig.label}
                            </p>
                        </div>

                        {/* Next Button */}
                        <div className="flex gap-3 pt-4">
                            <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">
                                Cancel
                            </Button>
                            <Button
                                type="button"
                                onClick={() => goToStep("schedule")}
                                disabled={!formData.title.trim()}
                                className="flex-1"
                                rightIcon={<ChevronRight className="h-4 w-4" />}
                            >
                                Continue
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Step 2: Schedule */}
                {currentStep === "schedule" && (
                    <motion.div
                        key="schedule"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        {/* Frequency Type */}
                        <div>
                            <label className="mb-3 block text-sm font-semibold text-black dark:text-white">
                                How often?
                            </label>
                            <div className="grid gap-3 sm:grid-cols-3">
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
                                            "rounded-xl border-2 p-4 text-left transition",
                                            formData.frequency.type === option.value
                                                ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                : "border-black/10 hover:border-black/30 dark:border-white/10 dark:hover:border-white/30"
                                        )}
                                    >
                                        <p className="font-semibold">{option.label}</p>
                                        <p
                                            className={cn(
                                                "mt-1 text-xs",
                                                formData.frequency.type === option.value
                                                    ? "text-white/70 dark:text-black/70"
                                                    : "text-black/50 dark:text-white/50"
                                            )}
                                        >
                                            {option.description}
                                        </p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Days of Week for Weekly */}
                        {formData.frequency.type === "weekly" && (
                            <div>
                                <label className="mb-3 block text-sm font-semibold text-black dark:text-white">
                                    Which days?
                                </label>
                                <div className="flex justify-between gap-2">
                                    {daysOfWeek.map((day) => (
                                        <button
                                            key={day.value}
                                            type="button"
                                            onClick={() => toggleDay(day.value)}
                                            className={cn(
                                                "flex h-12 w-12 flex-col items-center justify-center rounded-xl border-2 text-xs font-semibold transition",
                                                formData.frequency.daysOfWeek?.includes(day.value)
                                                    ? "border-black bg-black text-white dark:border-white dark:bg-white dark:text-black"
                                                    : "border-black/15 text-black/60 hover:border-black/30 dark:border-white/15 dark:text-white/60 dark:hover:border-white/30"
                                            )}
                                        >
                                            {day.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Custom Frequency */}
                        {formData.frequency.type === "custom" && (
                            <div className="rounded-xl border border-black/10 bg-white/50 p-4 dark:border-white/10 dark:bg-white/5">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className="text-sm text-black/70 dark:text-white/70">Complete</span>
                                    <input
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
                                        className="w-16 rounded-lg border border-black/20 bg-white px-3 py-2 text-center font-semibold dark:border-white/20 dark:bg-surface-900"
                                    />
                                    <span className="text-sm text-black/70 dark:text-white/70">time(s) every</span>
                                    <input
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
                                        className="w-16 rounded-lg border border-black/20 bg-white px-3 py-2 text-center font-semibold dark:border-white/20 dark:bg-surface-900"
                                    />
                                    <span className="text-sm text-black/70 dark:text-white/70">days</span>
                                </div>
                            </div>
                        )}

                        {/* Daily Target */}
                        <div>
                            <label className="mb-3 block text-sm font-semibold text-black dark:text-white">
                                Daily target (optional)
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center rounded-xl border border-black/15 dark:border-white/15">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                targetCount: Math.max(1, formData.targetCount - 1),
                                            })
                                        }
                                        className="px-4 py-3 text-lg font-bold text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                                    >
                                        −
                                    </button>
                                    <span className="min-w-[3rem] text-center text-xl font-bold text-black dark:text-white">
                                        {formData.targetCount}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                targetCount: Math.min(100, formData.targetCount + 1),
                                            })
                                        }
                                        className="px-4 py-3 text-lg font-bold text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-sm text-black/60 dark:text-white/60">
                                    {formData.targetCount === 1 ? "time per day" : "times per day"}
                                </span>
                            </div>
                            <p className="mt-2 text-xs text-black/40 dark:text-white/40">
                                Set to more than 1 if you want to track multiple completions (e.g., 8 glasses of water)
                            </p>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="mb-2 block text-sm font-semibold text-black dark:text-white">
                                Notes or motivation (optional)
                            </label>
                            <textarea
                                placeholder="Why is this habit important to you?"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="input-field min-h-[80px] resize-none"
                            />
                        </div>

                        {/* Navigation */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => goToStep("basics")}
                                leftIcon={<ChevronLeft className="h-4 w-4" />}
                            >
                                Back
                            </Button>
                            <Button
                                type="button"
                                onClick={() => goToStep("review")}
                                className="flex-1"
                                rightIcon={<ChevronRight className="h-4 w-4" />}
                            >
                                Review
                            </Button>
                        </div>
                    </motion.div>
                )}

                {/* Step 3: Review */}
                {currentStep === "review" && (
                    <motion.div
                        key="review"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                Review your habit
                            </p>
                        </div>

                        {/* Preview Card */}
                        <div className="rounded-2xl border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-white/5">
                            <div className="flex items-start gap-4">
                                <div
                                    className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl"
                                    style={{ backgroundColor: selectedColorConfig.colors.bg }}
                                >
                                    <SelectedIcon
                                        className="h-8 w-8"
                                        style={{ color: selectedColorConfig.colors.text }}
                                    />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-black dark:text-white">
                                        {formData.title}
                                    </h3>
                                    {formData.description && (
                                        <p className="mt-1 text-sm text-black/60 dark:text-white/60">
                                            {formData.description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="mt-6 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-black/5 p-4 dark:bg-white/5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Category
                                    </p>
                                    <p className="mt-1 font-semibold text-black dark:text-white">
                                        {habitCategories.find((c) => c.value === formData.category)?.label}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-black/5 p-4 dark:bg-white/5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Frequency
                                    </p>
                                    <p className="mt-1 font-semibold text-black dark:text-white">
                                        {formData.frequency.type === "daily" && "Every day"}
                                        {formData.frequency.type === "weekly" &&
                                            `${formData.frequency.daysOfWeek?.length} days/week`}
                                        {formData.frequency.type === "custom" &&
                                            `${formData.frequency.timesPerPeriod}x per ${formData.frequency.periodDays} days`}
                                    </p>
                                </div>
                                <div className="rounded-xl bg-black/5 p-4 dark:bg-white/5">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Color
                                    </p>
                                    <div className="mt-1 flex items-center gap-2">
                                        <div
                                            className="h-5 w-5 rounded-md"
                                            style={{
                                                background: `linear-gradient(135deg, ${selectedColorConfig.colors.from} 0%, ${selectedColorConfig.colors.to} 100%)`,
                                            }}
                                        />
                                        <span className="font-semibold text-black dark:text-white">
                                            {selectedColorConfig.label}
                                        </span>
                                    </div>
                                </div>
                                {formData.targetCount > 1 && (
                                    <div className="rounded-xl bg-black/5 p-4 dark:bg-white/5">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                            Daily Target
                                        </p>
                                        <p className="mt-1 font-semibold text-black dark:text-white">
                                            {formData.targetCount} times per day
                                        </p>
                                    </div>
                                )}
                                {formData.frequency.type === "weekly" && (
                                    <div className="rounded-xl bg-black/5 p-4 dark:bg-white/5 sm:col-span-2">
                                        <p className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                            Days
                                        </p>
                                        <p className="mt-1 font-semibold text-black dark:text-white">
                                            {formData.frequency.daysOfWeek
                                                ?.map((d) => daysOfWeek.find((day) => day.value === d)?.fullLabel)
                                                .join(", ")}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 pt-4">
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={() => goToStep("schedule")}
                                leftIcon={<ChevronLeft className="h-4 w-4" />}
                            >
                                Back
                            </Button>
                            <Button type="button" onClick={handleSubmit} isLoading={isLoading} className="flex-1">
                                {habit?._id ? "Save Changes" : "Create Habit"}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

```



### `components\habits\HabitIcon.tsx`

```tsx
"use client";

import {
    Dumbbell,
    Heart,
    Brain,
    Book,
    Droplets,
    Moon,
    Sun,
    Apple,
    Pill,
    Activity,
    Bike,
    Footprints,
    Flame,
    Target,
    Trophy,
    Star,
    Zap,
    Coffee,
    Cigarette,
    Wine,
    Music,
    Palette,
    Camera,
    Pen,
    Code,
    Briefcase,
    DollarSign,
    PiggyBank,
    TrendingUp,
    Users,
    MessageCircle,
    Phone,
    Home,
    Sparkles,
    Leaf,
    Smile,
    Clock,
    Calendar,
    CheckCircle,
    ListTodo,
    LucideIcon,
} from "lucide-react";
import { HabitIconName } from "@/types";
import { cn } from "@/lib/utils";

// Map icon names to actual Lucide components
const iconMap: Record<HabitIconName, LucideIcon> = {
    Dumbbell,
    Heart,
    Brain,
    Book,
    Droplets,
    Moon,
    Sun,
    Apple,
    Pill,
    Activity,
    Bike,
    Walk: Footprints,
    Flame,
    Target,
    Trophy,
    Star,
    Zap,
    Coffee,
    Cigarette,
    Wine,
    Music,
    Palette,
    Camera,
    Pen,
    Code,
    Briefcase,
    DollarSign,
    PiggyBank,
    TrendingUp,
    Users,
    MessageCircle,
    Phone,
    Home,
    Sparkles,
    Leaf,
    Smile,
    Clock,
    Calendar,
    CheckCircle,
    ListTodo,
};

interface HabitIconProps {
    icon: string;
    className?: string;
    size?: "sm" | "md" | "lg" | "xl";
}

export function HabitIcon({ icon, className, size = "md" }: HabitIconProps) {
    const sizes = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
    };

    // Check if it's a Lucide icon name
    if (icon in iconMap) {
        const IconComponent = iconMap[icon as HabitIconName];
        return <IconComponent className={cn(sizes[size], className)} />;
    }

    // Fallback to emoji for backward compatibility
    return <span className={cn("text-center", size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : size === "xl" ? "text-2xl" : "text-base", className)}>{icon}</span>;
}

```



### `components\habits\HabitList.tsx`

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



### `components\habits\HabitMatrixView.tsx`

```tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    format,
    eachDayOfInterval,
    isSameDay,
    isToday,
    isFuture,
    differenceInDays,
} from "date-fns";
import {
    Check,
    X,
    Flame,
    MoreVertical,
    Edit2,
    Trash2,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import toast from "react-hot-toast";

interface HabitMatrixViewProps {
    habits: HabitWithLog[];
    startDate: Date;
    endDate: Date;
    viewMode: "daily" | "weekly" | "monthly" | "custom";
    onEdit: (habit: HabitWithLog) => void;
    onDelete: (id: string) => Promise<void>;
}

interface DayLog {
    date: Date;
    completed: boolean;
}

interface HabitData {
    habit: HabitWithLog;
    logs: DayLog[];
    completionRate: number;
}

export function HabitMatrixView({
    habits,
    startDate,
    endDate,
    viewMode,
    onEdit,
    onDelete,
}: HabitMatrixViewProps) {
    const [habitsData, setHabitsData] = useState<HabitData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingHabit, setDeletingHabit] = useState<HabitWithLog | null>(null);
    const [menuOpenFor, setMenuOpenFor] = useState<string | null>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    // Generate array of dates
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // Reverse for display (most recent first) if more than 7 days
    const displayDays = days.length > 7 ? [...days].reverse() : days;

    useEffect(() => {
        fetchLogs();
    }, [startDate, endDate, habits]);

    // Scroll to today on mount for weekly view
    useEffect(() => {
        if (viewMode === "weekly" && scrollContainerRef.current) {
            const todayIndex = displayDays.findIndex((d) => isToday(d));
            if (todayIndex !== -1) {
                // Scroll logic can be added here if needed
            }
        }
    }, [viewMode, displayDays]);

    const fetchLogs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `/api/logs?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const habitsWithData: HabitData[] = habits.map((habit) => {
                const habitLogs: DayLog[] = days.map((day) => {
                    const dayLog = logs.find(
                        (log: any) =>
                            log.habitId === habit._id && isSameDay(new Date(log.date), day)
                    );
                    return {
                        date: day,
                        completed: dayLog?.completed || false,
                    };
                });

                const completedCount = habitLogs.filter((l) => l.completed).length;
                const validDays = habitLogs.filter(
                    (l) => !isFuture(l.date) || isToday(l.date)
                ).length;
                const completionRate =
                    validDays > 0 ? Math.round((completedCount / validDays) * 100) : 0;

                return { habit, logs: habitLogs, completionRate };
            });

            setHabitsData(habitsWithData);
        } catch (error) {
            console.error("Failed to fetch logs:", error);
            toast.error("Failed to load habit data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = async (
        habitId: string,
        date: Date,
        currentCompleted: boolean
    ) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark future dates");
            return;
        }

        // Optimistic update
        setHabitsData((prev) =>
            prev.map((hd) => {
                if (hd.habit._id === habitId) {
                    const newLogs = hd.logs.map((log) =>
                        isSameDay(log.date, date)
                            ? { ...log, completed: !currentCompleted }
                            : log
                    );
                    const completedCount = newLogs.filter((l) => l.completed).length;
                    const validDays = newLogs.filter(
                        (l) => !isFuture(l.date) || isToday(l.date)
                    ).length;
                    return {
                        ...hd,
                        logs: newLogs,
                        completionRate:
                            validDays > 0
                                ? Math.round((completedCount / validDays) * 100)
                                : 0,
                    };
                }
                return hd;
            })
        );

        try {
            const response = await fetch(`/api/habits/${habitId}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    completed: !currentCompleted,
                    date: date.toISOString(),
                }),
            });

            if (!response.ok) throw new Error("Failed to update");

            if (!currentCompleted) {
                toast.success("Habit completed! 🎉", { duration: 1500 });
            }
        } catch (error) {
            // Revert on error
            fetchLogs();
            toast.error("Failed to update habit");
        }
    };

    const handleDelete = async () => {
        if (deletingHabit) {
            await onDelete(deletingHabit._id);
            setDeletingHabit(null);
        }
    };

    // Calculate column width based on number of days
    const getColumnWidth = () => {
        if (days.length <= 7) return "w-12";
        if (days.length <= 14) return "w-10";
        return "w-8";
    };

    if (isLoading) {
        return (
            <div className="card p-8 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
            </div>
        );
    }

    return (
        <>
            <div className="card overflow-hidden">
                <div
                    ref={scrollContainerRef}
                    className="overflow-x-auto"
                >
                    <table className="w-full min-w-[600px]">
                        {/* Header with dates */}
                        <thead>
                            <tr className="border-b border-black/10 dark:border-white/10">
                                <th className="sticky left-0 z-10 bg-white px-4 py-4 text-left dark:bg-surface-900">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Habit
                                    </span>
                                </th>
                                {displayDays.map((day) => (
                                    <th
                                        key={day.toISOString()}
                                        className={cn(
                                            "px-1 py-3 text-center",
                                            getColumnWidth()
                                        )}
                                    >
                                        <div className="flex flex-col items-center">
                                            <span className="text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">
                                                {format(day, "EEE")}
                                            </span>
                                            <span
                                                className={cn(
                                                    "mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold",
                                                    isToday(day)
                                                        ? "bg-[#4D7CFE] text-white"
                                                        : "text-black/70 dark:text-white/70"
                                                )}
                                            >
                                                {format(day, "d")}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                                <th className="px-4 py-4 text-center">
                                    <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                        Rate
                                    </span>
                                </th>
                                <th className="w-12 px-2 py-4" />
                            </tr>
                        </thead>

                        {/* Habit rows */}
                        <tbody>
                            {habitsData.map(({ habit, logs, completionRate }, rowIndex) => {
                                const colors =
                                    habitColors[habit.color as keyof typeof habitColors] ||
                                    habitColors.purple;

                                // Get logs in display order
                                const displayLogs = days.length > 7 ? [...logs].reverse() : logs;

                                return (
                                    <motion.tr
                                        key={habit._id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: rowIndex * 0.03 }}
                                        className="group border-b border-black/5 last:border-0 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                                    >
                                        {/* Habit info cell */}
                                        <td className="sticky left-0 z-10 bg-white px-4 py-3 dark:bg-surface-900 group-hover:bg-gray-50 dark:group-hover:bg-surface-800/50">
                                            <div className="flex items-center gap-3">
                                                {/* Progress ring */}
                                                <div className="relative h-10 w-10 flex-shrink-0">
                                                    <svg
                                                        className="h-10 w-10 -rotate-90 transform"
                                                        viewBox="0 0 36 36"
                                                    >
                                                        <circle
                                                            cx="18"
                                                            cy="18"
                                                            r="15"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            className="text-black/10 dark:text-white/10"
                                                        />
                                                        <circle
                                                            cx="18"
                                                            cy="18"
                                                            r="15"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="3"
                                                            strokeDasharray={`${completionRate} 100`}
                                                            strokeLinecap="round"
                                                            className={colors.text}
                                                        />
                                                    </svg>
                                                    <div
                                                        className={cn(
                                                            "absolute inset-1 flex items-center justify-center rounded-full text-sm",
                                                            colors.bg
                                                        )}
                                                    >
                                                        {habit.icon}
                                                    </div>
                                                </div>

                                                {/* Title and streak */}
                                                <div className="min-w-0 flex-1">
                                                    <p className="truncate font-semibold text-black dark:text-white">
                                                        {habit.title}
                                                    </p>
                                                    {habit.streak.current > 0 && (
                                                        <div className="flex items-center gap-1 text-orange-500">
                                                            <Flame className="h-3 w-3" />
                                                            <span className="text-xs font-semibold">
                                                                {habit.streak.current}d streak
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Day cells */}
                                        {displayLogs.map((log, index) => {
                                            const isFutureDay =
                                                isFuture(log.date) && !isToday(log.date);
                                            const isTodayDate = isToday(log.date);

                                            return (
                                                <td
                                                    key={index}
                                                    className={cn(
                                                        "px-1 py-3 text-center",
                                                        getColumnWidth()
                                                    )}
                                                >
                                                    <motion.button
                                                        whileHover={
                                                            !isFutureDay ? { scale: 1.15 } : undefined
                                                        }
                                                        whileTap={
                                                            !isFutureDay ? { scale: 0.9 } : undefined
                                                        }
                                                        onClick={() =>
                                                            handleToggle(
                                                                habit._id,
                                                                log.date,
                                                                log.completed
                                                            )
                                                        }
                                                        disabled={isFutureDay}
                                                        className={cn(
                                                            "mx-auto flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200",
                                                            log.completed
                                                                ? `bg-gradient-to-br ${colors.gradient} text-white shadow-md`
                                                                : "text-black/30 dark:text-white/30",
                                                            isFutureDay &&
                                                            "cursor-not-allowed opacity-20",
                                                            isTodayDate &&
                                                            !log.completed &&
                                                            "ring-2 ring-[#4D7CFE]/30"
                                                        )}
                                                    >
                                                        {log.completed ? (
                                                            <Check
                                                                className="h-4 w-4"
                                                                strokeWidth={3}
                                                            />
                                                        ) : isFutureDay ? null : (
                                                            <X className="h-4 w-4 opacity-40" />
                                                        )}
                                                    </motion.button>
                                                </td>
                                            );
                                        })}

                                        {/* Completion rate */}
                                        <td className="px-4 py-3 text-center">
                                            <span
                                                className={cn(
                                                    "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold",
                                                    completionRate >= 80
                                                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                                        : completionRate >= 50
                                                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                                                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                                )}
                                            >
                                                {completionRate}%
                                            </span>
                                        </td>

                                        {/* Actions menu */}
                                        <td className="px-2 py-3">
                                            <div className="relative">
                                                <button
                                                    onClick={() =>
                                                        setMenuOpenFor(
                                                            menuOpenFor === habit._id
                                                                ? null
                                                                : habit._id
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-black/30 opacity-0 transition-all hover:bg-black/5 hover:text-black/60 group-hover:opacity-100 dark:text-white/30 dark:hover:bg-white/5 dark:hover:text-white/60"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </button>

                                                <AnimatePresence>
                                                    {menuOpenFor === habit._id && (
                                                        <>
                                                            <div
                                                                className="fixed inset-0 z-10"
                                                                onClick={() => setMenuOpenFor(null)}
                                                            />
                                                            <motion.div
                                                                initial={{
                                                                    opacity: 0,
                                                                    scale: 0.95,
                                                                    y: -8,
                                                                }}
                                                                animate={{
                                                                    opacity: 1,
                                                                    scale: 1,
                                                                    y: 0,
                                                                }}
                                                                exit={{
                                                                    opacity: 0,
                                                                    scale: 0.95,
                                                                }}
                                                                className="absolute right-0 top-full z-20 mt-1 w-36 overflow-hidden rounded-xl border border-black/10 bg-white shadow-xl dark:border-white/10 dark:bg-surface-900"
                                                            >
                                                                <button
                                                                    onClick={() => {
                                                                        setMenuOpenFor(null);
                                                                        onEdit(habit);
                                                                    }}
                                                                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm hover:bg-black/5 dark:hover:bg-white/5"
                                                                >
                                                                    <Edit2 className="h-4 w-4" />
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => {
                                                                        setMenuOpenFor(null);
                                                                        setDeletingHabit(habit);
                                                                    }}
                                                                    className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                    Delete
                                                                </button>
                                                            </motion.div>
                                                        </>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-6 border-t border-black/10 px-4 py-4 dark:border-white/10">
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-green-400 to-green-600 text-white">
                            <Check className="h-3 w-3" strokeWidth={3} />
                        </div>
                        <span className="text-xs text-black/50 dark:text-white/50">
                            Completed
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md text-black/30 dark:text-white/30">
                            <X className="h-3 w-3" />
                        </div>
                        <span className="text-xs text-black/50 dark:text-white/50">
                            Missed
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-md bg-black/5 dark:bg-white/5" />
                        <span className="text-xs text-black/50 dark:text-white/50">
                            Future
                        </span>
                    </div>
                </div>
            </div>

            {/* Summary Stats */}
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                <div className="card p-4 text-center">
                    <p className="text-2xl font-black text-black dark:text-white">
                        {habitsData.length}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                        Total Habits
                    </p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-2xl font-black text-black dark:text-white">
                        {days.length}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                        Days Tracked
                    </p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-2xl font-black text-green-500">
                        {habitsData.reduce(
                            (acc, hd) => acc + hd.logs.filter((l) => l.completed).length,
                            0
                        )}
                    </p>
                    <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                        Completions
                    </p>
                </div>
                <div className="card p-4 text-center">
                    <p className="text-2xl font-black text-[#4D7CFE]">
                        {habitsData.length > 0
                            ? Math.round(
                                habitsData.reduce((acc, hd) => acc + hd.completionRate, 0) /
                                habitsData.length
                            )
                            : 0}
                        %
                    </p>
                    <p className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">
                        Avg Rate
                    </p>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={!!deletingHabit}
                onClose={() => setDeletingHabit(null)}
                title="Delete Habit"
                size="sm"
            >
                <div className="text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                        <span className="text-3xl">{deletingHabit?.icon}</span>
                    </div>
                    <p className="mb-6 text-black/60 dark:text-white/60">
                        Delete <strong>"{deletingHabit?.title}"</strong>? This will remove
                        all completion history. This cannot be undone.
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
        </>
    );
}

```



### `components\habits\MonthlyHabitView.tsx`

```tsx
"use client";

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
    isToday,
    isFuture,
} from "date-fns";
import { Check, ChevronDown, ChevronUp, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import toast from "react-hot-toast";

interface MonthlyHabitViewProps {
    habits: HabitWithLog[];
    month: Date;
    onToggleCompletion: (habitId: string, date: Date, completed: boolean) => Promise<void>;
}

interface DayLog {
    date: Date;
    completed: boolean;
}

interface HabitMonthData {
    habit: HabitWithLog;
    logs: DayLog[];
    completionRate: number;
}

export function MonthlyHabitView({ habits, month, onToggleCompletion }: MonthlyHabitViewProps) {
    const [habitsData, setHabitsData] = useState<HabitMonthData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expandedHabit, setExpandedHabit] = useState<string | null>(null);

    useEffect(() => {
        fetchMonthLogs();
    }, [month, habits]);

    const fetchMonthLogs = async () => {
        setIsLoading(true);
        try {
            const start = startOfMonth(month);
            const end = endOfMonth(month);

            const response = await fetch(
                `/api/logs?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const monthDays = getDaysInMonth(month);

            const habitsWithMonthData: HabitMonthData[] = habits.map((habit) => {
                const habitLogs: DayLog[] = monthDays.map((day) => {
                    const dayLog = logs.find(
                        (log: any) =>
                            log.habitId === habit._id && isSameDay(new Date(log.date), day)
                    );
                    return {
                        date: day,
                        completed: dayLog?.completed || false,
                    };
                });

                const completedDays = habitLogs.filter((l) => l.completed).length;
                const totalDays = habitLogs.filter((l) => !isFuture(l.date) || isToday(l.date)).length;
                const completionRate = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

                return { habit, logs: habitLogs, completionRate };
            });

            setHabitsData(habitsWithMonthData);
        } catch (error) {
            console.error("Failed to fetch month logs:", error);
            toast.error("Failed to load monthly data");
        } finally {
            setIsLoading(false);
        }
    };

    const getDaysInMonth = (date: Date): Date[] => {
        const start = startOfMonth(date);
        const end = endOfMonth(date);
        const days: Date[] = [];
        let day = start;
        while (day <= end) {
            days.push(day);
            day = addDays(day, 1);
        }
        return days;
    };

    const handleToggle = async (habitId: string, date: Date, currentCompleted: boolean) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark future dates");
            return;
        }

        setHabitsData((prev) =>
            prev.map((hd) => {
                if (hd.habit._id === habitId) {
                    const newLogs = hd.logs.map((log) =>
                        isSameDay(log.date, date) ? { ...log, completed: !currentCompleted } : log
                    );
                    const completedDays = newLogs.filter((l) => l.completed).length;
                    const totalDays = newLogs.filter((l) => !isFuture(l.date) || isToday(l.date)).length;
                    return {
                        ...hd,
                        logs: newLogs,
                        completionRate: totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0,
                    };
                }
                return hd;
            })
        );

        try {
            await onToggleCompletion(habitId, date, !currentCompleted);
        } catch (error) {
            fetchMonthLogs();
        }
    };

    if (isLoading) {
        return (
            <div className="card p-8 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
            </div>
        );
    }

    if (habitsData.length === 0) {
        return (
            <div className="card p-8 text-center">
                <p className="text-black/60 dark:text-white/60">No habits to display</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {habitsData.map(({ habit, logs, completionRate }) => {
                const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;
                const isExpanded = expandedHabit === habit._id;

                return (
                    <motion.div
                        key={habit._id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="card overflow-hidden"
                    >
                        {/* Header */}
                        <button
                            onClick={() => setExpandedHabit(isExpanded ? null : habit._id)}
                            className="flex w-full items-center gap-4 p-4 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.02]"
                        >
                            <div className={cn("flex h-12 w-12 items-center justify-center rounded-xl text-2xl", colors.bg)}>
                                {habit.icon}
                            </div>
                            <div className="flex-1">
                                <p className="font-semibold text-black dark:text-white">{habit.title}</p>
                                <div className="mt-1 flex items-center gap-4">
                                    <span className="text-sm text-black/50 dark:text-white/50">
                                        {completionRate}% completion
                                    </span>
                                    {habit.streak.current > 0 && (
                                        <div className="flex items-center gap-1 text-orange-500">
                                            <Flame className="h-3.5 w-3.5" />
                                            <span className="text-xs font-semibold">{habit.streak.current} day streak</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* Mini Progress Bar */}
                                <div className="hidden w-32 sm:block">
                                    <div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${completionRate}%` }}
                                            className={cn("h-full rounded-full bg-gradient-to-r", colors.gradient)}
                                        />
                                    </div>
                                </div>
                                {isExpanded ? (
                                    <ChevronUp className="h-5 w-5 text-black/40 dark:text-white/40" />
                                ) : (
                                    <ChevronDown className="h-5 w-5 text-black/40 dark:text-white/40" />
                                )}
                            </div>
                        </button>

                        {/* Expanded Calendar Grid */}
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-black/10 p-4 dark:border-white/10"
                            >
                                {/* Day Headers */}
                                <div className="mb-2 grid grid-cols-7 gap-1">
                                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                                        <div key={day} className="py-1 text-center text-xs font-semibold text-black/40 dark:text-white/40">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar Grid */}
                                <div className="grid grid-cols-7 gap-1">
                                    {/* Empty cells for offset */}
                                    {Array.from({ length: startOfMonth(month).getDay() }).map((_, i) => (
                                        <div key={`empty-${i}`} className="aspect-square" />
                                    ))}

                                    {/* Day cells */}
                                    {logs.map((log, index) => {
                                        const isFutureDay = isFuture(log.date) && !isToday(log.date);
                                        const isTodayDate = isToday(log.date);

                                        return (
                                            <motion.button
                                                key={index}
                                                whileHover={!isFutureDay ? { scale: 1.1 } : undefined}
                                                whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                disabled={isFutureDay}
                                                className={cn(
                                                    "relative aspect-square rounded-lg transition",
                                                    log.completed
                                                        ? `bg-gradient-to-br ${colors.gradient} text-white`
                                                        : "bg-black/5 dark:bg-white/5",
                                                    isFutureDay && "cursor-not-allowed opacity-30",
                                                    isTodayDate && !log.completed && "ring-2 ring-black/20 dark:ring-white/20"
                                                )}
                                            >
                                                <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
                                                    {log.completed ? (
                                                        <Check className="h-4 w-4" strokeWidth={3} />
                                                    ) : (
                                                        format(log.date, "d")
                                                    )}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                );
            })}
        </div>
    );
}

```



### `components\habits\ViewModeSelector.tsx`

```tsx
"use client";

import { Calendar, CalendarDays, CalendarRange, LayoutGrid } from "lucide-react";
import { cn } from "@/lib/utils";

export type ViewMode = "daily" | "weekly" | "monthly" | "custom";

interface ViewModeSelectorProps {
    viewMode: ViewMode;
    onViewModeChange: (mode: ViewMode) => void;
    className?: string;
}

const viewModes: { value: ViewMode; label: string; icon: React.ElementType }[] = [
    { value: "daily", label: "Daily", icon: Calendar },
    { value: "weekly", label: "Weekly", icon: CalendarDays },
    { value: "monthly", label: "Monthly", icon: LayoutGrid },
    { value: "custom", label: "Custom", icon: CalendarRange },
];

export function ViewModeSelector({ viewMode, onViewModeChange, className }: ViewModeSelectorProps) {
    return (
        <div className={cn("flex items-center gap-1 rounded-xl border border-black/10 bg-white p-1 dark:border-white/10 dark:bg-white/5", className)}>
            {viewModes.map((mode) => (
                <button
                    key={mode.value}
                    onClick={() => onViewModeChange(mode.value)}
                    className={cn(
                        "flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider transition",
                        viewMode === mode.value
                            ? "bg-black text-white dark:bg-white dark:text-black"
                            : "text-black/60 hover:bg-black/5 hover:text-black dark:text-white/60 dark:hover:bg-white/10 dark:hover:text-white"
                    )}
                >
                    <mode.icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{mode.label}</span>
                </button>
            ))}
        </div>
    );
}

```



### `components\habits\WeeklyHabitView.tsx`

```tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    format,
    startOfWeek,
    endOfWeek,
    addDays,
    isSameDay,
    isToday,
    isFuture,
} from "date-fns";
import { Check, X, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { HabitWithLog, habitColors } from "@/types";
import toast from "react-hot-toast";

interface WeeklyHabitViewProps {
    habits: HabitWithLog[];
    weekStart: Date;
    onToggleCompletion: (habitId: string, date: Date, completed: boolean) => Promise<void>;
}

interface WeekLog {
    date: Date;
    completed: boolean;
    count: number;
}

interface HabitWeekData {
    habit: HabitWithLog;
    logs: WeekLog[];
}

export function WeeklyHabitView({ habits, weekStart, onToggleCompletion }: WeeklyHabitViewProps) {
    const [habitsData, setHabitsData] = useState<HabitWeekData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfWeek(weekStart), i));

    useEffect(() => {
        fetchWeekLogs();
    }, [weekStart, habits]);

    const fetchWeekLogs = async () => {
        setIsLoading(true);
        try {
            const start = startOfWeek(weekStart);
            const end = endOfWeek(weekStart);

            const response = await fetch(
                `/api/logs?startDate=${start.toISOString()}&endDate=${end.toISOString()}`
            );
            const data = await response.json();
            const logs = data.logs || [];

            const habitsWithWeekData: HabitWeekData[] = habits.map((habit) => {
                const weekLogs: WeekLog[] = weekDays.map((day) => {
                    const dayLog = logs.find(
                        (log: any) =>
                            log.habitId === habit._id && isSameDay(new Date(log.date), day)
                    );
                    return {
                        date: day,
                        completed: dayLog?.completed || false,
                        count: dayLog?.count || 0,
                    };
                });
                return { habit, logs: weekLogs };
            });

            setHabitsData(habitsWithWeekData);
        } catch (error) {
            console.error("Failed to fetch week logs:", error);
            toast.error("Failed to load weekly data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggle = async (habitId: string, date: Date, currentCompleted: boolean) => {
        if (isFuture(date) && !isToday(date)) {
            toast.error("Cannot mark future dates");
            return;
        }

        // Optimistic update
        setHabitsData((prev) =>
            prev.map((hd) => {
                if (hd.habit._id === habitId) {
                    return {
                        ...hd,
                        logs: hd.logs.map((log) =>
                            isSameDay(log.date, date)
                                ? { ...log, completed: !currentCompleted }
                                : log
                        ),
                    };
                }
                return hd;
            })
        );

        try {
            await onToggleCompletion(habitId, date, !currentCompleted);
        } catch (error) {
            // Revert on error
            fetchWeekLogs();
        }
    };

    if (isLoading) {
        return (
            <div className="card p-8 text-center">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-black/20 border-t-black dark:border-white/20 dark:border-t-white" />
            </div>
        );
    }

    if (habitsData.length === 0) {
        return (
            <div className="card p-8 text-center">
                <p className="text-black/60 dark:text-white/60">No habits to display</p>
            </div>
        );
    }

    return (
        <div className="card overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                    <thead>
                        <tr className="border-b border-black/10 dark:border-white/10">
                            <th className="px-4 py-4 text-left">
                                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    Habit
                                </span>
                            </th>
                            {weekDays.map((day) => (
                                <th key={day.toString()} className="px-2 py-4 text-center">
                                    <div className="flex flex-col items-center">
                                        <span className="text-[10px] font-semibold uppercase tracking-wider text-black/40 dark:text-white/40">
                                            {format(day, "EEE")}
                                        </span>
                                        <span
                                            className={cn(
                                                "mt-1 flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold",
                                                isToday(day)
                                                    ? "bg-black text-white dark:bg-white dark:text-black"
                                                    : "text-black/70 dark:text-white/70"
                                            )}
                                        >
                                            {format(day, "d")}
                                        </span>
                                    </div>
                                </th>
                            ))}
                            <th className="px-4 py-4 text-center">
                                <span className="text-xs font-semibold uppercase tracking-wider text-black/50 dark:text-white/50">
                                    Streak
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitsData.map(({ habit, logs }) => {
                            const colors = habitColors[habit.color as keyof typeof habitColors] || habitColors.purple;
                            const weekCompleted = logs.filter((l) => l.completed).length;

                            return (
                                <motion.tr
                                    key={habit._id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="border-b border-black/5 last:border-0 dark:border-white/5"
                                >
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl text-xl", colors.bg)}>
                                                {habit.icon}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-black dark:text-white">
                                                    {habit.title}
                                                </p>
                                                <p className="text-xs text-black/50 dark:text-white/50">
                                                    {weekCompleted}/7 this week
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    {logs.map((log, index) => {
                                        const isFutureDay = isFuture(log.date) && !isToday(log.date);
                                        return (
                                            <td key={index} className="px-2 py-4 text-center">
                                                <motion.button
                                                    whileHover={!isFutureDay ? { scale: 1.15 } : undefined}
                                                    whileTap={!isFutureDay ? { scale: 0.9 } : undefined}
                                                    onClick={() => handleToggle(habit._id, log.date, log.completed)}
                                                    disabled={isFutureDay}
                                                    className={cn(
                                                        "mx-auto flex h-9 w-9 items-center justify-center rounded-xl transition",
                                                        log.completed
                                                            ? `bg-gradient-to-br ${colors.gradient} text-white shadow-md`
                                                            : "border-2 border-black/15 dark:border-white/15",
                                                        isFutureDay && "cursor-not-allowed opacity-30"
                                                    )}
                                                >
                                                    {log.completed ? (
                                                        <Check className="h-5 w-5" strokeWidth={3} />
                                                    ) : (
                                                        <span className="h-5 w-5" />
                                                    )}
                                                </motion.button>
                                            </td>
                                        );
                                    })}
                                    <td className="px-4 py-4 text-center">
                                        {habit.streak.current > 0 ? (
                                            <div className="inline-flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                                                <Flame className="h-4 w-4" />
                                                <span className="text-sm font-bold">{habit.streak.current}</span>
                                            </div>
                                        ) : (
                                            <span className="text-black/30 dark:text-white/30">-</span>
                                        )}
                                    </td>
                                </motion.tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

```



---

## components\landing

### `components\landing\CtaFooter.tsx`

```tsx
﻿"use client";

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
                                DAY WIN MOBILE TRACKER
                            </p>
                            <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl">
                                Keep Every Habit
                                <br />
                                <span className="text-white/70">In One App</span>
                            </h2>
                            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                                Track routines, protect streaks, and get daily clarity with a focused mobile dashboard built for consistency.
                            </p>
                            <div className="mt-8">
                                <a
                                    href="/signup"
                                    className="inline-flex items-center rounded-md border border-white bg-white px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-black transition hover:bg-black hover:text-white"
                                >
                                    Get Started
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
                                label="DAY WIN"
                                iconClassName="h-9 w-9 rounded-md"
                                textClassName="text-xs font-semibold uppercase tracking-[0.14em] text-white"
                            />
                            <div className="flex items-center gap-5 text-xs uppercase tracking-[0.12em] text-white/80">
                                <a href="#" className="transition hover:text-white">Instagram</a>
                                <a href="#" className="transition hover:text-white">X</a>
                                <a href="#" className="transition hover:text-white">YouTube</a>
                            </div>
                            <p className="text-xs text-white/60">Â© 2026 DAY WIN. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}


```



### `components\landing\FeatureRow.tsx`

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



### `components\landing\Hero.tsx`

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
                            label="DAY WIN"
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
                            <div className="mt-7">
                                <a
                                    href="/signup"
                                    className="inline-flex w-full items-center justify-center border border-black bg-black px-6 py-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-white hover:text-black sm:w-auto"
                                >
                                    Get Started
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



### `components\landing\Testimonials.tsx`

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

## components\layout

### `components\layout\Header.tsx`

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



### `components\layout\Navbar.tsx`

```tsx
﻿"use client";

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
                        label="DAY WIN"
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

## components\ui

### `components\ui\Badge.tsx`

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



### `components\ui\Button.tsx`

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



### `components\ui\Card.tsx`

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



### `components\ui\DatePicker.tsx`

```tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
    selected: Date;
    onChange: (date: Date) => void;
    className?: string;
}

export function DatePicker({ selected, onChange, className }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(selected);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const renderDays = () => {
        const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        return (
            <div className="grid grid-cols-7 mb-1">
                {days.map((day) => (
                    <div key={day} className="py-2 text-center text-xs font-medium text-black/40 dark:text-white/40">
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
                const cloneDay = day;
                const isSelected = isSameDay(day, selected);
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isToday = isSameDay(day, new Date());

                days.push(
                    <button
                        key={day.toString()}
                        type="button"
                        onClick={() => {
                            onChange(cloneDay);
                            setIsOpen(false);
                        }}
                        disabled={!isCurrentMonth}
                        className={cn(
                            "w-8 h-8 rounded-lg text-sm font-medium transition-all",
                            !isCurrentMonth && "opacity-30 cursor-not-allowed",
                            isCurrentMonth && !isSelected && "hover:bg-black/5 dark:hover:bg-white/10",
                            isSelected && "bg-black text-white dark:bg-white dark:text-black",
                            isToday && !isSelected && "ring-1 ring-black/20 dark:ring-white/20"
                        )}
                    >
                        {format(day, "d")}
                    </button>
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

    return (
        <div ref={containerRef} className={cn("relative", className)}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 rounded-xl border border-black/15 bg-white px-4 py-2.5 text-sm font-medium text-black transition hover:border-black/30 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30"
            >
                <Calendar className="h-4 w-4" />
                {format(selected, "MMM d, yyyy")}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full z-50 mt-2 w-72 rounded-2xl border border-black/10 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-surface-900"
                    >
                        {/* Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <button
                                type="button"
                                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                                className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-semibold text-black dark:text-white">
                                {format(currentMonth, "MMMM yyyy")}
                            </span>
                            <button
                                type="button"
                                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                                className="rounded-lg p-1.5 hover:bg-black/5 dark:hover:bg-white/10"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>

                        {renderDays()}
                        {renderCells()}

                        {/* Quick Actions */}
                        <div className="mt-4 flex gap-2 border-t border-black/10 pt-4 dark:border-white/10">
                            <button
                                type="button"
                                onClick={() => {
                                    onChange(new Date());
                                    setIsOpen(false);
                                }}
                                className="flex-1 rounded-lg bg-black/5 py-2 text-xs font-semibold uppercase tracking-wider text-black/70 transition hover:bg-black/10 dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10"
                            >
                                Today
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

```



### `components\ui\Input.tsx`

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
    ({ className, label, error, leftIcon, rightIcon, style, ...props }, ref) => {
        const inputStyle: React.CSSProperties = {
            ...(leftIcon ? { paddingLeft: "3.5rem" } : {}),
            ...(rightIcon ? { paddingRight: "3.5rem" } : {}),
            ...style,
        };

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center justify-center text-surface-200/50">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "input-field",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500/50",
                            className
                        )}
                        style={inputStyle}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 flex w-14 items-center justify-center text-surface-200/50">
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



### `components\ui\Modal.tsx`

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



### `components\ui\ProgressRing.tsx`

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

## hooks

### `hooks\useHabits.ts`

```typescript
// hooks/useHabits.ts

import { create } from "zustand";
import { HabitWithLog, Habit } from "@/types";
import { startOfDay, isToday } from "date-fns";
import toast from "react-hot-toast";

interface HabitsState {
    habits: HabitWithLog[];
    isLoading: boolean;
    error: string | null;
    fetchHabits: () => Promise<void>;
    addHabit: (habit: Partial<Habit>) => Promise<void>;
    updateHabit: (id: string, data: Partial<Habit>) => Promise<void>;
    deleteHabit: (id: string) => Promise<void>;
    completeHabit: (
        id: string,
        completed: boolean,
        count?: number
    ) => Promise<{ streak?: { current: number; longest: number } }>;
    completeHabitForDate: (
        id: string,
        date: Date,
        completed: boolean,
        count?: number
    ) => Promise<{ streak?: { current: number; longest: number } }>;
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

    // Complete habit for TODAY (original method - kept for backward compatibility)
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

    // Complete habit for ANY DATE (new method)
    completeHabitForDate: async (id, date, completed, count) => {
        const targetDate = startOfDay(date);
        const isTargetToday = isToday(targetDate);

        // If completing for today, also do optimistic update on todayLog
        if (isTargetToday) {
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
                                date: targetDate,
                                completed,
                                count: count ?? (completed ? 1 : 0),
                                skipped: false,
                                createdAt: new Date(),
                            },
                        }
                        : h
                ),
            }));
        }

        try {
            const response = await fetch(`/api/habits/${id}/complete`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    completed,
                    count,
                    date: targetDate.toISOString(),
                }),
            });

            if (!response.ok) throw new Error("Failed to update habit");

            const result = await response.json();

            // If it's today, update the todayLog and streak in state
            if (isTargetToday) {
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
            } else {
                // For other dates, just update the streak if returned
                if (result.streak) {
                    set((state) => ({
                        habits: state.habits.map((h) =>
                            h._id === id
                                ? {
                                    ...h,
                                    streak: result.streak,
                                }
                                : h
                        ),
                    }));
                }
            }

            return { streak: result.streak };
        } catch (error) {
            // Revert on error - refetch habits
            if (isTargetToday) {
                get().fetchHabits();
            }
            toast.error("Failed to update habit");
            throw error;
        }
    },
}));

```



---

## lib

### `lib\auth.ts`

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



### `lib\confetti.ts`

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



### `lib\mongodb-client.ts`

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



### `lib\mongodb.ts`

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



### `lib\utils.ts`

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

## models

### `models\Habit.ts`

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



### `models\HabitLog.ts`

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



### `models\User.ts`

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

## providers

### `providers\index.tsx`

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



### `providers\theme-provider.tsx`

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

## types

### `types\index.ts`

```typescript
// types/index.ts

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
        daysOfWeek?: number[];
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

// Color options with actual hex values for inline styles (fixes dynamic Tailwind issue)
export const habitColorOptions: {
    value: HabitColor;
    label: string;
    colors: {
        from: string;
        to: string;
        bg: string;
        text: string;
    };
}[] = [
        {
            value: "violet",
            label: "Violet",
            colors: {
                from: "#8b5cf6",
                to: "#7c3aed",
                bg: "#ede9fe",
                text: "#7c3aed",
            },
        },
        {
            value: "purple",
            label: "Purple",
            colors: {
                from: "#a855f7",
                to: "#9333ea",
                bg: "#f3e8ff",
                text: "#9333ea",
            },
        },
        {
            value: "blue",
            label: "Blue",
            colors: {
                from: "#3b82f6",
                to: "#2563eb",
                bg: "#dbeafe",
                text: "#2563eb",
            },
        },
        {
            value: "cyan",
            label: "Cyan",
            colors: {
                from: "#06b6d4",
                to: "#0891b2",
                bg: "#cffafe",
                text: "#0891b2",
            },
        },
        {
            value: "teal",
            label: "Teal",
            colors: {
                from: "#14b8a6",
                to: "#0d9488",
                bg: "#ccfbf1",
                text: "#0d9488",
            },
        },
        {
            value: "green",
            label: "Green",
            colors: {
                from: "#22c55e",
                to: "#16a34a",
                bg: "#dcfce7",
                text: "#16a34a",
            },
        },
        {
            value: "lime",
            label: "Lime",
            colors: {
                from: "#84cc16",
                to: "#65a30d",
                bg: "#ecfccb",
                text: "#65a30d",
            },
        },
        {
            value: "yellow",
            label: "Yellow",
            colors: {
                from: "#eab308",
                to: "#ca8a04",
                bg: "#fef9c3",
                text: "#ca8a04",
            },
        },
        {
            value: "orange",
            label: "Orange",
            colors: {
                from: "#f97316",
                to: "#ea580c",
                bg: "#ffedd5",
                text: "#ea580c",
            },
        },
        {
            value: "red",
            label: "Red",
            colors: {
                from: "#ef4444",
                to: "#dc2626",
                bg: "#fee2e2",
                text: "#dc2626",
            },
        },
        {
            value: "pink",
            label: "Pink",
            colors: {
                from: "#ec4899",
                to: "#db2777",
                bg: "#fce7f3",
                text: "#db2777",
            },
        },
        {
            value: "rose",
            label: "Rose",
            colors: {
                from: "#f43f5e",
                to: "#e11d48",
                bg: "#ffe4e6",
                text: "#e11d48",
            },
        },
    ];

// Lucide icon names as string types
export type HabitIconName =
    | "Dumbbell"
    | "Heart"
    | "Brain"
    | "Book"
    | "Droplets"
    | "Moon"
    | "Sun"
    | "Apple"
    | "Pill"
    | "Activity"
    | "Bike"
    | "Walk"
    | "Flame"
    | "Target"
    | "Trophy"
    | "Star"
    | "Zap"
    | "Coffee"
    | "Cigarette"
    | "Wine"
    | "Music"
    | "Palette"
    | "Camera"
    | "Pen"
    | "Code"
    | "Briefcase"
    | "DollarSign"
    | "PiggyBank"
    | "TrendingUp"
    | "Users"
    | "MessageCircle"
    | "Phone"
    | "Home"
    | "Sparkles"
    | "Leaf"
    | "Smile"
    | "Clock"
    | "Calendar"
    | "CheckCircle"
    | "ListTodo";

export interface HabitIconOption {
    name: HabitIconName;
    label: string;
    category: string;
}

// Icon options organized by category
export const habitIconOptions: HabitIconOption[] = [
    // Fitness
    { name: "Dumbbell", label: "Workout", category: "fitness" },
    { name: "Activity", label: "Exercise", category: "fitness" },
    { name: "Bike", label: "Cycling", category: "fitness" },
    { name: "Walk", label: "Walking", category: "fitness" },
    { name: "Flame", label: "Cardio", category: "fitness" },

    // Health
    { name: "Heart", label: "Health", category: "health" },
    { name: "Apple", label: "Nutrition", category: "health" },
    { name: "Droplets", label: "Hydration", category: "health" },
    { name: "Pill", label: "Medication", category: "health" },
    { name: "Moon", label: "Sleep", category: "health" },
    { name: "Cigarette", label: "Quit Smoking", category: "health" },
    { name: "Wine", label: "No Alcohol", category: "health" },

    // Mindfulness
    { name: "Brain", label: "Meditation", category: "mindfulness" },
    { name: "Sun", label: "Morning Routine", category: "mindfulness" },
    { name: "Smile", label: "Gratitude", category: "mindfulness" },
    { name: "Leaf", label: "Nature", category: "mindfulness" },
    { name: "Sparkles", label: "Self-care", category: "mindfulness" },

    // Learning
    { name: "Book", label: "Reading", category: "learning" },
    { name: "Pen", label: "Writing", category: "learning" },
    { name: "Code", label: "Coding", category: "learning" },

    // Productivity
    { name: "Target", label: "Goals", category: "productivity" },
    { name: "CheckCircle", label: "Tasks", category: "productivity" },
    { name: "ListTodo", label: "To-do", category: "productivity" },
    { name: "Clock", label: "Time", category: "productivity" },
    { name: "Calendar", label: "Planning", category: "productivity" },
    { name: "Briefcase", label: "Work", category: "productivity" },
    { name: "Zap", label: "Energy", category: "productivity" },

    // Creativity
    { name: "Music", label: "Music", category: "creativity" },
    { name: "Palette", label: "Art", category: "creativity" },
    { name: "Camera", label: "Photography", category: "creativity" },

    // Finance
    { name: "DollarSign", label: "Money", category: "finance" },
    { name: "PiggyBank", label: "Savings", category: "finance" },
    { name: "TrendingUp", label: "Investing", category: "finance" },

    // Social
    { name: "Users", label: "Social", category: "social" },
    { name: "MessageCircle", label: "Communication", category: "social" },
    { name: "Phone", label: "Calls", category: "social" },
    { name: "Home", label: "Family", category: "social" },

    // General
    { name: "Star", label: "Favorite", category: "other" },
    { name: "Trophy", label: "Achievement", category: "other" },
    { name: "Coffee", label: "Coffee", category: "other" },
];

// Icons organized by category for the HabitForm
export const habitIconsByCategory: Record<string, { name: HabitIconName; label: string }[]> = {
    fitness: [
        { name: "Dumbbell", label: "Workout" },
        { name: "Activity", label: "Exercise" },
        { name: "Bike", label: "Cycling" },
        { name: "Walk", label: "Walking" },
        { name: "Flame", label: "Cardio" },
    ],
    health: [
        { name: "Heart", label: "Health" },
        { name: "Apple", label: "Nutrition" },
        { name: "Droplets", label: "Water" },
        { name: "Pill", label: "Medication" },
        { name: "Moon", label: "Sleep" },
        { name: "Cigarette", label: "Quit Smoking" },
        { name: "Wine", label: "No Alcohol" },
    ],
    mindfulness: [
        { name: "Brain", label: "Meditation" },
        { name: "Sun", label: "Morning" },
        { name: "Smile", label: "Gratitude" },
        { name: "Leaf", label: "Nature" },
        { name: "Sparkles", label: "Self-care" },
    ],
    learning: [
        { name: "Book", label: "Reading" },
        { name: "Pen", label: "Writing" },
        { name: "Code", label: "Coding" },
    ],
    productivity: [
        { name: "Target", label: "Goals" },
        { name: "CheckCircle", label: "Tasks" },
        { name: "ListTodo", label: "To-do" },
        { name: "Clock", label: "Time" },
        { name: "Calendar", label: "Planning" },
        { name: "Briefcase", label: "Work" },
        { name: "Zap", label: "Energy" },
    ],
    creativity: [
        { name: "Music", label: "Music" },
        { name: "Palette", label: "Art" },
        { name: "Camera", label: "Photo" },
    ],
    finance: [
        { name: "DollarSign", label: "Money" },
        { name: "PiggyBank", label: "Savings" },
        { name: "TrendingUp", label: "Investing" },
    ],
    social: [
        { name: "Users", label: "Social" },
        { name: "MessageCircle", label: "Chat" },
        { name: "Phone", label: "Calls" },
        { name: "Home", label: "Family" },
    ],
    other: [
        { name: "Star", label: "Favorite" },
        { name: "Trophy", label: "Achievement" },
        { name: "Coffee", label: "Coffee" },
    ],
};

// Keep old emojis for backward compatibility (existing habits in database)
export const habitIcons = [
    "💪", "🏃", "📚", "💧", "🧘", "😴", "🥗", "💊",
    "✍️", "🎨", "🎵", "🌱", "🧠", "💰", "📱", "🚭",
    "🏋️", "🚴", "🧹", "📝", "🎯", "⏰", "🌅", "🌙",
    "❤️", "🙏", "😊", "🔥", "⭐", "🌈", "🎉", "✨"
];

// Updated categories with Lucide icon names (string)
export const habitCategories: { value: HabitCategory; label: string; icon: string }[] = [
    { value: "health", label: "Health", icon: "Heart" },
    { value: "fitness", label: "Fitness", icon: "Dumbbell" },
    { value: "productivity", label: "Productivity", icon: "Zap" },
    { value: "learning", label: "Learning", icon: "Book" },
    { value: "mindfulness", label: "Mindfulness", icon: "Brain" },
    { value: "social", label: "Social", icon: "Users" },
    { value: "creativity", label: "Creativity", icon: "Palette" },
    { value: "finance", label: "Finance", icon: "DollarSign" },
    { value: "other", label: "Other", icon: "Star" },
];

// Helper function to get color config by value
export function getHabitColorConfig(color: HabitColor) {
    return habitColorOptions.find((c) => c.value === color) || habitColorOptions[1]; // Default to purple
}

// Helper function to check if icon is a Lucide icon name or emoji
export function isLucideIcon(icon: string): icon is HabitIconName {
    const lucideIcons: string[] = [
        "Dumbbell", "Heart", "Brain", "Book", "Droplets", "Moon", "Sun", "Apple",
        "Pill", "Activity", "Bike", "Walk", "Flame", "Target", "Trophy", "Star",
        "Zap", "Coffee", "Cigarette", "Wine", "Music", "Palette", "Camera", "Pen",
        "Code", "Briefcase", "DollarSign", "PiggyBank", "TrendingUp", "Users",
        "MessageCircle", "Phone", "Home", "Sparkles", "Leaf", "Smile", "Clock",
        "Calendar", "CheckCircle", "ListTodo"
    ];
    return lucideIcons.includes(icon);
}

// Helper function to get icons for a specific category
export function getIconsForCategory(category: HabitCategory): { name: HabitIconName; label: string }[] {
    return habitIconsByCategory[category] || habitIconsByCategory.other;
}

```



---
