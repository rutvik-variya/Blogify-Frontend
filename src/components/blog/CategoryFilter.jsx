const CategoryFilter = ({ category, setCategory, categories = [] }) => {
    return (
        <div className="relative min-w-37.5">
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                        {cat.name}
                    </option>
                ))}
            </select>

        </div>
    );
};

export default CategoryFilter;