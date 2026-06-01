const SortBlog = ({ sort, setSort }) => {
    return (
        <div>
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
            </select>
        </div>
    )
}

export default SortBlog
