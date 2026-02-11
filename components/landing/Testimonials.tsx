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
