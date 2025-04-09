import { ProductType } from "@/Types";
import { create } from "zustand";
import * as productMethods from "@/_actions/products/clientAction";

interface ProductStore {
    products: Array<ProductType>;
    product: ProductType | null;
    getProducts: () => void;
    getProduct: (id: string) => void;
}

const useProductStore = create<ProductStore>((set) => ({
    products: [],
    product: null,
    getProducts: async () => {
        const response = await productMethods.getProducts();
        set({ products: response });
    },
    getProduct: async (id: string) => {
        const response = await productMethods.getProduct(id);
        set({ product: response[0] });
    },
}));

export default useProductStore;
