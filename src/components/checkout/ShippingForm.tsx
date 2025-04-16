// app/components/checkout/ShippingForm.tsx
"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ShippingInfo {
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
}

interface ShippingFormProps {
    shippingInfo: ShippingInfo;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ShippingForm({ shippingInfo, onChange }: ShippingFormProps) {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                    id="fullName"
                    name="fullName"
                    value={shippingInfo.fullName}
                    onChange={onChange}
                    placeholder="John Doe"
                    required
                />
            </div>
            <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={onChange}
                    placeholder="+1 234 567 890"
                    required
                />
            </div>
            <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                    id="address"
                    name="address"
                    value={shippingInfo.address}
                    onChange={onChange}
                    placeholder="123 Main St, Apt 4B"
                    rows={3}
                    required
                />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                        id="city"
                        name="city"
                        value={shippingInfo.city}
                        onChange={onChange}
                        placeholder="Anytown"
                        required
                    />
                </div>
                <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input
                        id="state"
                        name="state"
                        value={shippingInfo.state}
                        onChange={onChange}
                        placeholder="CA"
                        required
                    />
                </div>
            </div>
        </div>
    );
}
