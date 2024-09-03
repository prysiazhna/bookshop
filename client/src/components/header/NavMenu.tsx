import React from 'react';
import { Link } from 'react-router-dom';

const NavMenu: React.FC = () => {
    return (
        <nav className="pt-2">
            <ul className="flex justify-center space-x-6 mb-3 pt-2">
                {menuItems.map((item, index) => (
                    <li key={index} className="group">
                        <Link to={item.path} className="relative text-gray-800 pb-2 px-2 group-hover:no-underline">
                            {item.label}
                            <span className="absolute left-0 top-[34px] w-full h-0.5 bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

const menuItems = [
    { label: 'Special Offers', path: '/special-offers' },
    { label: 'New Books', path: '/new-books' },
    { label: 'Best Sellers', path: '/best-sellers' },
    { label: 'Fiction', path: '/fiction' },
    { label: 'Nonfiction', path: '/nonfiction' },
    { label: 'Kids', path: '/kids' },
];

export default NavMenu;
