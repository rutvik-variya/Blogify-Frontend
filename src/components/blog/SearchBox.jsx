const SearchBox = ({ search, setSearch }) => {
    return (
        <div>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search blogs..."
                className="px-4 py-2 border rounded-lg w-full md:w-80"
            />
        </div>
    )
}

export default SearchBox
