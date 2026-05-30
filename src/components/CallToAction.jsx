import Link from 'next/link';
import React from 'react';
import { FaArrowRight, FaPaw } from 'react-icons/fa';

const CallToAction = () => {
    return (
        <section className="bg-[#0f172a] py-12 px-4 md:px-8 font-sans">
            <div className="max-w-5xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-[#1e293b]/80 via-[#0f172a] to-[#1e293b]/40 p-8 md:p-14 text-center group shadow-2xl">
                    <div className="flex justify-center gap-8 mb-6">
                        <div className="relative inline-flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#FF9505]/10 text-[#FF9505] text-lg flex items-center justify-center animate-bounce">
                                <FaPaw />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#FF9505]/10 text-[#FF9505] text-base flex items-center justify-center absolute left-10 top-6 animate-bounce [animation-delay:0.2s]">
                                <FaPaw />
                            </div>
                        </div>
                        <div className="relative inline-flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full bg-[#FF9505]/10 text-[#FF9505] text-lg flex items-center justify-center animate-bounce [animation-delay:0.4s]">
                                <FaPaw />
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#FF9505]/10 text-[#FF9505] text-base flex items-center justify-center absolute left-10 top-6 animate-bounce [animation-delay:0.6s]">
                                <FaPaw />
                            </div>
                        </div>
                    </div>
                    <div className="max-w-2xl mx-auto space-y-4 relative z-10">
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                            একটি নিঃসঙ্গ প্রাণীর <br className="sm:hidden" />
                            আসল <span className="text-[#FF9505]">আশ্রয় হোন</span>
                        </h2>
                        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
                            আপনার ঘরের ছোট একটি কোণ একটি অবলা প্রাণীর পুরো পৃথিবী বদলে দিতে পারে। আর দেরি না করে আজই যুক্ত হোন আমাদের ভেরিফাইড পেট লাভার কমিউনিটিতে।
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 relative z-10">
                        <Link
                            href="/all-pets"
                            className="w-full sm:w-auto bg-[#FF9505] text-black font-bold px-8 py-3.5 rounded-xl text-sm shadow-lg shadow-[#FF9505]/10 hover:bg-[#ffb74d] hover:shadow-[#FF9505]/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group/btn"
                        >
                            পেট ব্রাউজ করুন
                            <FaArrowRight className="text-xs transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </Link>
                        <Link
                            href="/register"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-slate-700 font-semibold text-sm text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600 active:scale-95 transition-all duration-200 flex items-center justify-center"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </Link>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default CallToAction;