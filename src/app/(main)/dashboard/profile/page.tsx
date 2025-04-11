"use client";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, User, Lock } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import useAuthStore from "@/store/authStore";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { useEffect, useState } from "react";
import { UserType } from "@/Types";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { z } from "zod";

// ------------------ Validation Schemas ------------------
const profileSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),
});

const passwordSchema = z
    .object({
        oldPassword: z.string().min(1, { message: "Current password is required" }),
        newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmNewPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"],
    });

const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// ------------------ Types ------------------
interface EditProfileDialogProps {
    username: string;
    email: string;
    setUsername: (val: string) => void;
    setEmail: (val: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    open: boolean;
    setOpen: (val: boolean) => void;
    errors: {
        username?: string;
        email?: string;
    };
}

interface ChangePasswordDialogProps {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    resetNewPassword: string;
    resetConfirmPassword: string;
    setOldPassword: (val: string) => void;
    setNewPassword: (val: string) => void;
    setConfirmNewPassword: (val: string) => void;
    setResetNewPassword: (val: string) => void;
    setResetConfirmPassword: (val: string) => void;
    isResetMode: boolean;
    setIsResetMode: (val: boolean) => void;
    handlePasswordChange: (e: React.FormEvent) => void;
    handleForgotPassword: (e: React.FormEvent) => void;
    open: boolean;
    setOpen: (val: boolean) => void;
    errors: {
        oldPassword?: string;
        newPassword?: string;
        confirmNewPassword?: string;
        resetNewPassword?: string;
        resetConfirmPassword?: string;
    };
}

// ------------------ Form Input Component ------------------
function FormInput({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
}: {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}) {
    return (
        <div>
            <Label htmlFor={id} className="text-sm text-gray-600">
                {label}
            </Label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`mt-1 w-full p-2 border rounded-md ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}

// ------------------ Edit Profile Dialog ------------------
function EditProfileDialog({
    username,
    email,
    setUsername,
    setEmail,
    handleSubmit,
    open,
    setOpen,
    errors,
}: EditProfileDialogProps) {
    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <Dialog.Title className="text-2xl font-semibold text-gray-800">
                        Edit Profile
                    </Dialog.Title>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit(e);
                        }}
                        className="space-y-4 mt-4"
                    >
                        <FormInput
                            id="username"
                            label="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={errors.username}
                        />
                        <FormInput
                            id="email"
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={errors.email}
                        />
                        <div className="flex justify-end gap-2 mt-4">
                            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit">Save</Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// ------------------ Change Password Dialog ------------------
function ChangePasswordDialog({
    oldPassword,
    newPassword,
    confirmNewPassword,
    resetNewPassword,
    resetConfirmPassword,
    setOldPassword,
    setNewPassword,
    setConfirmNewPassword,
    setResetNewPassword,
    setResetConfirmPassword,
    isResetMode,
    setIsResetMode,
    handlePasswordChange,
    handleForgotPassword,
    open,
    setOpen,
    errors,
}: ChangePasswordDialogProps) {
    const resetFields = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
        setResetNewPassword("");
        setResetConfirmPassword("");
    };

    return (
        <Dialog.Root open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button variant="outline" size="sm">
                    <Lock className="mr-2 h-4 w-4" /> Change Password
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/50" />
                <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                    <Dialog.Title className="text-xl font-semibold text-gray-800">
                        {isResetMode ? "Reset Password" : "Change Password"}
                    </Dialog.Title>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (isResetMode) {
                                handleForgotPassword(e);
                            } else {
                                handlePasswordChange(e);
                            }
                        }}
                        className="space-y-4 mt-4"
                    >
                        {!isResetMode && (
                            <FormInput
                                id="oldPassword"
                                label="Current Password"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                error={errors.oldPassword}
                            />
                        )}
                        {isResetMode ? (
                            <>
                                <FormInput
                                    id="resetNewPassword"
                                    label="New Password"
                                    type="password"
                                    value={resetNewPassword}
                                    onChange={(e) => setResetNewPassword(e.target.value)}
                                    error={errors.resetNewPassword}
                                />
                                <FormInput
                                    id="resetConfirmPassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={resetConfirmPassword}
                                    onChange={(e) => setResetConfirmPassword(e.target.value)}
                                    error={errors.resetConfirmPassword}
                                />
                            </>
                        ) : (
                            <>
                                <FormInput
                                    id="newPassword"
                                    label="New Password"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    error={errors.newPassword}
                                />
                                <FormInput
                                    id="confirmNewPassword"
                                    label="Confirm Password"
                                    type="password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    error={errors.confirmNewPassword}
                                />
                            </>
                        )}
                        {!isResetMode && (
                            <div className="text-right">
                                <button
                                    type="button"
                                    onClick={() => setIsResetMode(true)}
                                    className="text-xs text-blue-600 hover:underline"
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                    setIsResetMode(false);
                                    resetFields();
                                    setOpen(false);
                                }}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">{isResetMode ? "Reset" : "Update"}</Button>
                        </div>
                    </form>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}

// ------------------ Profile Info Card ------------------
function ProfileCard({ user }: { user: UserType }) {
    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-700">
                    Profile Information
                </CardTitle>
                <CardDescription className="text-gray-500">Your current details.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label className="text-sm text-gray-600">Username</Label>
                    <p className="mt-1 text-lg text-gray-800">{user.username}</p>
                </div>
                <div>
                    <Label className="text-sm text-gray-600">Email</Label>
                    <p className="mt-1 text-lg text-gray-800">{user.email}</p>
                </div>
                <div>
                    <Label className="text-sm text-gray-600">Joined On</Label>
                    <p className="mt-1 text-lg text-gray-800">N/A</p>
                </div>
                <div>
                    <Label className="text-sm text-gray-600">Location</Label>
                    <p className="mt-1 text-lg text-gray-800">Not specified</p>
                </div>
            </CardContent>
        </Card>
    );
}

// ------------------ Main Component ------------------
export default function ProfilePage() {
    const user = useAuthStore((s) => s.user);
    const { update, updateClientPassword } = useAuth();

    // Profile form state
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [profileErrors, setProfileErrors] = useState<{ username?: string; email?: string }>({});
    const [profileDialogOpen, setProfileDialogOpen] = useState(false);

    // Password form state
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

    // Handler for profile update submission
    const handleProfileSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validate the form data
            profileSchema.parse({ username, email });

            // Clear any previous errors
            setProfileErrors({});

            if (user && user.id) {
                const obj = {
                    id: user.id,
                    data: { username, email },
                };

                toast.promise(
                    update
                        .mutateAsync(obj)
                        .then(() => {
                            setProfileDialogOpen(false); // Close dialog on success
                        })
                        .catch((err) => {
                            console.error("Failed to update profile:", err);
                            throw err; // Re-throw for toast to catch
                        }),
                    {
                        loading: "Updating profile...",
                        success: "Profile updated successfully!",
                        error: (err: Error) => err.message,
                    }
                );
            } else {
                toast.error("Invalid user data.");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Map Zod errors to our form errors
                const newErrors: { username?: string; email?: string } = {};
                error.errors.forEach((err) => {
                    const path = err.path[0] as string;
                    newErrors[path as keyof typeof newErrors] = err.message;
                });
                setProfileErrors(newErrors);
            } else {
                toast.error("Validation failed. Please check your inputs.");
            }
        }
    };

    // Handler for password change submission
    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validate the form data
            passwordSchema.parse({ oldPassword, newPassword, confirmNewPassword });

            // Clear any previous errors
            setPasswordErrors({});

            if (user?.id) {
                const obj = {
                    id: user.id,
                    data: { oldPassword, newPassword },
                };

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
                        error: (err: Error) => err.message,
                    }
                );
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Map Zod errors to our form errors
                const newErrors: typeof passwordErrors = {};
                error.errors.forEach((err) => {
                    const path = err.path[0] as string;
                    newErrors[path as keyof typeof newErrors] = err.message;
                });
                setPasswordErrors(newErrors);
            } else {
                toast.error("Validation failed. Please check your inputs.");
            }
        }
    };

    // Handler for password reset submission
    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();

        try {
            // Validate the form data
            resetPasswordSchema.parse({
                newPassword: resetNewPassword,
                confirmPassword: resetConfirmPassword,
            });

            // Clear any previous errors
            setPasswordErrors({});

            if (user?.id) {
                const obj = {
                    id: user.id,
                    data: { newPassword: resetNewPassword },
                };

                toast.promise(
                    updateClientPassword
                        .mutateAsync(obj)
                        .then(() => {
                            // Reset form state, change mode, and close dialog on success
                            setResetNewPassword("");
                            setResetConfirmPassword("");
                            setIsResetMode(false); // Change back to update password mode
                            setPasswordDialogOpen(false);
                        })
                        .catch((err) => {
                            console.error("Failed to reset password:", err);
                            throw err; // Re-throw for toast to catch
                        }),
                    {
                        loading: "Resetting password...",
                        success: "Password reset successfully!",
                        error: (err: Error) => err.message,
                    }
                );
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                // Map Zod errors to our form errors
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
                toast.error("Validation failed. Please check your inputs.");
            }
        }
    };

    // Initialize form data with user data when available
    useEffect(() => {
        if ((username.trim() === "" || email.trim() === "") && user) {
            setUsername(user.username);
            setEmail(user.email);
        }
    }, [user, email, username]);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex flex-col items-center justify-center h-full space-y-2">
                <div className="min-w-2xl">
                    <Link href="/dashboard">
                        <Button variant="outline" className="cursor-pointer">
                            <ArrowLeft className="mr-2" />
                            Back
                        </Button>
                    </Link>
                </div>

                {user ? (
                    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg border border-gray-200 p-6">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={""} alt={user.username} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {user.username[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
                                </h1>
                            </div>

                            <div className="flex gap-2 mt-4 md:mt-0">
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

                        <ProfileCard user={user} />
                    </div>
                ) : (
                    <div className="text-center text-gray-600">
                        <User className="mx-auto h-12 w-12" />
                        <p className="mt-4 text-lg">Please log in to view your profile.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
