import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useCartStore from "@/store/cartStore";
import { EnrichedCartItemType } from "@/Types";
import CartPageSkeleton from "./skeletons/CartPageSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { getProduct } from "@/_actions/products/clientAction";
import CartEmpty from "@/components/cart/CartEmpty";
import { OrderSummary } from "@/components/cart/OrderSummary";
import { CartItem } from "@/components/cart/CartItem";

interface CartContentProps {
    userId: string;
}

export function CartContent({ userId }: CartContentProps) {
    const { updateQuantity, removeFromCart, cart } = useCartStore();

    const [enrichedCart, setEnrichedCart] = useState<EnrichedCartItemType[] | null>(null);
    // State to track which specific items are being updated (for spinner/opacity)
    const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    const cartData = useMemo(() => cart.filter((item) => item.userId === userId), [cart, userId]);

    useEffect(() => {
        const isInitialLoad =
            enrichedCart === null ||
            enrichedCart.length === 0 ||
            enrichedCart.length !== cartData.length;

        const fetchProductDetails = async () => {
            if (cartData.length === 0) {
                setEnrichedCart([]);

                if (isLoading) setIsLoading(false);
                return;
            }

            if (isInitialLoad) {
                setIsLoading(true);
            }
            setError(null);

            try {
                const productPromises = cartData.map(async (item) => {
                    const existingEnrichedItem = enrichedCart?.find((ec) => ec.id === item.id);
                    if (existingEnrichedItem?.product) {
                        if (existingEnrichedItem.quantity === item.quantity) {
                            return existingEnrichedItem;
                        }

                        return { ...existingEnrichedItem, quantity: item.quantity };
                    }

                    try {
                        const product = await getProduct(item.productId);
                        return { ...item, product };
                    } catch (fetchError) {
                        console.error(`Failed to fetch product ${item.productId}:`, fetchError);

                        return { ...item, product: undefined };
                    }
                });

                const results = await Promise.all(productPromises);
                setEnrichedCart(results);
            } catch (err) {
                console.error("Error processing product details for cart:", err);
                setError("Could not load product details for some items.");

                setEnrichedCart(cartData.map((item) => ({ ...item, product: undefined })));
            } finally {
                if (isInitialLoad) {
                    setIsLoading(false);
                }
            }
        };

        fetchProductDetails();
    }, [cartData, userId]);

    const handleUpdateQuantity = useCallback(
        async (productId: string, quantity: number) => {
            setUpdatingItems((prev) => new Set(prev).add(productId));
            try {
                const success = updateQuantity(productId, quantity, userId);
                if (!success) {
                    console.warn(`Failed to update quantity for product ${productId}`);
                }
            } catch (updateError) {
                console.error("Error during quantity update:", updateError);
            } finally {
                setUpdatingItems((prev) => {
                    const next = new Set(prev);
                    next.delete(productId);
                    return next;
                });
            }
        },
        [updateQuantity, userId]
    );

    const handleRemoveItem = useCallback(
        async (productId: string) => {
            setUpdatingItems((prev) => new Set(prev).add(productId));
            try {
                const success = removeFromCart(productId, userId);
                if (!success) {
                    console.warn(`Failed to remove product ${productId}`);
                }
            } catch (removeError) {
                console.error("Error during item removal:", removeError);
            } finally {
                setUpdatingItems((prev) => {
                    const next = new Set(prev);
                    next.delete(productId);
                    return next;
                });
            }
        },
        [removeFromCart, userId]
    );

    if (isLoading) {
        return <CartPageSkeleton />;
    }

    if (error) {
        return (
            <div className="max-w-2xl mx-auto mt-10">
                <Alert variant="destructive">
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Error Loading Cart</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            </div>
        );
    }

    if (cartData.length === 0) {
        return <CartEmpty />;
    }

    if (!enrichedCart) {
        return (
            <p className="text-muted-foreground p-6 text-center">Error displaying cart items.</p>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items Section */}
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Cart Items ({enrichedCart.length} item)</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 divide-y">
                        {" "}
                        {enrichedCart.map((item) => (
                            <div key={item.id} className="px-3">
                                {" "}
                                {/* Added padding around each item */}
                                <CartItem
                                    item={item}
                                    isUpdating={updatingItems.has(item.productId)}
                                    onUpdateQuantity={(quantity) =>
                                        handleUpdateQuantity(item.productId, quantity)
                                    }
                                    onRemoveItem={() => handleRemoveItem(item.productId)}
                                />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* Order Summary Section */}
            <div className="lg:col-span-1">
                <OrderSummary enrichedCartItems={enrichedCart} />
            </div>
        </div>
    );
}
