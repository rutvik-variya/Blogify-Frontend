const Button = ({ type, disabled, value }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className="w-full text-white bg-violet-600 hover:bg-violet-700 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
        >
            {value}
        </button>
    );
};

export default Button;