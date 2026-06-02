"use client";

import dynamic from "next/dynamic";

const AddPetsForm = dynamic(() => import("@/components/AddPetsForm"), {
    ssr: false,
    loading: () => (
        <div className="w-full max-w-4xl mx-auto p-6 md:p-10 bg-[#0f172a] rounded-2xl border border-slate-800 flex justify-center items-center min-h-[400px]">
            <div className="text-[#FF9505] animate-pulse font-medium text-sm tracking-wider">Loading Form UI...</div>
        </div>
    ),
});

export default function AddPetsPage() {
    return <AddPetsForm />;
}