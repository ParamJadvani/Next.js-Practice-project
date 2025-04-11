import axios, { AxiosError } from "axios";

interface profileUpdateData {
    username: string;
    email: string;
}

interface passwordUpdateData {
    oldPassword?: string;
    newPassword: string;
}

export async function updateProfile({ id, data }: { id: string; data: profileUpdateData }) {
    try {
        const response = await axios.put(`/api/profile/${id}/updateprofile`, data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError)
            throw new Error(error?.response?.data?.message || "Profile update failed");
        if (error instanceof Error) throw new Error(error.message || "Profile update failed");
    }
}

export async function updatePassword({ id, data }: { id: string; data: passwordUpdateData }) {
    try {
        const response = await axios.put(`/api/profile/${id}/update-password`, data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError)
            throw new Error(error?.response?.data?.message || "Profile update failed");
        if (error instanceof Error) throw new Error(error.message || "Profile update failed");
    }
}

export async function forgotUpdatePassword({ id, data }: { id: string; data: passwordUpdateData }) {
    try {
        const response = await axios.put(`/api/profile/${id}/forgot-password`, data);
        return response.data;
    } catch (error: unknown) {
        if (error instanceof AxiosError)
            throw new Error(error?.response?.data?.message || "Profile update failed");
        if (error instanceof Error) throw new Error(error.message || "Profile update failed");
    }
}
