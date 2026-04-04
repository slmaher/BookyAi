import type { Metadata } from "next";
import { IBM_Plex_Serif, Mona_Sans } from "next/font/google";
import { ClerkProvider, Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import Navbar from "@/components/Navbar";
import "./globals.css";
import { cn } from "@/lib/utils";

const ibmplexSerif = IBM_Plex_Serif({
    variable: "--font-ibm-plex-serif",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
});

const monoSans = Mona_Sans({
    variable: "--font-mona-sans",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "BookyAi",
    description: "Your Smart Book, Chat with your book using AI",
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={cn("font-sans")}>
        <body
            className={cn(
                ibmplexSerif.variable,
                monoSans.variable,
                "relative font-sans antialiased"
            )}
        >
        <ClerkProvider>
            <header className="flex justify-between items-center p-4 border-b">
                <Navbar/>
                <div className="flex gap-2">
                    <Show when="signed-out">
                        <SignInButton />
                        <SignUpButton />
                    </Show>
                    <Show when="signed-in">
                        <UserButton />
                    </Show>
                </div>
            </header>

            {children}
        </ClerkProvider>
        </body>
        </html>
    );
}