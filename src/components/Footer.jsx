import logo from "../assets/images/logo.png"
import { Link } from "react-router-dom"
const Footer = () => {
    return (
        <footer className="bg-[#f8f9fa] text-slate-600 py-12 border-t border-slate-200 relative font-normal">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">

                    {/* Brand Info */}
                    <div className="flex flex-col space-y-4">
                        <img className="h-18 w-auto object-contain self-start" src={logo} alt="Vexon Logo" />
                        <p className="text-base leading-relaxed max-w-xs font-normal text-slate-600">
                            Your ultimate destination for compelling narratives, expert insights, and daily inspiration. Empowering voices and connecting readers worldwide.
                        </p>
                        {/* Social Icons */}
                        <div className="flex space-x-3 pt-2">
                            {['f', 'in', 'ig', 'dr', 'bē'].map((social, idx) => (
                                <a
                                    key={idx}
                                    href="#"
                                    className="w-8 h-8 rounded-full border border-slate-300 flex items-center justify-center text-slate-800 hover:text-purple-700 hover:border-purple-700 transition-colors text-xs font-normal"
                                >
                                    {social}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Explore Categories */}
                    <div>
                        <h4 className="text-slate-800 font-bold text-base mb-5">Explore Categories</h4>
                        <ul className="space-y-3 text-base font-normal">
                            <li><a href="#" className="hover:text-purple-700 transition-colors">Digital Marketing</a></li>
                            <li><a href="#" className="hover:text-purple-700 transition-colors">Ai & Technology</a></li>
                            <li><a href="#" className="hover:text-purple-700 transition-colors">Content Strategy</a></li>
                            <li><a href="#" className="hover:text-purple-700 transition-colors">Social Media</a></li>
                            <li><a href="#" className="hover:text-purple-700 transition-colors">SEO & Analytics</a></li>
                            <li><a href="#" className="hover:text-purple-700 transition-colors">Design & Development</a></li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-slate-800 font-bold text-[16px] mb-5">Quick Links</h4>
                        <ul className="space-y-3 text-base font-normal">
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-purple-700 transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blog"
                                    className="hover:text-purple-700 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/login"
                                    className="hover:text-purple-700 transition-colors">
                                    Login
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/register"
                                    className="hover:text-purple-700 transition-colors">
                                    Register
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-purple-700 transition-colors">
                                    Privacy & policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/"
                                    className="hover:text-purple-700 transition-colors">
                                    Terms of Services
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Us */}
                    <div>
                        <h4 className="text-slate-800 font-bold text-[16px] mb-5">Contact Us</h4>
                        <ul className="space-y-4 text-base font-normal">
                            <li className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-slate-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.92V6.75" /></svg>
                                <a href="mailto:support@vexon.com" className="hover:text-purple-700">support@blogify.com</a>
                            </li>
                            <li className="flex items-start space-x-3">
                                <svg className="w-5 h-5 text-slate-700 mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" /></svg>
                                <span className="leading-relaxed text-slate-600">8708 Technology Forest Pl<br />Suite 125 -G, The Woodlands,<br />TX 773</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="w-5 h-5 text-slate-700 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.47-5.112-3.758-6.58-6.58l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" /></svg>
                                <a href="tel:123-456-7890" className="hover:text-purple-700">123-456-7890</a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider Line */}
                <hr className="border-slate-200 my-6" />

                {/* Bottom Bar Content */}
                <div className="flex flex-col md:flex-row items-center justify-between text-[14px] text-slate-500 space-y-4 md:space-y-0 font-normal">
                    <div>
                        © 2025 Vexon, Inc. All Rights Reserved.
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-purple-700 transition-colors">Privacy Policy</a>
                        <span className="text-slate-300">|</span>
                        <a href="#" className="hover:text-purple-700 transition-colors">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;