"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { signupUser } from "@/actions/auth/signupAction";
import useAuthStore from "@/store/authStore";
import loginUser from "@/actions/auth/loginAction";

export function useAuth() {
    const loginAction = useAuthStore((s) => s.login);
    const logoutAction = useAuthStore((s) => s.logout);
    const router = useRouter();
    const searchParam = useSearchParams();
    const redirectTo = searchParam.get("redirectedFrom") || "/dashboard";

    const login = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            loginAction(data.user);
            router.push(redirectTo);
        },

        onError: (error: Error) => {
            // Optional: handle errors more gracefully
            console.error("Login Error:", error.message);
        },
    });

    const signup = useMutation({
        mutationFn: signupUser,

        onSuccess: (data) => {
            loginAction(data.user);
            router.push(redirectTo);
        },

        onError: (error: Error) => {
            console.error("Signup Error:", error.message);
        },
    });

    return { login, signup, logout: logoutAction };
}
