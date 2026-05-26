// components/common/InputField.jsx

import React from "react";

const InputField = React.forwardRef(
    ({ label, type, placeholder, error, ...props }, ref) => {
        return (
            <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {label}
                </label>

                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    {...props}
                />

                {error && (
                    <p className="text-violet-500 text-sm">
                        {error.message}
                    </p>
                )}
            </div>
        );
    }
);

export default InputField;