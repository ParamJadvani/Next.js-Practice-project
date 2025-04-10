import { getProduct } from "@/_actions/products/clientAction";
import { ProductType } from "@/Types"; // Ensure you have this type defined
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"; // Optional: Add a product status badge
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Star, StarHalf } from "lucide-react"; // For rating display
import { notFound } from "next/navigation";

interface ProductDetailProps {
    params: Promise<{ productId: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
    const { productId } = await params;

    let product: ProductType | null = null;
    try {
        const productDataArray = await getProduct(productId);
        product = productDataArray;
    } catch (error) {
        console.error(`[Intercepted Page] Failed to fetch product ${productId}:`, error);
        product = null;
    }

    if (!product) {
        return notFound();
    }

    // Render the product details
    return (
        <div className="max-w-4xl mx-auto mt-8">
            {/* Back Button */}
            <Link href="/dashboard/products">
                <Button variant="outline" className="mb-4 z-10">
                    <ArrowLeft className="mr-2" />
                    Back to Products
                </Button>
            </Link>

            <Card className="shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-semibold text-primary">
                        {product.title}
                    </CardTitle>
                    <Badge className="mt-2 text-muted">{product.category}</Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Product Image */}
                    <div className="relative aspect-[4/1.5] w-full rounded-md overflow-hidden cursor-pointer">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                        {/* Render full stars */}
                        {Array.from({ length: 5 }, (_, index) => {
                            if (index < Math.floor(product.rating.rate)) {
                                // Render full yellow star
                                return <Star key={index} className="text-yellow-500" />;
                            } else if (
                                index === Math.floor(product.rating.rate) &&
                                product.rating.rate % 1 !== 0
                            ) {
                                // Render half yellow star if there's a fractional part
                                return <StarHalf key={index} className="text-yellow-500" />;
                            } else {
                                // Render gray star for remaining space
                                return <Star key={index} className="text-gray-400" />;
                            }
                        })}
                        {/* Display the rating count */}
                        <span className="ml-2 text-md text-gray-600">
                            ({product.rating.count} ratings)
                        </span>
                    </div>

                    {/* Description and Price */}
                    <div className="space-y-3">
                        <p className="text-md text-justify">
                            <span className="text-lg font-semibold">Description: </span>
                            <span className="text-muted-foreground">{product.description}</span>
                        </p>
                        <div className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-primary">Price: </span>
                            <span className="text-2xl font-semibold">
                                ${product.price.toFixed(2)}
                            </span>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        variant="outline"
                        className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Add to Cart
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

// Optional: Add a Loading UI component in the same directory
export function Loading() {
    return (
        <div className="max-w-4xl mx-auto mt-8">
            <Card>
                <CardHeader>
                    <Skeleton className="h-10 w-3/4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-48 w-full" />
                    <div className="mt-4 space-y-3">
                        <Skeleton className="h-5 w-1/2" />
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-6 w-1/3" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
