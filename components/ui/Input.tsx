"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, leftIcon, rightIcon, style, ...props }, ref) => {
        const inputStyle: React.CSSProperties = {
            ...(leftIcon ? { paddingLeft: "3.5rem" } : {}),
            ...(rightIcon ? { paddingRight: "3.5rem" } : {}),
            ...style,
        };

        return (
            <div className="w-full">
                {label && (
                    <label className="block text-sm font-medium text-surface-900 dark:text-white mb-2">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {leftIcon && (
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex w-14 items-center justify-center text-surface-200/50">
                            {leftIcon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            "input-field",
                            error && "border-red-500 focus:border-red-500 focus:ring-red-500/50",
                            className
                        )}
                        style={inputStyle}
                        {...props}
                    />
                    {rightIcon && (
                        <div className="absolute inset-y-0 right-0 flex w-14 items-center justify-center text-surface-200/50">
                            {rightIcon}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };
