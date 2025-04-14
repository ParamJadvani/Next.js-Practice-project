// /components/cart/OrderSummary.tsx

import React from "react";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { EnrichedCartItemType } from "@/Types";
import { formatCurrency } from "@/lib/utils";
interface OrderSummaryProps {
    enrichedCartItems: EnrichedCartItemType[];
}
export function OrderSummary({ enrichedCartItems }: OrderSummaryProps) {
    const validItems = enrichedCartItems.filter((item) => item.product);
    const subtotal = validItems.reduce(
        (sum, item) => sum + (item.product?.price || 0) * item.quantity,
        0
    );
    const shippingThreshold = 100;
    const shippingCost = 10;
    const shipping = subtotal > shippingThreshold ? 0 : shippingCost;
    const total = subtotal + shipping;
    const handleCheckout = () => {
        console.log("Proceeding to checkout:", { subtotal, shipping, total, items: validItems });
        alert("Checkout functionality not implemented yet.");
    };
    return (
        <Card className="sticky top-24">
            {" "}
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>{" "}
            <CardContent className="space-y-4">
                {" "}
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                </div>{" "}
                <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                        {shipping === 0 ? "Free" : formatCurrency(shipping)}
                    </span>
                </div>{" "}
                {subtotal <= shippingThreshold && shipping > 0 && (
                    <p className="text-xs text-muted-foreground text-center">
                        Add {formatCurrency(shippingThreshold - subtotal)} more for FREE shipping!
                    </p>
                )}{" "}
                <Separator />{" "}
                <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span>{formatCurrency(total)}</span>
                </div>{" "}
            </CardContent>{" "}
            <CardFooter className="flex flex-col space-y-3">
                {" "}
                <Button
                    className="w-full"
                    onClick={handleCheckout}
                    disabled={validItems.length === 0}
                >
                    Proceed to Checkout
                </Button>{" "}
                <Button variant="outline" asChild className="w-full">
                    <Link href="/products">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Continue Shopping
                    </Link>
                </Button>{" "}
            </CardFooter>{" "}
        </Card>
    );
}
