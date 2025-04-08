// middleware.ts (in the root of your project)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth"; // Import the updated verifyToken

const TOKEN_COOKIE_NAME = "authToken";
const DEFAULT_PROTECTED_REDIRECT = "/dashboard";
const PROTECTED_PATHS = ["/dashboard"]; // Add more paths as needed
const AUTH_PATHS = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const tokenCookie = request.cookies.get(TOKEN_COOKIE_NAME);
    const token = tokenCookie?.value;

    let userPayload = null;
    if (token) {
        // CRITICAL FIX: Added 'await' here!
        userPayload = await verifyToken(token); // Now correctly waits for the promise to resolve
    }

    // Now 'isUserAuthenticated' will be correctly true/false based on verification result
    const isUserAuthenticated = !!userPayload;

    // Rule 1: Trying to access a PROTECTED page WITHOUT being logged in?
    const isAccessingProtectedRoute = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
    if (isAccessingProtectedRoute && !isUserAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirectedFrom", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Rule 2: Trying to access LOGIN or SIGNUP page WHILE ALREADY logged in?
    const isAccessingAuthRoute = AUTH_PATHS.some((path) => pathname.startsWith(path));
    if (isAccessingAuthRoute && isUserAuthenticated) {
        return NextResponse.redirect(new URL(DEFAULT_PROTECTED_REDIRECT, request.url));
    }

    // Otherwise, let the request proceed
    return NextResponse.next();
}

// Specify which paths the middleware should run on
export const config = {
    matcher: [
        /* Match all request paths except for the ones starting with: ... */
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
        "/dashboard/:path*",
        "/login",
        "/signup",
    ],
};
