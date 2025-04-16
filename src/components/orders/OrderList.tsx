import React from "react";
import { Card } from "@/components/ui/card";
import OrderItem from "./OrderItem";
import { OrderType } from "@/Types";

interface OrderListProps {
    orders: OrderType[];
}

export default function OrderList({ orders }: OrderListProps) {
    return (
        <div className="space-y-6">
            {orders.map((order) => (
                <Card key={order.id} className="overflow-hidden">
                    <OrderItem order={order} />
                </Card>
            ))}
        </div>
    );
}
