import { NavLink } from "react-router-dom";
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
const Sidebar = () => {

    const { user } = useSelector((state) => state.auth);
    const role = user?.role;


    const userMenus = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: FiHome
        },
        {
            title: "My Blogs",
            path: "/dashboard/blogs",
            icon: FiFileText

        },
        {
            title: "Recent Blogs",
            path: "/dashboard/recent",
            icon: FiClock
        },
        {
            title: "Bookmarks",
            path: "/dashboard/bookmarks",
            icon: FiBookmark
        },
        {
            title: "Activity",
            path: "/dashboard/activity",
            icon: FiActivity
        },
    ]

    const adminMenus = [
        {
            title: "Dashboard",
            path: "/dashboard",
            icon: FiHome,
        },
        {
            title: "Users",
            path: "/dashboard/users",
            icon: FiUsers,
        },
        {
            title: "Categories",
            path: "/dashboard/categories",
            icon: FiGrid,
        },
        {
            title: "Blogs",
            path: "/dashboard/my-blogs",
            icon: FiFileText,
        },
        {
            title: "Comments",
            path: "/dashboard/comments",
            icon: FiMessageSquare,
        },
    ];

    const menus = role === "admin" ? adminMenus : userMenus;

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
                {
                    menus.map((menu, id) => {
                        const Icon = menu.icon;
                        return (
                            <NavLink key={id} to={menu.path} end className={linkClasses}>
                                <Icon size={18} className="opacity-80" />
                                <span>{menu.title}</span>
                            </NavLink>
                        )
                    })
                }
            </nav>
        </div>
    );
};

export default Sidebar;