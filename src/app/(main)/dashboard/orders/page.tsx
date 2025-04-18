"use client";

import React, { useMemo } from "react";
import useAuthStore from "@/store/authStore";
import useOrderStore from "@/store/orderStore";
import OrderList from "../../../../components/orders/OrderList";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";

export default function MyOrdersPage() {
    const userId = useAuthStore((state) => state.user?.id);
    const AllOrders = useOrderStore((state) => state.orders);

    const userOrders = useMemo(() => {
        if (!userId) return [];
        const orders = AllOrders.filter((order) => order.userId === userId);
        return [...orders].sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }, [userId, AllOrders]);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Orders</CardTitle>
                    <CardDescription>View and manage your order history</CardDescription>
                </CardHeader>
                {userOrders.length === 0 ? (
                    <Alert className="m-4">
                        <Info className="h-4 w-4" />
                        <AlertTitle>No Orders Found</AlertTitle>
                        <AlertDescription>You haven&apos;t placed any orders yet.</AlertDescription>
                    </Alert>
                ) : (
                    <OrderList orders={userOrders} />
                )}
            </Card>
        </div>
    );
}
