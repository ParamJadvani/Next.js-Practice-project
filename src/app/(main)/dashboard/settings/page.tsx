// /app/(main)/dashboard/settings/page.tsx
"use client"; // Keep this if you plan interactive settings

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Settings</h1>

            <Card>
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Manage your account details here. (Placeholder)
                    </p>
                    {/* Add form fields or settings components here */}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Customize your application experience. (Placeholder)
                    </p>
                    {/* Add preference toggles/options here */}
                </CardContent>
            </Card>
        </div>
    );
}
