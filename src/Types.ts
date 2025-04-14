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
}

export interface EnrichedCartItemType extends CartItemType {
    product?: ProductType;
}
