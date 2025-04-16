// app/components/checkout/PaymentForm.tsx
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentInfo {
    cardNumber: string;
    expiry: string;
    cvv: string;
}

interface PaymentFormProps {
    paymentInfo: PaymentInfo;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PaymentForm({ paymentInfo, onChange }: PaymentFormProps) {
    const [cardNumber, setCardNumber] = useState(paymentInfo.cardNumber);
    const [expiry, setExpiry] = useState(paymentInfo.expiry);
    const [cvv, setCvv] = useState(paymentInfo.cvv);

    const formatCardNumber = (value: string) => {
        const trimmedValue = value.replace(/\s+/g, "");
        let formattedValue = "";
        for (let i = 0; i < trimmedValue.length; i++) {
            if (i > 15) break;
            if (i > 0 && i % 4 === 0) {
                formattedValue += " ";
            }
            formattedValue += trimmedValue[i];
        }
        return formattedValue;
    };

    const formatExpiryDate = (value: string) => {
        let formattedValue = value.replace(/[^0-9]/g, "");
        if (formattedValue.length > 4) {
            formattedValue = formattedValue.slice(0, 4);
        }
        if (formattedValue.length >= 2) {
            const month = parseInt(formattedValue.slice(0, 2));
            if (month > 12) {
                formattedValue = "12" + formattedValue.slice(2);
            }
        }
        if (formattedValue.length > 2) {
            formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
        }
        return formattedValue;
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9]/g, "");
        if (value.length > 3) {
            value = value.slice(0, 3);
        }
        setCvv(value);
        onChange({
            ...e,
            target: { ...e.target, value, id: "cvv" },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = formatCardNumber(e.target.value);
        setCardNumber(value);
        onChange({
            ...e,
            target: { ...e.target, value, id: "cardNumber" },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = formatExpiryDate(e.target.value);
        setExpiry(value);
        onChange({
            ...e,
            target: { ...e.target, value, id: "expiry" },
        } as React.ChangeEvent<HTMLInputElement>);
    };

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                    id="cardNumber"
                    type="tel"
                    placeholder="**** **** **** ****"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="expiry">Expiry Date (MM/YY)</Label>
                    <Input
                        id="expiry"
                        type="tel"
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={handleExpiryChange}
                        maxLength={5}
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                        id="cvv"
                        type="tel"
                        placeholder="CVV"
                        value={cvv}
                        onChange={handleCvvChange}
                        maxLength={4}
                        required
                    />
                </div>
            </div>
        </div>
    );
}
