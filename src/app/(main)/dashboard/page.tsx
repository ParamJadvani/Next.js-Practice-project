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

    // Corrected loading check (!!user → !user)
    if (!user || Object.keys(user).length === 0 || !user.email) {
        return <p>Loading user data or redirecting...</p>;
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold mb-4">Welcome to your Dashboard!</h1>
            <p className="mb-6">
                You are logged in as: <span className="font-semibold">{user.email}</span>
            </p>
            <Button onClick={handleLogout} variant="destructive">
                Log Out
            </Button>
        </div>
    );
}
