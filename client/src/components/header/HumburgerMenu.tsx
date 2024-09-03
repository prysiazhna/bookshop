import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/solid';
import useClickOutside from "../../hooks/useClickOutside";
import {MenuItems} from "../../configs/common";

interface MenuItem {
    label: string;
    path: string;
}


const HamburgerMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useClickOutside<HTMLUListElement>(isOpen, () => setIsOpen(false));

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative mr-4">
            <button
                className="text-gray-800 focus:outline-none"
                onClick={toggleMenu}
            >
                <Bars3Icon className="h-8 w-8" />
            </button>
            {isOpen && (
                <ul
                    ref={menuRef}
                    className="absolute left-0 top-12 w-48 bg-white shadow-lg rounded-md border border-gray-300"
                >
                    {MenuItems.map((item, index) => (
                        <li key={index} className="group">
                            <Link to={item.path} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default HamburgerMenu;
