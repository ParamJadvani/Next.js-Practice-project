// app/components/checkout/ReviewDetails.tsx
import React from "react";

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
}

interface ReviewDetailsProps {
    shippingInfo: ShippingInfo;
    paymentInfo: PaymentInfo;
}

export default function ReviewDetails({ shippingInfo, paymentInfo }: ReviewDetailsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
                <h4 className="font-semibold mb-2 text-base">Shipping To:</h4>
                <p>{shippingInfo.fullName}</p>
                <p>{shippingInfo.address}</p>
                <p>
                    {shippingInfo.city}, {shippingInfo.state}
                </p>
                <p>Phone: {shippingInfo.phone}</p>
            </div>
            <div>
                <h4 className="font-semibold mb-2 text-base">Payment Method:</h4>
                <p>Card ending in **** {paymentInfo.cardNumber.slice(-4)}</p>
                <p>Expiry: {paymentInfo.expiry}</p>
            </div>
        </div>
    );
}
