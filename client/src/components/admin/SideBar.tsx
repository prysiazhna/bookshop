import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
    { path: "/admin/books", label: "Books" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/authors", label: "Authors" },
    { path: "/admin/categories", label: "Categories" },
];

const Sidebar: React.FC = () => {
    const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
        isActive
            ? "text-purple-700 pl-2 pt-1"
            : "text-gray-700 hover:text-purple-700 pl-2 pt-1";

    return (
        <div className="w-64 bg-white shadow-md">
            <nav className="flex flex-col space-y-4 p-4">
                {navItems.map((item) => (
                    <NavLink key={item.path} to={item.path} className={getNavLinkClassName}>
                        {item.label}
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Sidebar;
