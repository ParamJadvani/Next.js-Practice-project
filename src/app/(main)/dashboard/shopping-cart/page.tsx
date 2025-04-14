"use client";

import React from "react"; // Ensure React is imported
import useAuthStore from "@/store/authStore";
import useCartStore from "@/store/cartStore";
import CartEmpty from "@/components/cart/CartEmpty"; // Defined above
import { CartContent } from '@/components/cart/CartContent';
// import CartNotLoggedIn from "@/components/cart/CartNotLoggedIn"; // Defined above
// Loading component is handled by Next.js file convention

export default function ShoppingCartPage() {
    const user = useAuthStore((state) => state.user);
    // const isLogin = useAuthStore((state) => state.isLogin); // Get login status

    // Use the store hook to get the function - needed for initial empty check
    const { getCartForUser } = useCartStore();

    // --- Render Logic ---

    // Handle not logged in state
    // if (!isLogin || !user) {
    //     return (
    //         <div className="container mx-auto px-4 py-8 max-w-6xl">
    //             <CartNotLoggedIn />
    //         </div>
    //     );
    // }

    // Handle initially empty cart state *before* rendering CartContent
    // This avoids CartContent mounting just to find the cart is empty
    if (user && getCartForUser(user.id).length === 0) {
        return (
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <CartEmpty />
            </div>
        );
    }

    // If logged in and cart is not initially empty, render CartContent
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-6 tracking-tight">Your Shopping Cart</h1>
            {/* Pass only userId, CartContent will handle fetching and reactivity */}
            {user && <CartContent userId={user.id} />}
        </div>
    );
}
