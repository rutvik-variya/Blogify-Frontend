const SelectField = ({ label, error, options, ...props }, ref) => {

    return (
        <div>
            <label className="block mb-2 font-medium">
                {label}
            </label>
            <select
                {...props}
                ref={ref}
            >
                <option value="">Select</option>
                {
                    options.map((option) => (
                        <option key={option._id} value={option.name}>{option.name}</option>
                    ))
                }
            </select>
            {error && (
                <p className="text-violet-500 text-sm">
                    {error.message}
                </p>
            )}
        </div>
    )
}

export default SelectField
