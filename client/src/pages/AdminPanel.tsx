import React, {useEffect} from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from "../components/admin/SideBar";
import UsersPage from "../components/admin/usersTab/UsersPage";
import BooksPage from "../components/admin/booksTab/BooksPage";
import CategoriesPage from "../components/admin/categoriesTab/CategoriesPage";
import AuthorsPage from "../components/admin/authorsTab/AuthorsPage";
import {fetchBooks} from "../store/slices/bookSlice";
import {fetchAuthors} from "../store/slices/authorSlice";
import {fetchCategories} from "../store/slices/categorySlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {fetchUsers} from "../store/slices/userSlice";

const AdminPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchBooks({ page: 1, limit: 9 }));
        dispatch(fetchUsers());
        dispatch(fetchAuthors());
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className="min-h-screen flex">
            <Sidebar />
            <div className="flex-1 p-4">
                <Routes>
                    <Route path="users" element={<UsersPage />} />
                    <Route path="books" element={<BooksPage />} />
                    <Route path="authors" element={<AuthorsPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminPanel;
