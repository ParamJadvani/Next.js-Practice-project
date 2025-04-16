import { OrderType } from "@/Types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrderState {
    orders: OrderType[];
    getOrderById: (orderId: string) => OrderType | undefined;
    updateOrder: (orderId: string, updates: Partial<OrderType>) => void;
    cancelOrder: (orderId: string) => void;
}

const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [],
            getOrderById: (orderId) => get().orders.find((order) => order.id === orderId),
            updateOrder: (orderId, updates) =>
                set((state) => ({
                    orders: state.orders.map((order) =>
                        order.id === orderId
                            ? { ...order, ...updates, updatedAt: new Date() }
                            : order
                    ),
                })),
            cancelOrder: (orderId) =>
                set((state) => ({
                    orders: state.orders.filter((order) => order.id !== orderId),
                })),
        }),
        { name: "order-store" }
    )
);

export default useOrderStore;
