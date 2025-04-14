import { useEffect, useState } from "react";
import { getProduct } from "@/_actions/products/clientAction";
import { CartType } from "@/Types";
import CartItem from "@/components/cart/CartItem";
import CartItemSkeleton from "@/app/(main)/dashboard/shopping-cart/loading/CartItemSkeleton";

export default function CartItemList({
    cart,
    // userId,
    updateQuantity,
    removeItem,
}: {
    cart: CartType[];
    userId: string;
    updateQuantity: (productId: string, quantity: number) => boolean;
    removeItem: (productId: string) => boolean;
}) {
    const [cartWithProducts, setCartWithProducts] = useState<CartType[] | null>(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const enrichedCart = await Promise.all(
                cart.map(async (item) => {
                    const product = await getProduct(item.productId);
                    return { ...item, product };
                })
            );
            setCartWithProducts(enrichedCart);
        };

        fetchProductDetails();
    }, [cart]);

    if (!cartWithProducts) {
        return (
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <CartItemSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {cartWithProducts.map((item) => (
                <CartItem
                    key={item.id}
                    item={item}
                    updateQuantity={(quantity) => updateQuantity(item.productId, quantity)}
                    removeItem={() => removeItem(item.productId)}
                />
            ))}
        </div>
    );
}
