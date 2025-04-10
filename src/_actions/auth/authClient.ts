import axios, { AxiosError } from "axios";

export async function signupUser({
    username,
    email,
    password,
}: {
    username: string;
    email: string;
    password: string;
}) {
    try {
        const response = await axios.post(
            "/api/auth/signup",
            { username, email, password },
            { withCredentials: true } // ✅ include cookies
        );

        return response.data;
    } catch (err: unknown) {
        if (err instanceof AxiosError)
            throw new Error(err?.response?.data?.message || "Signup failed");
        else if (err instanceof Error) throw new Error(err.message || "Signup failed");
    }
}

export async function loginUser({ email, password }: { email: string; password: string }) {
    try {
        const response = await axios.post(
            "/api/auth/login",
            { email, password },
            { withCredentials: true } // ✅ ensure cookies work
        );

        return response.data;
    } catch (err: unknown) {
        if (err instanceof AxiosError)
            throw new Error(err?.response?.data?.message || "Login failed");
        else if (err instanceof Error) throw new Error(err.message || "Login failed");
    }
}

export async function logoutUser() {
    try {
        const response = await axios.post("/api/auth/logout", {
            withCredentials: true,
        });

        if (response.status !== 200) {
            throw new Error("Logout failed");
        }

        return true;
    } catch (err: unknown) {
        if (err instanceof AxiosError)
            throw new Error(err?.response?.data?.message || "Logout failed");
        else if (err instanceof Error) throw new Error(err.message || "Logout failed");
    }
}
