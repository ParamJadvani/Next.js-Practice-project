"use client";

import React from "react";
import useCartStore from "@/store/cartStore"; // Ensure correct import path

export default function ShoppingCartPage() {
    // Get cart data from the Zustand store
    const cart = useCartStore((state) => state.getFromCart());

    // Check if the cart is empty
    if (cart.length === 0) {
        return (
            <div>
                <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
                <p>Your cart is empty.</p>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
            {/* Render cart items */}
            <div className="space-y-4">
                {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{item.productId}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                        <div>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded"
                                onClick={() => {
                                    // Logic to remove item from cart
                                    // removeFromCart(item.productId, item.userId);
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
