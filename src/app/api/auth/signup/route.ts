import { generateToken } from "@/lib/auth";
import connectDB from "@/lib/db";
import { SignupSchema } from "@/schemas/validationSchema";
import User from "@/models/User";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(request: NextRequest) {
    try {
        await connectDB();
        const body = await request.json();

        // Validate input
        const validatedData = SignupSchema.parse(body);
        const { username, email, password } = validatedData;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 409 });
        }

        // Create new user (password hashing handled by pre-save hook)
        const newUser = await User.create({ username, email, password });

        const userForToken = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        };

        // Generate JWT and set in HttpOnly cookie
        const token = generateToken(userForToken);

        (await cookies()).set("authToken", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        return NextResponse.json(
            {
                message: "User registered successfully!",
                user: { id: newUser._id, email: newUser.email, username: newUser.username },
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        console.error("Signup error:", error);

        if (error instanceof ZodError) {
            return NextResponse.json(
                { message: "Validation failed", errors: error.errors },
                { status: 400 }
            );
        }
        return NextResponse.json(
            {
                message: "An error occurred during registration.",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
