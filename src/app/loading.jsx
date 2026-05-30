"use client";
import Image from 'next/image';
import React from 'react';

const LoadingPage = () => {
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-[#0b0f19] via-[#0f172a] to-[#1e1b4b] flex flex-col items-center justify-center gap-8 px-4 select-none relative overflow-hidden">

            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#FF9505]/10 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse pointer-events-none delay-1000" />

            <div className="relative group">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#FF9505] to-indigo-500 opacity-30 blur-md animate-[spin_4s_linear_infinite]" />

                <div className="absolute inset-0 rounded-full bg-[#FF9505]/20 blur-xl scale-110" />

                <div className="relative w-36 h-36 md:w-44 md:h-44 bg-[#0f172a]/80 backdrop-blur-xl rounded-full p-4 flex items-center justify-center border border-white/10 shadow-2xl shadow-[#FF9505]/10 animate-[pulse_2s_ease-in-out_infinite]">
                    <Image
                        src="/pngwing.com (7).png"
                        alt="Loading..."
                        fill
                        priority
                        className="object-contain p-6 drop-shadow-[0_0_15px_rgba(255,149,5,0.4)]"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center gap-4 max-w-xs w-full mt-4 relative z-10">
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 text-xs md:text-sm font-bold tracking-[0.2em] uppercase animate-pulse">
                    Bringing up your buddies...
                </p>

                <div className="h-[3px] w-full bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                    <div className="h-full bg-gradient-to-r from-[#FF9505] via-amber-400 to-[#FF9505] rounded-full w-full animate-[shimmer_1.5s_infinite] origin-left shadow-[0_0_12px_#FF9505]"
                        style={{
                            backgroundImage: 'linear-gradient(90deg, transparent 0%, #FF9505 50%, transparent 100%)',
                            backgroundSize: '200% 100%'
                        }}
                    />
                </div>
            </div>

            <style jsx global>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
};

export default LoadingPage;