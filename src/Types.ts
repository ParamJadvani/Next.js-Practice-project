// /types/index.ts

export interface UserType {
    id: string;
    username: string;
    email: string;
}

export interface ProductType {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

export interface CartItemType {
    id: string;
    productId: string;
    userId: string;
    quantity: number;
    totalPrice: number;
}

export interface EnrichedCartItemType extends CartItemType {
    product?: ProductType;
}

export interface OrderType {
    id: string;
    userId: string;
    cartItems: CartItemType[];
    address: string;
    totalPrice: number;
    status: "pending" | "processing" | "completed" | "cancelled";
    createdAt: Date;
    updatedAt?: Date; // Add updatedAt field
    state: string;
    city: string;
    phoneNumber: string;
    paymentStatus: "paid" | "unpaid";
}
