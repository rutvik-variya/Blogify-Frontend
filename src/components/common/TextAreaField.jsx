import { forwardRef } from "react";

const TextAreaField = forwardRef(({ label, row = 10, placeholder, error, ...props }, ref) => {
    return (
        <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                {label}
            </label>
            <textarea
                ref={ref}
                rows={row}
                placeholder={placeholder}
                className={`block w-full px-4 py-3 text-sm text-slate-900 bg-white border rounded-xl transition duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:bg-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 resize-y
                    ${error
                        ? "border-violet-400 focus:border-violet-500 focus:ring-red-500/20"
                        : "border-slate-200 dark:border-slate-700 focus:border-violet-500 dark:focus:border-violet-500"
                    }`}
                {...props}
            />
            {error && (
                <p className="mt-1.5 text-xs font-medium text-violet-500">
                    {error?.message}
                </p>
            )}
        </div>
    );
});

TextAreaField.displayName = "TextAreaField";
export default TextAreaField;