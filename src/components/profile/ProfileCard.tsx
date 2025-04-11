import React from "react";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label"; // Assuming this is the correct import
import { UserType } from "@/Types"; // Adjust the import path as needed

interface ProfileCardProps {
    user: UserType;
}

export function ProfileCard({ user }: ProfileCardProps) {
    // You might want to format the join date if available
    // const joinDate = user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A";

    return (
        <Card className="mt-6">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-700">
                    Profile Information
                </CardTitle>
                <CardDescription className="text-gray-500">Your current details.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label className="text-sm text-gray-600">Username</Label>
                    <p className="mt-1 text-lg text-gray-800">{user.username}</p>
                </div>
                <div>
                    <Label className="text-sm text-gray-600">Email</Label>
                    <p className="mt-1 text-lg text-gray-800">{user.email}</p>
                </div>
                <div>
                    <Label className="text-sm text-gray-600">Joined On</Label>
                    {/* Replace "N/A" with actual data if available */}
                    <p className="mt-1 text-lg text-gray-800">N/A</p>
                </div>
                <div>
                    <Label className="text-sm text-gray-600">Location</Label>
                    {/* Replace "Not specified" with actual data if available */}
                    <p className="mt-1 text-lg text-gray-800">Not specified</p>
                </div>
            </CardContent>
        </Card>
    );
}
