import { SignupForm } from "@/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <SignupForm />
            <p className="mt-4 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4 hover:text-primary">
                    Login
                </Link>
            </p>
        </div>
    );
}
