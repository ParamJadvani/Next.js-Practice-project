// /components/cart/skeletons/CartPageSkeleton.tsx

import CartItemSkeleton from "./CartItemSkeleton";
import OrderSummarySkeleton from "./OrderSummarySkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CartPageSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items Section Skeleton */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        {/* Title: Cart Items (...) */}
                        <Skeleton className="h-7 w-1/2 rounded" />
                    </CardHeader>
                    <CardContent className="divide-y">
                        {" "}
                        {/* Use divide for separators */}
                        {[1, 2, 3].map((i) => (
                            <CartItemSkeleton key={i} />
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Order Summary Section Skeleton */}
            <div className="lg:col-span-1">
                <OrderSummarySkeleton />
            </div>
        </div>
    );
}
