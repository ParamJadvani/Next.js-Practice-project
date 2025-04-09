"use server";

import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export async function getUserFromCookie() {
    const token = (await cookies()).get("authToken")?.value;
    if (!token) return null;

    try {
        return await verifyToken(token);
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
}
