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

