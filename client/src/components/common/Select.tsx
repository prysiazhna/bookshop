import React, { useState } from 'react';
import useClickOutside from "../../hooks/useClickOutside";

interface SelectProps {
    options: { value: string; label: string }[];
    selectedOption: string | null;
    onChange: (selected: string | null) => void;
    placeholder?: string;
}

const Select: React.FC<SelectProps> = ({ options, selectedOption, onChange, placeholder }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const dropdownRef = useClickOutside<HTMLDivElement>(dropdownOpen, () => setDropdownOpen(false));

    const handleToggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleOptionClick = (option: string) => {
        onChange(option);
        setInputValue(options.find(o => o.value === option)?.label || '');
        setDropdownOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        setDropdownOpen(true);
    };

    const handleInputClick = () => {
        if (!dropdownOpen) {
            setDropdownOpen(true);
        }
    };

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase()) && option.value !== selectedOption
    );

    return (
        <div ref={dropdownRef} className="relative w-full">
            <div
                className="flex w-full rounded-md border-0 py-1.5 px-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onClick={handleInputClick} // Ensure that clicking the div toggles the dropdown
            >
                <input
                    type="text"
                    value={inputValue || (selectedOption ? options.find(o => o.value === selectedOption)?.label : '')}
                    onChange={handleInputChange}
                    className="flex-1 outline-none max-w-[100px]"
                    placeholder={placeholder || 'Select an option...'}
                />
            </div>
            {dropdownOpen && (
                <div
                    className="absolute z-10 w-full bg-white border border-gray-300 mt-1 rounded shadow-lg"
                    style={{ maxHeight: '200px', overflowY: 'auto' }}
                >
                    {filteredOptions.length === 0 ? (
                        <div className="p-2 text-gray-500 text-center">No options</div>
                    ) : (
                        filteredOptions.map(option => (
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

export default Select;
