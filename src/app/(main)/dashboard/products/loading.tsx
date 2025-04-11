// /app/(main)/dashboard/products/Loading.tsx

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function LoadingProductsPage() {
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
