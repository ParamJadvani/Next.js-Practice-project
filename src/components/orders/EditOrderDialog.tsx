import React, { useState } from "react";
import { OrderType } from "@/Types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useOrderStore from "@/store/orderStore";

export default function EditOrderDialog({ order }: { order: OrderType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [editedOrder, setEditedOrder] = useState(order);
    const updateOrderForUser = useOrderStore((state) => state.updateOrder);

    const handleSave = () => {
        updateOrderForUser(order.id, {
            ...editedOrder,
        });
        setIsOpen(false);
    };

    return (
        <>
            <Button variant="outline" size="sm" onClick={() => setIsOpen(true)}>
                Edit
            </Button>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Order Details</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <Textarea
                            aria-label="Address"
                            value={editedOrder.address}
                            onChange={(e) =>
                                setEditedOrder({ ...editedOrder, address: e.target.value })
                            }
                        />
                        <div className="grid grid-cols-3 gap-4">
                            <Input
                                aria-label="City"
                                value={editedOrder.city}
                                onChange={(e) =>
                                    setEditedOrder({ ...editedOrder, city: e.target.value })
                                }
                            />
                            <Input
                                aria-label="State"
                                value={editedOrder.state}
                                onChange={(e) =>
                                    setEditedOrder({ ...editedOrder, state: e.target.value })
                                }
                            />
                            <Input
                                aria-label="Phone"
                                value={editedOrder.phoneNumber}
                                onChange={(e) =>
                                    setEditedOrder({ ...editedOrder, phoneNumber: e.target.value })
                                }
                            />
                        </div>
                        <div className="flex justify-end gap-2">
                            <Button variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleSave}>Save Changes</Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
