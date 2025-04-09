import productApi from "@/lib/productApi";

export async function getProducts() {
    const response = await productApi.get("/");
    return response.data;
}

export async function getProduct(id: string) {
    const response = await productApi.get(`/${id}`);
    return response.data;
}
