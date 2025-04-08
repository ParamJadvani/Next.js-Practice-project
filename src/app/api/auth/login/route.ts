import { generateToken } from "@/lib/auth";
import DBConnect from "@/lib/db";
import { LoginSchema } from "@/lib/validations";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const TOKEN_COOKIE_NAME = "authToken";

export async function POST(request: NextRequest) {
    try {
        await DBConnect();
        const body = await request.json();

        // 1. Validate Input
        const validatedData = LoginSchema.parse(body);
        const { email, password } = validatedData;

        // 2. Find user by email (IMPORTANT: select the password field explicitly)
        const user = await User.findOne({ email }).select("+password");

        // 3. Check if user exists
        if (!user || !(await user.comparePassword(password))) {
            return NextResponse.json(
                { message: "Invalid email or password." },
                { status: 401 } // 401 Unauthorized
            );
        }

        const userForToken = {
            id: user._id,
            email: user.email,
        };

        // 4. Generate JWT
        const token = generateToken(userForToken);

        // 5. Set JWT in an HttpOnly cookie (Give the handshake)
        // HttpOnly makes it safer, browser JavaScript can't easily steal it
        (await cookies()).set(TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 1, // 1 day
            path: "/",
        });

        // 6. Send success response (don't send the password back!)
        return NextResponse.json(
            { message: "Login successful!", user: { id: user._id, email: user.email } },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Login error:", error);

        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: "Validation failed", errors: error.errors },
                { status: 400 }
            );
        }

        if (error instanceof Error)
            return NextResponse.json(
                { message: "An error occurred during login.", error: error.message },
                { status: 500 }
            );
    }
}
