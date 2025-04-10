// /app/(main)/dashboard/products/default.tsx
"use client";

import useAuthStore from "@/store/authStore";
import useProductStore from "@/store/productStore";
import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Add Skeleton for loading state

export default function Products() {
    const { products, getProducts } = useProductStore();
    const { user } = useAuthStore();

    useEffect(() => {
        // Fetch only if user exists, products are empty, and not already loading
        if (user && products.length === 0) {
            console.log("Fetching products..."); // Debug log
            getProducts();
        }
    }, [user, getProducts, products.length]); // Add loading to dependency array

    // Improved Loading State
    if (products.length === 0) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[...Array(6)].map(
                    (
                        _,
                        i // Show 6 skeleton cards
                    ) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-5 w-3/4" />
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-5/6" />
                                <Skeleton className="h-5 w-1/4 mt-2" />
                            </CardContent>
                        </Card>
                    )
                )}
            </div>
        );
    }

    if (products.length === 0) {
        return <p className="text-muted-foreground">No products found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {products.map((product) => (
                <Card key={product.id}>
                    <CardHeader>
                        {/* Ensure title isn't too long or wraps */}
                        <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {/* Limit description length */}
                        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                            {product.description}
                        </p>
                        <p className="mt-2 font-medium text-primary">${product.price.toFixed(2)}</p>{" "}
                        {/* Format price */}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}