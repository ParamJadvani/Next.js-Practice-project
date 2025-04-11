"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import useAuthStore from "@/store/authStore";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth"; // Adjust import path as needed
import { z } from "zod";

// Import Schemas
import { profileSchema, passwordSchema, resetPasswordSchema } from "@/schemas/validationSchema";

// Import Components
import { EditProfileDialog } from "@/components/profile/EditProfileDialog";
import { ChangePasswordDialog } from "@/components/profile/ChangePasswordDialog";
import { ProfileCard } from "@/components/profile/ProfileCard";

export default function ProfilePage() {
    const user = useAuthStore((s) => s.user);
    const { update, updateClientPassword, resetClientPassword } = useAuth();

    // --- State ---
    // Profile Dialog State
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [profileErrors, setProfileErrors] = useState<{ username?: string; email?: string }>({});
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);

    // Password Dialog State
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [resetNewPassword, setResetNewPassword] = useState("");
    const [resetConfirmPassword, setResetConfirmPassword] = useState("");
    const [passwordErrors, setPasswordErrors] = useState<{
        oldPassword?: string;
        newPassword?: string;
        confirmNewPassword?: string;
        resetNewPassword?: string;
        resetConfirmPassword?: string;
    }>({});
    const [isResetMode, setIsResetMode] = useState(false);
    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);

    // --- Effects ---
    // Initialize form data with user data when available or user changes
    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setEmail(user.email || "");
        } else {
            // Optionally clear fields if user logs out while on the page
            setUsername("");
            setEmail("");
        }
    }, [user]);

    // --- Handlers ---
    // Profile Update Handler
    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Ensure default is prevented if called directly
        try {
            profileSchema.parse({ username, email });
            setProfileErrors({}); // Clear previous errors

            if (user?.id) {
                const obj = { id: user.id, data: { username, email } };
                toast.promise(
                    update
                        .mutateAsync(obj)
                        .then(() => {
                            setProfileDialogOpen(false); // Close dialog on success
                            // No need to update store manually if useAuth handles it
                        })
                        .catch((err) => {
                            console.error("Failed to update profile:", err);
                            throw err; // Re-throw for toast to catch
                        }),
                    {
                        loading: "Updating profile...",
                        success: "Profile updated successfully!",
                        error: (err: Error) => err.message || "Failed to update profile.", // Provide default error
                    }
                );
            } else {
                toast.error("User information is missing.");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: { username?: string; email?: string } = {};
                error.errors.forEach((err) => {
                    const path = err.path[0] as keyof typeof newErrors;
                    if (path) {
                        newErrors[path] = err.message;
                    }
                });
                setProfileErrors(newErrors);
            } else {
                console.error("Profile update error:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    // Password Change Handler
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault(); // Ensure default is prevented
        try {
            passwordSchema.parse({ oldPassword, newPassword, confirmNewPassword });
            setPasswordErrors({}); // Clear previous errors

            if (user?.id) {
                const obj = { id: user.id, data: { oldPassword, newPassword } };
                toast.promise(
                    updateClientPassword
                        .mutateAsync(obj)
                        .then(() => {
                            // Reset form state and close dialog on success
                            setOldPassword("");
                            setNewPassword("");
                            setConfirmNewPassword("");
                            setPasswordDialogOpen(false);
                        })
                        .catch((err) => {
                            console.error("Failed to update password:", err);
                            throw err; // Re-throw for toast to catch
                        }),
                    {
                        loading: "Changing password...",
                        success: "Password updated successfully!",
                        error: (err: Error) => err.message || "Failed to change password.", // Provide default error
                    }
                );
            } else {
                toast.error("User information is missing.");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: typeof passwordErrors = {};
                error.errors.forEach((err) => {
                    const path = err.path[0] as keyof typeof newErrors;
                    if (path) {
                        newErrors[path] = err.message;
                    }
                });
                setPasswordErrors(newErrors);
            } else {
                console.error("Password change error:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    // Password Reset Handler
    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault(); // Ensure default is prevented
        try {
            resetPasswordSchema.parse({
                newPassword: resetNewPassword,
                confirmPassword: resetConfirmPassword,
            });
            setPasswordErrors({}); // Clear previous errors

            if (user?.id) {
                // Assuming the same endpoint handles reset without oldPassword
                // Adjust if your API requires a different endpoint or payload for resets
                const obj = { id: user.id, data: { newPassword: resetNewPassword } };
                console.log(obj);
                toast.promise(
                    resetClientPassword
                        .mutateAsync(obj) // Using the same mutation, adjust if needed
                        .then(() => {
                            setResetNewPassword("");
                            setResetConfirmPassword("");
                            // setIsResetMode(false); // Keep reset mode or not? Depends on UX - closing dialog handles reset for now.
                            setPasswordDialogOpen(false); // Close dialog
                        })
                        .catch((err) => {
                            console.error("Failed to reset password:", err);
                            throw err; // Re-throw for toast to catch
                        }),
                    {
                        loading: "Resetting password...",
                        success: "Password reset successfully!",
                        error: (err: Error) => err.message || "Failed to reset password.", // Provide default error
                    }
                );
            } else {
                toast.error("User information is missing.");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: typeof passwordErrors = {};
                error.errors.forEach((err) => {
                    const fieldName = err.path[0] as string;
                    // Map the field names from the schema to our state fields
                    if (fieldName === "newPassword") {
                        newErrors.resetNewPassword = err.message;
                    } else if (fieldName === "confirmPassword") {
                        newErrors.resetConfirmPassword = err.message;
                    }
                });
                setPasswordErrors(newErrors);
            } else {
                console.error("Password reset error:", error);
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    // --- Render ---
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex flex-col items-center justify-center h-full space-y-2">
                <div className="w-full max-w-2xl">
                    {" "}
                    {/* Ensure Back button aligns */}
                    <Link href="/dashboard">
                        <Button variant="outline" className="cursor-pointer mb-4">
                            {" "}
                            {/* Add margin */}
                            <ArrowLeft className="mr-2 h-4 w-4" /> {/* Adjusted size */}
                            Back
                        </Button>
                    </Link>
                </div>

                {user ? (
                    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg border border-gray-200 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                            {" "}
                            {/* Add margin bottom */}
                            <div className="flex items-center gap-4">
                                <Avatar className="h-12 w-12">
                                    {" "}
                                    {/* Slightly larger Avatar */}
                                    {/* Assuming user.avatarUrl exists, otherwise fallback works */}
                                    <AvatarImage src={""} alt={user.username} />
                                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                                        {user.username ? user.username[0].toUpperCase() : "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {user.username
                                        ? user.username.charAt(0).toUpperCase() +
                                          user.username.slice(1)
                                        : "Profile"}
                                </h1>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                {/* Edit Profile Dialog */}
                                <EditProfileDialog
                                    username={username}
                                    email={email}
                                    setUsername={setUsername}
                                    setEmail={setEmail}
                                    handleSubmit={handleProfileSubmit}
                                    open={profileDialogOpen}
                                    setOpen={setProfileDialogOpen}
                                    errors={profileErrors}
                                />
                                {/* Change Password Dialog */}
                                <ChangePasswordDialog
                                    oldPassword={oldPassword}
                                    newPassword={newPassword}
                                    confirmNewPassword={confirmNewPassword}
                                    resetNewPassword={resetNewPassword}
                                    resetConfirmPassword={resetConfirmPassword}
                                    setOldPassword={setOldPassword}
                                    setNewPassword={setNewPassword}
                                    setConfirmNewPassword={setConfirmNewPassword}
                                    setResetNewPassword={setResetNewPassword}
                                    setResetConfirmPassword={setResetConfirmPassword}
                                    isResetMode={isResetMode}
                                    setIsResetMode={setIsResetMode}
                                    handlePasswordChange={handlePasswordChange}
                                    handleForgotPassword={handleForgotPassword}
                                    open={passwordDialogOpen}
                                    setOpen={setPasswordDialogOpen}
                                    errors={passwordErrors}
                                />
                            </div>
                        </div>

                        {/* Profile Information Card */}
                        <ProfileCard user={user} />
                    </div>
                ) : (
                    <div className="text-center text-gray-600 mt-10">
                        {" "}
                        {/* Add margin top */}
                        <User className="mx-auto h-12 w-12 text-gray-400" /> {/* Styled icon */}
                        <p className="mt-4 text-lg">Please log in to view your profile.</p>
                        {/* Optional: Add a login button/link here */}
                    </div>
                )}
            </div>
        </div>
    );
}
