export interface User {
    id: number;
    email: string;
    username?: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    error: string | null;
    loading: boolean;
}

export interface SignUpData {
    email: string;
    password: string;
    username: string;
}

export interface SignInData {
    email: string;
    password: string;
}

export interface AuthError {
    message: string;
}