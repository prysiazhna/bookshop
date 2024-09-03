import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, SignInData, SignUpData, User } from "../../models/auth.models";
import { parseError } from "../../utils/parseError";
import {localStorageService} from "../../services/localStorageService";
import authService from "../../services/authService";

const USER_KEY = 'user';

const savedUser = localStorageService.getItem<User>(USER_KEY);

const initialState: AuthState = {
    isAuthenticated: !!savedUser,
    user: savedUser,
    error: null,
    loading: false,
};

export const signUpUser = createAsyncThunk<User, SignUpData, { rejectValue: string }>(
    'auth/signUpUser',
    async (userData, { rejectWithValue }): Promise<any> => {
        try {
            const user = await authService.signup(userData);
            localStorageService.setItem(USER_KEY, user);
            return user;
        } catch (error: any) {
            return rejectWithValue(parseError(error));
        }
    }
);

export const signInUser = createAsyncThunk<User, SignInData, { rejectValue: string }>(
    'auth/signInUser',
    async (credentials, { rejectWithValue }): Promise<any> => {
        try {
            const user = await authService.signin(credentials);
            localStorageService.setItem(USER_KEY, user);
            return user;
        } catch (error: any) {
            return rejectWithValue(parseError(error));
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signOut(state) {
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            localStorageService.removeItem(USER_KEY);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signUpUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(signUpUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || null;
                state.loading = false;
            })
            .addCase(signInUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signInUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(signInUser.rejected, (state, action: PayloadAction<string | undefined>) => {
                state.error = action.payload || null;
                state.loading = false;
            });
    },
});

export const { signOut } = authSlice.actions;
export default authSlice.reducer;
