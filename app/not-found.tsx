import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f3f5f8] dark:bg-[#04070f] px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-6">
                    <span className="text-8xl font-black text-black/10 dark:text-white/10">404</span>
                </div>

                <h1 className="text-2xl font-bold text-black dark:text-white mb-2">
                    Page not found
                </h1>
                <p className="text-sm text-black/60 dark:text-white/60 mb-8">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-sm font-bold text-white transition hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/80"
                    >
                        Go to Dashboard
                    </Link>
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/20 px-6 py-3 text-sm font-bold text-black transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
