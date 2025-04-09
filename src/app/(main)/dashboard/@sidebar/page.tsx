// /app/(main)/dashboard/@sidebar/page.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Settings, LogOut } from "lucide-react";
import { toast } from "sonner";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarFooter,
    SidebarHeader,
    SidebarTrigger, // Import SidebarTrigger
} from "@/components/ui/sidebar";
// Button might not be needed if using SidebarMenuButton styling
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
    // ... (keep menuItems array as before)
    {
        title: "Home",
        url: "/dashboard",
        icon: Home,
        tooltip: "Dashboard Home",
    },
    {
        title: "Products",
        url: "/dashboard/products",
        icon: Package, // Use Package icon for products
        tooltip: "Manage Products",
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
        tooltip: "Account Settings",
    },
];

export default function DashboardSidebarPage() {
    const pathname = usePathname();
    const { logout } = useAuth();

    const handleLogout = async () => {
        // ... (keep handleLogout function as before)
        toast.promise(logout.mutateAsync(), {
            loading: "Logging out...",
            success: "Logged out successfully!",
            error: (error: Error) => `Logout failed: ${error.message}`,
        });
    };

    return (
        // *** Ensure collapsible="icon" is set ***
        <Sidebar
            collapsible="icon"
            variant="sidebar"
            className="border-r hidden sm:flex sm:flex-col"
        >
            {" "}
            {/* Hide on mobile initially, let Sheet handle it */}
            <SidebarHeader className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                {/* App Title/Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 font-semibold group-data-[collapsible=icon]:justify-center"
                >
                    {/* Replace with your Logo/Icon */}
                    <Package className="h-6 w-6 transition-all group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:w-8" />
                    <span className="group-data-[collapsible=icon]:hidden">My App</span>
                </Link>

                {/* Desktop Sidebar Trigger - Placed at the end of the header */}
                <div className="ml-auto">
                    {" "}
                    {/* Pushes trigger to the right */}
                    {/* The trigger itself uses the context to toggle */}
                    <SidebarTrigger className="hidden sm:flex" />{" "}
                    {/* Ensure it's visible on desktop */}
                </div>
            </SidebarHeader>
            <SidebarContent className="flex-1 overflow-auto">
                <SidebarGroup>
                    <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden pt-2">
                        Navigation
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        asChild
                                        isActive={
                                            pathname.startsWith(item.url) &&
                                            (item.url !== "/dashboard" || pathname === "/dashboard")
                                        }
                                        tooltip={item.tooltip}
                                    >
                                        <Link href={item.url} className="flex items-center gap-2">
                                            <item.icon className="h-5 w-5 flex-shrink-0" />
                                            <span className="group-data-[collapsible=icon]:hidden">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mt-auto">
                {" "}
                {/* Ensure footer sticks to bottom */}
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            onClick={handleLogout}
                            className="flex items-center gap-2"
                            tooltip="Sign Out"
                        >
                            <LogOut className="h-5 w-5 flex-shrink-0" />
                            <span className="group-data-[collapsible=icon]:hidden">Sign Out</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
}
