import {Book} from "../../models/common.models";
import React from "react";
import BookCover from "../common/BookCover";

interface CartItemProps {
    book: Book;
    quantity: number;
    onRemove: (id: number) => void;
    onQuantityChange: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ book, quantity, onRemove, onQuantityChange }) => {
    return (
        <div className="flex items-center justify-between py-4 border-b">
            <div className="flex items-center space-x-4">
                <BookCover
                    img={book.img}
                    title={book.title}
                    className="w-20 rounded-md"
                />
                <div>
                    <h3 className="text-lg font-semibold">{book.title}</h3>
                    <p className="text-sm text-gray-500"> {book.author?.name}</p>
                    <button
                        className="text-sm text-purple-600 hover:underline mt-2"
                        onClick={() => onRemove(book.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <select
                    value={quantity}
                    onChange={(e) => onQuantityChange(book.id, parseInt(e.target.value))}
                    className="border rounded-md px-2 py-1"
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
                <p className="text-lg font-semibold">${book.price.toFixed(2)}</p>
            </div>
        </div>
    );
};
export default CartItem;