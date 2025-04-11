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

// ------------------ Types ------------------
interface EditProfileDialogProps {
    username: string;
    email: string;
    setUsername: (val: string) => void;
    setEmail: (val: string) => void;
    handleSubmit: (e: React.FormEvent) => void;
    open: boolean;
    setOpen: (val: boolean) => void;
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
                    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <input
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <Dialog.Close asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.Close>
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
}: ChangePasswordDialogProps) {
    return (
        <Dialog.Root>
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
                        onSubmit={isResetMode ? handleForgotPassword : handlePasswordChange}
                        className="space-y-4 mt-4"
                    >
                        {!isResetMode && (
                            <div>
                                <Label htmlFor="oldPassword">Old Password</Label>
                                <input
                                    id="oldPassword"
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                                />
                            </div>
                        )}
                        <div>
                            <Label htmlFor="newPassword">New Password</Label>
                            <input
                                id="newPassword"
                                type="password"
                                value={isResetMode ? resetNewPassword : newPassword}
                                onChange={(e) =>
                                    isResetMode
                                        ? setResetNewPassword(e.target.value)
                                        : setNewPassword(e.target.value)
                                }
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
                        <div>
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={isResetMode ? resetConfirmPassword : confirmNewPassword}
                                onChange={(e) =>
                                    isResetMode
                                        ? setResetConfirmPassword(e.target.value)
                                        : setConfirmNewPassword(e.target.value)
                                }
                                className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                            />
                        </div>
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
                            <Dialog.Close
                                asChild
                                onClick={() => {
                                    setIsResetMode(false);
                                    setOldPassword("");
                                    setNewPassword("");
                                    setConfirmNewPassword("");
                                    setResetNewPassword("");
                                    setResetConfirmPassword("");
                                }}
                            >
                                <Button variant="outline">Cancel</Button>
                            </Dialog.Close>
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

    const { update } = useAuth();

    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const [resetNewPassword, setResetNewPassword] = useState("");
    const [resetConfirmPassword, setResetConfirmPassword] = useState("");

    const [isResetMode, setIsResetMode] = useState(false);

    const [open, setOpen] = useState(false);

    const handleSubmit = () => {
        if (user && user.id) {
            const obj = {
                id: user.id,
                data: {
                    username,
                    email,
                },
            };

            try {
                toast.promise(update.mutateAsync(obj), {
                    loading: "Updating profile...",
                    success: "Profile updated successfully!",
                    error: (err: Error) => err.message,
                });
                setOpen(false);
                toast.success("Profile updated successfully!");
            } catch (err) {
                console.error("Failed to update profile:", err);
            } finally {
            }
        } else {
            toast.error("Invalid user data.");
        }
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert("New passwords do not match!");
            return;
        }
        console.log("Changing password:", { oldPassword, newPassword });
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        if (resetNewPassword !== resetConfirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Resetting password:", { resetNewPassword });
    };

    useEffect(() => {
        if (username.trim() === "" && email.trim() === "" && user) {
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
                                    handleSubmit={handleSubmit}
                                    open={open}
                                    setOpen={setOpen}
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
