import React from "react";
import {Book, Category} from "../../models/common.models";

interface ChipsProps {
    book: Book;
    categories: Category[];
}

const Chips: React.FC<ChipsProps> = ({book, categories}) => {
    return <div className="flex flex-wrap gap-2">
        {book.categoryIds?.map(categoryId => {
            const category = categories.find(category => category.id === categoryId);
            return (
                <span key={categoryId} className="px-2 py-1 bg-gray-200 text-black text-xs rounded">
                    {category?.name}
                </span>
            );
        })}
    </div>
};

export default Chips;
