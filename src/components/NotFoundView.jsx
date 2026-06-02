"use client";

import Link from 'next/link';

export default function NotFoundView() {
    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-300 flex flex-col items-center justify-center p-5 font-sans text-center relative overflow-hidden">
            {/* Injecting original premium CSS keyframes and floating/shadow animations */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes floatGhost {
                    0%, 100% { transform: translateY(-20px); }
                    50% { transform: translateY(0); }
                }
                @keyframes shadowScale {
                    0%, 100% { opacity: 0.1; transform: scaleX(0.7); }
                    50% { opacity: 0.25; transform: scaleX(1.1); }
                }
                .custom-float-slow { animation: floatGhost 3.5s infinite ease-in-out; }
                .custom-shadow-slow { animation: shadowScale 3.5s infinite ease-in-out; }
            `}} />

            {/* Premium background glow effects */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-[#FF9505] to-orange-600 rounded-full filter blur-[120px] opacity-15 pointer-events-none"></div>

            <div className="z-10 space-y-8 max-w-xl">
                <div className="relative flex flex-col items-center select-none">
                    <h1 className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#FF9505] bg-[#FF9505]/10 px-4 py-1.5 rounded-full mb-4 border border-[#FF9505]/20">
                        Error Code: 404
                    </h1>
                    <h2 className="text-[10rem] md:text-[12rem] font-black text-white leading-none tracking-tighter custom-float-slow drop-shadow-[0_25px_25px_rgba(255,149,5,0.15)]">
                        404
                    </h2>
                    <div className="w-56 h-5 bg-black rounded-[100%] blur-xl custom-shadow-slow mt-2"></div>
                </div>

                <div className="space-y-3">
                    <h3 className="text-3xl font-extrabold md:text-4xl text-white tracking-tight">
                        পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
                    </h3>
                    <p className="text-sm md:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
                        দুঃখিত, আপনি যে লিংকটি খুঁজছেন তা সম্ভবত মুছে ফেলা হয়েছে অথবা ভুল ইউআরএল টাইপ করেছেন। চলুন আপনাকে আবার সঠিক রাস্তায় ফিরিয়ে নিয়ে যাই!
                    </p>
                </div>

                <div className="py-2">
                    <div className="inline-flex items-center gap-3 border border-slate-800/80 bg-[#1e293b]/40 backdrop-blur-sm px-6 py-3 rounded-xl shadow-inner">
                        <span className="opacity-40 text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400">Architect</span>
                        <span className="text-sm font-extrabold text-white tracking-wide">
                            Ibrahim Khalilullah
                        </span>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-700 font-semibold text-sm hover:bg-slate-800 hover:text-white hover:border-slate-600 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 transition-transform group-hover:-translate-x-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                        </svg>
                        Go Back
                    </button>

                    <Link
                        href="/"
                        className="w-full sm:w-auto bg-[#FF9505] text-black font-bold px-8 py-3 rounded-xl text-sm shadow-lg shadow-[#FF9505]/10 hover:bg-[#ffb74d] hover:shadow-[#FF9505]/20 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Back To Home
                    </Link>
                </div>
            </div>
        </div>
    );
}