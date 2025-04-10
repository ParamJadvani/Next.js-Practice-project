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

        // 2. Find user by email (select password explicitly)
        const user = await User.findOne({ email }).select("+password");

        if (!user || !(await user.comparePassword(password))) {
            return NextResponse.json({ message: "Invalid email or password." }, { status: 401 });
        }

        const userForToken = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        // 3. Generate JWT and set in HttpOnly cookie
        const token = generateToken(userForToken);

        (await cookies()).set(TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json(
            {
                message: "Login successful!",
                user: { id: user._id, email: user.email, username: user.username },
            },
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

        if (error instanceof Error) {
            return NextResponse.json(
                { message: "An error occurred during login.", error: error.message },
                { status: 500 }
            );
        }
    }
}
