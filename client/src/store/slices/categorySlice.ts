import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Category } from "../../models/common.models";
import { categoryService } from "../../services/categoryService";
import { RootState } from "../store";

interface CategoryState {
    categories: Category[];
    loading: boolean;
    error: string | null;
}

const initialState: CategoryState = {
    categories: [],
    loading: false,
    error: null,
};

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            return await categoryService.getCategories();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch categories');
        }
    }
);

export const createCategory = createAsyncThunk<Category, Partial<Category>, { rejectValue: string }>(
    'categories/createCategory',
    async (category, { rejectWithValue }) => {
        console.log(category)
        try {
            return await categoryService.createCategory(category);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to create category');
        }
    }
);

export const updateCategory = createAsyncThunk<Category, { id: number, category: Partial<Category> }, { rejectValue: string }>(
    'categories/updateCategory',
    async ({ id, category }, { rejectWithValue }) => {
        try {
            return await categoryService.updateCategory(id, category);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update category');
        }
    }
);

export const deleteCategory = createAsyncThunk<number, number, { rejectValue: string }>(
    'categories/deleteCategory',
    async (id, { rejectWithValue }) => {
        try {
            await categoryService.deleteCategory(id);
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to delete category');
        }
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || 'An error occurred';
                state.loading = false;
            })
            .addCase(createCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                state.categories.push(action.payload);
            })
            .addCase(updateCategory.fulfilled, (state, action: PayloadAction<Category>) => {
                const index = state.categories.findIndex(category => category.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
            })
            .addCase(deleteCategory.fulfilled, (state, action: PayloadAction<number>) => {
                state.categories = state.categories.filter(category => category.id !== action.payload);
            });
    },
});

export default categorySlice.reducer;

export const selectCategories = (state: RootState) => state.categories.categories;
export const selectCategoriesLoading = (state: RootState) => state.categories.loading;
export const selectCategoriesError = (state: RootState) => state.categories.error;
