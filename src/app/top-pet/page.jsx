"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaMapMarkerAlt, FaRegHeart } from 'react-icons/fa';
import LoadingPage from '@/components/LoadingPage';

const TopPetPage = () => {
    const [featuredPets, setFeaturedPets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeaturedPets = async () => {
            try {
                const response = await fetch('http://localhost:5000/pets');
                if (response.ok) {
                    const data = await response.json();
                    const available = data.filter(pet => pet.status !== 'adopted');
                    const featured = available.slice(0, 6);
                    setFeaturedPets(featured);
                }
            } catch (error) {
                console.error("Error fetching featured pets:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeaturedPets();
    }, []);

    if (loading) {
        return (
            <div className="py-12">
                <LoadingPage />
            </div>
        );
    }

    if (featuredPets.length === 0) {
        return (
            <div className="text-center py-12 bg-[#0b1329]/50 border border-slate-800 rounded-2xl">
                <p className="text-slate-500 text-sm">No featured pets available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPets.map((pet) => (
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
                            <div className="absolute top-4 right-4 bg-[#0f172a]/60 backdrop-blur-md p-2 rounded-full border border-white/10 text-slate-300 hover:text-rose-400 hover:scale-110 transition-all cursor-pointer">
                                <FaRegHeart className="text-sm" />
                            </div>
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
                                        <FaMapMarkerAlt className="text-slate-500 flex-shrink-0" />
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
        </div>
    );
};

export default TopPetPage;