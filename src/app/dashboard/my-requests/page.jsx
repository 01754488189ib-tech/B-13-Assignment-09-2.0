"use client";

import React from 'react';
import { MdOutlineModeComment } from 'react-icons/md';

const MyRequestsPage = () => {
    const requests = [
        { id: 'REQ-901', destination: 'Sundarbans Custom Safari', date: 'May 28, 2026', budget: '$600', status: 'Approved' },
        { id: 'REQ-902', destination: 'Sylhet Tea Garden Photography Session', date: 'June 02, 2026', budget: '$180', status: 'Pending' },
    ];

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 text-slate-300 min-h-screen">
            <div className="mb-8 border-b border-slate-800 pb-4">
                <h2 className="text-2xl md:text-3xl font-black text-white">My Requests</h2>
                <p className="text-xs md:text-sm text-slate-500 mt-1">Track your custom adventure queries and bookings</p>
            </div>

            <div className="bg-[#0b1329]/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <table className="table w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-400 text-xs md:text-sm bg-slate-900/50">
                                <th className="p-4">Request ID</th>
                                <th className="p-4">Custom Goal / Destination</th>
                                <th className="p-4">Date</th>
                                <th className="p-4">Budget</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs md:text-sm">
                            {requests.map((req) => (
                                <tr key={req.id} className="hover:bg-slate-800/20 transition-colors">
                                    <td className="p-4 font-mono text-slate-400 font-bold">{req.id}</td>
                                    <td className="p-4 font-semibold text-white truncate max-w-[200px]">{req.destination}</td>
                                    <td className="p-4 text-slate-400">{req.date}</td>
                                    <td className="p-4 text-[#FF9505] font-bold">{req.budget}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyRequestsPage;