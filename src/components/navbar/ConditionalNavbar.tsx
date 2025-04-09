"use client";

import { Navbar } from "@/components/navbar/Navbar";
import { usePathname } from "next/navigation";

export function ConditionalNavbar() {
    const pathname = usePathname();
    // If the pathname starts with '/dashboard', don't render the navbar
    if (pathname.startsWith("/dashboard")) return null;
    return <Navbar />;
}
