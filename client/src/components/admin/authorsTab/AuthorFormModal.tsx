import React, {useCallback, useEffect, useState} from 'react';
import {Author} from '../../../models/common.models';
import FormModal from '../../common/FormModal';
import InputField from "../../common/Input";

interface AuthorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (author: Partial<Author>) => void;
    initialData?: Partial<Author>;
}

const AuthorFormModal: React.FC<AuthorModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState<Partial<Author>>({});

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
            title={initialData ? 'Edit Author' : 'Add Author'}>
            <div className="space-y-6">
                <InputField
                    id="name"
                    label="Name"
                    name="name"
                    placeholder="Enter author name"
                    value={formData.name || ''}
                    onChange={handleChange}
                />
            </div>
        </FormModal>
    );
};

export default AuthorFormModal;
