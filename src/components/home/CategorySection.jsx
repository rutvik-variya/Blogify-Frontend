import { Link } from "react-router-dom";

const CategorySection = ({ categories }) => {

    const categoryList = categories?.categories || [];

    return (
        <section className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-24 border-t border-gray-100 dark:border-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="text-xs font-bold tracking-widest text-violet-600 dark:text-violet-400 uppercase bg-violet-50 dark:bg-violet-950/40 px-3 py-1 rounded-full mb-3">
                        Explore Topics
                    </span>
                    <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Browse articles by category
                    </h2>
                    <p className="mt-3 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
                        Find the insights, stories, and tutorials that matter most to you.
                    </p>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {
                        categoryList.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-gray-500 dark:text-gray-400">
                                No categories found at the moment.
                            </div>
                        ) : (
                            categoryList.map((item) => (
                                <Link
                                    key={item._id || item.id}
                                    to="/blog"
                                    state={{ categoryId: item._id }}
                                    className="group relative flex flex-col justify-between p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700/50 shadow-xs hover:shadow-md hover:border-violet-500/30 dark:hover:border-violet-500/30 transition-all duration-300 transform hover:-translate-y-1"
                                >
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                                            {item.name}
                                        </h3>
                                    </div>
                                </Link>
                            ))
                        )
                    }

                </div>

            </div>
        </section>
    );
};

export default CategorySection;