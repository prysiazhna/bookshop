import React from 'react';
import { Link } from 'react-router-dom';
import { FormConfig, FormErrors, FormField, FormValues } from "../models/common.models";
import { useFormValidation } from "../hooks/useFormValidation";

export interface AuthFormProps {
    fields: FormField[];
    validate: (values: FormValues) => FormErrors;
    onSubmit: (values: FormValues) => void;
    config: FormConfig;
}

const AuthForm: React.FC<AuthFormProps> = ({ fields, validate, onSubmit, config }) => {
    const initialValues: FormValues = fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {} as FormValues);
    const { values, errors, touched, handleChange, handleBlur, handleSubmit } = useFormValidation(initialValues, validate);

    const handleFormSubmit = (e: React.FormEvent) => {
        handleSubmit(e);
        if (Object.keys(errors).length === 0) {
            onSubmit(values);
        }
    };
    const getInputClasses = (hasError: boolean) => {
        const baseClasses = 'block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6';
        const errorClass = hasError ? 'ring-red-500' : 'ring-gray-300';
        return `${baseClasses} ${errorClass}`;
    };


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl text-gray-900">{config.title}</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleFormSubmit} className="space-y-6 relative">
                    {fields.map((field) => (
                        <div key={field.id} className="relative">
                            <label htmlFor={field.id} className="block text-sm text-gray-900">
                                {field.label}
                            </label>
                            <div className="mt-2">
                                <input
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    value={values[field.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    required={field.required}
                                    className={getInputClasses(!!errors[field.name] && !!touched[field.name])}/>

                                {errors[field.name] && touched[field.name] && (
                                    <p className="absolute mt-1 text-xs text-red-600">{errors[field.name]}</p>
                                )}
                            </div>
                        </div>
                    ))}

                    <div>
                        <button
                            type="submit"
                            className="mt-7 flex w-full justify-center rounded-md bg-purple-500 px-3 py-1.5 text-sm
                            font-semibold leading-6 text-white shadow-sm hover:bg-purple-600 focus-visible:outline
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600">
                            {config.title}
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    {config.linkDescription}{' '}
                    <Link to={config.linkPath} className="font-semibold leading-6 text-purple-600 hover:text-purple-500">
                        {config.linkText}
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
