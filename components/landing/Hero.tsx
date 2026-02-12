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
