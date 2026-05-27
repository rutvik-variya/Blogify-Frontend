import { useState } from "react"
import logo from "../assets/images/logo.png"
import avtar from "../assets/images/user-avtar.png"

import { useSelector, useDispatch } from "react-redux"
import { logoutUser } from "../features/auth/authSlice"
import { useNavigate, Link } from "react-router-dom"
import Button from "./common/Button"

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false)
    const { isAuthenticated } = useSelector((state) => state.auth)

    const signOut = async () => {
        await dispatch(logoutUser());
        navigate("/login")
    }

    return (
        <div className="w-full">
            <nav className="bg-[#f8f9fa] fixed w-full z-20 top-0 left-0 border-b border-slate-200">
                <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto relative px-6 py-2">
                    <div>
                        <img
                            className="h-16 w-auto object-contain"
                            src={logo}
                            alt="logo"
                        />
                    </div>

                    <div className="items-center justify-between hidden md:flex md:w-auto md:order-1">
                        <ul className="flex space-x-8 text-base font-normal">
                            <li>
                                <Link
                                    to="/"
                                    className="text-base text-slate-900 hover:text-purple-700 font-bold "
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

                    <div className="flex items-center md:order-2 relative">
                        {isAuthenticated ? (
                            <button
                                onClick={() => setOpen(!open)}
                                className="flex rounded-full focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all"
                            >
                                <img src={avtar} alt="User avatar" className="w-10 h-10 rounded-full object-cover" />
                            </button>
                        ) : (
                            <Button
                                type="click"
                                value="Login"
                                onClick={() => navigate("/login")}
                            />
                        )}

                        {open && (
                            <div className="z-50 bg-[#f8f9fa] border border-slate-800 w-56 absolute right-0 top-14 shadow-xl text-left">
                                {/* Header Section */}
                                <div className="px-5 py-3 border-b border-slate-800">
                                    <span className="block text-slate-800 font-bold text-[15px]">
                                        Joseph McFall
                                    </span>
                                    <span className="block text-slate-600 font-normal text-[14px] mt-0.5">
                                        name@flowbite.com
                                    </span>
                                </div>

                                {/* Links Section */}
                                <ul className="py-2 text-slate-700 font-normal text-base flex flex-col">
                                    <li>
                                        <a href="#" className="block px-5 py-2.5 hover:text-purple-700 transition-colors">
                                            Dashboard
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-5 py-2.5 hover:text-purple-700 transition-colors">
                                            Create Blog
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="block px-5 py-2.5 hover:text-purple-700 transition-colors">
                                            Profile
                                        </a>
                                    </li>
                                    <li className="border-t border-slate-200 mt-1 pt-1" onClick={signOut}>
                                        <button className="block w-full text-left px-5 py-2.5 hover:text-purple-700 transition-colors">
                                            Sign out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar