// /app/(main)/dashboard/dashboard-layout-client.tsx (New File)
"use client"; // This component uses hooks, so it needs to be a client component

import React from "react";
// Imports needed for the layout structure and hooks
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile"; // Assuming you have this hook
import { cn } from "@/lib/utils";

export default function DashboardLayoutClient({
    children,
    dashboardSideBar, // Receive the sidebar slot as a prop
}: {
    children: React.ReactNode;
    dashboardSideBar: React.ReactNode;
}) {
    const isMobile = useIsMobile();
    const { state, open } = useSidebar(); // Hook is called safely *inside* the Provider context

    // Calculate padding based on sidebar state (only for desktop)
    const mainContentPadding = React.useMemo(() => {
        if (isMobile || !open) {
            // No padding adjustment on mobile or if sidebar is fully closed (offcanvas)
            return "";
        }
        // Apply padding based on collapsed/expanded state when sidebar is visible on desktop
        return state === "collapsed"
            ? "sm:pl-[calc(var(--sidebar-width-icon)+1rem)]" // Adjust 1rem gap as needed
            : "sm:pl-[calc(var(--sidebar-width)+1rem)]"; // Adjust 1rem gap as needed
    }, [isMobile, state, open]);

    return (
        // The main flex container for sidebar + content
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Render the sidebar passed from the parallel route */}
            {dashboardSideBar}

            {/* Main Content Area */}
            <main
                className={cn(
                    "flex-1 flex flex-col transition-[padding-left] duration-200 ease-linear",
                    mainContentPadding // Apply calculated padding
                )}
            >
                {/* Sticky Header */}
                <header
                    className={cn(
                        "sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 dark:bg-gray-800 dark:border-gray-700 shadow sm:shadow-none"
                        // Header might also need padding adjustment if it spans full width *above* main content's padding
                        // Or simpler: let the main content padding handle the visual offset
                    )}
                >
                    {/* Mobile Sidebar Trigger */}
                    <div className="sm:hidden">
                        {/* This trigger controls the Sheet (mobile overlay) */}
                        <SidebarTrigger />
                    </div>

                    <h1 className="flex-1 text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">
                        Dashboard
                    </h1>
                    {/* Other header content */}
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</div>
            </main>
        </div>
    );
}
