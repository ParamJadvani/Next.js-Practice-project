"use client";

import { useEffect } from "react";
import { getUserFromCookie } from "@/actions/auth/getUserFromCookie";
import useAuthStore from "@/store/authStore";

export default function AuthHydration() {
    const { user, initialize } = useAuthStore();

    useEffect(() => {
        if (!user) {
            getUserFromCookie().then((userData) => {
                if (userData) initialize({ user: userData, isLogin: true });
            });
        }
    }, [user, initialize]);

    return null;
}
