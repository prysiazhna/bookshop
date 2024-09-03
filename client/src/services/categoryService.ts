import axios from 'axios';
import {Category} from "../models/common.models";

const API_URL = 'http://localhost:4000/api/category';

const getCategories = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

const createCategory = async (category: Partial<Category>) => {
    const response = await axios.post(API_URL, category );
    return response.data;
};

const updateCategory = async (id: number, category: Partial<Category>) => {
    const response = await axios.put(`${API_URL}/${id}`, category);
    return response.data;
};

const deleteCategory = async (id: number) => {
    await axios.delete(`${API_URL}/${id}`);
};

export const categoryService = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
};
