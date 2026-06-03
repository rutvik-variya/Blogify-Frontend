import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../features/blog/blogSlice";


import { FaRegEye } from "react-icons/fa6";
import SearchBox from "../../components/blog/SearchBox";
import { useDebounce } from "use-debounce";
import SortBlog from "../../components/blog/SortBlog";
import { getCateories } from "../../features/category/categorySlice";
import CategoryFilter from "../../components/blog/CategoryFilter";

import LikeButton from "../../components/blog/LikeButton";
import SaveButton from "../../components/blog/SaveButton";
import { useLocation } from "react-router-dom";

const BlogPage = () => {
    const dispatch = useDispatch();

    const location = useLocation();

    const { blogs, loading, error } = useSelector((state) => state.blog);
    const { categories } = useSelector((state) => state.category);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("latest");
    const [category, setCategory] = useState(location.state?.categoryId || "");

    const [debounceSearch] = useDebounce(search, 500);


    useEffect(() => {
        dispatch(
            fetchBlogs({
                search: debounceSearch,
                sort,
                category
            })
        );
        dispatch(getCateories());
    }, [dispatch, debounceSearch, sort, category]);

    const blogList = Array.isArray(blogs) ? blogs : blogs?.blogs || [];

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
                <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 max-w-md shadow-sm">
                    <div className="text-red-500 font-semibold text-lg mb-2">Oops! Something went wrong</div>
                    <div className="text-red-600/80 text-sm">{error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-50/50 min-h-screen antialiased">
            <div className="mb-12 text-center md:text-left flex flex-col md:flex-row md:items-end md:justify-between border-b border-gray-200/60 pb-8 gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight sm:text-5xl">
                        Blogify <span className="text-indigo-600 font-medium ">Insights</span>
                    </h2>
                    <p className="mt-3 text-lg text-slate-500 max-w-2xl font-normal leading-relaxed">
                        Stay ahead of the curve with deep dives into tech trends, clean designs, and developer life hacks.
                    </p>
                </div>
            </div>

            <div className="mb-10 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col sm:flex-row gap-4 items-stretch sm:items-center sm:justify-between">
                <div className="w-full sm:w-auto flex-1 max-w-md">
                    <SearchBox
                        search={search}
                        setSearch={setSearch}
                        categories={categories}
                    />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <CategoryFilter
                        category={category}
                        setCategory={setCategory}
                        categories={categories.categories}
                    />
                    <SortBlog
                        sort={sort}
                        setSort={setSort}
                    />
                </div>
            </div>

            {loading && (
                <div className="flex justify-center py-20">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {!loading && blogList.length === 0 && (
                    <div className="col-span-full text-center py-24 bg-white rounded-3xl shadow-sm border border-slate-100 max-w-lg mx-auto w-full px-6">
                        <div className="text-slate-400 text-5xl mb-4">🔍</div>
                        <p className="text-slate-800 text-xl font-bold mb-1">No matches found</p>
                        <p className="text-slate-400 text-sm">We couldn't find any articles matching your search criteria.</p>
                    </div>
                )}

                {!loading && blogList.map((blog) => (
                    <article
                        key={blog._id}
                        className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-100/80 flex flex-col h-full group"
                    >
                        <div className="h-56 w-full overflow-hidden relative bg-slate-100">
                            <img
                                src={blog.featuredImage?.url}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                            {blog.category?.name && (
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1.5 rounded-xl text-xs font-bold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm uppercase tracking-wider border border-white/20">
                                        {blog.category?.name}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between">
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors duration-200 line-clamp-2 leading-snug">
                                    <a href={`/blog/${blog.slug}`}>
                                        {blog.title}
                                    </a>
                                </h3>

                                <p className="text-slate-500 text-sm line-clamp-3 leading-relaxed font-normal">
                                    {blog.content}
                                </p>
                            </div>

                            <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-9 h-9 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold uppercase text-sm shadow-sm ring-2 ring-white">
                                        {blog.author?.name?.[0] || "A"}
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold text-slate-800 capitalize leading-tight">
                                            {blog.author?.name || "Anonymous"}
                                        </p>
                                        <p className="text-[10px] font-medium text-slate-400 mt-0.5">
                                            {new Date(blog.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-3.5 text-slate-400">
                                    <div className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer">
                                        <FaRegEye className="text-[22px]" />
                                        <span className="text-xs font-semibold text-slate-500">
                                            {blog.views || 0}
                                        </span>
                                    </div>

                                    <LikeButton
                                        blog={blog}
                                    />
                                    <SaveButton
                                        blog={blog}
                                    />
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