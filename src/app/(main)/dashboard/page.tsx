"use client";

import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);
    const logoutAction = useAuthStore((state) => state.logout);
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const response = await fetch("/api/auth/logout", { method: "POST" });
            if (!response.ok) throw new Error("Logout failed");

            logoutAction();
            toast("Logged Out", { description: "You are now logged out." });
            router.push("/login");
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error("Logout failed:", error);
                toast("Logout Failed", { description: error.message });
            }
        }
    };

    if (!user || Object.keys(user).length === 0 || !user.email) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900" />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md space-y-6">
                <h1 className="text-3xl font-bold text-center">Your Dashboard</h1>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                    <p className="text-lg mb-4">
                        Welcome back, <span className="font-semibold">{user.email}</span>
                    </p>

                    <div className="space-y-4">
                        <Button className="w-full">Profile Settings</Button>

                        <Button variant="outline" className="w-full" onClick={handleLogout}>
                            Sign Out
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
