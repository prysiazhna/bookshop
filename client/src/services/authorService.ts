import axios from 'axios';
import {Author, Category} from "../models/common.models";

const API_URL = 'http://localhost:4000/api/author';

const getAuthors = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const createAuthor = async (author: Partial<Author>) => {
    const response = await axios.post(API_URL, author );
    return response.data;
};

const updateAuthor = async (id: number, author: Partial<Author>) => {
    const response = await axios.put(`${API_URL}/${id}`, author);
    return response.data;
};

const deleteAuthor = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};


export const authorService = {
    getAuthors, createAuthor,  deleteAuthor, updateAuthor
};
