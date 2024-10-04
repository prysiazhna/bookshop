import React, {useEffect} from 'react';
import BookList from "../components/BookList";
import Banner from "../components/Banner";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store";
import {fetchBooks} from "../store/slices/bookSlice";
import {fetchUsers} from "../store/slices/userSlice";
import {fetchAuthors} from "../store/slices/authorSlice";
import {fetchCategories} from "../store/slices/categorySlice";
import Footer from "../components/Footer";
import {fetchCart} from "../store/slices/cartSlice";
import {useAppSelector} from "../store/hooks";

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {isAuthenticated} = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchBooks({page: 1, limit: 9}));
        dispatch(fetchUsers());
        dispatch(fetchAuthors());
        dispatch(fetchCategories());
        if (isAuthenticated) {
            dispatch(fetchCart());
        }
    }, [dispatch]);

    return (
        <div className="flex flex-col justify-center items-center bg-white">
            <div className="w-full">
                <div className="w-full py-3 text-center bg-purple-50">
                    <span className="text-purple-700">$32,743.80 </span>
                    <span className="text-black">raised for local bookstores</span>
                </div>
                <Banner/>
                <div className="container mx-auto px-4">
                    <BookList title="Coming Soon"/>
                    <BookList title="Everyone's Talking About"/>
                    <BookList title="Top 500"/>
                    <BookList title="Best of 2024"/>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default MainPage;
