import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NavMenu from './NavMenu';
import SearchBar from './SearchBar';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { signOut } from '../../store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import HamburgerMenu from "./HumburgerMenu";

const Header: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const isAdminRoute = pathname.startsWith('/admin');

    const handleLogout = () => {
        dispatch(signOut());
        navigate('/signin');
    };

    const renderAuthLink = () =>
        isAuthenticated ? (
            <button onClick={handleLogout} className="text-gray-800 hover:text-purple-700 py-1">
                Logout
            </button>
        ) : (
            <Link to="/signin" className="text-gray-800 hover:text-purple-700 py-1">
                Sign In
            </Link>
        );

    const renderAdminLink = () =>
        !isAdminRoute && (
            <Link to="/admin/books" className="text-gray-800 hover:text-purple-700 py-1">
                Admin Panel
            </Link>
        );

    const renderCartLink = () =>
        !isAdminRoute && (
            <Link to="/cart" className="text-gray-800 py-1">
                <ShoppingBagIcon className="h-5 w-5" />
            </Link>
        );

    const renderSearchBar = () =>
        !isAdminRoute && (
            <div className="hidden big:flex justify-center w-2/5">
                <SearchBar />
            </div>
        );

    const renderNavMenu = () =>
        !isAdminRoute && (
            <div className="hidden big:block">
                <NavMenu />
            </div>
        );

    return (
        <header className="bg-white text-gray-800 border-b border-gray-300 fixed top-0 w-full z-50">
            <div className="flex items-center justify-between px-6 xs:flex-row xs:pb-4 xs:pt-4 xss:flex-col xss:pb-1 xss:pt-1">
                <div className="flex items-center">
                    <Link to="/" className="font-bold text-purple-700 xs:text-3xl xss:text-xl">
                        BOOKSHOP.com
                    </Link>
                </div>

                {renderSearchBar()}

                <div className="flex items-center space-x-8">
                    {renderAdminLink()}
                    {renderAuthLink()}
                    {renderCartLink()}
                </div>
            </div>

            {renderNavMenu()}

            <div className="big:hidden w-full px-6 pb-4 flex items-center">
                <HamburgerMenu />
                <div className="flex-grow">
                    <SearchBar />
                </div>
            </div>
        </header>
    );
};

export default Header;
