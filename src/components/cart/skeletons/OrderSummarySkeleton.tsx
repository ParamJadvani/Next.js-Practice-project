// /components/cart/skeletons/OrderSummarySkeleton.tsx

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function OrderSummarySkeleton() {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-7 w-3/4 rounded" /> {/* Title: Order Summary */}
            </CardHeader>
            <CardContent className="space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between">
                    <Skeleton className="h-5 w-1/4 rounded" />
                    <Skeleton className="h-5 w-1/4 rounded" />
                </div>
                {/* Shipping */}
                <div className="flex justify-between">
                    <Skeleton className="h-5 w-1/4 rounded" />
                    <Skeleton className="h-5 w-1/4 rounded" />
                </div>
                <Separator />
                {/* Total */}
                <div className="flex justify-between">
                    <Skeleton className="h-6 w-1/3 rounded font-bold" />
                    <Skeleton className="h-6 w-1/4 rounded font-bold" />
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                {/* Checkout Button */}
                <Skeleton className="h-10 w-full rounded" />
                {/* Continue Shopping Button */}
                <Skeleton className="h-10 w-full rounded" />
            </CardFooter>
        </Card>
    );
}
