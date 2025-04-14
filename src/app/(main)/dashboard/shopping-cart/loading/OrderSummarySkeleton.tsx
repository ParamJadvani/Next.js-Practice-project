import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

export default function OrderSummarySkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="h-7 bg-muted animate-pulse rounded w-1/2"></div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
                </div>
                <div className="flex justify-between">
                    <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
                    <div className="h-4 bg-muted animate-pulse rounded w-1/4"></div>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <div className="h-5 bg-muted animate-pulse rounded w-1/4"></div>
                    <div className="h-5 bg-muted animate-pulse rounded w-1/4"></div>
                </div>
            </CardContent>
            <CardFooter className="space-y-2">
                <div className="h-10 bg-muted animate-pulse rounded w-full"></div>
                <div className="h-10 bg-muted animate-pulse rounded w-full mt-2"></div>
            </CardFooter>
        </Card>
    );
}
