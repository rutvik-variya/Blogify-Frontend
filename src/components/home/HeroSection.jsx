import { Link } from "react-router-dom";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa6";

const HeroSection = () => {
    return (
        <div className="relative overflow-hidden bg-white dark:bg-gray-900">

            <div className="absolute top-0 left-1/2 -z-10 h-150 w-250 -translate-x-1/2 mask-[radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
                <div className="aspect-1086/575 w-271.5 bg-linear-to-tr from-indigo-200 to-violet-400 opacity-40 dark:opacity-20" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }} />
            </div>

            <section className="relative">
                <div className="py-12 px-4 mx-auto max-w-7xl text-center lg:py-24 lg:px-12">
                    <a className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-8 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200" role="alert">
                        <span className="text-xs bg-violet-600 rounded-full text-white px-3 py-1 mr-3 font-semibold shadow-sm">New</span>
                        <span className="text-sm font-medium">Blogify v2.0 is officially live! See what's new</span>
                        <MdOutlineKeyboardArrowRight />
                    </a>

                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-7xl dark:text-white">
                        Publish your ideas. <br />
                        <span className="text-violet-600">Grow your audience.</span>
                    </h1>

                    <p className="mb-10 text-lg font-normal text-gray-600 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                        Blogify gives you the tools, speed, and freedom to build a stunning blog, newsletter, or publication without wrestling with complex code. Start writing today.
                    </p>

                    <div className="flex flex-col mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link
                            to="/register"
                            className="inline-flex justify-center items-center py-3.5 px-6 text-base font-medium text-center text-white rounded-lg bg-violet-600"
                        >
                            Get started for free
                            <FaArrowRight className="mx-2" />

                        </Link>

                        <a className="inline-flex justify-center items-center py-3.5 px-6 text-base font-medium text-center text-gray-900 rounded-lg border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-800 dark:focus:ring-gray-800 transition-all duration-200">
                            <svg className="mr-2 -ml-1 w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            Watch 2-min demo
                        </a>
                    </div>

                    <div className="px-4 mx-auto text-center md:max-w-3xl lg:max-w-5xl">
                        <span className="font-semibold text-xs tracking-wider text-gray-400 dark:text-gray-500 uppercase block mb-6">
                            TRUSTED BY CREATORS AT WONDERFUL PLATFORMS
                        </span>

                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-gray-400 dark:text-gray-500 font-bold text-xl tracking-tight">
                            <div className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <span className="text-2xl text-indigo-500 font-mono">⚡</span> <span>TechCrunch</span>
                            </div>
                            <div className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <span className="text-2xl text-violet-500">◈</span> <span>Medium</span>
                            </div>
                            <div className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <span className="text-2xl text-pink-500">●</span> <span>Substack</span>
                            </div>
                            <div className="flex items-center space-x-2 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <span className="text-2xl text-emerald-500">◆</span> <span>Dev.to</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;