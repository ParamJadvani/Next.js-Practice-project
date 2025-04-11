import DBConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";
import { generateToken } from "@/lib/auth";
import { cookies } from "next/headers";

const TOKEN_COOKIE_NAME = "authToken";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await DBConnect();

        const { id } = await params;
        const body = await request.json();

        if (!id) {
            return NextResponse.json(
                {
                    message: "User ID is required.",
                },
                { status: 400 }
            );
        }

        if (!body.username || !body.email) {
            return NextResponse.json(
                {
                    message: "Username and email are required.",
                },
                { status: 400 }
            );
        }

        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found.",
                },
                { status: 404 }
            );
        }

        const updatedUser = await User.findByIdAndUpdate(id, body, {
            new: true,
            runValidators: true,
        });

        const userForToken = {
            id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
        };

        const token = generateToken(userForToken);

        (await cookies()).set(TOKEN_COOKIE_NAME, token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        return NextResponse.json(
            {
                message: "Login successful!",
                user: {
                    id: updatedUser._id,
                    email: updatedUser.email,
                    username: updatedUser.username,
                },
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("Profile update error:", error);

        return NextResponse.json(
            {
                message: "An error occurred during profile update.",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
