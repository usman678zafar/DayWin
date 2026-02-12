import { cn } from "@/lib/utils";

type DailyWinLogoProps = {
    className?: string;
    textClassName?: string;
    iconClassName?: string;
    label?: string;
};

export function DailyWinLogo({
    className,
    textClassName,
    iconClassName,
    label = "DAY WIN",
}: DailyWinLogoProps) {
    return (
        <div className={cn("inline-flex items-center gap-2.5", className)}>
            <span
                className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-md bg-[#e8d774]",
                    iconClassName
                )}
                aria-hidden="true"
            >
                <svg viewBox="0 0 64 64" className="h-5 w-5" fill="none">
                    <g stroke="#000" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(45 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(90 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(135 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(180 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(225 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(270 32 32)" />
                        <path d="M32 6v12c0 3.9-3.1 7-7 7H13" transform="rotate(315 32 32)" />
                    </g>
                </svg>
            </span>
            <span className={cn("text-xs font-bold uppercase tracking-[0.16em] text-white", textClassName)}>
                {label}
            </span>
        </div>
    );
}
