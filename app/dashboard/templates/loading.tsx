import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="page-container">
            <div className="mb-12 space-y-4">
                <Skeleton className="h-6 w-32 rounded-lg bg-black/5 dark:bg-white/5" />
                <Skeleton className="h-12 w-96 rounded-lg bg-black/5 dark:bg-white/5" />
                <Skeleton className="h-6 w-full max-w-2xl rounded-lg bg-black/5 dark:bg-white/5" />
            </div>

            <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[1, 2].map((i) => (
                        <div key={i} className="card h-full p-6 flex flex-col gap-6 border border-black/5 dark:border-white/5 bg-white shadow-xl dark:bg-surface-900">
                            <Skeleton className="aspect-[3/4] w-full rounded-xl bg-black/5 dark:bg-white/5" />
                            <div className="flex-1 space-y-4">
                                <Skeleton className="h-8 w-3/4 rounded-lg bg-black/5 dark:bg-white/5" />
                                <Skeleton className="h-20 w-full rounded-lg bg-black/5 dark:bg-white/5" />
                                <Skeleton className="h-10 w-full rounded-lg bg-black/5 dark:bg-white/5" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
