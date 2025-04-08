import { generateToken } from "@/lib/auth";
import DBConnect from "@/lib/db";
import { SignupSchema } from "@/lib/validations";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

const TOKEN_COOKIE_NAME = "authToken";

export async function POST(request: NextRequest) {
    try {
        await DBConnect();
        const body = await request.json();

        // 1. Validate Input (Check the rules)
        const validatedData = SignupSchema.parse(body);
        const { email, password } = validatedData;

        // 2. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                message: "User already exists",
                status: 409,
            });
        }

        // 3. Create new user (Password hashing happens automatically via Mongoose pre-save hook)
        const newUser = await User.create({ email, password });

        const userForToken = {
            id: newUser._id,
            email: newUser.email,
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

        // 6. Send success response (without password)
        return NextResponse.json(
            {
                message: "User registered successfully!",
                user: { id: newUser._id, email: newUser.email },
            },
            { status: 201 } // 201 Created
        );
    } catch (error: unknown) {
        console.error("Signup error:", error);

        // Handle validation errors specifically
        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: "Validation failed", errors: error.errors },
                { status: 400 } // 400 Bad Request
            );
        }

        // Handle other errors
        if (error instanceof Error)
            return NextResponse.json(
                { message: "An error occurred during registration.", error: error.message },
                { status: 500 } // 500 Internal Server Error
            );
    }
}
