import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaPaw } from 'react-icons/fa';

const SimplePetFeature = () => {
    return (
        <section className="bg-[#0f172a] text-white py-16 px-4 md:px-8 font-sans overflow-hidden">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="w-full md:w-1/2 relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-orange-500/10 rounded-3xl filter blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative border border-slate-800/80 bg-gradient-to-tr from-[#134e5e]/30 via-[#1e293b]/60 to-[#0f172a] p-6 sm:p-10 rounded-3xl shadow-2xl flex justify-center items-center backdrop-blur-sm transition-all duration-300 hover:border-slate-700">
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                            <Image
                                src="/pngwing.com (7).png"
                                alt="Pet Adoption Hero Banner"
                                fill
                                sizes="(max-w-900px) 100vw, 500px"
                                className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] transition-transform duration-500 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 space-y-5 text-center md:text-left">
                    <span className="text-[#FF9505] text-xs font-bold uppercase tracking-widest bg-[#FF9505]/10 px-3 py-1 rounded-full inline-block">
                        New Companion
                    </span>

                    <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Need a Partner for <br />
                        <span className="bg-gradient-to-r from-white via-slate-200 to-[#FF9505] bg-clip-text text-transparent">Crazy Adventures?</span>
                    </h2>

                    <p className="text-slate-400 text-sm md:text-base leading-relaxed font-normal">
                        I am Fluffy, Funny, and Ready to Turn Your Life Upside Down! Hi hooman! Yeah, you! Need someone to interrupt Zoom meetings, steal your snacks, and warm your heart all at once? Adopt me, and let us make life paw-some together!
                    </p>

                    <div className="pt-3">
                        <Link
                            href="/all-pets"
                            className="inline-flex items-center gap-2.5 bg-[#FF9505] text-black font-extrabold px-7 py-3.5 rounded-xl text-sm shadow-lg shadow-[#FF9505]/10 hover:bg-[#ffb74d] hover:shadow-[#FF9505]/20 active:scale-95 transition-all duration-200 group"
                        >
                            <span>Adopt this Goofy Floof</span>
                            <FaPaw className="text-xs transition-transform duration-300 group-hover:rotate-12" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SimplePetFeature;
