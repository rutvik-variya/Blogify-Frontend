// components/common/InputField.jsx

import React from "react";

const InputField = React.forwardRef(
    ({ label, type, placeholder, error, ...props }, ref) => {
        return (
            <div className="space-y-1">
                <label className="block font-medium">
                    {label}
                </label>

                <input
                    ref={ref}
                    type={type}
                    placeholder={placeholder}
                    className="border p-2 rounded w-full"
                    {...props}
                />

                {error && (
                    <p className="text-red-500 text-sm">
                        {error.message}
                    </p>
                )}
            </div>
        );
    }
);

export default InputField;