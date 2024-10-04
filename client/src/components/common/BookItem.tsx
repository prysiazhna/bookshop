import React from 'react';
import { useAppDispatch } from '../../store/hooks';
import { addItemToCart } from '../../store/slices/cartSlice';
import bookPlaceholder from '../../assets/book-placeholder.png';
import { Book } from '../../models/common.models';
import BookCover from "./BookCover";

interface BookItemProps {
    book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addItemToCart({ bookId: book.id, quantity: 1 }));
    };

    return (
        <div className="book-item p-4 h-full flex flex-col">
            <BookCover
                img={book.img}
                title={book.title}
                className="w-full object-contain"
                placeholderImg={bookPlaceholder}
            />
            <div className="grow mt-4 text-center flex flex-col justify-between">
                <div>
                    <p className="text-lg font-semibold">${book.price}</p>
                    <p className="text-sm text-gray-500 h-10">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author?.name}</p>
                </div>
                <button
                    onClick={handleAddToCart}
                    className="mt-2 px-4 py-2 border border-black text-black hover:border-purple-700 hover:text-white hover:bg-purple-500"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default BookItem;
