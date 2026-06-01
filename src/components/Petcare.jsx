import Image from 'next/image';
import React from 'react';
import {
    FaDog,
    FaHome,
    FaWallet,
    FaFileContract,
    FaUserClock,
    FaAward
} from 'react-icons/fa';

const Petcare = () => {
    const tips = [
        {
            id: 1,
            icon: <FaDog />,
            title: "Breed & Lifestyle Alignment",
            desc: "শুধু কিউট দেখেই পেট সিলেক্ট করো না। তোমার ডেইলি রুটিন এবং ফ্ল্যাটের সাইজের সাথে ম্যাচ করে সঠিক ব্রিড বেছে নাও।"
        },
        {
            id: 2,
            icon: <FaHome />,
            title: "Foster Before Adoption",
            desc: "সরাসরি কেনার আগে কয়েকদিনের জন্য ট্রায়াল রান বা ফস্টার করতে পারো। এতে ফ্যামিলির সবার কমফোর্ট ও অ্যালার্জির ইস্যু চেক করা যাবে।"
        },
        {
            id: 3,
            icon: <FaWallet />,
            title: "Emergency Financial Buffer",
            desc: "শুধু খাবারের খরচ ভাবলেই হবে না; হুট করে অসুস্থতা বা সার্জারির খরচের জন্য একটা মেডিকেল ইমার্জেন্সি ফান্ড আলাদা রাখা জরুরি।"
        },
        {
            id: 4,
            icon: <FaFileContract />,
            title: "Housing & Legal Regulations",
            desc: "তুমি যে সোসাইটি বা ফ্ল্যাটে আছো, সেখানে পোষা প্রাণী রাখার অনুমতি আছে কি না তা আইনি বা সামাজিক ঝামেলা এড়াতে আগেই নিশ্চিত করো।"
        },
        {
            id: 5,
            icon: <FaUserClock />,
            title: "Preventing Separation Anxiety",
            desc: "প্রথম থেকেই পেটকে দিনে অন্তত ১-২ ঘণ্টা একা থাকার অভ্যাস করাও, যাতে তুমি বাইরে গেলে সে ডিপ্রেশন বা চরম একাকীত্বে না ভোগে।"
        },
        {
            id: 6,
            icon: <FaAward />,
            title: "Early Behavioral Training",
            desc: "ছোটবেলা থেকেই পটি ট্রেইনিং এবং কামড়ানো-আঁচড়ানো বন্ধ করার গাইডেন্স দাও। ভুল করলে বকা না দিয়ে ভালো কাজের জন্য রিওয়ার্ড (Treat) দাও।"
        }
    ];

    return (
        <div className="text-slate-300 min-h-screen py-16 px-4 md:px-8 font-sans">
            <div className="max-w-6xl mx-auto">

                <header className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[#FF9505] text-xs font-semibold uppercase tracking-wider bg-[#FF9505]/10 px-3 py-1 rounded-full inline-block mb-4">
                        Pet Buying Guide
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Essential <span className="text-[#FF9505]">Before You Buy</span> Tips
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                        আমাদের দেওয়া এই ইউনিক গাইডলাইনগুলো একটি নতুন পোষা প্রাণী কেনার আগে তোমাকে সঠিক সিদ্ধান্ত নিতে সাহায্য করবে।
                    </p>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {tips.map((tip) => (
                            <section
                                key={tip.id}
                                className="bg-[#1e293b]/60 border border-slate-700/50 hover:border-[#FF9505]/40 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="text-[#FF9505] text-xl mb-4 bg-[#0f172a] w-10 h-10 rounded-lg flex items-center justify-center border border-slate-700">
                                        {tip.icon}
                                    </div>
                                    <h2 className="text-base font-semibold text-white mb-2">
                                        {tip.title}
                                    </h2>
                                    <p className="text-slate-400 text-xs leading-relaxed">
                                        {tip.desc}
                                    </p>
                                </div>
                            </section>
                        ))}
                    </div>

                    <div className="w-full relative group flex flex-col justify-center">
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-orange-500/10 rounded-3xl filter blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                        <div className="relative h-full border border-slate-800/80 bg-gradient-to-tr from-[#134e5e]/20 via-[#1e293b]/40 to-[#0f172a] p-6 sm:p-10 rounded-3xl shadow-2xl flex justify-center items-center backdrop-blur-sm transition-all duration-300 hover:border-slate-700">
                            <div className="relative w-full max-w-md lg:max-w-full aspect-[16/19] flex items-center justify-center">
                                <Image
                                    src="/pngwing.com (1).png"
                                    alt="Pet Adoption Hero Banner"
                                    fill
                                    sizes="(max-w-1024px) 100vw, 600px"
                                    className="object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.4)] transition-transform duration-500 group-hover:scale-105"
                                    priority
                                />
                            </div>
                        </div>
                    </div>

                </main>

            </div>
        </div>
    );
};

export default Petcare;