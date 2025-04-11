// /app/(main)/dashboard/products/page.tsx

import Products from "@/app/(main)/dashboard/products/default";
import LoadingProductsPage from "@/app/(main)/dashboard/products/loading";
import { Suspense } from "react";

export default function ProductsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Products</h1> {/* Add a title */}
            {/* Wrap the Products component with Suspense */}
            <Suspense fallback={<LoadingProductsPage />}>
                <Products />
            </Suspense>
        </div>
    );
}
