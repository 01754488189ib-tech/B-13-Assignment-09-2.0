"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt } from 'react-icons/fa';
import LoadingPage from '@/components/LoadingPage';

const AllPetsPage = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState('');

    const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Others'];

    useEffect(() => {
        const fetchPets = async () => {
            setLoading(true);
            try {
                const apiBase = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
                const speciesParam = selectedSpecies && selectedSpecies !== 'All' ? `&species=${selectedSpecies}` : '';
                const res = await fetch(`${apiBase}/pets?search=${search}${speciesParam}`);
                if (res.ok) {
                    const data = await res.json();
                    setPets(data);
                }
            } catch (err) {
                console.error("Error loading pet list:", err);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchPets();
        }, 300);

        return () => clearTimeout(timer);
    }, [search, selectedSpecies]);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-300 py-12 px-4 md:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-2xl font-black text-white">All Available Pets</h2>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">Find your new furry or feathered best friend</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md border border-slate-700 bg-[#0f172a] rounded-lg p-1">
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-transparent px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
                            placeholder="Search pets by name..."
                        />

                        <div className="hidden sm:block h-6 w-[1px] bg-slate-700"></div>

                        <select
                            value={selectedSpecies}
                            onChange={(e) => setSelectedSpecies(e.target.value)}
                            className="w-full sm:w-auto bg-transparent px-3 py-2 text-sm text-slate-300 font-medium cursor-pointer focus:outline-none"
                        >
                            <option value="All" className="bg-[#0f172a] text-slate-200">
                                All Species
                            </option>
                            {speciesOptions.map((species) => (
                                <option key={species} value={species} className="bg-[#0f172a] text-slate-200">
                                    {species}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="py-20">
                        <LoadingPage />
                    </div>
                ) : pets.length === 0 ? (
                    <div className="text-center py-20 bg-[#0b1329]/50 border border-slate-800 rounded-2xl">
                        <p className="text-slate-500 text-sm">No pets found matching your criteria.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {pets.map((pet) => (
                            <div
                                key={pet._id}
                                className="bg-[#0b1329] border border-slate-800 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700 hover:scale-[1.01] transition-all duration-200 flex flex-col justify-between"
                            >
                                <div className="relative h-64 w-full bg-[#0f172a]">
                                    <img
                                        src={pet.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'}
                                        alt={pet.petName}
                                        className="object-cover w-full h-full"
                                    />
                                    {pet.status === "adopted" && (
                                        <div className="absolute inset-0 bg-black/65 backdrop-blur-sm flex items-center justify-center">
                                            <span className="bg-[#FF9505] text-black text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-[#FF9505]/20 shadow-lg">
                                                Adopted
                                            </span>
                                        </div>
                                    )}
                                </div>
                                <div className="p-6 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-xl font-bold text-white truncate max-w-[150px]">{pet.petName}</h3>
                                            <span className="bg-[#FF9505]/10 text-[#FF9505] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#FF9505]/20">
                                                {pet.species}
                                            </span>
                                        </div>
                                        <p className="text-xs text-slate-500 mb-4">{pet.breed || "Unknown Breed"}</p>

                                        <div className="grid grid-cols-2 gap-4 text-xs text-slate-400 mb-6 border-t border-slate-800/60 pt-4">
                                            <p><span className="text-slate-500 font-semibold">Age:</span> {pet.age} {parseInt(pet.age) > 1 ? 'years' : 'year'}</p>
                                            <p><span className="text-slate-500 font-semibold">Gender:</span> {pet.gender}</p>
                                            <p className="col-span-2 flex items-center gap-1.5 text-slate-400 truncate">
                                                <FaMapMarkerAlt className="text-slate-500" />
                                                <span className="truncate">{pet.location}</span>
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between border-t border-slate-800/60 pt-4 mt-auto">
                                        <div>
                                            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Adoption Fee</p>
                                            <p className="text-base font-black text-[#FF9505] mt-0.5">
                                                {parseInt(pet.adoptionFee) === 0 ? "Free" : `$${pet.adoptionFee}`}
                                            </p>
                                        </div>
                                        <Link
                                            href={`/all-pet/${pet._id}`}
                                            className="bg-[#FF9505] text-black text-xs font-bold px-4 py-2 rounded-xl hover:bg-[#ff9d1c] transition-colors shadow-md shadow-[#FF9505]/10 cursor-pointer"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllPetsPage;