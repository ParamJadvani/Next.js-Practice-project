import axios from "axios";

const loginUser = async ({ email, password }: { email: string; password: string }) => {
    try {
        const response = await axios.post(
            "/api/auth/login",
            { email, password },

            { withCredentials: true } // ✅ ensure cookies work
        );

        return response.data;
    } catch (err: unknown) {
        if (err instanceof Error) return err.message || "Login failed";
    }
};

export default loginUser;
