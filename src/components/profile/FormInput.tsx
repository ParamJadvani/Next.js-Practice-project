import { Label } from "@radix-ui/react-label"; 
import React from "react";

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export function FormInput({ id, label, type = "text", value, onChange, error }: FormInputProps) {
    return (
        <div>
            <Label htmlFor={id} className="text-sm text-gray-600">
                {label}
            </Label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                className={`mt-1 w-full p-2 border rounded-md ${
                    error ? "border-red-500" : "border-gray-300"
                }`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
    );
}
