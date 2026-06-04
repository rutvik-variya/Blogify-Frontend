import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogDetail } from "../../features/blog/blogDetailSlice";
import { useParams, Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import LikeButton from "../../components/blog/LikeButton";
import SaveButton from "../../components/blog/SaveButton";
import CommentSection from "../../components/comment/CommentSection";

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
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex items-center justify-center">
                <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 max-w-md shadow-sm">
                    <div className="text-red-500 font-semibold text-lg mb-2">Oops! Something went wrong</div>
                    <div className="text-red-600/80 text-sm">{error}</div>
                </div>
            </div>
        );
    }


    if (!blog?.blogs) return null;

    const { _id, title, content, featuredImage, category, createdAt, author, status, views, totalComments } = blog.blogs;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">

            <div className="flex items-center gap-4 mb-6">
                <Link to="/blog" className="text-sm font-medium text-violet-700 flex items-center">
                    <span className="me-2"><FaArrowLeft /></span> Back to blogs
                </Link>
                {category && (
                    <span className="inline-flex items-center px-3 py-0.5 rounded-full capitalize">
                        {category?.name}
                    </span>
                )}
            </div>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6 leading-tight">
                {title}
            </h3>

            {featuredImage && (
                <div className="w-full mb-10 overflow-hidden rounded-2xl shadow-sm">
                    <img
                        src={featuredImage.url}
                        alt={title}
                        className="w-full h-75 sm:h-112.5 object-cover hover:scale-101 transition-transform duration-300"
                    />
                </div>
            )}

            <div className="flex items-center space-x-4 mb-10 border-b border-gray-100 justify-between">
                <div className="flex gap-2">
                    <div className="w-9 h-9 bg-violet-500 text-white rounded-full flex items-center justify-center font-bold uppercase text-sm shadow-sm ring-2 ring-white">
                        {author?.name[0] || "A"}
                    </div>
                    <div>
                        <p className="text-sm font-semibold text-gray-900">
                            {author?.name || "Anonymous Author"}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={createdAt}>
                                {createdAt ? new Date(createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Recent"}
                            </time>
                            <span aria-hidden="true">&middot;</span>
                            <span>{status}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3.5 text-slate-400">
                    <div className="flex items-center space-x-1 hover:text-slate-600 transition-colors cursor-pointer">
                        <FaRegEye className="text-[22px]" />
                        <span className="text-xs font-semibold text-slate-500">
                            {views || 0}
                        </span>
                    </div>

                    <LikeButton
                        blog={blog.blogs}
                    />
                    <SaveButton
                        blog={blog.blogs}
                    />
                </div>

            </div>
            <div className="prose prose-indigo prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                {content}
            </div>

            {/* comment section */}

            <CommentSection
                totalComments={totalComments}
                blogId={_id}
            />

        </div>
    );
};

export default BlogDetail;