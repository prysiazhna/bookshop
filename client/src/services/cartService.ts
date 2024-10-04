import axios from 'axios';
import {localStorageService} from './localStorageService';

const API_URL = 'http://localhost:4000/api/cart';
const USER_KEY = 'user';

const getToken = (): string | undefined => {
    const user = localStorageService.getItem<{ token: string }>(USER_KEY);
    return user ? user.token : undefined;
};

const getCart = async () => {
    const token = getToken();
    if (!token) throw new Error('User not authenticated');

    const response = await axios.get(API_URL, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
};

const addToCart = async (bookId: number, quantity: number) => {
    const token = getToken();
    if (!token) throw new Error('User not authenticated');

    const response = await axios.post(
        `${API_URL}/add`,
        {bookId, quantity},
        {
            headers: {Authorization: `Bearer ${token}`},
        }
    );
    return response.data;
};

const removeFromCart = async (bookId: number) => {
    const token = getToken();
    if (!token) throw new Error('User not authenticated');

    const response = await axios.delete(`${API_URL}/remove/${bookId}`, {
        headers: {Authorization: `Bearer ${token}`},
    });
    return response.data;
};

const updateCartItemQuantity = async (bookId: number, quantity: number) => {
    const token = getToken();
    if (!token) throw new Error('User not authenticated');

    const response = await axios.put(
        `${API_URL}/update`,
        {bookId, quantity},
        {
            headers: {Authorization: `Bearer ${token}`},
        }
    );
    return response.data;
};

const clearCart = async (cartId: number) => {
    const token = getToken();
    if (!token) throw new Error('User not authenticated');

    const response = await axios.post(
        `${API_URL}/clear/${cartId}`, {}, {headers: {Authorization: `Bearer ${token}`},}
    );
    return response.data;
};

export default {
    getCart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
};
