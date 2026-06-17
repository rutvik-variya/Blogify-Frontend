import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import { Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";

const DashboardLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
            <div className="flex md:hidden items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 left-0 right-0 z-30 shadow-xs h-16 w-full">
                <span className="font-extrabold text-xl text-slate-800 tracking-tight">
                    Blogify<span className="text-violet-600">.</span>
                </span>

                <button
                    onClick={() => setIsSidebarOpen(true)}
                    type="button"
                    className="p-2 text-slate-700 bg-slate-100 hover:bg-slate-200 active:scale-95 rounded-lg focus:outline-none transition-all border border-slate-200 block z-50 cursor-pointer"
                    aria-label="Open Navigation Menu"
                >
                    <FiMenu size={24} className="text-slate-800" />
                </button>
            </div>

            <div className="flex flex-1 max-w-7xl w-full mx-auto md:my-10 relative">
                <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
                <main className="flex-1 bg-slate-50 p-4 sm:p-6 md:p-8 w-full min-w-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;