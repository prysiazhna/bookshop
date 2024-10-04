import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import bookReducer from './slices/bookSlice';
import authorReducer from './slices/authorSlice';
import categoryReducer from './slices/categorySlice';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookReducer,
        authors: authorReducer,
        categories: categoryReducer,
        users: userReducer,
        cart: cartReducer
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;