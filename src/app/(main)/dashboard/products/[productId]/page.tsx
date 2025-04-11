// src/app/(main)/dashboard/products/[productId]/page.tsx

import { Suspense } from "react";
import { getProduct } from "@/_actions/products/clientAction";
// import { ProductType } from "@/Types"; // Your product type definition
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Star, StarHalf } from "lucide-react";
import { notFound } from "next/navigation";
import LoadingProductDetailPage from "@/app/(main)/dashboard/products/[productId]/loading";

// Define the async function that fetches the product data
async function fetchProduct(productId: string) {
    try {
        const product = await getProduct(productId);
        if (!product) throw new Error("Product not found.");
        return product;
    } catch (error) {
        throw new Error(`Failed to fetch product: ${error}`);
    }
}

interface ProductDetailProps {
    params: Promise<{ productId: string }>;
}

export default async function ProductDetail({ params }: ProductDetailProps) {
    const { productId } = await params;

    return (
        <Suspense fallback={<LoadingProductDetailPage />}>
            <ProductContent productId={productId} />
        </Suspense>
    );
}

async function ProductContent({ productId }: { productId: string }) {
    const product = await fetchProduct(productId);

    if (!product) {
        return notFound();
    }

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
                        {Array.from({ length: 5 }, (_, index) => {
                            if (index < Math.floor(product.rating.rate)) {
                                return <Star key={index} className="text-yellow-500" />;
                            } else if (
                                index === Math.floor(product.rating.rate) &&
                                product.rating.rate % 1 !== 0
                            ) {
                                return <StarHalf key={index} className="text-yellow-500" />;
                            } else {
                                return <Star key={index} className="text-gray-400" />;
                            }
                        })}
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
