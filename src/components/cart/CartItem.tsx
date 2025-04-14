import { Button } from "@/components/ui/button";
import { CartType } from "@/Types";
import Image from "next/image";
import { MinusCircle, PlusCircle, Trash2 } from "lucide-react";

export default function CartItem({
    item,
    updateQuantity,
    removeItem,
}: {
    item: CartType;
    updateQuantity: (quantity: number) => boolean;
    removeItem: () => boolean;
}) {
    const product = item.product;

    if (!product) return null;

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1) {
            updateQuantity(newQuantity);
        }
    };

    return (
        <div className="flex items-start space-x-4 py-4 border-b last:border-0">
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100px, 150px"
                />
            </div>

            <div className="flex flex-1 flex-col">
                <div className="flex justify-between">
                    <h3 className="text-sm font-medium">{product.title}</h3>
                    <p className="text-sm font-medium">${product.price.toFixed(2)}</p>
                </div>

                <p className="mt-1 text-xs text-muted-foreground">Category: {product.category}</p>

                <div className="mt-2 flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        disabled={item.quantity <= 1}
                    >
                        <MinusCircle className="h-4 w-4" />
                    </Button>

                    <span className="px-2 min-w-[40px] text-center">{item.quantity}</span>

                    <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                    >
                        <PlusCircle className="h-4 w-4" />
                    </Button>

                    <div className="ml-auto">
                        <Button variant="ghost" size="icon" onClick={removeItem}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                        </Button>
                    </div>
                </div>

                <div className="mt-1 text-sm font-medium">
                    Item total: ${(product.price * item.quantity).toFixed(2)}
                </div>
            </div>
        </div>
    );
}
