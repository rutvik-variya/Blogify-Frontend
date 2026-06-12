import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiChevronLeft, FiAlertCircle } from "react-icons/fi";
import BlogForm from "../../components/blog/BlogForm";

const EditBlog = () => {
    const { id } = useParams();

    const blog = useSelector((state) =>
        state.dashboard.myBlogs?.find((item) => item._id === id)
    );

    if (!blog) {
        return (
            <div className="max-w-7xl mx-auto my-10 font-sans text-left">
                <Link
                    to="/dashboard/blogs"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <FiChevronLeft size={14} /> Back to Publications
                </Link>
                <div className="bg-violet-50 border border-violet-100 p-6 rounded-xl text-sm font-medium text-violet-600 flex items-center justify-center gap-2">
                    <FiAlertCircle size={16} />
                    <span>Article data could not be retrieved. Please check your dashboard context.</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link
                        to="/dashboard/blogs"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-4"
                    >
                        <FiChevronLeft size={16} />
                        Back to Publications
                    </Link>

                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                                Edit Post
                            </h1>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                Update your content, tags, and publishing settings.
                            </p>
                        </div>

                        <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide ${blog.status === "published"
                                ? "bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-800 dark:text-emerald-400"
                                : "bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-900/20 dark:border-violet-800 dark:text-violet-400"
                                }`}
                        >
                            {blog.status || "draft"}
                        </span>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-10">
                    <BlogForm
                        mode="edit"
                        blog={blog}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditBlog;