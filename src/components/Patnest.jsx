import React from 'react';
import { FiHeart, FiShield, FiUsers, FiAward } from 'react-icons/fi';

const Patnest = () => {
    const highlights = [
        {
            id: 1,
            icon: <FiHeart />,
            title: "নতুন জীবন দিন",
            desc: "প্রতিটি অ্যাডপশন একটি গৃহহীন প্রাণীকে দেয় দ্বিতীয়বার বেঁচে থাকার সুযোগ। হয়ে উঠুন তাদের জীবনের আসল হিরো।",
            color: "from-rose-500/20 to-rose-500/5",
            iconColor: "text-rose-400"
        },
        {
            id: 2,
            icon: <FiUsers />,
            title: "কমিউনিটি নেটওয়ার্ক",
            desc: "হাজারো পেট প্রেমীদের সাথে যুক্ত হোন। শেয়ার করুন আপনার অভিজ্ঞতা, টিপস এবং মিষ্টি সব মুহূর্তের গল্প।",
            color: "from-blue-500/20 to-blue-500/5",
            iconColor: "text-blue-400"
        },
        {
            id: 3,
            icon: <FiShield />,
            title: "নিরাপদ ও ভেরিফাইড",
            desc: "আমাদের প্রতিটি পেটের হেলথ-চেকআপ, ভ্যাকসিন এবং ব্যাকগ্রাউন্ড নিখুঁতভাবে ভেরিফাই করেই লিস্টিং করা হয়।",
            color: "from-emerald-500/20 to-emerald-500/5",
            iconColor: "text-emerald-400"
        },
        {
            id: 4,
            icon: <FiAward />,
            title: "আজীবন সাপোর্ট",
            desc: "অ্যাডপ্ট করার পরেও পেট কেয়ার, বিহেভিওরাল ট্রেনিং এবং পুষ্টি নিয়ে আমাদের এক্সপার্ট গাইডেন্স পাবেন সবসময়।",
            color: "from-amber-500/20 to-amber-500/5",
            iconColor: "text-[#FF9505]"
        }
    ];

    return (
        <section className="bg-[#0f172a] text-slate-300 py-20 px-4 md:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-800 pb-10 mb-12 gap-6">
                    <div className="max-w-xl space-y-3">
                        <span className="text-[#FF9505] text-xs font-bold uppercase tracking-widest block">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                            একটি দায়িত্বশীল পরিবার গড়ে <br />
                            তুলুন <span className="text-[#FF9505]">আত্মবিশ্বাসের</span> সাথে
                        </h2>
                    </div>
                    <p className="text-slate-400 text-sm md:text-base max-w-sm leading-relaxed">
                        আমরা পোষা প্রাণী দত্তক নেওয়ার পুরো প্রক্রিয়াটিকে করেছি অত্যন্ত সহজ, স্বচ্ছ এবং নিরাপদ; যেন আপনার এবং আপনার নতুন বন্ধুর পথচলা সুন্দর হয়।
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {highlights.map((item) => (
                        <div
                            key={item.id}
                            className={`bg-gradient-to-br ${item.color} border border-slate-800/80 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-slate-700 hover:scale-[1.02] group`}
                        >
                            <div>
                                <div className={`w-12 h-12 rounded-xl bg-[#0f172a] ${item.iconColor} text-2xl flex items-center justify-center border border-slate-800 mb-6 transition-transform duration-300 group-hover:rotate-6`}>
                                    {item.icon}
                                </div>
                                <h3 className="text-lg font-bold text-white mb-3 tracking-wide">
                                    {item.title}
                                </h3>
                                <p className="text-slate-400 text-xs leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                            <div className="pt-6 flex justify-end text-slate-600 group-hover:text-[#FF9505] transition-colors">
                                <span className="text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    Learn More &rarr;
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default Patnest;