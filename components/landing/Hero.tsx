"use client";

import Image from "next/image";
import heroImage from "@/assets/hero-image.jpg";
import { DailyWinLogo } from "@/components/brand/DailyWinLogo";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white text-black">
            <div className="mx-auto w-full max-w-[1400px] px-4 pt-1 pb-6 sm:px-6 md:px-8 md:pt-2 md:pb-10">
                <div className="bg-white px-4 pt-2 pb-4 sm:px-6 sm:pt-3 sm:pb-6 md:px-8 md:pt-4 md:pb-8">
                    <div className="mb-8 flex items-center justify-between">
                        <DailyWinLogo
                            label="DAY WIN"
                            iconClassName="h-7 w-7 rounded-sm"
                            textClassName="text-[11px] tracking-[0.14em] text-black"
                        />
                        <div className="hidden md:block flex-1" />
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
                            <h1 className="font-black uppercase leading-[0.9] tracking-tight text-[clamp(1.65rem,6.8vw,4.6rem)]">
                                Win The Day.
                                <br />
                                <span className="text-black/65">Every Day.</span>
                                <br />
                                Build Momentum.
                            </h1>
                            <p className="mt-5 max-w-[560px] text-base leading-relaxed text-black/75 md:text-xl font-medium">
                                Elevate your daily routine with the world&apos;s most focused habit tracker. Transform small actions into consistent results through visual momentum and premium analytics.
                            </p>
                            <div className="mt-8 flex flex-col sm:flex-row gap-4">
                                <a
                                    href="/signup"
                                    className="inline-flex items-center justify-center bg-black px-8 py-4 text-center text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-black/80 sm:w-auto rounded-none"
                                >
                                    Start Your Journey
                                </a>
                                <div className="flex items-center gap-4 px-4 sm:px-0">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="h-8 w-8 rounded-full border-2 border-white bg-surface-100 flex items-center justify-center overflow-hidden">
                                                <div className="h-full w-full bg-gradient-to-br from-black/10 to-transparent" />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-black/50">
                                        Joined by <span className="text-black">2,000+</span> seekers
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <div className="overflow-hidden rounded-2xl bg-[#f5f5f5]">
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
