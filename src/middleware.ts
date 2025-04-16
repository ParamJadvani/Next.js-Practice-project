import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/lib/auth";

const TOKEN_COOKIE_NAME = "authToken";
const DEFAULT_PROTECTED_REDIRECT = "/dashboard";
const PROTECTED_PATHS = ["/dashboard", "/order"];
const AUTH_PATHS = ["/login", "/signup"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get(TOKEN_COOKIE_NAME)?.value;

    let isAuthenticated = false;

    if (token) {
        try {
            await verifyToken(token);
            isAuthenticated = true;
        } catch (error: unknown) {
            console.log("Error verifying token:", error);
            isAuthenticated = false;
        }
    }

    const isProtectedRoute = PROTECTED_PATHS.some((path) => pathname.startsWith(path));
    const isAuthRoute = AUTH_PATHS.some((path) => pathname.startsWith(path));

    // Case 1: If the user is trying to access a protected route without being authenticated
    if (isProtectedRoute && !isAuthenticated) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirectedFrom", pathname);
        return NextResponse.redirect(loginUrl);
    }

    // Case 2: If the user is already authenticated and trying to access auth routes (login/signup)
    if (isAuthRoute && isAuthenticated) {
        return NextResponse.redirect(new URL(DEFAULT_PROTECTED_REDIRECT, request.url));
    }

    // Otherwise, proceed with the request
    return NextResponse.next();
}

// Configuration for the middleware to exclude specific paths
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"], // Exclude API, static files, and images
};
