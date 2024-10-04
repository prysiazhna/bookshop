import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full py-10 bg-purple-800 text-white flex justify-center items-center flex-col space-y-4">
            <p>© 2024 BOOKSHOP.com. All rights reserved.</p>
            <p className="text-sm">Created by Prysiazhna</p>
            <p className="text-sm">
                <a href="/">Privacy Policy</a> | <a href="/">Terms of Service</a>
            </p>
        </footer>
    );
};

export default Footer;
