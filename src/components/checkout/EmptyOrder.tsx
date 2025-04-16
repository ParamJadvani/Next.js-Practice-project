"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyOrderPage() {
    return (
        <div className="flex min-h-[70vh] items-center justify-center">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="flex flex-col items-center">
                    <ShoppingCart className="h-16 w-16 text-gray-400 mb-2" />
                    <CardTitle>Your cart is empty</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <p className="text-muted-foreground mb-6 text-center">
                        Looks like you haven&apos;t added any items yet.
                    </p>
                    <Link href="/dashboard">
                        <Button>Go to Home</Button>
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
