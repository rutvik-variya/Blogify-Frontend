const Button = ({
    type = "button",
    disabled,
    value,
    onClick,
    variant = "solid",
    className = "",
}) => {

    const baseStyles = "font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:outline-none transition-all duration-200 disabled:opacity-50";

    const variants = {
        solid: "text-white bg-violet-600 hover:bg-violet-700 focus:ring-violet-300 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800",
        ghost: "text-violet-700 bg-violet-50 hover:bg-violet-100 focus:ring-violet-200 dark:bg-violet-950/40 dark:text-violet-400 dark:hover:bg-violet-950/60"
    };

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            {value}
        </button>
    );
};

export default Button;