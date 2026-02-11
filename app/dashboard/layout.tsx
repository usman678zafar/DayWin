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
        <div className="min-h-screen bg-surface-50 dark:bg-surface-950">
            <Navbar />
            <main className="md:ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
