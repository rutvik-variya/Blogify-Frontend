import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../features/blog/blogSlice";
import { FcLike } from "react-icons/fc";
import { GrFormView } from "react-icons/gr";
import { BsSave } from "react-icons/bs";
import SearchBox from "../../components/blog/SearchBox";
import { useDebounce } from "use-debounce";
import SortBlog from "../../components/blog/SortBlog";

const BlogPage = () => {
    const dispatch = useDispatch();
    const { blogs, loading, error } = useSelector((state) => state.blog);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest")
    const [category, setCategory] = useState("")

    const [debounceSearch] = useDebounce(search, 500);

    useEffect(() => {
        dispatch(
            fetchBlogs({
                search: debounceSearch,
                sort,
                category
            })
        );
    }, [dispatch, debounceSearch, sort, category]);

    const blogList = Array.isArray(blogs) ? blogs : blogs?.blogs || [];

    if (error) {
        return (
            <div className="text-center py-12 text-red-500 font-medium">
                Error loading blogs: {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-gray-50 min-h-screen">
            <div className="mb-12 text-center md:text-left">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Our Stories & Insights
                </h2>

                <p className="mt-3 text-xl text-gray-500 max-w-2xl">
                    Stay up to date with the latest trends in tech, design,
                    business, and lifestyle.
                </p>
            </div>

            {/* Search */}
            <div className="mb-8 flex justify-between items-center">
                <div>
                    <SearchBox
                        search={search}
                        setSearch={setSearch}
                    />
                </div>
                <div>

                </div>
                <div>
                    <SortBlog
                        sort={sort}
                        setSort={setSort}
                    />
                </div>
            </div>

            {/* Loader */}
            {loading && (
                <div className="flex justify-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {!loading && blogList.length === 0 && (
                    <div className="col-span-full text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-lg font-medium">
                            No posts found.
                        </p>
                    </div>
                )}

                {blogList.map((blog) => (
                    <article
                        key={blog._id}
                        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 flex flex-col"
                    >
                        <div className="h-52 w-full overflow-hidden relative group">
                            <img
                                src={blog.featuredImage?.url}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />

                            <div className="absolute top-4 left-4">
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-gray-800 shadow-sm uppercase tracking-wider">
                                    {blog.category?.name}
                                </span>
                            </div>
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 hover:text-indigo-600 transition-colors duration-200 line-clamp-2">
                                    <a href={`/blog/${blog.slug}`}>
                                        {blog.title}
                                    </a>
                                </h3>

                                <p className="mt-3 text-gray-500 text-sm line-clamp-3 leading-relaxed">
                                    {blog.content}
                                </p>
                            </div>

                            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-semibold uppercase text-xs">
                                        {blog.author?.name?.[0] || "A"}
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-gray-900 capitalize">
                                            {blog.author?.name}
                                        </p>

                                        <p className="text-[10px] text-gray-400">
                                            {new Date(blog.createdAt).toDateString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3 text-gray-400 text-md">
                                    <div className="flex items-center space-x-1">
                                        <GrFormView className="text-[24px]" />
                                        <span className="text-gray-500">
                                            {blog.views || 0}
                                        </span>
                                    </div>

                                    <div className="flex items-center space-x-1">
                                        <FcLike className="text-[20px]" />
                                        <span className="text-gray-500">
                                            {blog.totalLikes || 0}
                                        </span>
                                    </div>

                                    <BsSave className="text-[20px]" />
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;