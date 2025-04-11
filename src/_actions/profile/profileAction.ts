import axios, { AxiosError } from "axios";

interface profileUpdateData {
    username: string;
    email: string;
}

export async function updateProfile({ id, data }: { id: string; data: profileUpdateData }) {
    try {
        const response = await axios.patch(`/api/profile/${id}`, data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError)
            throw new Error(error?.response?.data?.message || "Profile update failed");
        if (error instanceof Error) throw new Error(error.message || "Profile update failed");
    }
}
