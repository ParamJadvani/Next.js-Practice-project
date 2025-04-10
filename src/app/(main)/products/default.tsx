"use client";

import { useEffect } from "react";
import Image from "next/image";
import useAuthStore from "@/store/authStore";
import useProductStore from "@/store/productStore";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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
                <Card key={product.id} className="transition-shadow hover:shadow-md">
                    <CardHeader className="space-y-2">
                        <div className="relative aspect-[4/2] w-full rounded-md overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.title}
                                fill
                                className="object-contain"
                                sizes="(max-width: 768px) 100vw, 33vw"
                            />
                        </div>
                        <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                            {product.description}
                        </p>
                        <div className="flex justify-start">
                            <p className="text-Primary font-semibold mr-1">
                                Price :
                            </p>
                            <p className="font-semibold text-primary">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        <Button variant="outline" className="w-full">
                            Add to Cart
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
