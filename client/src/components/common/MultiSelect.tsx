import React, { useState } from 'react';

interface MultiSelectProps {
    options: { value: string; label: string }[];
    selectedOptions: string[];
    onChange: (selected: string[]) => void;
    placeholder?: string;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ options, selectedOptions, onChange, placeholder }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleToggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionClick = (option: string) => {
        if (!selectedOptions.includes(option)) {
            onChange([...selectedOptions, option]);
        }
        setInputValue('');
        setDropdownOpen(false);
    };

    const handleTagRemove = (option: string) => {
        onChange(selectedOptions.filter(item => item !== option));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setDropdownOpen(true);
    };

    const filteredOptions = options
        .filter(option => !selectedOptions.includes(option.value))
        .filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()));

    return (
        <div className="relative w-full">
            <div className="flex flex-wrap w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                {selectedOptions.map((option) => (
                    <span
                        key={option}
                        className="flex items-center bg-purple-500 text-white text-sm px-2 py-1 mr-2 my-1 rounded">
                        {options.find(o => o.value === option)?.label}
                        <button onClick={() => handleTagRemove(option)} className="ml-2 text-white focus:outline-none">
                            &times;
                        </button>
                    </span>
                ))}
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onClick={handleToggleDropdown}
                    className="flex-1 outline-none"
                    placeholder={placeholder || 'Select'}
                />
            </div>
            {dropdownOpen && (
                <div
                    className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg"
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                >
                    {filteredOptions.length === 0 ? (
                        <div className="p-2 text-gray-500 text-center">No categories</div>
                    ) : (
                        filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                onClick={() => handleOptionClick(option.value)}
                                className="cursor-pointer p-2 hover:bg-gray-100"
                            >
                                {option.label}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
