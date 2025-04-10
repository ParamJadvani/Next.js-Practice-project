"use client";

import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);
    const { logout } = useAuth();
    console.log(user);

    const isUserLoading = !user || !user.email;

    const handleLogout = async () => {
        toast.promise(logout.mutateAsync(), {
            loading: "Logging out...",
            success: "Logged out successfully!",
            error: (error: Error) => `Logout failed: ${error.message}`,
        });
    };

    if (isUserLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-300" />
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                    Welcome to your Dashboard
                </h1>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full">
                    <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                        Welcome back,{" "}
                        <span className="font-semibold">
                            {user.username[0].toUpperCase()}
                            {user.username.slice(1)}
                        </span>
                    </p>
                    <div className="flex flex-col space-y-4">
                        <Link
                            href="/dashboard/settings"
                            className="block text-center bg-black text-white p-2 rounded-md font-semibold"
                        >
                            Profile Settings
                        </Link>
                        <Button variant="outline" className="w-full" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
