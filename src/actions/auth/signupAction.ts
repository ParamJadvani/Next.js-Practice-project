import axios from "axios";

export async function signupUser({ email, password }: { email: string; password: string }) {
    try {
        const response = await axios.post(
            "/api/auth/signup",
            { email, password },
            { withCredentials: true } // ✅ include cookies
        );

        return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) return err.message || "Signup failed";
    }
}
