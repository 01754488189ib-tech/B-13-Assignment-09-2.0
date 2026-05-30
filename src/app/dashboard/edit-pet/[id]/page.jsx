"use client";

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import LoadingPage from '@/components/LoadingPage';

const EditPet = ({ params }) => {
    const resolvedParams = use(params);
    const id = resolvedParams.id;

    const router = useRouter();
    const [pet, setPet] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPetDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/pets/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setPet(data);
                } else {
                    toast.error("Pet data not found!");
                }
            } catch (error) {
                console.error("Error:", error);
                toast.error("Failed to load pet data");
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchPetDetails();
    }, [id]);

    const handleUpdatePet = async (e) => {
        e.preventDefault();
        const form = e.target;

        const updatedPet = {
            petName: form.petName.value,
            species: form.species.value,
            breed: form.breed.value,
            age: form.age.value,
            gender: form.gender.value,
            imageUrl: form.imageUrl.value,
            healthStatus: form.healthStatus.value,
            vaccinationStatus: form.vaccinationStatus.value,
            location: form.location.value,
            adoptionFee: form.adoptionFee.value,
            description: form.description.value,
            ownerEmail: pet.ownerEmail
        };

        try {
            const response = await fetch(`http://localhost:5000/pets/${id}`, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(updatedPet)
            });

            if (response.ok) {
                toast.success("Pet updated successfully!");
                router.push('/dashboard/my-listings');
            } else {
                toast.error("Failed to update pet.");
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error("Something went wrong!");
        }
    };

    if (isLoading) return <div className="text-center py-20 text-slate-400 animate-pulse"><LoadingPage /></div>;
    if (!pet) return <div className="text-center py-20 text-rose-400">No data found.</div>;

    return (
        <div className="w-full max-w-4xl mx-auto px-4 py-8 text-slate-300 min-h-screen">
            <div className="mb-8 border-b border-slate-800 pb-4">
                <h2 className="text-2xl md:text-3xl font-black text-white">Update Pet Details</h2>
                <p className="text-xs md:text-sm text-slate-500 mt-1">Modify info for {pet.petName}</p>
            </div>
            <form onSubmit={handleUpdatePet} className="space-y-6 bg-[#0b1329]/80 border border-slate-800 p-6 rounded-xl shadow-xl">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">Pet Name</label>
                        <input
                            type="text"
                            name="petName"
                            defaultValue={pet.petName}
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">Species</label>
                        <input
                            type="text"
                            name="species"
                            defaultValue={pet.species}
                            placeholder="Dog/Cat/Bird"
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">Breed</label>
                        <input
                            type="text"
                            name="breed"
                            defaultValue={pet.breed}
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">Age</label>
                        <input
                            type="text"
                            name="age"
                            defaultValue={pet.age}
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">Gender</label>
                        <select
                            name="gender"
                            defaultValue={pet.gender}
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">Health Status</label>
                        <input
                            type="text"
                            name="healthStatus"
                            defaultValue={pet.healthStatus}
                            placeholder="Healthy/Injured"
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">Vaccination Status</label>
                        <input
                            type="text"
                            name="vaccinationStatus"
                            defaultValue={pet.vaccinationStatus}
                            placeholder="Vaccinated/Not Vaccinated"
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">Location</label>
                        <input
                            type="text"
                            name="location"
                            defaultValue={pet.location}
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-slate-400 mb-2">Adoption Fee ($)</label>
                        <input
                            type="number"
                            name="adoptionFee"
                            defaultValue={pet.adoptionFee}
                            required
                            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">Image URL</label>
                    <input
                        type="url"
                        name="imageUrl"
                        defaultValue={pet.imageUrl}
                        required
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-400 mb-2">Description</label>
                    <textarea
                        name="description"
                        rows="4"
                        defaultValue={pet.description}
                        required
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#FF9505]"
                    ></textarea>
                </div>

                <div>
                    <label className="block text-xs font-bold text-slate-500 mb-2">Owner Email (Read Only)</label>
                    <input
                        type="email"
                        value={pet.ownerEmail}
                        readOnly
                        className="w-full bg-slate-950 border border-slate-800/50 rounded-lg p-3 text-sm text-slate-500 cursor-not-allowed outline-none"
                    />
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        className="flex-1 bg-[#FF9505] text-black py-3 rounded-xl text-sm font-bold hover:bg-[#ff9d1c] transition-all"
                    >
                        Update Pet Profile
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/dashboard/my-listings')}
                        className="px-6 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-all"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPet;