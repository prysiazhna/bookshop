import axios from 'axios';
import {Book, Category} from "../models/common.models";

const API_URL = 'http://localhost:4000/api/book';

// const getBooks = async () => {
//     const response = await axios.get(API_URL);
//     return response.data.rows;
// };
const getBooks = async (page = 1, limit = 9) => {
    const response = await axios.get(`${API_URL}?page=${page}&limit=${limit}`);
    return response.data;
};
const createBook = async (book: Partial<Book>) => {
    const response = await axios.post(API_URL, book, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
    return response.data;
};

const updateBook = async (id: number, book: Partial<Book>) => {
    const response = await axios.put(`${API_URL}/${id}`, book, {
        headers: {'Content-Type': 'multipart/form-data'}
    });
    return response.data;
};

const deleteBook = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};


export const bookService = {
    getBooks, createBook, updateBook, deleteBook
};
