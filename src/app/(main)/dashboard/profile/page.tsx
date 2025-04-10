"use client";

import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, User } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import useAuthStore from "@/store/authStore";
import Link from "next/link";

export default function ProfilePage() {
    const user = useAuthStore((s) => s.user);

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="flex flex-col items-center justify-center h-full space-y-2">
                <div className="min-w-2xl">
                    <Link href="/dashboard/products">
                        <Button variant="outline" className="cursor-pointer">
                            <ArrowLeft className="mr-2" />
                            Back to Products
                        </Button>
                    </Link>
                </div>

                {user ? (
                    <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg border border-gray-200 p-6">
                        {/* Header with Avatar and Name */}
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center gap-4">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={""} alt={user.username} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {user.username[0].toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h1 className="text-2xl font-bold text-gray-800">
                                        {user.username.charAt(0).toUpperCase() +
                                            user.username.slice(1)}
                                    </h1>
                                </div>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <Button variant="outline" size="sm">
                                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                                </Button>
                            </div>
                        </div>

                        {/* Profile Information Card */}
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-700">
                                    Profile Information
                                </CardTitle>
                                <CardDescription className="text-gray-500">
                                    Update your personal details below.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Label
                                        htmlFor="username"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Username
                                    </Label>
                                    <p className="mt-1 text-lg text-gray-800">
                                        {user.username.charAt(0).toUpperCase() +
                                            user.username.slice(1)}
                                    </p>
                                </div>
                                <div>
                                    <Label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Email
                                    </Label>
                                    <p className="mt-1 text-lg text-gray-800">{user.email}</p>
                                </div>
                                <div>
                                    <Label
                                        htmlFor="joinDate"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Joined On
                                    </Label>
                                    <p className="mt-1 text-lg text-gray-800">{"N/A"}</p>
                                </div>
                                <div>
                                    <Label
                                        htmlFor="location"
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        Location
                                    </Label>
                                    <p className="mt-1 text-lg text-gray-800">{"Not specified"}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                ) : (
                    <div className="text-center text-gray-600">
                        <User className="mx-auto h-12 w-12" />
                        <p className="mt-4 text-lg">Please log in to view your profile.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
