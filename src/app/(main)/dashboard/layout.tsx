// /app/(main)/dashboard/layout.tsx
"use client"; // Keep top-level layout client for provider/auth hydration

import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar"; // Only Provider needed here
import AuthHydration from "@/components/auth/AuthHydration";
import DashboardLayoutClient from "@/app/(main)/dashboard/dashboard-layout-client";

export default function DashboardLayout({
    children,
    sidebar, // The parallel route slot
}: {
    children: React.ReactNode;
    sidebar: React.ReactNode;
}) {
    // No hooks called here

    return (
        // Provider wraps the actual layout implementation component
        <SidebarProvider>
            {/* AuthHydration can be here or inside the client component */}
            <AuthHydration />

            {/* Render the client component that uses the hook */}
            {/* Pass down the sidebar slot and children */}
            <DashboardLayoutClient dashboardSideBar={sidebar}>{children}</DashboardLayoutClient>
        </SidebarProvider>
    );
}
