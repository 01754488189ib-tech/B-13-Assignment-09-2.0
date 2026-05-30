import React from 'react';
import Image from 'next/image';
import AdoptionForm from '@/components/AdoptionModal';

const PetDetailsPage = async ({ params }) => {
    const { id } = await params;
    let pet = null;
    let errorMsg = null;

    try {
        const res = await fetch(`http://localhost:5000/pets/${id}`, { cache: 'no-store' });

        if (!res.ok) {
            errorMsg = `Server responded with status: ${res.status}`;
        } else {
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                pet = await res.json();
            } else {
                errorMsg = "Received non-JSON response from server.";
            }
        }
    } catch (error) {
        console.error("Fetch error:", error);
        errorMsg = "Failed to connect to the server.";
    }

    if (errorMsg || !pet) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-slate-100 p-4">
                <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800 text-center max-w-md shadow-xl">
                    <h2 className="text-xl font-bold text-rose-500 mb-2">Pet Details Unavailable</h2>
                    <p className="text-slate-400 text-sm mb-4">{errorMsg || "The pet you are looking for does not exist."}</p>
                    <p className="text-xs text-slate-500">Requested ID: <span className="text-amber-500 font-mono">{id}</span></p>
                </div>
            </div>
        );
    }

    const currentUser = {
        name: "Ibrahim Khalilullah",
        email: "01754488189ib@gmail.com"
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-[#0b1329] border border-slate-800 rounded-2xl overflow-hidden shadow-xl p-6 md:p-8">
                    <div className="relative h-96 w-full rounded-xl overflow-hidden bg-[#0f172a] mb-6">
                        <Image
                            src={pet.imageUrl}
                            alt={pet.petName}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                        <h1 className="text-3xl font-bold text-white">{pet.petName}</h1>
                        <div className="flex gap-2">
                            <span className="bg-[#FF9505]/10 text-[#FF9505] text-sm font-semibold px-3 py-1 rounded-md border border-[#FF9505]/20">
                                {pet.species}
                            </span>
                            <span className="bg-emerald-500/10 text-emerald-400 text-sm font-semibold px-3 py-1 rounded-md border border-emerald-500/20">
                                {pet.healthStatus || 'Healthy'}
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 bg-[#0f172a] p-4 rounded-xl border border-slate-800/60">
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase">Breed</p>
                            <p className="text-slate-200 font-medium">{pet.breed}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase">Age</p>
                            <p className="text-slate-200 font-medium">{pet.age} {parseInt(pet.age) > 1 ? 'years' : 'year'} old</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase">Gender</p>
                            <p className="text-slate-200 font-medium">{pet.gender}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase">Vaccination</p>
                            <p className="text-slate-200 font-medium text-sm">{pet.vaccinationStatus}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase">Location</p>
                            <p className="text-slate-200 font-medium text-sm truncate">{pet.location}</p>
                        </div>
                        <div>
                            <p className="text-slate-500 text-xs font-semibold uppercase">Adoption Fee</p>
                            <p className="text-[#FF9505] font-bold">
                                {parseInt(pet.adoptionFee) === 0 ? 'Free' : `$${pet.adoptionFee}`}
                            </p>
                        </div>
                    </div>
                    <div className="border-t border-slate-800/60 pt-6">
                        <h3 className="text-lg font-bold text-white mb-2">Description</h3>
                        <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                            {pet.description || "No description provided."}
                        </p>
                    </div>
                </div>
                <AdoptionForm pet={pet} currentUser={currentUser} />
            </div>
        </div>
    );
};

export default PetDetailsPage;