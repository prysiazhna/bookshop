import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import { AppDispatch, RootState } from '../store/store';
import { fetchBooks, selectBooks, selectBooksError, selectBooksLoading } from '../store/slices/bookSlice';
import bookPlaceholder from '../assets/book-placeholder.png';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const BookList: React.FC = () => {
    const {books = [], totalBooks = 0, totalPages = 1, currentPage = 1} = useSelector(selectBooks);
    const loading = useSelector((state: RootState) => selectBooksLoading(state));
    const error = useSelector((state: RootState) => selectBooksError(state));


    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        // autoplay: true,
        autoplaySpeed: 2500,
        cssEase: "linear",
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="booklist-container my-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">New Books</h2>
                <a href="/books" className="text-purple-600 hover:underline">View all</a>
            </div>
            {Array.isArray(books) && books.length > 0 ? (
                <Slider {...settings}>
                    {books.map((book) => (
                        <div key={book.id} className="book-item p-4">
                            <div className="h-full flex flex-col items-center">
                                <img
                                    src={book.img ? `${process.env.REACT_APP_API_BASE_URL}${book.img}` : bookPlaceholder}
                                    alt={book.title}
                                    className="w-full h-auto max-h-60 object-contain shadow-lg"
                                />
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <div>No books available</div>
            )}
        </div>
    );
};

export default BookList;
