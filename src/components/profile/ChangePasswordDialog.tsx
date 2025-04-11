import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { FormInput } from "@/components/profile/FormInput";

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

export function ChangePasswordDialog({
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
        // Reset errors specific to this dialog if necessary
    };

    return (
        <Dialog.Root
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                    // Reset mode and fields when dialog closes
                    setIsResetMode(false);
                    resetFields();
                }
            }}
        >
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
                            e.preventDefault(); // Prevent default form submission
                            console.log(isResetMode);
                            if (isResetMode) {
                                console.log(true)
                                handleForgotPassword(e);
                            } else {
                                console.log(false)
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
                                    onClick={() => {
                                        setIsResetMode(true);
                                        // Consider resetting fields when switching mode if desired
                                        // resetFields(); // Optional: reset fields when switching to reset mode
                                    }}
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
                                    setOpen(false); // This will trigger onOpenChange to reset state
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
