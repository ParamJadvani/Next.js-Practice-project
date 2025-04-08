"use client";

// import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export function SignupAction(formData: FormData) {
    const email = formData.get("email") as string | null;
    const password = formData.get("password") as string | null;

    if (!email || !password) {
        toast("Signup Failed", {
            description: "Email and password are required.",
        });
        return;
    }

    const loginAction = useAuthStore.getState().login; // Access Zustand store directly

    const storeData = async () => {
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Signup failed. Please try again.");
            }

            toast("Signup Successful!", {
                description: "Welcome aboard!",
            });

            // Update Zustand store with user info
            if (data.user) {
                loginAction(data.user);
            }

            // Redirect to dashboard
            // router.push("/dashboard"); // Use router here after validation

            redirect("/dashboard");
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast("Signup Failed", {
                    description: error.message || "An unexpected error occurred.",
                });
            }
        }
    };

    storeData();
}
