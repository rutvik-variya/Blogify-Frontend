import { NavLink } from "react-router-dom";
import { FiHome, FiFileText, FiClock, FiBookmark, FiActivity } from "react-icons/fi";

const Sidebar = () => {
    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors border-l-2 ${isActive
            ? "bg-violet-50/60 text-violet-600 border-violet-600"
            : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
        }`;

    return (
        <div className="w-64 min-h-screen bg-white border-r border-slate-200/80 flex flex-col font-sans">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                    Blogify<span className="text-violet-600">.</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">Creator Dashboard</p>
            </div>

            <nav className="flex flex-col pt-4">
                <NavLink to="/dashboard" end className={linkClasses}>
                    <FiHome size={18} className="opacity-80" />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/dashboard/blogs" className={linkClasses}>
                    <FiFileText size={18} className="opacity-80" />
                    <span>My Blogs</span>
                </NavLink>

                <NavLink to="/dashboard/recent" className={linkClasses}>
                    <FiClock size={18} className="opacity-80" />
                    <span>Recent Blogs</span>
                </NavLink>

                <NavLink to="/dashboard/bookmarks" className={linkClasses}>
                    <FiBookmark size={18} className="opacity-80" />
                    <span>Bookmarks</span>
                </NavLink>

                <NavLink to="/dashboard/activity" className={linkClasses}>
                    <FiActivity size={18} className="opacity-80" />
                    <span>Activity</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Sidebar;