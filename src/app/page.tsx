"use client";

import useAuthStore from "@/store/authStore";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
    const user = useAuthStore((s) => s.user);
    useEffect(() => {
        if (user) {
            redirect("/dashboard");
        }
    }, [user]);
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-30 w-30 border-t-2 border-b-2 border-gray-900 dark:border-gray-300" />
        </div>
    );
}
