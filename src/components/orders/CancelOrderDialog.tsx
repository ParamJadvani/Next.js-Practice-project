import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useOrderStore from "@/store/orderStore";

export default function CancelOrderDialog({ orderId }: { orderId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const removeOrder = useOrderStore((state) => state.cancelOrder);

    const handleConfirm = () => {
        removeOrder(orderId);
        setIsOpen(false);
    };

    return (
        <>
            <Button variant="destructive" size="sm" onClick={() => setIsOpen(true)}>
                Cancel Order
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Order Cancellation</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to cancel this order?</p>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="outline" onClick={() => setIsOpen(false)}>
                            No, Keep Order
                        </Button>
                        <Button variant="destructive" onClick={handleConfirm}>
                            Yes, Cancel Order
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
