"use client";

import { lazy, Suspense } from "react";
import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import CartContent from "@/components/cart/CartContent";

// const CartItemList = lazy(() => import("@/components/cart/CartClientItem"));
const CartSkeleton = lazy(() => import("@/app/(main)/dashboard/shopping-cart/loading"));

export default function ShoppingCartPage() {
    const user = useAuthStore((s) => s.user);
    const { getFromCart } = useCartStore();

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
                <div className="text-4xl mb-4">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Your cart is waiting</h2>
                <p className="text-muted-foreground mb-6">Please log in to view your cart items</p>
                <Button asChild>
                    <Link href="/auth/login">Log In</Link>
                </Button>
            </div>
        );
    }

    const cart = getFromCart(user.id);

    if (cart.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
                <div className="text-4xl mb-4">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                </div>
                <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
                <p className="text-muted-foreground mb-6">
                    Looks like you haven't added anything to your cart yet
                </p>
                <Button asChild>
                    <Link href="/products">Start Shopping</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
            <Suspense fallback={<CartSkeleton />}>
                <CartContent cart={cart} userId={user.id} />
            </Suspense>
        </div>
    );
}
