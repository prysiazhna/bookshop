import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import cartService from '../../services/cartService';
import {Book} from '../../models/common.models';
import {RootState} from '../store';

interface CartItem {
    book: Book;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    cartId: number | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    cartId: null,
    isLoading: false,
    error: null,
};

export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, {rejectWithValue}) => {
        try {
            return await cartService.getCart();
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch cart');
        }
    }
);

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async ({bookId, quantity}: { bookId: number; quantity: number }, {rejectWithValue}) => {
        try {
            const data = await cartService.addToCart(bookId, quantity);
            return {bookId, quantity, book: data};
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to add item to cart');
        }
    }
);

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (bookId: number, {rejectWithValue}) => {
        try {
            const data = await cartService.removeFromCart(bookId);
            return {bookId, data};
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to remove item from cart');
        }
    }
);

export const updateCartItemQuantity = createAsyncThunk(
    'cart/updateCartItemQuantity',
    async ({bookId, quantity}: { bookId: number; quantity: number }, {rejectWithValue}) => {
        try {
            const data = await cartService.updateCartItemQuantity(bookId, quantity);
            return {bookId, quantity, data};
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to update item quantity');
        }
    }
);

export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (cartId: number, { rejectWithValue }) => {
        try {
            return await cartService.clearCart(cartId);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to clear cart');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.items = action.payload.cartItems || [];
                state.cartId = action.payload.id || null;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(addItemToCart.fulfilled, (state, action) => {
                const existingItem = state.items.find(item => item.book.id === action.payload.bookId);
                if (existingItem) {
                    existingItem.quantity += action.payload.quantity;
                } else {
                    state.items.push({book: action.payload.book, quantity: action.payload.quantity});
                }
            })
            .addCase(removeItemFromCart.fulfilled, (state, action) => {
                state.items = state.items.filter(item => item.book.id !== action.payload.bookId);
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                const existingItem = state.items.find(item => item.book.id === action.payload.bookId);
                if (existingItem) {
                    existingItem.quantity = action.payload.quantity;
                }
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.items = [];
            });
    },
});

export default cartSlice.reducer;

// Selectors
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartId = (state: RootState) => state.cart.cartId;

export const selectCartTotal = (state: RootState) =>
    state.cart.items.reduce((total, item) => total + item.book.price * item.quantity, 0);
export const selectCartCount = (state: RootState) =>
    state.cart.items?.reduce((count, item) => count + item.quantity, 0) ?? 0;

export const selectCartLoading = (state: RootState) => state.cart.isLoading;
export const selectCartError = (state: RootState) => state.cart.error;
