"use client";

import { useState } from "react";
import AuthHydration from "@/components/auth/AuthHydration";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import DashboardSidebarPage from "@/app/(main)/dashboard/sidebar/page";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarCollapsed((prev) => !prev);
    };

    return (
        <>
            <AuthHydration />
            <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
                {/* Sidebar */}
                <aside
                    className={`${
                        isSidebarCollapsed ? "w-0" : "w-64"
                    } transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 shadow-md overflow-hidden`}
                >
                    {!isSidebarCollapsed && <DashboardSidebarPage />}
                </aside>

                {/* Main content */}
                <div className="flex flex-col flex-1">
                    <header className="flex items-center justify-between bg-white dark:bg-gray-800 border-b px-4 py-3 shadow-sm">
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                                {isSidebarCollapsed ? (
                                    <Menu className="h-5 w-5" />
                                ) : (
                                    <X className="h-5 w-5" />
                                )}
                            </Button>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                Dashboard
                            </h1>
                        </div>
                    </header>

                    <main className="flex-1 overflow-auto p-6">{children}</main>
                </div>
            </div>
        </>
    );
}
