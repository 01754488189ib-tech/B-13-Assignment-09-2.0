"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const AdoptionForm = ({ pet, currentUser }) => {
    const router = useRouter();
    const [isPending, setIsPending] = useState(false);

    const handleAdoptionSubmit = async (e) => {
        e.preventDefault();
        setIsPending(true);

        const form = e.currentTarget;
        const formData = new FormData(form);
        const adoptionData = {
            petId: pet._id,
            petName: pet.petName,
            userName: currentUser.name,
            userEmail: currentUser.email,
            pickupDate: formData.get('pickupDate'),
            message: formData.get('message'),
            status: "pending"
        };

        try {
            const response = await fetch('http://localhost:5000/adoptions', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(adoptionData)
            });

            const result = await response.json();

            if (response.ok) {
                toast.success("Adoption request submitted successfully!");
                form.reset();
                router.refresh();
            } else {
                toast.error(result.message || "Failed to submit request.");
            }
        } catch (error) {
            console.error("Error submitting adoption form:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl h-fit sticky top-6 w-full">
            <h2 className="text-xl font-bold text-white mb-2 text-left">Adopt This Pet</h2>
            <p className="text-slate-400 text-xs mb-6 text-left">Fill out the details to send an adoption request.</p>

            <form onSubmit={handleAdoptionSubmit} className="space-y-4 text-left">
                <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Pet Name</label>
                    <input
                        type="text"
                        value={pet?.petName || ""}
                        readOnly
                        className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-2.5 text-slate-400 text-sm outline-none cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Your Name</label>
                    <input
                        type="text"
                        value={currentUser?.name || ""}
                        readOnly
                        className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-2.5 text-slate-400 text-sm outline-none cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase mb-1.5">Your Email</label>
                    <input
                        type="email"
                        value={currentUser?.email || ""}
                        readOnly
                        className="w-full bg-[#0f172a] border border-slate-800 rounded-xl px-4 py-2.5 text-slate-400 text-sm outline-none cursor-not-allowed"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">Pickup Date</label>
                    <input
                        type="date"
                        name="pickupDate"
                        required
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#FF9505] transition-colors"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-300 uppercase mb-1.5">Message to Owner</label>
                    <textarea
                        name="message"
                        rows="3"
                        placeholder="Why do you want to adopt this pet?"
                        required
                        className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-[#FF9505] transition-colors resize-none"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-[#FF9505] text-black text-sm font-bold shadow-lg shadow-[#FF9505]/10 hover:bg-[#ff9d1c] transition-all duration-200 outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isPending ? "Submitting..." : "Submit Adoption Request"}
                </button>
            </form>
        </div>
    );
};

export default AdoptionForm;