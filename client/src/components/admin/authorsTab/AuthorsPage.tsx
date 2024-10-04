import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import {
    createAuthor,
    deleteAuthor,
    selectAuthors,
    selectAuthorsError,
    selectAuthorsLoading,
    updateAuthor
} from '../../../store/slices/authorSlice';

import {Author} from '../../../models/common.models';
import Table from '../../common/DataTable';
import AuthorFormModal from "./AuthorFormModal";

const AuthorsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const authors = useAppSelector(selectAuthors);
    const loading = useAppSelector(selectAuthorsLoading);
    const error = useAppSelector(selectAuthorsError);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState<Partial<Author> | null>(null);

    const handleAddAuthor = () => {
        setEditingAuthor(null);
        setIsModalOpen(true);
    };

    const handleEditAuthor = (authorId: number) => {
        const authorToEdit = authors.find(author => author.id === authorId);
        if (authorToEdit) {
            setEditingAuthor(authorToEdit);
            setIsModalOpen(true);
        }
    };

    const handleDeleteAuthor = (authorId: number) => {
        dispatch(deleteAuthor(authorId));
    };

    const handleModalSubmit = (author: Partial<Author>) => {
        if (editingAuthor && editingAuthor.id) {
            dispatch(updateAuthor({ id: editingAuthor.id, author }));
        } else if (author.name) {
            dispatch(createAuthor(author));
        }
        setIsModalOpen(false);
    };

    const authorColumns = [
        {header: 'Name', render: (author: Author) => author.name},
    ];

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Authors</h2>
                <button
                    className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    onClick={handleAddAuthor}>
                    Add Author
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <Table
                    data={authors}
                    columns={authorColumns}
                    actions={(author: Author) => (
                        <div className="flex flex-row justify-center items-center flex-nowrap">
                            <button
                                className="w-16 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 mr-2"
                                onClick={() => handleEditAuthor(author.id)}>
                                Edit
                            </button>
                            <button
                                className="w-16 py-1 bg-gray-200 text-black text-xs rounded hover:bg-gray-300"
                                onClick={() => handleDeleteAuthor(author.id)}>
                                Delete
                            </button>
                        </div>
                    )}
                />
            )}
            <AuthorFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingAuthor || undefined}
            />
        </div>
    );
};

export default AuthorsPage;
