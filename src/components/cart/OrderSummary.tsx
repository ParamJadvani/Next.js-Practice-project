import { useEffect, useState } from "react";
import { CartType, ProductType } from "@/Types";
import { getProduct } from "@/_actions/products/clientAction";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import OrderSummarySkeleton from "@/app/(main)/dashboard/shopping-cart/loading/OrderSummarySkeleton";

export default function OrderSummary({ cart }: { cart: CartType[] }) {
    const [products, setProducts] = useState<Map<string, ProductType>>(new Map());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const productMap = new Map<string, ProductType>();

            await Promise.all(
                cart.map(async (item) => {
                    const product = await getProduct(item.productId);
                    productMap.set(item.productId, product);
                })
            );

            setProducts(productMap);
            setLoading(false);
        };

        fetchProducts();
    }, [cart]);

    if (loading) {
        return <OrderSummarySkeleton />;
    }

    const subtotal = cart.reduce((sum, item) => {
        const product = products.get(item.productId);
        return sum + (product?.price || 0) * item.quantity;
    }, 0);

    const shipping = subtotal > 100 ? 0 : 10;
    const total = subtotal + shipping;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <Button className="w-full">Proceed to Checkout</Button>
                <Button variant="outline" asChild className="w-full">
                    <Link href="/products">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Continue Shopping
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
