import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';

const SuccessStories = () => {
    const stories = [
        {
            id: 1,
            name: "ইব্রাহিম খলিলুল্লাহ",
            role: "Pet Parent",
            petName: "Milo (Cat)",
            quote: "মাইলোকে অ্যাডপ্ট করার পর আমাদের পুরো বাসার পরিবেশটাই বদলে গেছে। ও এখন আমাদের পরিবারের একজন সদস্যের মতোই থাকে।"
        },
        {
            id: 2,
            name: "রাফসান আহমেদ",
            role: "Pet Parent",
            petName: "Rocky (Dog)",
            quote: "ভার্চুয়াল অ্যাডপশনের আইডিয়াটা দারুণ! সময়ের অভাবে নিজে পুষতে না পারলেও রকিকে স্পন্সর করে মানসিকভাবে অসম্ভব শান্তি পাই।"
        },
        {
            "id": 3,
            "name": "তানজিলা আক্তার",
            "role": "Pet Parent",
            "petName": "Luna (Cat)",
            "quote": "লুনাকে আমাদের বাসায় আনার সিদ্ধান্তটা জীবনের সেরা ছিল। ওর চঞ্চলতা আর ভালোবাসা আমাদের সারাদিনের ক্লান্তি দূর করে দেয়।"
        },
        {
            "id": 4,
            "name": "আসিফ রহমান",
            "role": "Pet Parent",
            "petName": "Coco (Dog)",
            "quote": "রাস্তা থেকে উদ্ধার হওয়া কোকো এখন আমাদের ঘরের ড্রয়িংরুমের রাজা! ওকে সুস্থ করে তোলার জার্নিটা ছিল অসাধারণ এক অনুভূতি।"
        }
    ];

    return (
        <section className="bg-[#0f172a] text-slate-300 py-16 px-4 md:px-8 font-sans">
            <div className="max-w-6xl mx-auto">
                <header className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-[#FF9505] text-xs font-semibold uppercase tracking-wider bg-[#FF9505]/10 px-3 py-1 rounded-full inline-block mb-4">
                        Happy Tails
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Success <span className="text-[#FF9505]">Stories</span>
                    </h1>
                    <p className="text-slate-400 text-base leading-relaxed">
                        আমাদের প্ল্যাটফর্মের মাধ্যমে যারা তাদের নতুন পরিবারের সদস্যকে খুঁজে পেয়েছেন, তাদের মুখ থেকেই শুনুন আনন্দের সেই গল্পগুলো।
                    </p>
                </header>
                <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {stories.map((story) => (
                        <div
                            key={story.id}
                            className="bg-[#1e293b] border border-slate-700/50 p-6 rounded-2xl flex flex-col sm:flex-row gap-6 items-center sm:items-start transition-all duration-300 hover:border-[#FF9505]/40"
                        >
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0 bg-[#0f172a]">
                                <FaUserGraduate
                                    className="text-[#FF9505] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl" />
                            </div>
                            <div className="flex-1 text-center sm:text-left space-y-3">

                                <p className="text-slate-300 text-sm leading-relaxed italic">
                                    {story.quote}
                                </p>
                                <div className="pt-2">
                                    <h3 className="text-base font-semibold text-white">
                                        {story.name}
                                    </h3>
                                    <p className="text-xs text-slate-400">
                                        {story.role} • <span className="text-[#FF9505]">{story.petName}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </main>
            </div>
        </section>
    );
};

export default SuccessStories;