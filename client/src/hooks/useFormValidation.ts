import {useState} from 'react';
import {FormErrors, FormTouched, FormValues} from "../models/common.models";

export const useFormValidation = (
    initialValues: FormValues,
    validate: (values: FormValues) => FormErrors
) => {
    const [values, setValues] = useState<FormValues>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [touched, setTouched] = useState<FormTouched>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const {name} = e.target;
        setTouched({
            ...touched,
            [name]: true,
        });
        const validationErrors = validate(values);
        setErrors(validationErrors);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
    };

    return {
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
    };
};
