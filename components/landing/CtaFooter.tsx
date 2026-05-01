"use client";

import { DailyWinLogo } from "@/components/brand/DailyWinLogo";

export function CtaFooter() {
    return (
        <footer className="relative overflow-hidden bg-black text-white">
            <div className="absolute inset-0 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:44px_44px]" />

            <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-20 md:px-8">
                <div className="bg-black p-8 md:p-10">
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
                                    <li><a href="#" className="transition hover:text-white/70">Features</a></li>
                                    <li><a href="#" className="transition hover:text-white/70">Mobile App</a></li>
                                    <li><a href="#" className="transition hover:text-white/70">Analytics</a></li>
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
                            <p className="text-xs text-white/60">© 2026 DAY WIN. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

