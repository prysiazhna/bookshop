import React, { useState, useEffect, useCallback } from 'react';
import { Category } from '../../../models/common.models';
import FormModal from '../../common/FormModal';
import InputField from "../../common/Input";

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (category: Partial<Category>) => void;
    initialData?: Partial<Category>;
}

const CategoryFormModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState<Partial<Category>>({});

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else if (isOpen) {
            resetForm();
        }
    }, [initialData, isOpen]);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }, []);

    const resetForm = () => {
        setFormData({});
    };

    const handleSubmit = useCallback(() => {
        onSubmit(formData);
    }, [formData, onSubmit]);

    return (
        <FormModal
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            title={initialData ? 'Edit Category' : 'Add Category'}>
            <div className="space-y-6">
                <InputField
                    id="name"
                    label="Name"
                    name="name"
                    placeholder="Enter category name"
                    value={formData.name || ''}
                    onChange={handleChange}
                />
            </div>
        </FormModal>
    );
};

export default CategoryFormModal;
