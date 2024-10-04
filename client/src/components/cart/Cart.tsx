import CartItem from "./CartItem";
import {Book} from "../../models/common.models";
import React from "react";

interface CartProps {
    items: { book: Book; quantity: number }[];
    onRemove: (id: number) => void;
    onQuantityChange: (id: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onRemove, onQuantityChange }) => {
    const subtotal = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
    const shipping = 5;
    const tax = subtotal * 0.2; // Assuming 20% tax
    const total = subtotal + shipping + tax;

    return (
        <div className="container mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
                {items.map((item) => (
                    <CartItem
                        key={item.book.id}
                        book={item.book}
                        quantity={item.quantity}
                        onRemove={onRemove}
                        onQuantityChange={onQuantityChange}
                    />
                ))}
                <div className="mt-8 border-t pt-4">
                    <div className="space-y-2">
                        <div className="flex justify-between">
                            <p className="text-gray-500">Subtotal</p>
                            <p className="text-lg font-semibold">${subtotal.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Shipping</p>
                            <p className="text-lg font-semibold">${shipping.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-500">Tax</p>
                            <p className="text-lg font-semibold">jj${tax.toFixed(2)}</p>
                        </div>
                        <div className="flex justify-between font-bold">
                            <p className="text-lg">Order total</p>
                            <p className="text-lg">${total.toFixed(2)}</p>
                        </div>
                    </div>
                    <button className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg text-lg">
                        Continue to Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;