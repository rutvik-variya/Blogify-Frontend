// components/common/Button.jsx

const Button = ({ type, disabled, value }) => {
    return (
        <button
            type={type}
            disabled={disabled}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full disabled:bg-gray-400"
        >
            {value}
        </button>
    );
};

export default Button;