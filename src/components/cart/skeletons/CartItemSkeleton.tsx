// /components/cart/skeletons/CartItemSkeleton.tsx

import { Skeleton } from "@/components/ui/skeleton";

export default function CartItemSkeleton() {
    return (
        <div className="flex items-start space-x-4 py-4 border-b">
            <Skeleton className="h-24 w-24 rounded-md" /> {/* Image Placeholder */}
            <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-3/4 rounded" /> {/* Title */}
                <Skeleton className="h-4 w-1/4 rounded" /> {/* Category/Info */}
                <div className="flex items-center space-x-2 pt-2">
                    <Skeleton className="h-7 w-7 rounded" /> {/* Minus Button */}
                    <Skeleton className="h-6 w-10 rounded" /> {/* Quantity */}
                    <Skeleton className="h-7 w-7 rounded" /> {/* Plus Button */}
                    <div className="ml-auto">
                        <Skeleton className="h-7 w-7 rounded" /> {/* Remove Button */}
                    </div>
                </div>
                <Skeleton className="h-4 w-1/3 rounded mt-1" /> {/* Item Total */}
            </div>
        </div>
    );
}
