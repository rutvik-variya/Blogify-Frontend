

const SortBlog = ({ sort, setSort }) => {
    return (
        <div className="relative min-w-30">
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all cursor-pointer"
            >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
            </select>

        </div>
    );
};

export default SortBlog;