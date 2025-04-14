import { CartType } from "@/Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Assuming CartType includes: { id: string, productId: string, quantity: number, userId: string | null }
interface CartStore {
    cart: Array<CartType>;
    addToCart: (productId: string, quantity: number, userId: string) => boolean;
    removeFromCart: (productId: string, userId: string) => boolean;
    updateFromCart: (productId: string, quantity: number, userId: string) => boolean;
    clearCart: () => void;
    getFromCart: (userId: string) => Array<CartType>;
}

const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            addToCart: (productId: string, quantity: number, userId: string) => {
                // Check if the product already exists in the cart
                const existingCartItem = get().cart.find(
                    (item) => item.productId === productId && item.userId === userId
                );
                if (existingCartItem) {
                    // Product already exists, return false
                    return false;
                } else {
                    // Generate a unique id for the cart item (e.g., using Date.now())
                    const newCartItem: CartType = {
                        id: `${Date.now()}-${Math.random()}`, // Unique id generation
                        productId,
                        quantity,
                        userId,
                    };

                    // Add the new item to the cart
                    set((state) => ({
                        cart: [...state.cart, newCartItem],
                    }));
                    return true;
                }
            },
            removeFromCart: (productId: string, userId: string) => {
                // Find the item in the cart
                const existingCartItem = get().cart.find(
                    (item) => item.productId === productId && item.userId === userId
                );
                if (existingCartItem) {
                    // Remove the item from the cart
                    set((state) => ({
                        cart: state.cart.filter(
                            (item) => item.productId !== productId || item.userId !== userId
                        ),
                    }));
                    return true;
                }
                return false; // Item not found
            },
            updateFromCart: (productId: string, quantity: number, userId: string | null) => {
                // Find the item in the cart
                const existingCartItem = get().cart.find(
                    (item) => item.productId === productId && item.userId === userId
                );
                if (existingCartItem) {
                    // Update the quantity of the existing item
                    set((state) => ({
                        cart: state.cart.map((item) =>
                            item.productId === productId && item.userId === userId
                                ? { ...item, quantity }
                                : item
                        ),
                    }));
                    return true;
                } else {
                    return false; // Product not found to update
                }
            },
            clearCart: () => {
                set({ cart: [] });
            },
            getFromCart: (userId: string) => {
                return get().cart.filter((item) => item.userId === userId);
            },
        }),
        {
            name: "cart-store",
        }
    )
);

export default useCartStore;
