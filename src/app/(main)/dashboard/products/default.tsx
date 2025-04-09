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

// Ensure your productStore has a 'loading' state:
// /store/productStore.ts (example)
// import { create } from 'zustand';
// // ... other imports

// interface ProductState {
//   products: any[]; // Use a proper Product type
//   loading: boolean;
//   getProducts: () => Promise<void>;
//   // ... other state/actions
// }

// const useProductStore = create<ProductState>((set) => ({
//   products: [],
//   loading: false, // Initialize loading state
//   getProducts: async () => {
//     set({ loading: true }); // Set loading true before fetch
//     try {
//       // Replace with your actual API call
//       // const response = await fetch('/api/products');
//       // const data = await response.json();
//       // set({ products: data, loading: false });

//       // Placeholder data for example:
//       await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
//        const fakeProducts = [
//            { id: 1, title: 'Product A', description: 'Desc A', price: 19.99 },
//            { id: 2, title: 'Product B', description: 'Desc B', price: 29.99 },
//        ];
//        set({ products: fakeProducts, loading: false });

//     } catch (error) {
//       console.error("Failed to fetch products:", error);
//       set({ loading: false }); // Set loading false on error
//     }
//   },
//   // ... other state/actions
// }));

// export default useProductStore;
