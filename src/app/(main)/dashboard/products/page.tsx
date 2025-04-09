// /app/(main)/dashboard/products/page.tsx

// Correct the import path if you renamed the file
import Products from "@/app/(main)/dashboard/products/default"; // Corrected path

export default function ProductsPage() {
    return (
        <div>
            {" "}
            {/* Changed main to div as layout provides main */}
            <h1 className="text-2xl font-bold mb-4">Products</h1> {/* Add a title */}
            <Products />
        </div>
    );
}
