"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/authStore";
import useProductStore from "@/store/productStore";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/product/Card";
import { Card } from "@/components/ui/card";

export default function Products() {
    const { products, getProducts } = useProductStore();
    const { user } = useAuthStore();

    useEffect(() => {
        if (user && products.length === 0) {
            getProducts();
        }
    }, [user, products.length, getProducts]);

    const isLoadingState = user && products.length === 0;

    if (isLoadingState) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                    <Card key={i} className="p-4">
                        <Skeleton className="h-48 w-full rounded-md" />
                        <div className="space-y-3 mt-4">
                            <Skeleton className="h-5 w-3/4" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-2/3" />
                        </div>
                    </Card>
                ))}
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center text-muted-foreground mt-12">
                <p>No products found.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}
