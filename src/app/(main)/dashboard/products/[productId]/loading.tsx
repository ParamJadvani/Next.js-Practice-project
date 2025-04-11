// src/app/(main)/dashboard/products/[productId]/Loading.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export default function LoadingProductDetailPage() {
    return (
        <div className="max-w-4xl mx-auto mt-8">
            {/* Back Button Placeholder */}
            <div className="mb-4">
                <Skeleton className="h-10 w-32" />
            </div>

            {/* Card Placeholder */}
            <Card className="shadow-lg">
                <CardHeader>
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-32 mt-2" /> {/* For category badge */}
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Product Image Placeholder */}
                    <div className="relative aspect-[4/1.5] w-full rounded-md overflow-hidden cursor-pointer">
                        <Skeleton className="h-full w-full" />
                    </div>

                    {/* Rating Placeholder */}
                    <div className="flex items-center space-x-2">
                        <Skeleton className="h-6 w-20" />
                        <Skeleton className="h-6 w-16" /> {/* For ratings count */}
                    </div>

                    {/* Description and Price Placeholder */}
                    <div className="space-y-3">
                        <Skeleton className="h-5 w-3/4" />
                        <div className="flex items-center space-x-2">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-5 w-1/3" />
                        </div>
                    </div>

                    {/* Add to Cart Button Placeholder */}
                    <Skeleton className="h-12 w-full mt-4" />
                </CardContent>
            </Card>
        </div>
    );
}
