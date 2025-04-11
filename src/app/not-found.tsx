import Link from "next/link";
import {
    Card,
    CardHeader,
    CardContent,
    CardFooter,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
            <Card className="w-full max-w-md shadow-xl">
                <CardHeader className="text-center">
                    <CardTitle className="text-6xl font-bold text-red-600">404</CardTitle>
                    <CardDescription className="mt-2 text-lg text-gray-700 dark:text-gray-300">
                        Oops! We can’t seem to find the page you’re looking for.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        It looks like nothing was found at this location.
                    </p>
                </CardContent>
                <CardFooter className="flex justify-center">
                    <Link href="/dashboard">
                        <Button variant="destructive">Go Back Home</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
}
