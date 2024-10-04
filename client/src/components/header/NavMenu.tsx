import React from 'react';
import { Link } from 'react-router-dom';
import {MenuItemsModel} from "../../models/common.models";
import {MenuItems} from "../../configs/common";

const NavMenu: React.FC = () => {
    return (
        <nav className="pt-2">
            <ul className="flex justify-center space-x-6 mb-3 pt-2">
                {MenuItems.map((item: MenuItemsModel, index: number) => (
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

export default NavMenu;
