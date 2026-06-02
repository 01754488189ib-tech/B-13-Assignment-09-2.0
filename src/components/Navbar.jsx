"use client";

import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';
import { FaUserNinja, FaListUl } from 'react-icons/fa';

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user || null;

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: async () => {
                    try {
                        await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/logout`, {
                            method: 'POST',
                            credentials: 'include'
                        });
                    } catch (err) {
                        console.error("JWT logout sync failed:", err);
                    }
                    toast.success("Successfully logged out! See you soon.");
                },
            },
        });
    };

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'All Pets', href: '/all-pet' },
        { name: 'My Requests', href: '/dashboard/my-requests' },
        { name: 'Add Pet', href: '/dashboard/add-pets' },
    ];

    return (
        <div className="container mx-auto px-4 sticky top-0 z-[9999]">
            <div className="navbar rounded-xl my-4 px-3 md:px-5 gap-2 md:gap-4 text-slate-300 border border-slate-800 shadow-xl min-h-[4rem] backdrop-blur-md">
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
                                Pet<span className="text-[#FF9505]">House</span>
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
                    {isPending ? (
                        <div className="flex items-center justify-center px-2">
                            <span className="loading loading-spinner text-[#FF9505] loading-sm"></span>
                        </div>
                    ) : user ? (
                        <div className="dropdown dropdown-end">
                            <button tabIndex={0} role="button" className="btn btn-ghost hover:bg-slate-800 transition-colors flex items-center gap-2 px-2 h-auto min-h-0 py-1 rounded-xl">
                                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full ring-2 ring-[#FF9505] ring-offset-2 ring-offset-slate-800 overflow-hidden bg-slate-800 flex items-center justify-center relative">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || "User Profile"}
                                            fill
                                            sizes="(max-width: 768px) 32px, 36px"
                                            className="object-cover"
                                        />
                                    ) : (
                                        <FaUserNinja className="text-sm md:text-base text-slate-400" />
                                    )}
                                </div>
                                <div className="text-left hidden sm:block max-w-[100px]">
                                    <p className="text-[11px] font-bold text-gray-300 leading-tight truncate">
                                        <span className="text-[#FF9505]">Hi, </span>
                                        {user.name || "User"}
                                    </p>
                                </div>
                            </button>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-[#1e293b] text-slate-300 rounded-lg mt-4 w-48 md:w-52 p-2 shadow-2xl border border-slate-700 font-medium z-[10000]">
                                <li className="px-3 py-1.5 md:py-2 border-b border-slate-700/55 mb-1">
                                    <p className="text-[11px] font-bold text-gray-400 block truncate">
                                        <span className="truncate">{user.email}</span>
                                    </p>
                                    <p className="text-[10px] text-slate-500 truncate mt-0.5 sm:block hidden">Hi, {user.name || 'User'}</p>
                                </li>
                                <li><Link href="/dashboard/my-listings" className="py-2 hover:bg-slate-800 hover:text-white rounded-md transition-colors text-xs md:text-sm">Dashboard</Link></li>
                                <div className="divider my-1 border-slate-700/50 before:bg-slate-700/50 after:bg-slate-700/50"></div>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="py-2 text-rose-400 hover:bg-rose-500/10 rounded-md transition-colors w-full text-left text-xs md:text-sm">
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <Link href="/login">
                            <button className="bg-[#FF9505] text-black px-4 md:px-5 py-2 rounded-xl text-xs font-bold hover:bg-[#ff9d1c] transition-all shadow-lg shadow-[#FF9505]/10 whitespace-nowrap cursor-pointer">
                                Login
                            </button>
                        </Link>
                    )}
                    <div className="dropdown dropdown-end lg:hidden">
                        <button tabIndex={0} role="button" className="btn btn-ghost btn-circle hover:bg-slate-800 w-9 h-9 md:w-10 md:h-10 flex items-center justify-center text-slate-300">
                            <FaListUl className="text-lg" />
                        </button>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-[#1e293b] text-slate-300 rounded-lg mt-4 w-48 p-2 shadow-2xl border border-slate-700 font-medium z-[10000]">
                            {navLinks.map((link, idx) => (
                                <li key={idx}>
                                    <Link
                                        href={link.href}
                                        className="py-2 hover:bg-slate-800 hover:text-[#FF9505] rounded-md transition-colors text-xs md:text-sm">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;