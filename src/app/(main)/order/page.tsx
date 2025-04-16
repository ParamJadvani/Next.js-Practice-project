"use client";

import React, { useState, useMemo } from "react";
import OrderForm from "@/components/checkout/OrderForm";
import useCartStore from "@/store/cartStore";
import useAuthStore from "@/store/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import EmptyOrderPage from "@/components/checkout/EmptyOrder";

export default function Order() {
    const router = useRouter();
    const userId = useAuthStore((state) => state.user?.id);
    const cart = useCartStore((state) => state.cart);
    const clearCart = useCartStore((state) => state.clearCart);

    const cartItems = useMemo(() => {
        if (!userId) return [];
        return cart.filter((item) => item.userId === userId);
    }, [cart, userId]);

    const [orderConfirmed, setOrderConfirmed] = useState(false);

    if (!orderConfirmed && (!userId || cartItems.length === 0)) {
        return <EmptyOrderPage />;
    }

    const handleOrderConfirmed = () => {
        setOrderConfirmed(true);
        if (userId) {
            clearCart(userId);
        }
    };

    const handleGoHome = () => {
        router.push("/dashboard");
    };

    return (
        <div className="bg-background min-h-screen py-8 md:py-12">
            <div className="container mx-auto max-w-3xl px-4">
                <Card className="w-full border shadow-sm">
                    <CardHeader className="border-b">
                        <CardTitle className="text-2xl font-semibold text-center tracking-tight">
                            {orderConfirmed ? "Order Confirmation" : "Checkout"}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        {!orderConfirmed ? (
                            <OrderForm
                                userId={userId}
                                cartItems={cartItems}
                                onOrderConfirmed={handleOrderConfirmed}
                            />
                        ) : (
                            <div className="flex flex-col items-center text-center space-y-4">
                                <CheckCircle className="h-16 w-16 text-green-500" />
                                <h2 className="text-xl font-semibold">Thank you for your order!</h2>
                                <p className="text-muted-foreground">
                                    Your order has been placed successfully.
                                </p>
                                <Button onClick={handleGoHome}>Go to Home</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
