// /store/cartStore.ts

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItemType } from "@/Types";

interface CartState {
    cart: CartItemType[];
}

interface CartActions {
    addToCart: (productId: string, quantity: number, userId: string) => boolean;
    removeFromCart: (productId: string, userId: string) => boolean;
    updateQuantity: (productId: string, quantity: number, userId: string) => boolean;
    clearCart: (userId: string) => void;
    getCartForUser: (userId: string) => CartItemType[];
}

const useCartStore = create<CartState & CartActions>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (productId, quantity, userId) => {
                const currentCart = get().cart;
                const existingItemIndex = currentCart.findIndex(
                    (item) => item.productId === productId && item.userId === userId
                );

                if (quantity <= 0) return false;
                let updatedCart: CartItemType[];
                if (existingItemIndex > -1) {
                    console.warn(
                        `Product ${productId} already in cart for user ${userId}. Consider using updateQuantity or clarifying requirements.`
                    );
                    updatedCart = currentCart.map((item, index) =>
                        index === existingItemIndex
                            ? { ...item, quantity: item.quantity + quantity }
                            : item
                    );
                } else {
                    const newCartItem: CartItemType = {
                        id: `${Date.now()}-${userId}-${productId}-${Math.random()
                            .toString(36)
                            .substring(2, 9)}`,
                        productId,
                        quantity,
                        userId,
                    };
                    updatedCart = [...currentCart, newCartItem];
                }

                set({ cart: updatedCart });
                return true;
            },
            removeFromCart: (productId, userId) => {
                const currentCart = get().cart;
                const itemExists = currentCart.some(
                    (item) => item.productId === productId && item.userId === userId
                );

                if (itemExists) {
                    set((state) => ({
                        cart: state.cart.filter(
                            (item) => !(item.productId === productId && item.userId === userId)
                        ),
                    }));
                    return true;
                }
                return false;
            },
            updateQuantity: (productId, quantity, userId) => {
                const currentCart = get().cart;
                const existingItemIndex = currentCart.findIndex(
                    (item) => item.productId === productId && item.userId === userId
                );

                if (existingItemIndex > -1) {
                    if (quantity <= 0) {
                        const updatedCart = currentCart.filter(
                            (_, index) => index !== existingItemIndex
                        );
                        set({ cart: updatedCart });
                    } else {
                        const updatedCart = currentCart.map((item, index) =>
                            index === existingItemIndex ? { ...item, quantity } : item
                        );
                        set({ cart: updatedCart });
                    }
                    return true;
                }
                return false;
            },
            clearCart: (userId) => {
                set((state) => ({
                    cart: state.cart.filter((item) => item.userId !== userId),
                }));
            },
            getCartForUser: (userId) => {
                return get().cart.filter((item) => item.userId === userId);
            },
        }),
        {
            name: "shopping-cart-store",
        }
    )
);

export default useCartStore;
