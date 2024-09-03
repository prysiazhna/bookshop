import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'


const SearchBar: React.FC = () => {
    return (
        <div className="relative w-full">
            <input
                type="text"
                className="w-full bg-gray-100 text-gray-700 rounded-full pl-6 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-200 ease-in-out"
                placeholder="Search books, authors"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-500 hover:cursor-pointer hover:text-purple-800">
                <MagnifyingGlassIcon className="h-5 w-5"/>
            </div>
        </div>
    );
};

export default SearchBar;
