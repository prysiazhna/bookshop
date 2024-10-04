import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import {
    selectCategories,
    selectCategoriesError,
    selectCategoriesLoading,
    createCategory,
    updateCategory,
    deleteCategory
} from '../../../store/slices/categorySlice';
import { Category } from '../../../models/common.models';
import Table from '../../common/DataTable';
import CategoryFormModal from "./CategoryFormModal";

const CategoriesPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector(selectCategories);
    const loading = useAppSelector(selectCategoriesLoading);
    const error = useAppSelector(selectCategoriesError);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

    const handleAddCategory = () => {
        setEditingCategory(null);
        setIsModalOpen(true);
    };

    const handleEditCategory = (categoryId: number) => {
        const categoryToEdit = categories.find(category => category.id === categoryId);
        if (categoryToEdit) {
            setEditingCategory(categoryToEdit);
            setIsModalOpen(true);
        }
    };

    const handleDeleteCategory = (categoryId: number) => {
        dispatch(deleteCategory(categoryId));
    };

    const handleModalSubmit = (category: Partial<Category>) => {
        if (editingCategory && editingCategory.id) {
            dispatch(updateCategory({ id: editingCategory.id, category }));
        } else if (category.name) {
            dispatch(createCategory(category));
        }
        setIsModalOpen(false);
    };

    const categoryColumns = [
        { header: 'Name', render: (category: Category) => category.name },
    ];

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold mb-4">Categories</h2>
                <button
                    className="mb-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    onClick={handleAddCategory}>
                    Add Category
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && (
                <Table
                    data={categories}
                    columns={categoryColumns}
                    actions={(category: Category) => (
                        <div className="flex flex-row justify-center items-center flex-nowrap">
                            <button
                                className="w-16 py-1 bg-purple-500 text-white text-xs rounded hover:bg-purple-600 mr-2"
                                onClick={() => handleEditCategory(category.id)}>
                                Edit
                            </button>
                            <button
                                className="w-16 py-1 bg-gray-200 text-black text-xs rounded hover:bg-gray-300"
                                onClick={() => handleDeleteCategory(category.id)}>
                                Delete
                            </button>
                        </div>
                    )}
                />
            )}
            <CategoryFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleModalSubmit}
                initialData={editingCategory || undefined}
            />
        </div>
    );
};

export default CategoriesPage;
