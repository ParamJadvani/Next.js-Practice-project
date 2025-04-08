// lib/auth.ts
import jwt from "jsonwebtoken"; // Keep for generating tokens (runs in Node.js runtime)
import { jwtVerify, JWTPayload } from "jose"; // Use jose for verifying tokens (Edge compatible)
// REMOVED: import { TextEncoder } from "util"; // DO NOT import from 'util' for Edge compatibility

const JWT_SECRET = "dev_SECRET_@12345_MY_APP_$%^&*_secure_key";
const JWT_EXPIRES_IN = "1d"; // How long the handshake is valid (1 day)
console.log(process.env.JWT_SECRET);

if (!JWT_SECRET) {
    throw new Error("Please define the JWT_SECRET environment variable inside .env.local");
}

// Define what information we'll store inside the secret handshake (token)
export interface UserPayload extends JWTPayload {
    id: string; // User's unique ID from the database
    email: string; // User's email
}

// --- Token Generation (Using jsonwebtoken - Runs in Node.js API Routes) ---
export function generateToken(payload: Omit<UserPayload, keyof JWTPayload>): string {
    return jwt.sign(payload, JWT_SECRET!, { expiresIn: JWT_EXPIRES_IN });
}

// --- Token Verification (Using jose - Edge Runtime Compatible) ---
export async function verifyToken(token: string): Promise<UserPayload | null> {
    if (!token) {
        console.log("verifyToken: No token provided.");
        return null;
    }

    try {
        // Use the globally available TextEncoder (works in Edge and Node >= 11)
        const secretKey = new TextEncoder().encode(JWT_SECRET!);

        // Verify the token using jose's jwtVerify function
        const { payload } = await jwtVerify<UserPayload>(
            token,
            secretKey
            // Specify algorithms if needed, HS256 is often the default with HMAC secrets
            // { algorithms: ['HS256'] }
        );

        // Ensure the essential fields exist in the payload.
        if (!payload.id || !payload.email) {
            console.error("Token verification succeeded but payload missing essential fields.");
            return null;
        }

        // Return the validated payload
        return payload;
    } catch (error: unknown) {
        // Log detailed error information
        if (error instanceof Error) {
            console.error("Token verification failed:", error.name, "-", error.message);
            // Specific Jose errors often have codes like 'ERR_JWT_EXPIRED', 'ERR_JWS_SIGNATURE_VERIFICATION_FAILED'
            // console.error("Error code:", (error as any).code); // Uncomment for more detail if needed
        } else {
            console.error("Token verification failed with unknown error:", error);
        }
        return null; // Return null to indicate the token is not valid
    }
}
