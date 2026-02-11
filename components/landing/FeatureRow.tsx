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

