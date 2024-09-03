import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Book} from "../../models/common.models";
import {bookService} from "../../services/bookService";
import {RootState} from "../store";

interface BookState {
    books: Book[];
    totalBooks: number;
    totalPages: number;
    currentPage: number;
    loading: boolean;
    error: string | null;
}

const initialState: BookState = {
    books: [],
    totalBooks: 0,
    totalPages: 1,
    currentPage: 1,
    loading: false,
    error: null,
};

export const fetchBooks = createAsyncThunk<
    { books: Book[]; totalBooks: number; totalPages: number; currentPage: number },
    { page?: number; limit?: number },
    { rejectValue: string }
>(
    'books/fetchBooks',
    async ({ page = 1, limit = 9 }, { rejectWithValue }) => {
        try {
            return await bookService.getBooks(page, limit);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch books');
        }
    }
);

export const createBook = createAsyncThunk<Book, Partial<Book>, { rejectValue: string }>(
    'books/createBook',
    async (book, { rejectWithValue }) => {
        try {
            return await bookService.createBook(book);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create book');
        }
    }
);

export const updateBook = createAsyncThunk<Book, { id: number; book: Partial<Book> }, { rejectValue: string }>(
    'books/updateBook',
    async ({ id, book }, { rejectWithValue }) => {
        try {
            return await bookService.updateBook(id, book);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update book');
        }
    }
);

export const deleteBook = createAsyncThunk<number, number, { rejectValue: string }>(
    'books/deleteBook',
    async (id, { rejectWithValue }) => {
        try {
            await bookService.deleteBook(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete book');
        }
    }
);

const bookSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Books
            .addCase(fetchBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBooks.fulfilled, (state, action: PayloadAction<{ books: Book[]; totalBooks: number; totalPages: number; currentPage: number }>) => {
                state.books = action.payload.books;
                state.totalBooks = action.payload.totalBooks;
                state.totalPages = action.payload.totalPages;
                state.currentPage = action.payload.currentPage;
                state.loading = false;
            })
            .addCase(fetchBooks.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'An error occurred';
                state.loading = false;
            })
            // Create Book
            .addCase(createBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createBook.fulfilled, (state, action: PayloadAction<Book>) => {
                state.books.push(action.payload);
                state.loading = false;
            })
            .addCase(createBook.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'An error occurred';
                state.loading = false;
            })
            // Update Book
            .addCase(updateBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateBook.fulfilled, (state, action: PayloadAction<Book>) => {
                const index = state.books.findIndex((book) => book.id === action.payload.id);
                if (index !== -1) {
                    state.books[index] = action.payload;
                }
                state.loading = false;
            })
            .addCase(updateBook.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'An error occurred';
                state.loading = false;
            })
            // Delete Book
            .addCase(deleteBook.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteBook.fulfilled, (state, action: PayloadAction<number>) => {
                state.books = state.books.filter((book) => book.id !== action.payload);
                state.loading = false;
            })
            .addCase(deleteBook.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'An error occurred';
                state.loading = false;
            });
    },
});

export default bookSlice.reducer;

export const selectBooks = (state: RootState) => state.books;
export const selectBooksLoading = (state: RootState) => state.books.loading;
export const selectBooksError = (state: RootState) => state.books.error;
