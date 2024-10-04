import React from 'react';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import { RootState } from '../store/store';
import { selectBooks, selectBooksError, selectBooksLoading } from '../store/slices/bookSlice';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BookItem from "./common/BookItem";
import {SliderSettings} from "../configs/common";

interface BookListProps {
    title: string;
}

const BookList: React.FC<BookListProps> = ({ title }) => {
    const { books = [] } = useSelector(selectBooks);
    const loading = useSelector((state: RootState) => selectBooksLoading(state));
    const error = useSelector((state: RootState) => selectBooksError(state));


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="booklist-container py-12">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <a href="/books" className="text-purple-600 hover:underline">View all</a>
            </div>
            {Array.isArray(books) && books.length > 0 ? (
                <Slider key={title} {...SliderSettings}>
                    {books.map((book, index) => (
                        <BookItem key={index} book={book}/>
                    ))}
                </Slider>
            ) : (
                <div>No books available</div>
            )}
        </div>
    );
};

export default BookList;
