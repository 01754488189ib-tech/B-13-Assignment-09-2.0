"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaSearch, FaMapMarkerAlt, FaFilter, FaTimes } from 'react-icons/fa';
import LoadingPage from '@/components/LoadingPage';

const AllPetsPage = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedSpecies, setSelectedSpecies] = useState([]);

    const speciesOptions = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Others'];

    const handleSpeciesSelect = (species) => {
        if (selectedSpecies.includes(species)) {
            setSelectedSpecies(selectedSpecies.filter(item => item !== species));
        } else {
            setSelectedSpecies([...selectedSpecies, species]);
        }
    };

    const clearFilters = () => {
        setSearch('');
        setSelectedSpecies([]);
    };

    useEffect(() => {
        const fetchPets = async () => {
            setLoading(true);
            try {
                const speciesParam = selectedSpecies.length > 0 ? `&species=${selectedSpecies.join(',')}` : '';
                const res = await fetch(`http://localhost:5000/pets?search=${search}${speciesParam}`);
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
                <header className="text-center max-w-2xl mx-auto mb-12">
                    <span className="text-[#FF9505] text-xs font-semibold uppercase tracking-wider bg-[#FF9505]/10 px-3 py-1 rounded-full inline-block mb-3">
                        Our Companions
                    </span>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Find Your Ideal <span className="text-[#FF9505]">Pet Companion</span>
                    </h1>
                    <p className="text-slate-400 text-sm md:text-base">
                        Browse through all pets currently available for adoption. Filter by species or search by name to find your perfect match.
                    </p>
                </header>

                <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-6 mb-10 shadow-xl space-y-6">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        <div className="relative w-full md:max-w-md">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-500">
                                <FaSearch className="text-sm" />
                            </span>
                            <input
                                type="text"
                                placeholder="Search pets by name..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#0f172a] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-[#FF9505] transition-colors"
                            />
                        </div>

                        {(search || selectedSpecies.length > 0) && (
                            <button
                                onClick={clearFilters}
                                className="flex items-center gap-2 text-xs font-bold text-rose-400 hover:text-rose-300 transition-colors bg-rose-500/10 border border-rose-500/20 px-4 py-2 rounded-xl cursor-pointer"
                            >
                                <FaTimes className="text-xs" /> Clear Filters
                            </button>
                        )}
                    </div>

                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                            <FaFilter className="text-[#FF9505] text-xs" /> Filter by Species
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {speciesOptions.map((species) => {
                                const isSelected = selectedSpecies.includes(species);
                                return (
                                    <button
                                        key={species}
                                        onClick={() => handleSpeciesSelect(species)}
                                        className={`px-4 py-2 rounded-xl text-xs font-semibold border transition-all duration-200 cursor-pointer ${isSelected
                                                ? 'bg-[#FF9505] text-black border-[#FF9505] shadow-lg shadow-[#FF9505]/10'
                                                : 'bg-[#0f172a] text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                                            }`}
                                    >
                                        {species}
                                    </button>
                                );
                            })}
                        </div>
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