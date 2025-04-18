"use client";

import { JSX, useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Box,
    LayoutDashboard,
    LogOut,
    Menu,
    CircleUserIcon,
    ShoppingCart,
    ListOrderedIcon,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import useOrderStore from "@/store/orderStore";
import useAuthStore from "@/store/authStore";

export default function DashboardSidebarPage() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const allOrders = useOrderStore((state) => state.orders);
    const userId = useAuthStore((state) => state.user?.id);
    const handleLogout = async () => {
        toast.promise(logout.mutateAsync(), {
            loading: "Logging out...",
            success: "Logged out successfully!",
            error: (error: Error) => `Logout failed: ${error.message}`,
        });
    };

    const sidebarLinks = [
        { label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" />, href: "/dashboard" },
        { label: "Products", icon: <Box className="h-5 w-5" />, href: "/dashboard/products" },
        {
            label: "Profile",
            icon: <CircleUserIcon className="h-5 w-5" />,
            href: "/dashboard/profile",
        },
        {
            label: "Shopping Cart",
            icon: <ShoppingCart className="h-5 w-5" />,
            href: "/dashboard/shopping-cart",
        },
        {
            label: "Logout",
            icon: <LogOut className="h-5 w-5" />,
            href: "#",
            onClick: handleLogout,
        },
    ];

    if (userId && allOrders.map((order) => order.userId).includes(userId)) {
        sidebarLinks.push({
            label: "Orders",
            icon: <ListOrderedIcon className="h-5 w-5" />,
            href: "/dashboard/orders",
        });
    }

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Navbar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white border-b">
                <div className="flex items-center gap-2">
                    <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="sm:hidden">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <SidebarContent
                                onLinkClick={() => setSidebarOpen(false)}
                                links={sidebarLinks}
                            />
                        </SheetContent>
                    </Sheet>
                    <span className="text-xl font-bold">My Dashboard</span>
                </div>
            </div>

            {/* Sidebar for desktop */}
            <div className="hidden sm:flex">
                <aside className="w-64 bg-white h-screen border-r fixed top-0 left-0 pt-16">
                    <SidebarContent links={sidebarLinks} />
                </aside>
                <main className="ml-64 w-full pt-16 px-6">
                    <h1 className="text-2xl font-semibold">Welcome to your dashboard!</h1>
                </main>
            </div>

            {/* Content for mobile (below navbar) */}
            <div className="sm:hidden px-4 py-6">
                <h1 className="text-2xl font-semibold">Welcome to your dashboard!</h1>
            </div>
        </div>
    );
}

function SidebarContent({
    links,
    onLinkClick,
}: {
    links: { label: string; icon: JSX.Element; href: string; onClick?: () => void }[];
    onLinkClick?: () => void;
}) {
    return (
        <div className="h-full flex flex-col p-4">
            <nav className="space-y-2">
                {links.map((link) => (
                    <Link
                        key={link.label}
                        href={link.href}
                        onClick={(e) => {
                            if (link.onClick) {
                                e.preventDefault(); // prevent navigation
                                link.onClick();
                            }
                            onLinkClick?.();
                        }}
                        className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
                    >
                        {link.icon}
                        <span>{link.label}</span>
                    </Link>
                ))}
            </nav>
        </div>
    );
}
