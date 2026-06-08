import { forwardRef } from "react";

const SelectField = forwardRef(
    ({ label, options = [], error, ...props }, ref) => {
        return (
            <div className="w-full">
                <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {label}
                </label>

                <div className="relative">
                    <select
                        ref={ref}
                        className={`block w-full px-4 py-3 text-sm text-slate-900 bg-white border rounded-xl transition duration-200 appearance-none focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:bg-slate-900 dark:text-slate-100
                            ${error
                                ? "border-violet-400 focus:border-violet-500 focus:ring-red-500/20"
                                : "border-slate-200 dark:border-slate-700 focus:border-violet-500 dark:focus:border-violet-500"
                            }`}
                        {...props}
                    >
                        <option value="" disabled className="text-slate-400">Choose an option...</option>
                        {options.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.name}
                            </option>
                        ))}
                    </select>

                    {/* Custom Styled Chevron Dropdown Icon */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-slate-400">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                {error && (
                    <p className="mt-1.5 text-xs font-medium text-violet-500">
                        {error?.message}
                    </p>
                )}
            </div>
        );
    }
);

SelectField.displayName = "SelectField";
export default SelectField;