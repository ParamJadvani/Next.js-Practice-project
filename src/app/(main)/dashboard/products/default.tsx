"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import useAuthStore from "@/store/authStore";
import useProductStore from "@/store/productStore";
import ProductCard from "@/components/product/Card";
import useCartStore from "@/store/cartStore";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ProductType } from "@/Types";

export default function Products() {
    const { products, getProducts } = useProductStore();
    const { user } = useAuthStore();
    const { addToCart } = useCartStore();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Get search query from URL if it exists
    const initialQuery = searchParams.get("q") || "";
    const [searchQuery, setSearchQuery] = useState(initialQuery);
    const [filteredProducts, setFilteredProducts] = useState<ProductType[]>(products);

    // Use useRef instead of useState for the timeout
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Fetch products on initial load
    useEffect(() => {
        if (user && products.length === 0) {
            getProducts();
        }
    }, [user, products.length, getProducts]);

    // Function to update URL and filter products
    const updateSearch = useCallback(
        (query: string) => {
            // Use pathname and searchParams to update URL in a clean way
            const params = new URLSearchParams(window.location.search);
            if (query.trim() === "") {
                params.delete("q");
            } else {
                params.set("q", query);
            }
            router.replace(`${pathname}?${params.toString()}`);

            // Filter products based on search query
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredProducts(filtered);
        },
        [products, pathname, router]
    );

    // Debounced search function
    useEffect(() => {
        // Clear the previous timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        // Set a new timeout to apply search after 1 second of inactivity
        timeoutRef.current = setTimeout(() => {
            updateSearch(searchQuery);
        }, 1000);

        // Cleanup function
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [searchQuery, updateSearch]);

    // Handle search input change
    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Handle button click search
    const handleSearchButtonClick = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        updateSearch(searchQuery); // Trigger immediate search on button click
    };

    // Add to cart function
    const addToCartFn = (productId: string, quantity: number) => {
        if (user && addToCart(productId, quantity, user.id))
            toast.success("Product added to cart!");
        else toast.error("Failed to add product to cart!");
    };

    // Handle loading state and empty results
    if (products.length === 0) {
        return (
            <div className="text-center text-muted-foreground mt-12">
                <p>No products found.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative flex items-center">
                <Search
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                />
                <Input
                    type="text"
                    placeholder="Search products..."
                    className="pl-10 w-full"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                {/* Search Button */}
                <button
                    onClick={handleSearchButtonClick}
                    className="ml-2 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Search
                </button>
            </div>

            {/* Search Results Message */}
            {searchQuery && (
                <div className="text-sm text-muted-foreground">
                    {filteredProducts.length === 0 ? (
                        <p>No products found matching &ldquo;{searchQuery}&quot;</p>
                    ) : (
                        <p>
                            Found {filteredProducts.length} product(s) matching &ldquo;{searchQuery}
                            &quot;
                        </p>
                    )}
                </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
                <div className="text-center text-muted-foreground mt-12">
                    <p>No matching products found.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} onClick={addToCartFn} />
                    ))}
                </div>
            )}
        </div>
    );
}
