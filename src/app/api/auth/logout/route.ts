import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const TOKEN_COOKIE_NAME = "authToken";

export async function POST() {
    try {
        // Clear the cookie by setting it with an expiry date in the past
        (await cookies()).set(TOKEN_COOKIE_NAME, "", {
            httpOnly: true,
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
        });

        return NextResponse.json({ message: "Logout successful!" }, { status: 200 });
    } catch (error: unknown) {
        console.error("Logout error:", error);
        if (error instanceof Error)
            return NextResponse.json(
                { message: "An error occurred during logout.", error: error.message },
                { status: 500 }
            );
    }
}
