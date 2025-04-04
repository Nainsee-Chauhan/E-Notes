import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken, removeToken } from '../utils/Auth';
import toast, { Toaster } from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';

const Header = () => {
    const isLoggedIn = !!getToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        toast.success('You have been logged out successfully!');
        navigate("/");
    };

    return (
        <nav className="bg-gray-900 shadow-md">
            <Toaster position="top-right" />
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link to="/" className="text-3xl font-bold text-white">E-Notes</Link>
                <div className="hidden lg:flex lg:items-center lg:w-auto w-full flex-grow lg:w-auto">
                    
                    {/* <form className="flex items-center ml-auto mr-8">
                        <div className="relative">
                            <input
                                className="px-4 py-2 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                                type="search"
                                placeholder="Search notes..."
                                aria-label="Search"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-teal-400 transition-all"
                            >
                                <FaSearch />
                            </button>
                        </div>
                    </form> */}
                    <ul className="flex items-center space-x-4 ml-auto mr-4">
                        {isLoggedIn ? (
                            <li>
                            <button
                                onClick={handleLogout}
                                className="flex justify-content-end text-lg text-white hover:text-teal-400 transition-all"
                            >
                                <FaSignOutAlt className="mr-2 mt-1" /> Logout
                            </button>
                        </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="flex items-center text-lg text-white hover:text-teal-400 transition-all">
                                        <FaUser className="mr-2" /> Login
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/register" className="text-lg mr-6 text-white hover:text-gray-400">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
