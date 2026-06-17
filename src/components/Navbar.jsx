import { useState, useRef, useEffect } from "react";
import logo from "../assets/images/logo.png";

import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";
import Button from "./common/Button";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false); // User profile dropdown
    const [menuOpen, setMenuOpen] = useState(false); // Mobile hamburger menu

    const dropdownRef = useRef(null);
    const mobileMenuRef = useRef(null);

    const { isAuthenticated, user } = useSelector(
        (state) => state.auth
    );

    const signOut = async () => {
        setOpen(false);
        setMenuOpen(false);
        await dispatch(logoutUser());
        navigate("/login");
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpen(false);
            }
            if (
                mobileMenuRef.current &&
                !mobileMenuRef.current.contains(event.target) &&
                !event.target.closest(".hamburger-btn")
            ) {
                setMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="w-full">
            <nav className="bg-[#f8f9fa] fixed w-full z-20 top-0 left-0 border-b border-slate-200">
                <div className="max-w-7xl flex items-center justify-between mx-auto relative px-6 py-2">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="hamburger-btn block md:hidden text-slate-800 focus:outline-none p-1 hover:bg-slate-100 rounded"
                            aria-label="Toggle navigation"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                {menuOpen ? (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                ) : (
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                )}
                            </svg>
                        </button>

                        <Link to="/" onClick={() => setMenuOpen(false)}>
                            <img
                                className="h-12 md:h-18 w-auto object-contain"
                                src={logo}
                                alt="logo"
                            />
                        </Link>
                    </div>

                    <div className="items-center justify-between hidden md:flex md:w-auto">
                        <ul className="flex space-x-8 text-xl font-normal">
                            <li>
                                <Link
                                    to="/"
                                    className="text-base text-slate-900 hover:text-purple-700 font-bold"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blog"
                                    className="text-base text-slate-900 hover:text-purple-700 font-bold"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* User Section (Profile Dropdown / Login Button) */}
                    <div
                        className="flex items-center relative"
                        ref={dropdownRef}
                    >
                        {isAuthenticated ? (
                            <button
                                onClick={() => setOpen((prev) => !prev)}
                                className="flex rounded-full focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                            >
                                <img
                                    src={user?.avtar?.url || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80"}
                                    alt="User avatar"
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                            </button>
                        ) : (
                            <Button
                                type="click"
                                value="Login"
                                onClick={() => {
                                    setMenuOpen(false);
                                    navigate("/login");
                                }}
                            />
                        )}
                        {open && (
                            <div className="z-50 bg-[#f8f9fa] border border-slate-200 w-56 absolute right-0 top-12 shadow-xl text-left rounded-md">
                                <div className="px-5 py-3 border-b border-slate-200">
                                    <span className="block text-slate-800 font-bold text-[15px]">
                                        {user?.name}
                                    </span>
                                    <span className="block text-slate-600 font-normal text-[14px] mt-0.5">
                                        {user?.email}
                                    </span>
                                </div>

                                <ul className="py-2 text-slate-700 font-normal text-base flex flex-col">
                                    <li>
                                        <Link
                                            to="/createBlog"
                                            onClick={() => setOpen(false)}
                                            className="block px-5 py-2.5 hover:text-purple-700 transition-colors"
                                        >
                                            Create Blog
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard"
                                            onClick={() => setOpen(false)}
                                            className="block px-5 py-2.5 hover:text-purple-700 transition-colors"
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/profile"
                                            onClick={() => setOpen(false)}
                                            className="block px-5 py-2.5 hover:text-purple-700 transition-colors"
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li className="border-t border-slate-200 mt-1 pt-1">
                                        <button
                                            onClick={signOut}
                                            className="block w-full text-left px-5 py-2.5 hover:text-purple-700 transition-colors"
                                        >
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                {menuOpen && (
                    <div
                        ref={mobileMenuRef}
                        className="md:hidden bg-[#f8f9fa] border-t border-slate-200 px-6 py-4 shadow-lg absolute w-full left-0 top-[100%] z-10"
                    >
                        <ul className="flex flex-col space-y-4 text-lg font-bold">
                            <li>
                                <Link
                                    to="/"
                                    onClick={() => setMenuOpen(false)}
                                    className="block text-slate-900 hover:text-purple-700 py-1"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blog"
                                    onClick={() => setMenuOpen(false)}
                                    className="block text-slate-900 hover:text-purple-700 py-1"
                                >
                                    Blog
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navbar;