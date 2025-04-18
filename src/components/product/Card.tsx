import { ProductType } from "@/Types";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
    product: ProductType;
    onClick: (productId: string, quantity: number) => void;
}

export default function ProductCard({ product, onClick }: CardProps) {
    return (
        <Card key={product.id} className="transition-shadow hover:shadow-md">
            <CardHeader className="space-y-2">
                <Link href={`/dashboard/products/${product.id}`}>
                    <div className="relative aspect-[4/2] w-full rounded-md overflow-hidden cursor-pointer  ">
                        <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </div>
                </Link>
                <CardTitle className="text-lg line-clamp-1">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground line-clamp-2 h-10">
                    {product.description}
                </p>
                <div className="flex justify-start">
                    <p className="text-Primary font-semibold mr-1">Price :</p>
                    <p className="font-semibold text-primary">${product.price.toFixed(2)}</p>
                </div>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => onClick(product.id.toString(), 1)}
                >
                    Add to Cart
                </Button>
            </CardFooter>
        </Card>
    );
}
