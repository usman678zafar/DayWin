import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Hero } from "@/components/landing/Hero";
import { FeatureRow } from "@/components/landing/FeatureRow";
import { Testimonials } from "@/components/landing/Testimonials";
import { CtaFooter } from "@/components/landing/CtaFooter";
import winTheDayImage from "@/assets/win-the-day.jpg";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Day Win - Build Better Habits & Win Every Day",
    description:
        "Day Win is the habit tracker that helps you build lasting consistency through visual progress, smart notifications, streak milestones, and powerful analytics. Start winning today.",
    keywords: [
        "habit tracker",
        "productivity app",
        "daily habits",
        "streak tracker",
        "self improvement",
        "goal setting",
        "routine builder",
        "habit building",
        "progress tracking",
    ],
    openGraph: {
        title: "Day Win - Build Better Habits & Win Every Day",
        description:
            "Track your habits, build streaks, and become your best self. Day Win combines beautiful design with powerful analytics to make habit building effortless.",
        type: "website",
        siteName: "Day Win",
    },
    twitter: {
        card: "summary_large_image",
        title: "Day Win - Build Better Habits",
        description:
            "Track your habits, build streaks, and become your best self with Day Win.",
    },
    robots: {
        index: true,
        follow: true,
    },
};

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
