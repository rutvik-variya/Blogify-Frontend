import BlogForm from "../../components/blog/BlogForm";

const CreateBlog = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        Create New Post
                    </h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        Share your thoughts, ideas, and expertise with the world.
                    </p>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 sm:p-10">
                    <BlogForm
                        mode="create"
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateBlog;