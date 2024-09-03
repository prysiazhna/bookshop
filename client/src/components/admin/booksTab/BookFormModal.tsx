import React, { useState, useRef, useEffect } from 'react';
import { Book } from '../../../models/common.models';
import FormModal from '../../common/FormModal';
import { useAppSelector } from '../../../store/hooks';
import { selectAuthors } from '../../../store/slices/authorSlice';
import { selectCategories } from '../../../store/slices/categorySlice';
import MultiSelect from "../../common/MultiSelect";
import Select from "../../common/Select";
import bookPlaceholder from "../../../assets/book-placeholder.png";
import { StockItemsConfig } from "../../../configs/common";
import InputField from "../../common/Input";
import BookCover from "../../common/BookCover";

interface BookModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (book: Partial<Book>) => void;
    initialData?: Partial<Book>;
}

const BookFormModal: React.FC<BookModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const authors = useAppSelector(selectAuthors);
    const categories = useAppSelector(selectCategories);

    const [title, setTitle] = useState(initialData?.title || '');
    const [selectedCategories, setSelectedCategories] = useState<number[]>(initialData?.categoryIds || []);
    const [selectedAuthor, setSelectedAuthor] = useState<string | null>(initialData?.authorId?.toString() || null);
    const [selectedStock, setSelectedStock] = useState<string | null>(initialData?.stock ? 'true' : 'false');
    const [price, setPrice] = useState<string>(initialData?.price?.toString() || '');
    const [imgFile, setImgFile] = useState<File | null>(null);
    const [imgPreview, setImgPreview] = useState<string | null>(initialData?.img || null);

    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const authorOptions = authors.map(author => ({ value: author.id.toString(), label: author.name }));
    const categoryOptions = categories.map(category => ({ value: category.id.toString(), label: category.name }));
    const stockOptions = StockItemsConfig;
    useEffect(() => {
        if (isOpen) {
            setTitle(initialData?.title || '');
            setImgPreview( null);
            setSelectedCategories(initialData?.categoryIds || []);
            setSelectedAuthor(initialData?.authorId?.toString() || null);
            setSelectedStock(initialData?.stock !== undefined ? (initialData.stock ? 'true' : 'false') : null);
            setPrice(initialData?.price?.toString() || '');
        }
    }, [isOpen, initialData]);

    const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImgFile(file);
            setImgPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = () => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('price', price.toString());
        formData.append('stock', selectedStock === 'true' ? 'true' : 'false');
        formData.append('authorId', selectedAuthor ? selectedAuthor : '');
        formData.append('categoryIds', JSON.stringify(selectedCategories));

        if (imgFile) {
            formData.append('img', imgFile);
        }

        const finalData = Object.fromEntries(formData.entries());
        onSubmit(finalData);
    };

    const uploadImg = () => {
        fileInputRef.current?.click();
    };

    const handleCategoryChange = (selected: string[]) => {
        setSelectedCategories(selected.map(id => parseInt(id, 10)));
    };

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={initialData ? 'Edit Book' : 'Add Book'}>
            <div className="space-y-6">
                <InputField
                    id="title"
                    label="Title"
                    name="title"
                    placeholder="Enter book title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div>
                    <label htmlFor="categories" className="block text-sm font-medium leading-6 text-gray-900">
                        Categories
                    </label>
                    <MultiSelect
                        options={categoryOptions}
                        placeholder="Select categories"
                        selectedOptions={selectedCategories.map(id => id.toString())}
                        onChange={handleCategoryChange}/>
                </div>
                <div className="flex space-x-4">
                    <div className="w-1/2 space-y-4">
                        <div>
                            <label htmlFor="authorId" className="block text-sm font-medium leading-6 text-gray-900">
                                Author
                            </label>
                            <Select
                                options={authorOptions}
                                selectedOption={selectedAuthor}
                                onChange={setSelectedAuthor}
                                placeholder="Select author"/>
                        </div>
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                                Stock
                            </label>
                            <Select
                                options={stockOptions}
                                selectedOption={selectedStock}
                                onChange={setSelectedStock}
                                placeholder="Select stock"/>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                Price
                            </label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                step="0.1"
                                value={price}
                                min={0}
                                placeholder="Enter price"
                                onChange={(e) => setPrice(e.target.value)}
                                className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"/>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex flex-col">
                            <label htmlFor="imgUpload" className="block text-sm font-medium leading-6 text-gray-900">
                                Book cover
                            </label>
                            <button
                                type="button"
                                onClick={uploadImg}
                                className="px-3 py-2 text-sm font-medium bg-gray-200 text-black rounded hover:bg-gray-300">
                                Upload Image
                            </button>
                            <input
                                id="imgUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleImgUpload}
                                ref={fileInputRef}
                                className="hidden"/>
                            <BookCover
                                img={initialData?.img}
                                imgPreview={imgPreview}
                                title="Book cover"
                                className="w-24 h-36 self-center mt-3"
                                placeholderImg={bookPlaceholder}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </FormModal>
    );
};

export default BookFormModal;

