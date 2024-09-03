import React, {useState, useCallback, useMemo} from 'react';
import {useSelector} from 'react-redux';
import {
    fetchBooks,
    selectBooks,
    selectBooksLoading,
    selectBooksError,
    updateBook, createBook, deleteBook
} from '../../../store/slices/bookSlice';
import {selectAuthors} from '../../../store/slices/authorSlice';
import {RootState} from '../../../store/store';
import BookFormModal from './BookFormModal';
import {Book} from '../../../models/common.models';
import Table from '../../common/DataTable';
import {selectCategories} from "../../../store/slices/categorySlice";
import {MinusCircleIcon} from '@heroicons/react/24/outline'
import {CheckCircleIcon} from '@heroicons/react/24/outline'
import {useAppDispatch} from "../../../store/hooks";
import Pagination from "../../common/Pagination";
import bookPlaceholder from "../../../assets/book-placeholder.png";
import BookCover from "../../common/BookCover";

const BooksPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const {books = [], totalBooks = 0, totalPages = 1, currentPage = 1} = useSelector(selectBooks);
    const authors = useSelector((state: RootState) => selectAuthors(state));
    const categories = useSelector((state: RootState) => selectCategories(state));
    const loading = useSelector((state: RootState) => selectBooksLoading(state));
    const error = useSelector((state: RootState) => selectBooksError(state));

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);

    const handleAddBook = useCallback(() => {
        setEditingBook(null);
        setIsModalOpen(true);
    }, []);

    const handleEditBook = useCallback((bookId: number) => {
        const bookToEdit = books.find((book: Book) => book.id === bookId);
        if (bookToEdit) {
            setEditingBook(bookToEdit);
            setIsModalOpen(true);
        }
    }, [books]);

    const handleDeleteBook = useCallback((bookId: number) => {
        dispatch(deleteBook(bookId));
    }, [dispatch]);

    const handleModalSubmit = useCallback(
        (book: Partial<Book>) => {
            if (editingBook) {
                dispatch(updateBook({id: editingBook.id!, book}));
            } else {
                dispatch(createBook(book)).then(() => {
                    dispatch(fetchBooks({page: currentPage}));
                });
            }
            setIsModalOpen(false);
        },
        [dispatch, editingBook, currentPage]
    );

    const handlePageChange = useCallback(
        (page: number) => {
            dispatch(fetchBooks({page}));
        },
        [dispatch]
    );


    const bookColumns = useMemo(() => [
        {
            header: 'Image',
            render: (book: Book) => (
                <BookCover
                    img={book?.img}
                    title={book.title}
                    className="w-10 hover:scale-[3.5] transition duration-500"
                    placeholderImg={bookPlaceholder}
                />)
        },
        {header: 'Title', render: (book: Book) => book.title},
        {
            header: 'Author',
            render: (book: Book) => {
                const author = authors.find(author => author.id === book.authorId);
                return author?.name;
            },
        },
        {
            header: 'Categories',
            render: (book: Book) => (
                <div className="flex flex-wrap gap-2">
                    {book.categoryIds?.map(categoryId => {
                        const category = categories.find(category => category.id === categoryId);
                        return (
                            <span key={categoryId} className="px-2 py-1 bg-gray-200 text-black text-xs rounded">
                                {category?.name}
                            </span>
                        );
                    })}
                </div>
            ),
        },
        {header: 'Price', render: (book: Book) => `$${book.price}`},
        {
            header: 'Stock', render: (book: Book) => (
                book.stock ? <CheckCircleIcon className="h-7 w-7 text-teal-700"/> :
                    <MinusCircleIcon className="h-7 w-7 text-red-900"/>
            )
        },
        {header: 'Rating', render: (book: Book) => book.rating},
    ], [authors]);

    const renderTable = useMemo(() => (
        <Table
            data={books}
            columns={bookColumns}
            actions={(book: Book) => (
                <div className="flex flex-row justify-center items-center  flex-nowrap">
                    <button
                        className="w-16 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 mr-2"
                        onClick={() => handleEditBook(book.id)}>
                        Edit
                    </button>
                    <button
                        className="w-16 py-1 bg-gray-200 text-black text-xs rounded hover:bg-gray-300"
                        onClick={() => handleDeleteBook(book.id)}>
                        Delete
                    </button>
                </div>
            )}
        />
    ), [books, bookColumns, handleEditBook, handleDeleteBook]);

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Books</h2>
                <button
                    className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    onClick={handleAddBook}>
                    Add Book
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && renderTable}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
            <BookFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingBook || undefined}/>
        </div>
    );
};

export default BooksPage;
