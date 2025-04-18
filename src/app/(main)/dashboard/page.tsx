"use client";

import { Suspense } from "react";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import GlobalLoadingPage from "@/app/loading";

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);
    const { logout } = useAuth();

    const handleLogout = async () => {
        toast.promise(logout.mutateAsync(), {
            loading: "Logging out...",
            success: "Logged out successfully!",
            error: (error: Error) => `Logout failed: ${error.message}`,
        });
    };

    // We want Suspense to handle the loading state of the user data
    return (
        <Suspense fallback={<GlobalLoadingPage />}>
            <div className="flex flex-col items-center justify-center">
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                        Welcome to your Dashboard
                    </h1>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
                        <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                            Welcome back,{" "}
                            <span className="font-semibold">
                                {user?.username[0].toUpperCase()}
                                {user?.username.slice(1)}
                            </span>
                        </p>
                        <div className="flex flex-col space-y-4">
                            <Link
                                href="/dashboard/profile"
                                className="block text-center bg-black text-white p-2 rounded-md font-semibold"
                            >
                                Profile
                            </Link>
                            <Button variant="outline" className="w-full" onClick={handleLogout}>
                                Sign Out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Suspense>
    );
}
