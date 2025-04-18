// /components/cart/CartEmpty.tsx

import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

/**
 * Component displayed when the user is logged in but their cart is empty.
 */
export default function CartEmpty() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6 bg-background rounded-lg shadow-sm">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-6" />
            <h2 className="text-2xl font-semibold mb-2 text-foreground">Your Cart is Empty</h2>
            <p className="text-muted-foreground mb-8 max-w-sm">
                Looks like you haven&apos;t added anything yet. Explore our products and find something
                you love!
            </p>
            <Button asChild size="lg">
                <Link href="/dashboard/products">Start Shopping</Link>
            </Button>
        </div>
    );
}
