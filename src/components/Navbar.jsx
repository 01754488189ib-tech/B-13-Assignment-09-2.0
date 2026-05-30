"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { BiCartDownload } from 'react-icons/bi';
import { FaUserNinja } from 'react-icons/fa';
import { MdOutlineTravelExplore } from 'react-icons/md';

const Navbar = () => {
    const [user, setUser] = useState(false);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Packages', href: '/packages' },
        { name: 'About Us', href: '/about' },
        { name: 'Dashboard', href: '/dashboard' },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sticky top-0 z-[9999]">
            {/* <div className="navbar rounded-xl my-4 px-3 md:px-5 gap-2 md:gap-4 text-slate-300 border border-slate-800 shadow-xl min-h-[4rem] backdrop-blur-md">
                <div className="flex-1 lg:flex-none">
                    <Link href="/" className="flex items-center gap-1.5 md:gap-2 hover:opacity-90 transition-opacity whitespace-nowrap">
                        <Image
                            src="/logo.png"
                            alt="logo"
                            width={40}
                            height={40}
                            className="object-contain w-8 h-8 md:w-10 md:h-10"
                        />
                        <div className="flex items-center gap-1">
                            <h2 className="text-base md:text-xl font-black tracking-tight text-white flex items-center">
                                Peak<span className="text-[#FF9505]">Adventure</span>
                            </h2>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 hidden lg:flex justify-center">
                    <ul className="menu menu-horizontal px-1 gap-1 font-medium">
                        {navLinks.map((link, idx) => (
                            <li key={idx}>
                                <Link
                                    href={link.href}
                                    className="hover:text-[#FF9505] hover:bg-slate-800 transition-all rounded-lg py-2 px-3.5 text-sm"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex-none flex items-center gap-1 md:gap-3">
                    <div className="dropdown dropdown-end">
                        <button tabIndex={0} role="button" className="btn btn-ghost btn-circle flex items-center justify-center hover:bg-slate-800 w-9 h-9 md:w-10 md:h-10">
                            <div className="indicator">
                                <BiCartDownload className="text-xl md:text-2xl text-slate-300" />
                                <span className="indicator-item bg-[#FF9505] text-black font-bold border-none w-4 h-4 flex items-center rounded-full justify-center text-[9px] md:text-[10px] p-0">
                                    5
                                </span>
                            </div>
                        </button>
                        <div
                            tabIndex={0}
                            className="card card-compact dropdown-content bg-[#1e293b] mt-4 w-52 md:w-56 shadow-2xl border border-slate-700 rounded-xl z-[10000]"
                        >
                            <div className="card-body p-4">
                                <span className="text-sm md:text-base font-bold text-white">5 Packages Selected</span>
                                <span className="text-xs md:text-sm text-slate-400">Subtotal: <span className="text-[#FF9505] font-semibold">$1250</span></span>
                                <div className="card-actions mt-2">
                                    <button className="btn bg-[#FF9505] text-black hover:bg-[#ff9d1c] border-none btn-block btn-sm min-h-[2.2rem] md:min-h-[2.5rem] font-bold rounded-lg text-xs md:text-sm">
                                        View Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {user ? (
                        <div className="dropdown dropdown-end">
                            <button tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar hover:bg-slate-800 transition-colors flex flex-col items-center w-9 h-9 md:w-10 md:h-10">
                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-[#FF9505] ring-offset-2 ring-offset-[#0b1329] overflow-hidden bg-slate-800 flex items-center justify-center">
                                    <FaUserNinja className="text-sm md:text-base text-slate-400" />
                                </div>
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-[#1e293b] text-slate-300 rounded-lg mt-4 w-48 md:w-52 p-2 shadow-2xl border border-slate-700 font-medium z-[10000]"
                            >
                                <li className="px-3 py-1.5 md:py-2 border-b border-slate-700/55 mb-1">
                                    <p className="text-[11px] font-bold text-gray-400 block truncate">Hi, Ibrahim</p>
                                    <p className="text-[10px] text-slate-500 truncate mt-0.5">ibrahim@example.com</p>
                                </li>
                                <li>
                                    <Link href="/profile" className="justify-between py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors text-xs md:text-sm">
                                        Profile
                                        <span className="bg-[#FF9505] text-black text-[9px] font-bold px-1.5 py-0.5 rounded scale-90">New</span>
                                    </Link>
                                </li>
                                <li><Link href="/dashboard" className="py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors text-xs md:text-sm">Dashboard</Link></li>
                                <div className="divider my-1 border-slate-700/50 before:bg-slate-700/50 after:bg-slate-700/50"></div>
                                <li>
                                    <button
                                        onClick={() => setUser(false)}
                                        className="py-2 text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors w-full text-left text-xs md:text-sm"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="bg-[#FF9505] text-black px-3.5 md:px-5 py-1.5 md:py-2 rounded-xl text-[10px] md:text-xs font-bold hover:bg-[#ff9d1c] transition-all shadow-lg shadow-[#FF9505]/10 whitespace-nowrap">
                                Login
                            </button>
                        </Link>
                    )}

                    <div className="dropdown dropdown-end lg:hidden">
                        <button tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-slate-800 w-9 h-9 md:w-10 md:h-10">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                        </button>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#1e293b] text-slate-300 rounded-lg mt-4 w-48 p-2 shadow-2xl border border-slate-700 font-medium z-[10000]">
                            {navLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="py-2 hover:bg-slate-800 hover:text-[#FF9505] rounded-md transition-colors text-xs md:text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            {!user && (
                                <li className="border-t border-slate-700/50 mt-1 pt-1">
                                    <Link href="/login" className="bg-[#FF9505] text-black font-bold justify-center hover:bg-[#ff9d1c] text-xs">
                                        Login
                                    </Link>
                                </li>
                            )}
                        </ul>
                    </div>

                </div>
            </div> */}
        </div>
    );
};

export default Navbar;