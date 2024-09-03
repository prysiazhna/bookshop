import React, {useEffect} from 'react';
import BookList from "../components/BookList";
import Banner from "../components/Banner";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {fetchBooks} from "../store/slices/bookSlice";
import {fetchUsers} from "../store/slices/userSlice";
import {fetchAuthors} from "../store/slices/authorSlice";
import {fetchCategories} from "../store/slices/categorySlice";

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchBooks({ page: 1, limit: 9 }));
        dispatch(fetchUsers());
        dispatch(fetchAuthors());
        dispatch(fetchCategories());
    }, [dispatch]);

    return (
        <div className=" flex flex-col justify-center items-center bg-white">
            <div className="w-full">
                <Banner />
                <div className="container mx-auto px-4">
                    <BookList />
                </div>
            </div>
        </div>
    );
};

export default MainPage;
