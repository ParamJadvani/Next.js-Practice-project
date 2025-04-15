import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "@/app/globals.css";
import { QueryProvider } from "@/components/providers/query-provider";
import AuthHydration from "@/components/auth/AuthHydration";

const inter = Space_Grotesk({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
    title: "My Auth App",
    description: "Next.js 15 Auth Example",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <QueryProvider>
                    <AuthHydration />
                    {children}
                    <Toaster position="top-center" duration={2500} />
                </QueryProvider>
            </body>
        </html>
    );
}
