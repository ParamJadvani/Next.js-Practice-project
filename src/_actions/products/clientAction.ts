// /lib/actions/productActions.ts

import productApi from "@/lib/productApi";
import { ProductType } from "@/Types";

export async function getProducts(): Promise<ProductType[]> {
    try {
        const response = await productApi.get<ProductType[]>("/");
        return response.data;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        return [];
    }
}

export async function getProduct(id: string | number): Promise<ProductType> {
    const productId = typeof id === "string" ? parseInt(id, 10) : id;
    if (isNaN(productId)) {
        throw new Error(`Invalid product ID: ${id}`);
    }
    try {
        const response = await productApi.get<ProductType>(`/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch product with ID ${id}:`, error);
        throw new Error(`Could not fetch product ${id}`);
    }
}
