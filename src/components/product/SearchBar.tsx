// SearchBar.tsx

"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { debounce } from "@/lib/utils";

export default function SearchBar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize input state with the current "search" query parameter
    const [input, setInput] = useState(searchParams.get("search") || "");

    // Function to update query params with the current input value
    const updateQueryParams = useCallback(() => {
        const params = new URLSearchParams(searchParams.toString());
        if (input.trim()) {
            params.set("search", input.trim());
        } else {
            params.delete("search");
        }
        router.replace(`?${params.toString()}`, { scroll: false });
    }, [input, searchParams, router]);

    // Create a debounced version of our update function to limit frequency
    const debouncedUpdateQuery = useCallback(debounce(updateQueryParams, 1000), [
        updateQueryParams,
    ]);

    // Effect to update query params when input changes
    useEffect(() => {
        debouncedUpdateQuery();
        return () => {
            debouncedUpdateQuery.cancel();
        };
    }, [input, debouncedUpdateQuery]);

    // Update state when user types
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    // Instant update when Enter key is pressed
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            debouncedUpdateQuery.cancel();
            updateQueryParams();
        }
    };

    // Instant update when Search button is clicked
    const handleSearchClick = () => {
        debouncedUpdateQuery.cancel();
        updateQueryParams();
    };

    return (
        <div className="flex items-center space-x-4 my-6 p-5 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow">
            <Input
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="Search movies..."
                className="bg-gray-100 border border-gray-300 p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 transition-colors"
            />
            <Button
                onClick={handleSearchClick}
                variant="default"
                className="cursor-pointer bg-blue-600 text-white hover:bg-blue-700 transition-all rounded-md p-3"
            >
                Search
            </Button>
        </div>
    );
}
