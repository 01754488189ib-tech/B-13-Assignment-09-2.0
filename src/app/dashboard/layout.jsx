import React from 'react';
import Link from 'next/link';
import { FaPaw, FaListUl, FaPlusCircle, FaHeart, FaUserAlt } from 'react-icons/fa';
import { IoGitPullRequestSharp } from 'react-icons/io5';

const DashboardLayout = ({ children }) => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

            <div className="drawer-content flex flex-col min-h-screen bg-[#0b1329]">
                <div className="w-full flex items-center justify-between bg-[#0f172a] border-b border-slate-800 px-4 py-3 lg:hidden">
                    <label htmlFor="dashboard-drawer" className="btn btn-square btn-ghost text-white drawer-button">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                    <div className="flex items-center gap-2 font-black text-white text-lg">
                        <FaPaw className="text-[#FF9505]" />
                        <span>PetHouse</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-sm">
                        <FaUserAlt />
                    </div>
                </div>

                <main className="flex-1 p-4 md:p-8 overflow-y-auto">
                    {children}
                </main>
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="dashboard-drawer" aria-label="close sidebar" className="drawer-overlay"></label>

                <div className="menu p-6 w-72 min-h-full bg-[#0f172a] border-r border-slate-800/80 text-slate-300 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 px-2 mb-8 hidden lg:flex">
                            <div className="w-9 h-9 rounded-xl bg-[#FF9505]/10 flex items-center justify-center text-[#FF9505] text-lg">
                                <FaPaw />
                            </div>
                            <span className="font-black text-xl text-white tracking-wider">PetHouse</span>
                        </div>
                        <ul className="space-y-2 font-medium tracking-wide">
                            <li>
                                <Link
                                    href="/dashboard/add-pets"
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-[#FF9505]/10 hover:text-[#FF9505] focus:bg-[#FF9505] focus:text-black active:scale-95"
                                >
                                    <FaPlusCircle className="text-lg" />
                                    <span>Add Pet</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/my-listings"
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-[#FF9505]/10 hover:text-[#FF9505] focus:bg-[#FF9505] focus:text-black active:scale-95"
                                >
                                    <FaListUl className="text-lg" />
                                    <span>My Listings</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/my-requests"
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-[#FF9505]/10 hover:text-[#FF9505] focus:bg-[#FF9505] focus:text-black active:scale-95"
                                >
                                    <IoGitPullRequestSharp className="text-lg" />
                                    <span>My Requests</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard/favorites"
                                    className="flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 hover:bg-[#FF9505]/10 hover:text-[#FF9505] focus:bg-[#FF9505] focus:text-black active:scale-95"
                                >
                                    <FaHeart className="text-lg" />
                                    <span>Favorites</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="pt-4 border-t border-slate-800 flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-xl bg-[#FF9505]/10 border border-[#FF9505]/20 flex items-center justify-center text-[#FF9505]">
                            <FaUserAlt />
                        </div>
                        <div className="flex flex-col min-w-0">
                            <span className="text-sm font-bold text-white truncate">Ibrahim Khalilullah</span>
                            <span className="text-xs text-slate-500 truncate">Dashboard User</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardLayout;