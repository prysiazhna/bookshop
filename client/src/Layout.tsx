import React from 'react';
import Header from "./components/header/Header";
import {useLocation} from "react-router-dom";

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const { pathname } = useLocation();
    const isAdminRoute = pathname.startsWith('/admin');
    const className= isAdminRoute? "mt-16": "mt-[125px]";
    return (
        <div>
            <Header />
            <main className={className}>{children}</main>
        </div>
    );
};

export default Layout;
