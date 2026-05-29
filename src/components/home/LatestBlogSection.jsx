import { Link } from "react-router-dom";
const LatestBlogSection = ({ blogs, loading, error }) => {

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Latest Blogs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((n) => (
                        <div key={n} className="animate-pulse border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-sm">
                            <div className="bg-gray-200 h-52 w-full"></div>
                            <div className="p-6 space-y-4">
                                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }
    if (error) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-16 text-center">
                <div className="bg-red-50 text-red-600 p-4 rounded-xl inline-block max-w-md shadow-sm">
                    <p className="font-semibold">Failed to load latest blogs</p>
                    <p className="text-sm opacity-90">{error}</p>
                </div>
            </section>
        );
    }

    if (!blogs || blogs.length === 0) {
        return (
            <section className="max-w-7xl mx-auto px-4 py-16 text-center text-gray-500">
                <p>No latest blogs found.</p>
            </section>
        );
    }
    return (
        <div>
            <section className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <span className="text-sm font-semibold tracking-wider text-indigo-600 uppercase">What's New</span>
                        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mt-1">Latest Blogs</h3>
                    </div>
                    <Link
                        to="/blog"
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 transition-colors hidden sm:block"
                    >
                        View All Blogs
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
                        >
                            {/* Image */}
                            <div className="relative">
                                <img
                                    src={blog.featuredImage.url}
                                    alt={blog.title}
                                    className="w-full h-56 object-cover"
                                />

                                {/* Category Badge */}
                                <span className="absolute bottom-4 left-4 bg-red-500 text-white text-sm px-4 py-1 rounded-full font-medium">
                                    {blog.category.name}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                                    {blog.title}
                                </h3>

                                {/* Footer */}
                                <div className="flex items-center justify-between mt-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-sm font-bold uppercase">
                                            {blog.author.name.charAt(0)}
                                        </div>
                                        <div >
                                            <p className="text-sm font-medium text-gray-700">
                                                by {blog.author.name}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            {new Date(blog.createdAt).toDateString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default LatestBlogSection


