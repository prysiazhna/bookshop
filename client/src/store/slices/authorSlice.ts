import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Author, Category} from "../../models/common.models";
import {authorService} from "../../services/authorService";
import {RootState} from "../store";
import {categoryService} from "../../services/categoryService";
import {createCategory, deleteCategory, updateCategory} from "./categorySlice";

interface AuthorState {
    authors: Author[];
    loading: boolean;
    error: string | null;
}

const initialState: AuthorState = {
    authors: [],
    loading: false,
    error: null,
};

export const fetchAuthors = createAsyncThunk<Author[], void, { rejectValue: string }>(
    'authors/fetchAuthors',
    async (_, { rejectWithValue }) => {
        try {
            return await authorService.getAuthors();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch authors');
        }
    }
);

export const createAuthor = createAsyncThunk<Author, Partial<Author>, { rejectValue: string }>(
    'authors/createAuthor',
    async (author, { rejectWithValue }) => {
        try {
            return await authorService.createAuthor(author);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create author');
        }
    }
);


export const updateAuthor = createAsyncThunk<Author, { id: number, author: Partial<Author> }, { rejectValue: string }>(
    'authors/updateAuthor',
    async ({ id, author }, { rejectWithValue }) => {
        try {
            return await authorService.updateAuthor(id, author);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update category');
        }
    }
);

export const deleteAuthor = createAsyncThunk<number, number, { rejectValue: string }>(
    'authors/deleteAuthor',
    async (id, { rejectWithValue }) => {
        try {
            await authorService.deleteAuthor(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
        }
    }
);

const authorSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAuthors.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAuthors.fulfilled, (state, action: PayloadAction<Author[]>) => {
                state.authors = action.payload;
                state.loading = false;
            })
            .addCase(fetchAuthors.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'An error occurred';
                state.loading = false;
            })
            .addCase(createAuthor.fulfilled, (state, action: PayloadAction<Author>) => {
                state.authors.push(action.payload);
            })
            .addCase(updateAuthor.fulfilled, (state, action: PayloadAction<Author>) => {
                const index = state.authors.findIndex(author => author.id === action.payload.id);
                if (index !== -1) {
                    state.authors[index] = action.payload;
                }
            })
            .addCase(deleteAuthor.fulfilled, (state, action: PayloadAction<number>) => {
                state.authors = state.authors.filter(author => author.id !== action.payload);
            });
    },
});

export default authorSlice.reducer;

export const selectAuthors = (state: RootState) => state.authors.authors;
export const selectAuthorsLoading = (state: RootState) => state.authors.loading;
export const selectAuthorsError = (state: RootState) => state.authors.error;
