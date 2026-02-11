"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-image.jpg";

export function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#09090b] text-white pt-20 pb-32"
        >
            {/* Cinematic Background Glows */}
            <div className="absolute top-1/4 -left-1/4 w-[60%] h-[60%] bg-[#7c3aed]/20 blur-[150px] rounded-full animate-pulse" />
            <div className="absolute bottom-1/4 -right-1/4 w-[60%] h-[60%] bg-[#3b82f6]/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

            {/* Grid Pattern Background */}


            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
                    {/* Content Column */}
                    <div className="lg:w-1/2 text-center lg:text-left">


                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter"
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/50">MASTER YOUR</span><br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-500">HABITS.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-xl md:text-2xl text-white/60 mb-12 max-w-xl leading-relaxed"
                        >
                            Experience the future of personal growth. <span className="text-white">Day Win</span> transforms your daily actions into legendary streaks.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start"
                        >
                            <a href="#" className="group relative">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                                <div className="relative bg-black text-white px-10 py-4 rounded-2xl flex items-center gap-4 border border-white/10">
                                    <svg viewBox="0 0 384 512" width="24" className="fill-current text-white">
                                        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.1 24.5-.6 33.1-15.3 62.7-15.3 29.6 0 37.5 15.3 63.9 14.8 49-.8 89-77.9 105.4-114.6-56.3-23.2-64.4-106.3-1.9-136l-.3-1h-.1zM290.1 82.3c23.5-27.7 38-66.2 33.5-104.2-31.1 1.3-70.6 21.6-92.8 47.7-20.3 23.3-37.4 63.3-33 100.2 34.1 2.5 70.1-17.6 92.3-43.7z" />
                                    </svg>
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase font-bold tracking-widest opacity-50">Coming Soon to</p>
                                        <p className="text-xl font-black">App Store</p>
                                    </div>
                                </div>
                            </a>
                        </motion.div>
                    </div>

                    {/* Image Column - The "Better" Mockup Container */}
                    <div className="lg:w-1/2 relative perspective-1000">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative z-10"
                        >
                            {/* Phone Case Glass effect */}
                            <div className="absolute -inset-10 bg-gradient-to-tr from-primary-500/20 to-blue-500/20 rounded-full blur-[100px] z-0" />

                            <div className="relative z-10 drop-shadow-[0_50px_50px_rgba(0,0,0,0.5)]">
                                <Image
                                    src={heroImage}
                                    alt="Person checking a glucose patch sensor while viewing a habit tracker app"
                                    width={950}
                                    height={1265}
                                    className="mx-auto w-[95%] max-w-[760px] rounded-3xl object-cover"
                                    priority
                                />
                            </div>

                            {/* Floating Glass Indicators */}



                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Premium Wave Transition */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[120px] fill-white dark:fill-white">
                    <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
                </svg>
            </div>
        </section>
    );
}

