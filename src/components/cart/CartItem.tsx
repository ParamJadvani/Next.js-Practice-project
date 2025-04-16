import Image from "next/image";
import { MinusCircle, PlusCircle, Trash2, ImageOff, Loader2 } from "lucide-react";
import { EnrichedCartItemType } from "@/Types";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useMemo } from "react";
import useCartStore from "@/store/cartStore";

interface CartItemProps {
    item: EnrichedCartItemType;
    onUpdateQuantity: (quantity: number) => void;
    onRemoveItem: () => void;
    isUpdating?: boolean;
}

export function CartItem({
    item,
    onUpdateQuantity,
    onRemoveItem,
    isUpdating = false,
}: CartItemProps) {
    const { product, quantity } = item;
    const { updateCartItem } = useCartStore();

    // Recalculate total price based on the latest product price and quantity
    const totalPriceOfEveryProduct = useMemo(() => {
        return {
            id: item.id,
            productId: item.productId,
            userId: item.userId,
            quantity: item.quantity,
            totalPrice: (product?.price || 0) * quantity, // Correct price calculation
        };
    }, [item, product?.price, quantity]);


    useEffect(() => {
        updateCartItem(totalPriceOfEveryProduct); // Update cart state with the new total price
    }, [totalPriceOfEveryProduct, updateCartItem]);

    if (!product) {
        return (
            <div className="flex items-center space-x-4 py-4 border-b text-destructive">
                <ImageOff className="h-10 w-10 text-muted-foreground" />
                <div>
                    <p className="text-sm font-medium">Product information unavailable</p>
                    <p className="text-xs">Item ID: {item.productId}</p>
                    <Button variant="ghost" size="icon" onClick={onRemoveItem} className="mt-2">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove unavailable item</span>
                    </Button>
                </div>
            </div>
        );
    }

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            onUpdateQuantity(newQuantity);
        } else if (newQuantity === 0) {
            onRemoveItem();
        }
    };

    const itemTotal = totalPriceOfEveryProduct.totalPrice;

    return (
        <div
            className={cn(
                "flex flex-col sm:flex-row items-start space-x-0 sm:space-x-4 py-4 border-b transition-opacity duration-300",
                isUpdating ? "opacity-70" : "opacity-100"
            )}
        >
            <Link href={`/dashboard/products/${product.id}`}>
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted mb-3 sm:mb-0">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        sizes="100px"
                        className="object-contain object-center p-1"
                        onError={(e) => {
                            e.currentTarget.src =
                                "https://placehold.co/96x96/e2e8f0/a0aec0?text=N/A";
                            e.currentTarget.srcset = "";
                        }}
                    />
                </div>
            </Link>
            <div className="flex flex-1 flex-col">
                <div className="flex justify-between items-start mb-1">
                    <h3 className="text-sm font-medium text-foreground mr-2 line-clamp-2">
                        {product.title}
                    </h3>
                    <p className="text-sm font-medium text-foreground whitespace-nowrap">
                        {formatCurrency(product.price)}
                    </p>
                </div>
                <p className="text-xs text-muted-foreground mb-2">Category: {product.category}</p>
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-1.5">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={() => handleQuantityChange(quantity - 1)}
                            disabled={isUpdating || quantity <= 1}
                            aria-label="Decrease quantity"
                        >
                            <MinusCircle className="h-4 w-4" />
                        </Button>
                        <span className="px-2 min-w-[30px] text-center text-sm font-medium tabular-nums">
                            {quantity}
                        </span>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7 rounded-full relative"
                            onClick={() => handleQuantityChange(quantity + 1)}
                            disabled={isUpdating}
                            aria-label="Increase quantity"
                        >
                            {isUpdating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <PlusCircle className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onRemoveItem}
                        disabled={isUpdating}
                        className="text-muted-foreground hover:text-destructive"
                        aria-label="Remove item"
                    >
                        {isUpdating ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <Trash2 className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                <div className="mt-2 text-sm font-medium text-right sm:text-left text-foreground">
                    Item Total: {formatCurrency(itemTotal)}
                </div>
            </div>
        </div>
    );
}
