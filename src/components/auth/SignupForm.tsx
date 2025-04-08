"use client"; // This component interacts with the user, so it's a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupSchema, SignupInput } from "@/lib/validations";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import useAuthStore from "@/store/authStore";

export function SignupForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const loginAction = useAuthStore((state) => state.login);

    // Setup form validation using react-hook-form and Zod
    const form = useForm<SignupInput>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Function to handle form submission
    async function onSubmit(values: SignupInput) {
        setIsLoading(true); // Show loading indicator

        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            const data = await response.json();

            if (!response.ok) {
                // Show error message from server if signup failed
                throw new Error(data.message || "Signup failed. Please try again.");
            }

            toast("Signup Successful!", {
                description: "Welcome aboard!",
            });

            // Update Zustand store with user info
            if (data.user) {
                loginAction(data.user);
            }

            // Redirect to dashboard (or another protected page)
            router.push("/dashboard"); // Adjust the redirect path if needed
        } catch (error: unknown) {
            if (error instanceof Error)
            toast("Signup Failed", {
                description: error.message || "An unexpected error occurred.",
            });
        } finally {
            setIsLoading(false); // Hide loading indicator
        }
    }

    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Create your account to get started.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="you@example.com"
                                            {...field}
                                            type="email"
                                        />
                                    </FormControl>
                                    <FormMessage /> {/* Shows validation errors */}
                                </FormItem>
                            )}
                        />
                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="••••••••" {...field} type="password" />
                                    </FormControl>
                                    <FormMessage /> {/* Shows validation errors */}
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Signing Up..." : "Sign Up"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
