import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";
import {
    FiHome,
    FiFileText,
    FiClock,
    FiBookmark,
    FiActivity,
    FiUsers,
    FiGrid,
    FiMessageSquare
} from "react-icons/fi";
import { useSelector } from "react-redux";

const Sidebar = ({ isOpen, setIsOpen }) => {
    const { user } = useSelector((state) => state.auth);
    const role = user?.role;

    const userMenus = [
        { title: "Dashboard", path: "/dashboard", icon: FiHome },
        { title: "My Blogs", path: "/dashboard/blogs", icon: FiFileText },
        { title: "Recent Blogs", path: "/dashboard/recent", icon: FiClock },
        { title: "Bookmarks", path: "/dashboard/bookmarks", icon: FiBookmark },
        { title: "Activity", path: "/dashboard/activity", icon: FiActivity },
    ];

    const adminMenus = [
        { title: "Dashboard", path: "/dashboard", icon: FiHome },
        { title: "Users", path: "/dashboard/users", icon: FiUsers },
        { title: "Categories", path: "/dashboard/categories", icon: FiGrid },
        { title: "Blogs", path: "/dashboard/my-blogs", icon: FiFileText },
        { title: "Comments", path: "/dashboard/comments", icon: FiMessageSquare },
    ];

    const menus = role === "admin" ? adminMenus : userMenus;

    const linkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors border-l-2 ${isActive
            ? "bg-violet-50/60 text-violet-600 border-violet-600 font-bold"
            : "text-slate-600 border-transparent hover:bg-slate-50 hover:text-slate-900"
        }`;

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/40 backdrop-blur-xs z-40 md:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                className={`
                    fixed md:sticky top-0 md:top-0 left-0 h-screen md:h-[calc(100vh-5rem)] w-64 bg-white md:border md:border-slate-200/80 md:rounded-2xl flex flex-col font-sans z-50 transition-transform duration-300 ease-in-out
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    md:translate-x-0
                `}
            >
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-slate-800 tracking-tight">
                            Blogify<span className="text-violet-600">.</span>
                        </h2>
                        {role === "admin" ? (
                            <p className="text-xs text-slate-400 mt-0.5">Admin Dashboard</p>
                        ) : (
                            <p className="text-xs text-slate-400 mt-0.5">User Dashboard</p>
                        )}
                    </div>

                    <button
                        onClick={() => setIsOpen(false)}
                        className="md:hidden p-1.5 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none border border-slate-100"
                        aria-label="Close Navigation Menu"
                    >
                        <FiX size={18} />
                    </button>
                </div>

                <nav className="flex flex-col pt-4 overflow-y-auto flex-1">
                    {menus.map((menu, id) => {
                        const Icon = menu.icon;
                        return (
                            <NavLink
                                key={id}
                                to={menu.path}
                                end
                                onClick={() => setIsOpen(false)}
                                className={linkClasses}
                            >
                                <Icon size={18} className="opacity-80" />
                                <span>{menu.title}</span>
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;