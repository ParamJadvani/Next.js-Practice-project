// components/checkout/OrderNavigation.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, ArrowRight, ShoppingCart } from "lucide-react";

interface OrderNavigationProps {
    step: number;
    isSubmitting: boolean;
    canConfirm: boolean;
    onBack: () => void;
    onNext: () => void;
    onConfirm: () => void;
}

export default function OrderNavigation({
    step,
    isSubmitting,
    canConfirm,
    onBack,
    onNext,
    onConfirm,
}: OrderNavigationProps) {
    return (
        <div className="flex justify-between pt-6 border-t w-full">
            <Button
                variant="outline"
                onClick={onBack}
                disabled={step === 1 || isSubmitting}
                className={step === 1 ? "invisible" : ""}
            >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>

         
            {step < 3 ? (
                <Button onClick={onNext} disabled={isSubmitting}>
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            ) : (
                <Button onClick={onConfirm} disabled={isSubmitting || !canConfirm}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Placing Order...
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Confirm Order
                        </>
                    )}
                </Button>
            )}
        </div>
    );
}
