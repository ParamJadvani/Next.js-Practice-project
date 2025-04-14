// /app/(main)/dashboard/shopping-cart/loading.tsx

import CartPageSkeleton from "@/components/cart/skeletons/CartPageSkeleton";

export default function LoadingShoppingCartPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <h1 className="text-3xl font-bold mb-6 tracking-tight text-transparent bg-muted animate-pulse w-1/2 h-8 rounded-md">
                {/* Skeleton for the title */}
            </h1>
            <CartPageSkeleton />
        </div>
    );
}
