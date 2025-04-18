"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/store/authStore";
import * as auth from "@/_actions/auth/authClient";
import { resetPassword, updatePassword, updateProfile } from "@/_actions/profile/profileAction";

export function useAuth() {
    const loginAction = useAuthStore((s) => s.login);
    const logoutAction = useAuthStore((s) => s.logout);
    const updateAction = useAuthStore((s) => s.updateUser);
    const router = useRouter();
    const searchParam = useSearchParams();
    const redirectTo = searchParam.get("redirectedFrom") || "/dashboard";

    const login = useMutation({
        mutationFn: auth.loginUser,
        onSuccess: (data) => {
            loginAction(data.user);
            router.push(redirectTo);
        },
        onError: (error: Error) => {
            console.error("Login Error:", error);
        },
    });

    const signup = useMutation({
        mutationFn: auth.signupUser,
        onSuccess: (data) => {
            loginAction(data.user);
            router.push(redirectTo);
        },
        onError: (error: Error) => {
            console.error("Signup Error:", error);
        },
    });

    const logout = useMutation({
        mutationFn: auth.logoutUser,
        onSuccess: () => {
            logoutAction();
            router.push("/login");
        },
        onError: (error: Error) => {
            console.error("Logout Error:", error.message);
        },
    });

    const update = useMutation({
        mutationFn: updateProfile,
        onSuccess: (data) => {
            updateAction(data.user);
        },
        onError: (error: Error) => {
            console.error("Profile update error:", error);
        },
    });

    const updateClientPassword = useMutation({
        mutationFn: updatePassword,
        onSuccess: (data) => {
            return data.message;
        },
        onError: (error: Error) => {
            console.error("Profile update error:", error);
        },
    });

    const resetClientPassword = useMutation({
        mutationFn: resetPassword,
        onSuccess: (data) => {
            return data.message;
        },
        onError: (error: Error) => {
            console.error("Profile update error:", error);
        },
    });

    return { login, signup, logout, update, updateClientPassword, resetClientPassword };
}
