"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import useProductStore from "@/store/productStore";
import ProductCard from "@/components/product/Card";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";

export default function Products() {
    const { products, getProducts } = useProductStore();
    const { user } = useAuthStore();
    const { addToCart } = useCartStore();

    useEffect(() => {
        if (user && products.length === 0) {
            getProducts();
        }
    }, [user, products.length, getProducts]);

    if (products.length === 0) {
        return (
            <div className="text-center text-muted-foreground mt-12">
                <p>No products found.</p>
            </div>
        );
    }

    const addToCartFn = (productId: string, quantity: number) => {
        if (user && addToCart(productId, quantity, user.id))
            toast.success("Product added to cart!");
        else toast.error("Failed to add product to cart!");
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} onClick={addToCartFn} />
            ))}
        </div>
    );
}
