import { z } from "zod";

// Profile Validation Schema
export const profileSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z
        .string()
        .email({ message: "Invalid email address" })
        .min(1, { message: "Email is required" }),
});

// Password Change Validation Schema
export const passwordSchema = z
    .object({
        oldPassword: z.string().min(1, { message: "Current password is required" }),
        newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmNewPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ["confirmNewPassword"], // Correct path for refinement error
    });

// Password Reset Validation Schema
export const resetPasswordSchema = z
    .object({
        newPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
        confirmPassword: z.string().min(1, { message: "Please confirm your password" }),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"], // Correct path for refinement error
    });

export const SignupSchema = z.object({
    username: z.string().min(1, { message: "Username cannot be empty" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

export const LoginSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(1, { message: "Password cannot be empty" }),
});

export type SignupInput = z.infer<typeof SignupSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
