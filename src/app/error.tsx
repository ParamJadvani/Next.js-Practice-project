"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("An unexpected error occurred:", error);
    }, [error]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-xl shadow-lg max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <AlertTriangle className="text-red-500 h-12 w-12" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Something went wrong</h1>
                <p className="text-gray-600 text-sm">
                    An unexpected error occurred while rendering this page. Please try again or
                    contact support if the issue persists.
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button variant="outline" onClick={reset}>
                        Try Again
                    </Button>

                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="bg-red-600 text-white hover:bg-red-700">
                                Go Home
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-sm p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Are you sure you want to leave?
                            </h2>
                            <p className="text-sm text-gray-600">
                                You’ll be redirected to the homepage. Your current session may be
                                lost.
                            </p>
                            <div className="flex justify-end gap-2">
                                <Button variant="ghost">Cancel</Button>
                                <Button
                                    className="bg-red-600 text-white hover:bg-red-700"
                                    onClick={() => (window.location.href = "/dashboard  ")}
                                >
                                    Confirm
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
