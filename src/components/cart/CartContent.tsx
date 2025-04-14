import CartSkeleton from "@/app/(main)/dashboard/shopping-cart/loading/CartSkeleton";
import OrderSummarySkeleton from "@/app/(main)/dashboard/shopping-cart/loading/OrderSummarySkeleton";
import CartItemList from "@/components/cart/CartClientItem";
import OrderSummary from "@/components/cart/OrderSummary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCartStore from "@/store/cartStore";
import { CartType } from "@/Types";
import { Suspense } from "react";

export default function CartContent({ cart, userId }: { cart: CartType[]; userId: string }) {
    const { updateFromCart, removeFromCart } = useCartStore();

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Cart Items ({cart.length})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Suspense fallback={<CartSkeleton />}>
                            <CartItemList
                                cart={cart}
                                userId={userId}
                                updateQuantity={(productId, quantity) =>
                                    updateFromCart(productId, quantity, userId)
                                }
                                removeItem={(productId) => removeFromCart(productId, userId)}
                            />
                        </Suspense>
                    </CardContent>
                </Card>
            </div>

            <div className="lg:col-span-1">
                <Suspense fallback={<OrderSummarySkeleton />}>
                    <OrderSummary cart={cart} />
                </Suspense>
            </div>
        </div>
    );
}
