// lib/auth.ts
import jwt from "jsonwebtoken"; // Keep for generating tokens (runs in Node.js runtime)
import { jwtVerify, JWTPayload } from "jose"; // Use jose for verifying tokens (Edge compatible)

const JWT_SECRET = "dev_SECRET_@12345_MY_APP_$%^&*_secure_key";
const JWT_EXPIRES_IN = "1d";

if (!JWT_SECRET) {
    throw new Error("Please define the JWT_SECRET environment variable inside .env.local");
}

export interface UserPayload extends JWTPayload {
    id: string;
    email: string;
    username: string;
}

export function generateToken(payload: Omit<UserPayload, keyof JWTPayload>): string {
    return jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
}

export async function verifyToken(token: string): Promise<UserPayload | null> {
    if (!token) {
        console.log("verifyToken: No token provided.");
        return null;
    }

    try {
        // Use the globally available TextEncoder (works in Edge and Node >= 11)
        const secretKey = new TextEncoder().encode(JWT_SECRET!);

        const { payload } = await jwtVerify<UserPayload>(
            token,
            secretKey
            // Specify algorithms if needed, HS256 is often the default with HMAC secrets
            // { algorithms: ['HS256'] }
        );

        if (!payload.id || !payload.email || !payload.username) {
            console.error("Token verification succeeded but payload missing essential fields.");
            return null;
        }

        return payload;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("Token verification failed:", error.name, "-", error.message);
        } else {
            console.error("Token verification failed with unknown error:", error);
        }
        return null;
    }
}
