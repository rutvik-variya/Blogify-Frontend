import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogDetail } from "../../features/blog/blogDetailSlice";
import { useParams, Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import LikeButton from "../../components/blog/LikeButton";
import SaveButton from "../../components/blog/SaveButton";
import CommentSection from "../../components/comment/CommentSection";

import BlogContent from "../../components/blog/BlogContent";

const BlogDetail = () => {
    const { slug } = useParams();
    const dispatch = useDispatch();

    const { blog, error, loading } = useSelector((state) => state.blogDetail);

    useEffect(() => {
        dispatch(fetchBlogDetail(slug));
    }, [dispatch, slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-100"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-24 flex items-center justify-center">
                <div className="text-center p-6 sm:p-8 bg-red-50 rounded-2xl border border-red-100 max-w-md shadow-sm w-full">
                    <div className="text-red-500 font-semibold text-lg mb-2">Oops! Something went wrong</div>
                    <div className="text-red-600/80 text-sm break-words">{error}</div>
                </div>
            </div>
        );
    }

    if (!blog?.blogs) return null;

    const { _id, title, content, featuredImage, category, createdAt, author, status, views, totalComments } = blog.blogs;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12 md:py-16">

            {/* Top Navigation & Category */}
            <div className="flex flex-wrap items-center gap-3 mb-4 sm:mb-6">
                <Link to="/blog" className="text-sm font-medium text-violet-700 flex items-center hover:text-violet-800 transition-colors">
                    <span className="me-2"><FaArrowLeft /></span> Back to blogs
                </Link>
                {category && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100 capitalize">
                        {category?.name}
                    </span>
                )}
            </div>

            {/* Responsive Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight sm:leading-none">
                {title}
            </h1>

            {/* Featured Image */}
            {featuredImage && (
                <div className="w-full mb-6 sm:mb-10 overflow-hidden rounded-xl sm:rounded-2xl shadow-sm aspect-[16/9]">
                    <img
                        src={featuredImage.url}
                        alt={title}
                        className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                    />
                </div>
            )}

            {/* Author Meta & Action Buttons Section */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-gray-100">

                {/* Left Side: Author Info */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold uppercase text-sm shadow-sm ring-2 ring-white shrink-0">
                        {author?.name ? author.name[0] : "A"}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                            {author?.name || "Anonymous Author"}
                        </p>
                        <div className="flex flex-wrap items-center gap-x-1.5 text-xs sm:text-sm text-gray-500">
                            <time dateTime={createdAt}>
                                {createdAt ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent"}
                            </time>
                            <span aria-hidden="true">&middot;</span>
                            <span className="capitalize px-1.5 py-0.2 bg-gray-100 text-gray-600 rounded text-[11px] font-medium">{status}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Stats & Interaction Buttons */}
                <div className="flex items-center space-x-4 text-slate-400 self-end sm:self-auto border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                    <div className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer">
                        <FaRegEye className="text-[20px] sm:text-[22px]" />
                        <span className="text-xs font-semibold text-slate-500">
                            {views || 0}
                        </span>
                    </div>

                    <div className="flex items-center space-x-2">
                        <LikeButton blog={blog.blogs} />
                        <SaveButton blog={blog.blogs} />
                    </div>
                </div>

            </div>

            {/* Main Rich Text Content */}
            <div className="mb-12">
                <BlogContent content={content} />
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-100 pt-8">
                <CommentSection
                    totalComments={totalComments}
                    blogId={_id}
                />
            </div>

        </div>
    );
};

export default BlogDetail;