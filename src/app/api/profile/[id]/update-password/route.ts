import DBConnect from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
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

        if (!body.oldPassword || !body.newPassword) {
            return NextResponse.json(
                {
                    message: "Old password and new password are required.",
                },
                { status: 400 }
            );
        }

        const user = await User.findById(id).select("+password");
        if (!user) {
            return NextResponse.json(
                {
                    message: "User not found.",
                },
                { status: 404 }
            );
        }

        if (!(await user.comparePassword(body.oldPassword))) {
            return NextResponse.json(
                {
                    message: "Old password is incorrect.",
                },
                { status: 400 }
            );
        }

        user.password = body.newPassword;
        await user.save();

        return NextResponse.json(
            {
                message: "Password updated successfully.",
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error("password update error:", error);

        return NextResponse.json(
            {
                message: "An error occurred during password update.",
                error: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
