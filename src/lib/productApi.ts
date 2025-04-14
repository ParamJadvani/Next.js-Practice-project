// /lib/api.ts

import axios from "axios";

const productApi = axios.create({
    baseURL: "https://fakestoreapi.com/products",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: false,
});

export default productApi;
