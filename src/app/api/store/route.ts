import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const TOKEN_COOKIE_NAME = "authToken";

export async function GET() {
    // Correct cookie access syntax
    const cookieStore = cookies();
    const token = (await cookieStore).get(TOKEN_COOKIE_NAME)?.value; // Match your login cookie name

    if (!token) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const user = await verifyToken(token);
        return NextResponse.json(user);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "Unknown error" }, { status: 500 });
    }
}
