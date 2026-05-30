import React from 'react';
import { FaHeart, FaShieldAlt, FaHandHoldingHeart } from 'react-icons/fa';

const VirtualAdoption = () => {
    const perks = [
        {
            icon: <FaHeart />,
            title: "Remote Sponsoring",
            desc: "বাসায় জায়গা নেই? কোনো সমস্যা নেই! দূর থেকেই যেকোনো পেটের মাসিক খাবার বা ভ্যাকসিনের স্পন্সর করো।"
        },
        {
            icon: <FaShieldAlt />,
            title: "Medical Coverage",
            desc: "অসুস্থ বা উদ্ধারকৃত প্রাণীদের জরুরি সার্জারি এবং লাইফ-সেভিং ট্রিটমেন্টের ফান্ডে সরাসরি কন্ট্রিবিউট করো।"
        },
        {
            icon: <FaHandHoldingHeart />,
            title: "Weekly Updates",
            desc: "তোমার স্পন্সর করা পেটটি কেমন আছে, তার লাইভ ভিডিও, ছবি এবং মেডিকেল রিপোর্ট সরাসরি ইমেইলে পেয়ে যাও।"
        }
    ];

    return (
        <section className="text-slate-300 py-16 px-4 md:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <span className="text-[#FF9505] text-xs font-semibold uppercase tracking-wider bg-[#FF9505]/10 px-3 py-1 rounded-full inline-block mb-4">
                            Cannot Adopt In Person?
                        </span>
                        <h2 className="text-3xl font-bold text-white mb-4">
                            Be a Hero Remotely with <span className="text-[#FF9505]">Virtual Adoption</span>
                        </h2>
                        <p className="text-slate-400 text-base leading-relaxed mb-6">
                            যদি তোমার ফ্ল্যাটে রেস্ট্রিকশন থাকে কিংবা কাজের ব্যস্ততায় ফুল-টাইম কেয়ার নেওয়া সম্ভব না হয়, তবুও তুমি একটি নিষ্পাপ প্রাণীর জীবন বদলে দিতে পারো। আমাদের ভার্চুয়াল স্পন্সরশিপ প্রোগ্রামের মাধ্যমে তাদের দায়িত্ব নাও।
                        </p>
                        <button className="bg-[#FF9505] text-black font-semibold px-6 py-2.5 rounded-lg transition-colors duration-300 hover:bg-[#ffb74d]">
                            Explore Virtual Sponsoring
                        </button>
                    </div>
                    <div className="space-y-4">
                        {perks.map((perk, index) => (
                            <div key={index} className="bg-[#1e293b] border border-slate-700/50 p-5 rounded-xl flex gap-4 transition-all duration-300 hover:border-[#FF9505]/40">
                                <div className="text-[#FF9505] text-xl bg-[#0f172a] w-10 h-10 rounded-lg flex items-center justify-center border border-slate-700 flex-shrink-0">
                                    {perk.icon}
                                </div>
                                <div>
                                    <h3 className="text-base font-semibold text-white mb-1">
                                        {perk.title}
                                    </h3>
                                    <p className="text-slate-400 text-sm leading-relaxed">
                                        {perk.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default VirtualAdoption;