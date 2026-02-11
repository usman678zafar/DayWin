"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "react-hot-toast";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
                <Toaster
                    position="top-center"
                    toastOptions={{
                        className: "toast-custom",
                        duration: 3000,
                        style: {
                            padding: "16px",
                            borderRadius: "12px",
                        },
                    }}
                />
            </ThemeProvider>
        </SessionProvider>
    );
}
