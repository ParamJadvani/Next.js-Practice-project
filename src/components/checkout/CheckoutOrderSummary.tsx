import React from "react";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { ProductType } from "@/Types";

type CartProductItem = {
    cartId: string;
    quantity: number;
    totalPrice: number;
    productData: ProductType;
};

interface OrderSummaryProps {
    cartProducts: CartProductItem[];
    totalPrice: number;
}

export default function OrderSummary({ cartProducts, totalPrice }: OrderSummaryProps) {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-3 border-b pb-2">Order Summary</h3>
            {cartProducts.length > 0 ? (
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {cartProducts.map((item) => (
                        <div
                            key={item.cartId}
                            className="flex items-center justify-between space-x-4"
                        >
                            <div className="flex items-center space-x-3 min-w-0">
                                {/* Use Next.js Image or standard img */}
                                <Image
                                    src={item.productData.image}
                                    alt={item.productData.title}
                                    className="w-12 h-12 object-contain rounded border flex-shrink-0 bg-white" // Added bg-white for transparency
                                    width={48}
                                    height={48}
                                    unoptimized // If images are external and not optimized by Next.js
                                />
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {item.productData.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Qty: {item.quantity} | Price: $
                                        {item.productData.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm font-semibold flex-shrink-0">
                                ${item.totalPrice.toFixed(2)}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-muted-foreground text-center py-4">Your cart is empty.</p>
            )}
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-semibold text-lg">
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>
        </div>
    );
}
