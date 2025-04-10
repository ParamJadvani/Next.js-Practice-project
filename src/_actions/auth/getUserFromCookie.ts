"use server";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { UserType } from "@/Types";

export async function getUserFromCookie(): Promise<UserType | null> {
    const token = (await cookies()).get("authToken")?.value;
    if (!token) return null;

    try {
        return await verifyToken(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
