import React from "react";

interface InputFieldProps {
    id: string;
    label: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const InputField: React.FC<InputFieldProps> = ({ id, label, placeholder, name, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium leading-6 text-gray-900">
            {label}
        </label>
        <input
            id={id}
            name={name}
            type="text"
            autoComplete="off"
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="block w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
    </div>
);
export default InputField;