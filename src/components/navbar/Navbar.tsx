// components/ui/Navbar.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useAuthStore from "@/store/authStore";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

export function Navbar() {
    const router = useRouter();
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);

    const handleLogout = () => {
        logout();
        document.cookie = "auth=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        router.push("/login");
    };

    return (
        <nav className="sticky top-0 z-50 w-full flex justify-center items-center border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center justify-between px-4">
                <Link
                    href="/"
                    className="text-lg font-semibold hover:text-primary transition-colors"
                >
                    Your Logo
                </Link>

                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="relative h-8 w-8 rounded-full focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="" alt={user.email} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {user.email[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className={cn(
                                "w-48 rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
                                "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
                            )}
                        >
                            <DropdownMenuLabel className="px-2 py-1.5 text-sm font-medium">
                                {user.email}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="h-px bg-border my-1" />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className={cn(
                                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm",
                                    "outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                                    "focus:bg-accent focus:text-accent-foreground"
                                )}
                            >
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <div className="flex items-center gap-2">
                        <Button asChild variant="ghost" size="sm">
                            <Link href="/login">Login</Link>
                        </Button>
                        <Button asChild size="sm">
                            <Link href="/signup">Sign Up</Link>
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}
