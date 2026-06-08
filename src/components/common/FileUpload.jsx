import { forwardRef } from "react";

const FileUpload = forwardRef(({ label, error, onChange }, ref) => {
    return (
        <div className="w-full">
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-slate-300">
                {label}
            </label>

            <div className={`relative flex flex-col items-center justify-center w-full border-2 border-dashed rounded-xl p-6 transition duration-200 bg-slate-50/50 dark:bg-slate-900/50 hover:bg-slate-50 dark:hover:bg-slate-900
                ${error
                    ? "border-violet-400 bg-red-50/10"
                    : "border-slate-300 dark:border-slate-700"
                }`}
            >
                <div className="flex flex-col items-center justify-center space-y-2 text-center pointer-events-none">
                    <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        Click to upload featured cover image
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                        PNG, JPG or WEBP formats supported
                    </p>
                </div>

                <input
                    ref={ref}
                    type="file"
                    accept="image/*"
                    onChange={onChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
            </div>

            {error && (
                <p className="mt-1.5 text-xs font-medium text-violet-500">
                    {error?.message}
                </p>
            )}
        </div>
    );
});

FileUpload.displayName = "FileUpload";
export default FileUpload;