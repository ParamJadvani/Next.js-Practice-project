"use client";

import useAuthStore from "@/store/authStore";
import { useEffect } from "react";

export default function AuthHydration() {
    const { user, initialize } = useAuthStore();

    useEffect(() => {
        if (!user) {
            async function fetchUser() {
                try {
                    const response = await fetch("/api/store", {
                        credentials: "include",
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        console.log("AuthHydration", userData);

                        // Ensure the response matches your store's expected format
                        initialize({
                            user: userData,
                            isLogin: true,
                        });
                    } else {
                        console.error("Failed with status:", response.status);
                    }
                } catch (error) {
                    console.error("User fetch failed:", error);
                }
            }

            fetchUser();
        }
    }, [user]);

    return null;
}
