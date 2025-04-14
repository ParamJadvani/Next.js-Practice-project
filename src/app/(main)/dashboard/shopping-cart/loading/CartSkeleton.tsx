import CartItemSkeleton from "@/app/(main)/dashboard/shopping-cart/loading/CartItemSkeleton";
import OrderSummarySkeleton from "@/app/(main)/dashboard/shopping-cart/loading/OrderSummarySkeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CartSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <div className="h-7 bg-muted animate-pulse rounded w-1/3"></div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <CartItemSkeleton key={i} />
                        ))}
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <OrderSummarySkeleton />
            </div>
        </div>
    );
}
