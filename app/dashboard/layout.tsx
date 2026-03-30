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
        <div className="relative min-h-screen overflow-hidden bg-white dark:bg-[#030305]">
            {/* Premium Background Gradients */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-blue-500/5 blur-[120px] dark:bg-blue-500/[0.03]" />
                <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-purple-500/5 blur-[120px] dark:bg-purple-500/[0.03]" />
            </div>

            <Navbar />
            <main className="relative min-h-screen pb-24 transition-[margin] duration-300 md:ml-20 md:peer-hover/sidebar:ml-56 xl:peer-hover/sidebar:ml-60 md:pb-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-5 lg:px-6 pt-5 md:pt-6">
                    {children}
                </div>
            </main>
        </div>
    );
}

