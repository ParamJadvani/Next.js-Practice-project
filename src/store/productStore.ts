import { ProductType } from "@/Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as productMethods from "@/_actions/products/clientAction";

interface ProductStore {
    products: Array<ProductType>;
    product: ProductType | null;
    getProducts: () => void;
    getProductById: (id: string) => void;
}

const useProductStore = create<ProductStore>()(
    persist(
        (set) => ({
            products: [],
            product: null,
            getProducts: async () => {
                const response = await productMethods.getProducts();
                set({ products: response });
            },
            getProductById: async (id: string) => {
                const response = await productMethods.getProduct(id);
                if (response) {
                    set({ product: response });
                } else {
                    console.warn(`Product with ID ${id} not found.`);
                    set({ product: null });
                }
            },
        }),
        {
            name: "product-store",
        }
    )
);

export default useProductStore;
