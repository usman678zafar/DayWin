"use client";

import Image from "next/image";

export function CtaFooter() {
    return (
        <footer className="relative overflow-hidden bg-[#020a16] text-white">
            <div className="absolute inset-0 opacity-25 [background:radial-gradient(circle_at_8%_10%,rgba(34,211,238,0.28),transparent_34%),radial-gradient(circle_at_88%_82%,rgba(59,130,246,0.25),transparent_36%)]" />
            <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.15)_1px,transparent_1px)] [background-size:46px_46px]" />

            <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-24 md:px-8">
                <div className="rounded-2xl border border-cyan-300/25 bg-[#041325]/70 p-8 shadow-[0_20px_70px_rgba(2,132,199,0.2)] md:p-10">
                    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        <div>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                                Day Win Mobile Tracker
                            </p>
                            <h2 className="max-w-2xl text-4xl font-black uppercase leading-[0.95] text-white md:text-6xl">
                                Keep Every Habit
                                <br />
                                <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                                    In One App
                                </span>
                            </h2>
                            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
                                Track routines, protect streaks, and get daily clarity with a focused mobile dashboard built for consistency.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <a
                                    href="#"
                                    className="inline-flex items-center rounded-md border border-cyan-300/70 bg-cyan-400 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#03131f] transition hover:bg-cyan-300"
                                >
                                    Download App
                                </a>
                                <a
                                    href="#"
                                    className="inline-flex items-center rounded-md border border-slate-500/70 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-100 transition hover:border-cyan-300/75 hover:text-cyan-200"
                                >
                                    Product Roadmap
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
                                    Product
                                </h3>
                                <ul className="space-y-3 text-slate-200">
                                    <li><a href="#tracker-vision" className="transition hover:text-cyan-200">Tracker Vision</a></li>
                                    <li><a href="#habit-technology" className="transition hover:text-cyan-200">Habit Technology</a></li>
                                    <li><a href="#streak-manifesto" className="transition hover:text-cyan-200">Streak Manifesto</a></li>
                                    <li><a href="#" className="transition hover:text-cyan-200">Changelog</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
                                    Company
                                </h3>
                                <ul className="space-y-3 text-slate-200">
                                    <li><a href="#" className="transition hover:text-cyan-200">About</a></li>
                                    <li><a href="#" className="transition hover:text-cyan-200">Privacy Policy</a></li>
                                    <li><a href="#" className="transition hover:text-cyan-200">Terms</a></li>
                                    <li><a href="#" className="transition hover:text-cyan-200">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 border-t border-cyan-300/20 pt-6">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-3">
                                <Image src="/app-logo.png" alt="Day Win logo" width={40} height={40} className="rounded-lg" />
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-100">Day Win</p>
                                    <p className="text-xs text-slate-400">Mobile Habit Tracker</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 text-xs uppercase tracking-[0.12em] text-slate-300">
                                <a href="#" className="transition hover:text-cyan-200">Instagram</a>
                                <a href="#" className="transition hover:text-cyan-200">X</a>
                                <a href="#" className="transition hover:text-cyan-200">YouTube</a>
                            </div>
                            <p className="text-xs text-slate-400">
                                © 2026 Day Win. All rights reserved.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
