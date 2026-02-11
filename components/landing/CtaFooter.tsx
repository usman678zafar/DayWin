"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function CtaFooter() {
    return (
        <div className="bg-white">
            {/* CTA Section */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <p className="text-[#3b82f6] font-bold uppercase tracking-wider mb-4 opacity-70">
                        DAY WIN - HABIT TRACKER
                    </p>
                    <h2 className="text-4xl font-extrabold text-[#1f2937] mb-8">
                        Start Your Journey to Excellence
                    </h2>
                    <p className="text-lg text-[#6b7280] mb-6">
                        Day Win is designed to help you transform your aspirations into automated routines. We provide the tools you need to stay consistent and celebrate every victory.
                    </p>
                    <p className="text-lg text-[#6b7280] mb-12">
                        Success isn't about one big event; it's about the small things you do every single day. Let Day Win be your partner in building the discipline that leads to greatness.
                    </p>

                    <a href="#" className="inline-block hover:scale-105 transition-transform">
                        <div className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-3">
                            <svg viewBox="0 0 384 512" width="24" className="fill-current">
                                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.1 24.5-.6 33.1-15.3 62.7-15.3 29.6 0 37.5 15.3 63.9 14.8 49-.8 89-77.9 105.4-114.6-56.3-23.2-64.4-106.3-1.9-136l-.3-1h-.1zM290.1 82.3c23.5-27.7 38-66.2 33.5-104.2-31.1 1.3-70.6 21.6-92.8 47.7-20.3 23.3-37.4 63.3-33 100.2 34.1 2.5 70.1-17.6 92.3-43.7z" />
                            </svg>
                            <div className="text-left">
                                <p className="text-[10px] uppercase leading-none opacity-60">Download on the</p>
                                <p className="text-xl font-bold leading-none">App Store</p>
                            </div>
                        </div>
                    </a>
                </div>
            </section>

            {/* Footer / Wavy section */}
            <footer className="relative bg-gradient-to-tr from-[#a855f7] to-[#3b82f6] pt-32 pb-12 overflow-hidden">
                {/* Wave at the top of footer */}
                <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] -scale-y-100">
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[150px] fill-white">
                        <path d="M0,64L80,74.7C160,85,320,107,480,106.7C640,107,800,85,960,74.7C1120,64,1280,64,1360,64L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
                    </svg>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-12 border-t border-white/20">
                        <div className="flex items-center gap-4">
                            <Image src="/app-logo.png" alt="Logo" width={48} height={48} className="rounded-xl" />
                        </div>

                        <div className="flex gap-6">
                            <a href="#" className="text-white hover:opacity-70 transition-opacity">
                                <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.058-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                            <a href="#" className="text-white hover:opacity-70 transition-opacity">
                                <svg viewBox="0 0 24 24" width="24" height="24" className="fill-current">
                                    <path d="M0 3v18h24v-18l-12 9-12-9zm12 11l-10-7.5v-1.5l10 7.5 10-7.5v1.5l-10 7.5z" />
                                </svg>
                            </a>
                        </div>

                        <p className="text-white/60 text-sm">
                            © 2024 Day Win. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
