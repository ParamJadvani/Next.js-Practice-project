// app/components/checkout/OrderForm.tsx
"use client";

import React, { useMemo, useState } from "react";
import { OrderType, CartItemType, ProductType } from "@/Types";
import useOrderStore from "@/store/orderStore";
import useProductStore from "@/store/productStore";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import ShippingForm from "@/components/checkout/ShippingForm";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderSummary from "@/components/checkout/CheckoutOrderSummary";
import OrderNavigation from "@/components/checkout/OrderNavigation";
import ReviewDetails from "@/components/checkout/ReviewDetail";

interface OrderFormProps {
    userId: string;
    cartItems: CartItemType[];
    onOrderConfirmed: () => void;
}

interface ShippingInfo {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
}

interface PaymentInfo {
    cardNumber: string;
    expiry: string;
    cvv: string;
}

const initialShippingInfo: ShippingInfo = {
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
};

interface CartProductItem {
    cartId: string;
    quantity: number;
    totalPrice: number;
    productData: ProductType;
}

const initialPaymentInfo: PaymentInfo = { cardNumber: "", expiry: "", cvv: "" };

export default function OrderForm({ userId, cartItems, onOrderConfirmed }: OrderFormProps) {
    const addOrder = useOrderStore((state) => state.addOrder);
    const products = useProductStore((state) => state.products);

    const [step, setStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState<ShippingInfo>(initialShippingInfo);
    const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>(initialPaymentInfo);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const cartProducts = useMemo(() => {
        return cartItems
            .map((cartItem) => {
                const productData = products.find((p) => p.id.toString() === cartItem.productId);

                if (!productData) {
                    console.warn(`Product data not found for productId: ${cartItem.productId}`);
                    return null;
                }

                const calculatedPrice =
                    cartItem.totalPrice && cartItem.totalPrice > 0
                        ? cartItem.totalPrice
                        : cartItem.quantity * productData.price;

                return {
                    cartId: cartItem.id,
                    quantity: cartItem.quantity,
                    totalPrice: calculatedPrice,
                    productData,
                };
            })
            .filter((item): item is CartProductItem => item !== null);
    }, [cartItems, products]);

    const totalPrice = useMemo(() => {
        return cartProducts.reduce((sum, item) => sum + item.totalPrice, 0);
    }, [cartProducts]);

    const validateShippingInfo = (): string | null => {
        const { fullName, phone, address, city, state } = shippingInfo;
        if (!fullName.trim()) return "Full name is required";
        if (!phone.trim()) return "Phone number is required";
        if (!address.trim()) return "Address is required";
        if (!city.trim()) return "City is required";
        if (!state.trim()) return "State is required";
        return null;
    };

    const validatePaymentInfo = (): string | null => {
        const { cardNumber, expiry, cvv } = paymentInfo;
        if (!cardNumber.trim()) return "Card number is required";
        if (!expiry.trim()) return "Expiry date is required";
        if (!cvv.trim()) return "CVV is required";
        return null;
    };

    const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id } = e.target;
        setShippingInfo((prev) => ({ ...prev, [id]: e.target.value }));
    };

    const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id } = e.target;
        setPaymentInfo((prev) => ({ ...prev, [id]: e.target.value }));
    };

    const handleNext = () => {
        setError(null);
        let validationError: string | null = null;

        if (step === 1) {
            validationError = validateShippingInfo();
            if (!validationError) setStep(2);
        } else if (step === 2) {
            validationError = validatePaymentInfo();
            if (!validationError) setStep(3);
        }

        if (validationError) {
            setError(validationError);
            toast.error(validationError);
        }
    };

    const handleBack = () => {
        setError(null);
        if (step > 1) setStep(step - 1);
    };

    const handleConfirm = () => {
        const shippingError = validateShippingInfo();
        const paymentError = validatePaymentInfo();
        if (shippingError || paymentError) {
            const msg = shippingError || paymentError || "Please review your information.";
            setError(msg);
            toast.error(msg);
            if (shippingError) setStep(1);
            else if (paymentError) setStep(2);
            return;
        }

        setIsSubmitting(true);
        setError(null);
        try {
            const newOrder: OrderType = {
                id: crypto.randomUUID(),
                userId,
                cartItems,
                address: `${shippingInfo.address}`,
                totalPrice,
                status: "pending",
                createdAt: new Date(),
                city: shippingInfo.city,
                phoneNumber: shippingInfo.phone,
                state: shippingInfo.state,
                paymentStatus: "paid",
            };
            addOrder(newOrder);
            toast.success("Order placed successfully!");
            onOrderConfirmed();
        } catch (err) {
            console.error("Order submission failed:", err);
            const errorMsg = "Failed to place order. Please try again.";
            setError(errorMsg);
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return <ShippingForm shippingInfo={shippingInfo} onChange={handleShippingChange} />;
            case 2:
                return <PaymentForm paymentInfo={paymentInfo} onChange={handlePaymentChange} />;
            case 3:
                return (
                    <div className="space-y-6">
                        <OrderSummary cartProducts={cartProducts} totalPrice={totalPrice} />
                        <Separator />
                        <ReviewDetails shippingInfo={shippingInfo} paymentInfo={paymentInfo} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <Card className="w-full shadow-none border-none">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">
                    {step === 1 && "1. Shipping Details"}
                    {step === 2 && "2. Payment Details"}
                    {step === 3 && "3. Review & Confirm Order"}
                </CardTitle>
                <CardDescription>
                    Step {step} of 3. Please fill out the details below.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
                {error && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {renderStepContent()}
            </CardContent>

            <CardFooter>
                <OrderNavigation
                    step={step}
                    isSubmitting={isSubmitting}
                    canConfirm={cartItems.length > 0}
                    onBack={handleBack}
                    onNext={handleNext}
                    onConfirm={handleConfirm}
                />
            </CardFooter>
        </Card>
    );
}
