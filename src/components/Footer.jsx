import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaHeart } from 'react-icons/fa';
import { GiJumpingDog } from 'react-icons/gi';
import { GoDot } from 'react-icons/go';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        explore: [
            { name: 'Home', href: '/' },
            { name: 'Pet Adaptation', href: '/adaptation' },
            { name: 'Pet Care Guide', href: '/petcare' },
            { name: 'Virtual Adoption', href: '/virtual-adoption' },
        ],
        support: [
            { name: 'Contact Us', href: '/contact' },
            { name: 'FAQs', href: '/faqs' },
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
        ]
    };

    return (
        <footer className="bg-[#0f172a] text-slate-400 font-sans border-t border-slate-800/80 pt-16 pb-8 px-4 md:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                            <Image
                                src="/logo.png"
                                alt="logo"
                                width={38}
                                height={38}
                                className="object-contain"
                            />
                            <h2 className="text-xl font-black flex items-center leading-none tracking-wide text-white">
                                <span>P</span>
                                <GoDot className="text-[10px] mx-0.5 translate-y-[2px] text-[#FF9505]" />
                                <span>A</span>
                                <GoDot className="text-[10px] mx-0.5 translate-y-[2px] text-[#FF9505]" />
                                <span>P</span>
                                <GiJumpingDog className="text-xl ml-1.5 text-[#FF9505] self-center" />
                            </h2>
                        </Link>
                        <p className="text-xs leading-relaxed text-slate-400">
                            আমাদের লক্ষ্য প্রতিটি গৃহহীন প্রাণীকে একটি নিরাপদ আশ্রয় এবং ভালোবাসার পরিবার উপহার দেওয়া। আপনার একটু সচেতনতাই বদলে দিতে পারে একটি নিষ্পাপ জীবন।
                        </p>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF9505] pl-3">
                            Explore
                        </h3>
                        <ul className="space-y-2.5 text-xs">
                            {footerLinks.explore.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="hover:text-[#FF9505] transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-[#FF9505] pl-3">
                            Support
                        </h3>
                        <ul className="space-y-2.5 text-xs">
                            {footerLinks.support.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="hover:text-[#FF9505] transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-4">
                            <h3 className="text-sm font-bold text-white uppercase tracking-wider border-l-2 border-[#FF9505] pl-3">
                                Connect With Us
                            </h3>
                            <div className="space-y-2.5 text-xs text-slate-400">
                                <p>
                                    Developer: <span className="text-white font-semibold">ইব্রাহিম খলিলুল্লাহ</span>
                                </p>
                                <p className="leading-relaxed">
                                    যেকোনো প্রয়োজনে কল করুন:<br />
                                    <span className="text-white font-medium">01754488189</span>
                                </p>
                                <p className="leading-relaxed">
                                    যেকোনো প্রয়োজনে ইমেইল করুন:<br />
                                    <span className="text-white font-medium">01754488189ib@gmail.com</span>
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3 pt-2">
                            {[
                                { icon: <FaFacebookF />, href: 'https://www.facebook.com/' },
                                { icon: <FaTwitter />, href: 'https://x.com/' },
                                { icon: <FaInstagram />, href: 'https://www.instagram.com/?hl=bn' },
                                { icon: <FaLinkedinIn />, href: 'https://bd.linkedin.com/' },
                            ].map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 rounded-lg bg-[#1e293b] border border-slate-700/50 flex items-center justify-center text-slate-400 hover:text-black hover:bg-[#FF9505] hover:border-[#FF9505] transition-all duration-300 text-sm"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                </div>
                <div className="border-t border-slate-800/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
                    <p>&copy; {currentYear} PAP. All rights reserved.</p>
                    <p className="flex items-center gap-1">
                        Made with <FaHeart className="text-rose-500 animate-pulse" /> for helpless animals.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default Footer;