import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Banner = () => {
    return (
        <section className="text-slate-300 py-16 md:py-24 px-4 md:px-8 font-sans overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left space-y-6">
                    <span className="text-[#FF9505] text-xs font-semibold uppercase tracking-wider bg-[#FF9505]/10 px-3 py-1 rounded-full inline-block">
                        Find Your Forever Friend
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                        Your Perfect Partner <br />
                        Is Waiting <span className="text-[#FF9505]">To Adopt</span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                        একটি অবলা প্রাণীর জীবন বদলে দিন এবং আপনার পরিবারে নিয়ে আসুন সীমাহীন আনন্দ। আমাদের প্ল্যাটফর্মের মাধ্যমে সহজেই আপনার পছন্দের পোষা প্রাণীটি খুঁজে নিন।
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-2">
                        <Link
                            href="/all-pets"
                            className="bg-[#FF9505] text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-[#ffb74d] text-center min-w-[140px]"
                        >
                            Adopt Now
                        </Link>
                    </div>
                </div>
                <div className="w-full hover:scale-105 transition duration-300 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-md lg:max-w-xl aspect-[1.3/1]">
                        <Image
                            src="/pngwing.com.png"
                            alt="Pet Adoption Hero Banner"
                            width={500}
                            height={400}
                            className="object-contain object-center"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Banner;