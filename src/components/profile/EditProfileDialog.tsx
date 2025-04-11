import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { FormInput } from "@/components/profile/FormInput";

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

export function EditProfileDialog({
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
                            e.preventDefault(); // Prevent default form submission
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
