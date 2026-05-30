"use client";
import LoadingPage from '@/components/LoadingPage';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { PiMapPinLineDuotone } from 'react-icons/pi';
import { TbCurrencyDollar } from 'react-icons/tb';

const AllPetPage = () => {
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState([]);

    const categories = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

    useEffect(() => {
        setLoading(true);

        let url = `http://localhost:5000/pets?search=${searchTerm}`;
        if (selectedSpecies.length > 0) {
            url += `&species=${selectedSpecies.join(",")}`;
        }

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                setPets(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Data fetching error:", err);
                setLoading(false);
            });
    }, [searchTerm, selectedSpecies]);

    const handleSpeciesChange = (e) => {
        const value = e.target.value;
        if (value === "All") {
            setSelectedSpecies([]);
        } else {
            setSelectedSpecies([value]);
        }
    };

    return (
        <div className="p-4 md:p-8 border border-slate-800 bg-[#0f172a] rounded-2xl shadow-xl mx-auto">

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black text-white">All Available Pets</h2>
                    <p className="text-slate-500 text-xs md:text-sm mt-1">Find your new furry or feathered best friend</p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md border border-slate-700 bg-[#0f172a] rounded-lg p-1">
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-transparent px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:outline-none"
                        placeholder="Search pets by name..."
                    />

                    <div className="hidden sm:block h-6 w-[1px] bg-slate-700"></div>

                    <select
                        onChange={handleSpeciesChange}
                        className="w-full sm:w-auto bg-transparent px-3 py-2 text-sm text-slate-300 font-medium cursor-pointer focus:outline-none"
                    >
                        <option value="All" className="bg-[#0f172a] text-slate-200">
                            All Species
                        </option>
                        {categories.map((species) => (
                            <option key={species} value={species} className="bg-[#0f172a] text-slate-200">
                                {species}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">

                <div className="lg:col-span-4">
                    {loading ? (
                        <div className="text-center text-slate-500 py-20 animate-pulse font-semibold">
                            <LoadingPage />
                        </div>
                    ) : pets.length === 0 ? (
                        <div className="text-center text-slate-500 py-20 border border-dashed border-slate-800 rounded-2xl">
                            No pets found matching your criteria.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {pets.map((pet) => (
                                <div
                                    key={pet._id}
                                    className="flex flex-col justify-between border border-slate-800 rounded-2xl bg-[#0b1329] shadow-xl overflow-hidden group transition-all duration-300 hover:border-[#FF9505]/40"
                                >
                                    <div className="relative h-52 w-full overflow-hidden bg-[#0f172a]">
                                        <Image
                                            src={pet.imageUrl}
                                            alt={pet.petName}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <span className="absolute top-3 left-3 bg-[#FF9505]/10 text-[#FF9505] text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm border border-[#FF9505]/20">
                                            {pet.species}
                                        </span>
                                        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-md backdrop-blur-sm border ${pet.status === "adopted"
                                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                            : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                            }`}>
                                            {pet.status === "adopted" ? "Adopted" : "Available"}
                                        </span>
                                    </div>

                                    <div className="p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#FF9505] transition-colors duration-200">{pet.petName}</h3>
                                            <p className="text-slate-400 text-xs font-medium mb-4">
                                                {pet.breed} | {pet.age} {parseInt(pet.age) > 1 ? 'years' : 'year'} old | {pet.gender}
                                            </p>
                                            <div className="space-y-2 mb-6 border-t border-slate-800/60 pt-4">
                                                <div className="flex items-center text-slate-400 text-sm gap-2">
                                                    <PiMapPinLineDuotone className='text-[#FF9505]' />
                                                    <span className="truncate text-slate-300">{pet.location}</span>
                                                </div>
                                                <div className="flex items-center text-slate-400 text-sm gap-2">
                                                    <span className="text-[#FF9505] font-bold"><TbCurrencyDollar /></span>
                                                    <span className="font-semibold text-slate-300">
                                                        {parseInt(pet.adoptionFee) === 0 || !pet.adoptionFee ? 'Free Adoption' : `$${pet.adoptionFee} adoption fee`}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-800/40">
                                            <Link
                                                href={`/all-pet/${pet._id}`}
                                                className="flex-1 text-center py-2.5 px-4 rounded-xl border border-slate-700 text-slate-300 text-sm font-semibold hover:bg-slate-800/50 hover:text-white hover:border-slate-600 transition-all duration-200 outline-none">
                                                View Details
                                            </Link>

                                            <Link
                                                href={`/adopt/${pet._id}`}
                                                className="flex-1 text-center py-2.5 px-4 rounded-xl bg-[#FF9505] text-black text-sm font-bold shadow-lg shadow-[#FF9505]/10 hover:bg-[#ff9d1c] hover:shadow-[#FF9505]/20 transition-all duration-200 outline-none">
                                                Adopt Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AllPetPage;