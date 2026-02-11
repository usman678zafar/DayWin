import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "@/components/layout/Navbar";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[#f3f5f8] dark:bg-[#04070f]">
            <div className="pointer-events-none absolute inset-0 opacity-60 [background:radial-gradient(circle_at_14%_12%,rgba(0,0,0,0.06),transparent_35%),radial-gradient(circle_at_85%_88%,rgba(0,0,0,0.08),transparent_35%)] dark:opacity-30 dark:[background:radial-gradient(circle_at_14%_12%,rgba(255,255,255,0.08),transparent_35%),radial-gradient(circle_at_85%_88%,rgba(255,255,255,0.06),transparent_35%)]" />
            <Navbar />
            <main className="relative md:ml-72 min-h-screen pb-24 md:pb-8">
                {children}
            </main>
        </div>
    );
}

