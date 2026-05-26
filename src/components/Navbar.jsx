import { useState } from "react"
import logo from "../assets/images/logo.png"

const Navbar = () => {
    const [open, setOpen] = useState(false)
    return (
        <div>
            <nav className="bg-neutral-primary fixed w-full z-20 top-0 inset-s-0 ">
                <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto relative">
                    <div>
                        <img
                            className="size-24"
                            src={logo}
                            alt="logo"
                        />
                    </div>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        <button
                            onClick={() => setOpen(!open)}
                            className="flex text-sm bg-neutral-primary rounded-full md:me-0 focus:ring-4 focus:ring-neutral-tertiary"
                        >
                            <img src="" alt="img" class="inline-block w-8 h-8 rounded-full ring-2 ring-white outline -outline-offset-1 outline-black/5" />
                        </button>

                        {/* Dropdown */}
                        {open && (
                            <div className="z-50 bg-neutral-primary-medium border border-default-medium rounded-base shadow-lg w-44 absolute right-6 top-20">
                                <div className="px-4 py-3 text-sm border-b border-default">
                                    <span className="block text-heading font-medium">
                                        Joseph McFall
                                    </span>
                                    <span className="block text-body truncate">
                                        name@flowbite.com
                                    </span>
                                </div>

                                <ul className="p-2 text-sm text-body font-medium">
                                    <li><a href="#" className="block p-2">Dashboard</a></li>
                                    <li><a href="#" className="block p-2">Settings</a></li>
                                    <li><a href="#" className="block p-2">Earnings</a></li>
                                    <li><a href="#" className="block p-2">Sign out</a></li>
                                </ul>
                            </div>
                        )}

                        <button data-collapse-toggle="navbar-user" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary" aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h14" /></svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
                            <li>
                                <a href="#" className="block py-2 px-3  bg-brand rounded md:bg-transparent md:text-fg-brand md:p-0" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">About</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Services</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Pricing</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-heading rounded hover:bg-neutral-tertiary md:hover:bg-transparent md:border-0 md:hover:text-fg-brand md:p-0 md:dark:hover:bg-transparent">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div >
    )
}

export default Navbar


