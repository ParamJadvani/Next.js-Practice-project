import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import EditOrderDialog from "./EditOrderDialog";
import CancelOrderDialog from "./CancelOrderDialog";
import { OrderType, CartItemType, ProductType } from "@/Types";
import useProductStore from "@/store/productStore";

function formatDateTime(date: Date | string | undefined) {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function formatCurrency(amount: number | undefined) {
    if (amount === undefined) return "N/A";
    return `₹${amount.toFixed(2)}`;
}

interface OrderDisplayItem extends CartItemType {
    productData?: ProductType;
}

export default function OrderItem({ order }: { order: OrderType }) {
    const products = useProductStore((state) => state.products);

    const getProductDetails = (item: CartItemType): OrderDisplayItem => {
        const productData = products.find((p) => p.id.toString() === item.productId);
        return {
            ...item,
            totalPrice:
                productData?.price != undefined
                    ? productData.price * item.quantity
                    : item.totalPrice,
            productData,
        };
    };

    const statusClass =
        order.status === "pending"
            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
            : order.status === "processing"
            ? "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100"
            : order.status === "completed"
            ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
            : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";

    return (
        <>
            <div className="bg-muted/50 p-4 border-b">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
                    <div>
                        <div className="font-semibold text-primary">Order ID: {order.id}</div>
                        <div className="text-muted-foreground">
                            Placed on: {formatDateTime(order.createdAt)}
                        </div>
                        <div className="text-muted-foreground">
                            Shipping to: {order.address}, {order.city}, {order.state}
                        </div>
                        <div className="text-muted-foreground">
                            Phone Number: {order.phoneNumber}
                        </div>
                    </div>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                        <Badge className={statusClass}>Status: {order.status}</Badge>
                        <EditOrderDialog order={order} />
                        <CancelOrderDialog orderId={order.id} />
                    </div>
                </div>
            </div>
            <div className="p-4 space-y-4">
                <div className="space-y-3">
                    {order.cartItems?.map(getProductDetails).map((item) => (
                        <div
                            key={item.productId}
                            className="flex items-center justify-between space-x-3"
                        >
                            <div className="flex items-center space-x-3 min-w-0">
                                {item.productData?.image ? (
                                    <Image
                                        src={item.productData.image}
                                        alt={item.productData.title || "Product Image"}
                                        width={48}
                                        height={48}
                                        className="w-12 h-12 object-contain rounded border flex-shrink-0 bg-white"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="w-12 h-12 flex items-center justify-center bg-muted rounded border flex-shrink-0">
                                        <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                                    </div>
                                )}
                                <div className="min-w-0">
                                    <p className="text-sm font-medium truncate">
                                        {item.productData?.title || `Product ID: ${item.productId}`}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Qty: {item.quantity} | Price:{" "}
                                        {formatCurrency(item.productData?.price)}
                                    </p>
                                </div>
                            </div>
                            <p className="text-sm font-semibold flex-shrink-0">
                                {formatCurrency(item.totalPrice)}
                            </p>
                        </div>
                    ))}
                </div>
                <Separator />
                <div className="flex justify-end items-center font-semibold">
                    <span>Total Paid: &nbsp;</span>
                    <span className="text-lg">{formatCurrency(order.totalPrice)}</span>
                </div>
            </div>
        </>
    );
}
