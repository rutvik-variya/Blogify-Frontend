import { useEffect } from "react";
import { FiTrash2, FiX, FiAlertTriangle } from "react-icons/fi";

const ConfirmationModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Are you sure you want to delete this item?",
    confirmText = "Yes, I'm sure",
    cancelText = "No, cancel",
    variant = "danger" // danger, warning
}) => {

    // Close modal on Escape key press
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    // Dynamic icon picking depending on theme style
    const iconThemes = {
        danger: <FiTrash2 className="text-slate-400 dark:text-slate-500 w-12 h-12 mb-4 mx-auto" />,
        warning: <FiAlertTriangle className="text-amber-500 w-12 h-12 mb-4 mx-auto" />
    };

    const confirmBtnThemes = {
        danger: "bg-rose-600 hover:bg-rose-700 focus:ring-rose-300 dark:bg-rose-500 dark:hover:bg-rose-600 dark:focus:ring-rose-900",
        warning: "bg-amber-500 hover:bg-amber-600 focus:ring-amber-300 text-white"
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto overflow-x-hidden">
            {/* Backdrop blur overlay overlay background */}
            <div
                className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Modal element wrapper */}
            <div className="relative p-4 w-full max-w-md h-full md:h-auto z-10 animate-in fade-in zoom-in-95 duration-200">
                {/* Modal main content container card */}
                <div className="relative p-6 text-center bg-white rounded-2xl shadow-xl dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50">

                    {/* Top Right Close Button */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl p-1.5 absolute top-3 right-3 inline-flex items-center transition-all duration-200"
                    >
                        <FiX size={18} />
                        <span className="sr-only">Close modal</span>
                    </button>

                    {/* Main Centered Icon */}
                    {iconThemes[variant] || iconThemes.danger}

                    {/* Main Title Message text */}
                    <p className="mb-6 text-slate-500 dark:text-slate-300 font-medium text-sm sm:text-base leading-relaxed px-2">
                        {title}
                    </p>

                    {/* Actions Flex Grouping */}
                    <div className="flex justify-center items-center space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2.5 px-4 text-xs sm:text-sm font-semibold text-slate-500 bg-white dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-600 hover:text-slate-700 dark:hover:text-white transition-all duration-200"
                        >
                            {cancelText}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                onConfirm();
                                onClose();
                            }}
                            className={`py-2.5 px-4 text-xs sm:text-sm font-semibold text-center text-white rounded-xl focus:ring-4 focus:outline-none transition-all duration-200 ${confirmBtnThemes[variant] || confirmBtnThemes.danger}`}
                        >
                            {confirmText}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;