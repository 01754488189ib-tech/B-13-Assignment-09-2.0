"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import AdoptionForm from '@/components/AdoptionModal';
import LoadingPage from '@/components/LoadingPage';
import { FaChevronLeft } from 'react-icons/fa';

const PetDetailsPage = ({ params }) => {
    const resolvedParams = React.use(params);
    const id = resolvedParams.id;

    const router = useRouter();
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const currentUser = session?.user || null;

    const [pet, setPet] = useState(null);
    const [userRequest, setUserRequest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);

    const fetchDetails = async () => {
        setLoading(true);
        try {
            const apiBase = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";

            const res = await fetch(`${apiBase}/pets/${id}`);
            if (!res.ok) {
                setErrorMsg(`Failed to load data: ${res.status}`);
                return;
            }
            const data = await res.json();
            setPet(data);

            if (currentUser?.email) {
                const adoptionsRes = await fetch(`${apiBase}/adoptions/${id}`, {
                    credentials: 'include'
                });
                if (adoptionsRes.ok) {
                    const adoptions = await adoptionsRes.json();
                    const myReq = adoptions.find(req => req.userEmail === currentUser.email);
                    setUserRequest(myReq);
                }
            }
        } catch (error) {
            console.error(error);
            setErrorMsg("Connection to server failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!sessionLoading) {
            fetchDetails();
        }
    }, [id, currentUser, sessionLoading]);

    if (sessionLoading || loading) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex items-center justify-center">
                <LoadingPage />
            </div>
        );
    }

    if (errorMsg || !pet) {
        return (
            <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-4">
                <div className="bg-[#0b1329] p-8 rounded-2xl border border-slate-800 text-center max-w-md shadow-xl">
                    <h2 className="text-xl font-bold text-rose-500 mb-2">Unavailable</h2>
                    <p className="text-slate-400 text-sm mb-6">{errorMsg || "The pet does not exist."}</p>
                    <Link
                        href="/all-pet"
                        className="inline-flex items-center gap-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl border border-slate-700 transition-colors"
                    >
                        <FaChevronLeft /> Go Back
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 py-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                <div>
                    <Link href="/all-pet" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-[#FF9505] transition-colors mb-6">
                        <FaChevronLeft /> Back To Catalog
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

                    <div className="w-full">
                        {pet.status === "adopted" ? (
                            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-8 text-center shadow-xl h-fit sticky top-6">
                                <span className="px-4 py-2 rounded-xl text-sm font-black bg-[#FF9505]/10 text-[#FF9505] border border-[#FF9505]/20 uppercase tracking-widest block mb-3">
                                    Already Adopted
                                </span>
                                <p className="text-slate-400 text-xs">This pet has successfully found a home!</p>
                            </div>
                        ) : !currentUser ? (
                            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-8 text-center shadow-xl h-fit sticky top-6">
                                <span className="px-4 py-2 rounded-xl text-sm font-black bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-widest block mb-3">
                                    Login Required
                                </span>
                                <p className="text-slate-400 text-xs mb-6">Please log in to submit an adoption request.</p>
                                <Link
                                    href={`/login?redirect=/all-pet/${id}`}
                                    className="block w-full py-3 px-4 rounded-xl bg-[#FF9505] text-black text-sm font-bold shadow-lg shadow-[#FF9505]/10 hover:bg-[#ff9d1c] transition-all text-center cursor-pointer"
                                >
                                    Log In to Adopt
                                </Link>
                            </div>
                        ) : currentUser.email === pet.ownerEmail ? (
                            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-8 text-center shadow-xl h-fit sticky top-6">
                                <span className="px-4 py-2 rounded-xl text-sm font-black bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-widest block mb-3">
                                    Your Listing
                                </span>
                                <p className="text-slate-400 text-xs">You cannot request adoption for your own pet.</p>
                            </div>
                        ) : userRequest?.status === "Rejected" ? (
                            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-8 text-center shadow-xl h-fit sticky top-6">
                                <span className="px-4 py-2 rounded-xl text-sm font-black bg-rose-500/10 text-rose-400 border border-rose-500/20 uppercase tracking-widest block mb-3">
                                    Rejected
                                </span>
                                <p className="text-slate-400 text-xs">Your previous adoption request was rejected by the owner.</p>
                            </div>
                        ) : userRequest?.status === "pending" ? (
                            <div className="bg-[#0b1329] border border-slate-800 rounded-2xl p-8 text-center shadow-xl h-fit sticky top-6">
                                <span className="px-4 py-2 rounded-xl text-sm font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-widest block mb-3">
                                    Pending
                                </span>
                                <p className="text-slate-400 text-xs">Your request is currently under review.</p>
                            </div>
                        ) : (
                            <AdoptionForm
                                pet={pet}
                                currentUser={currentUser}
                                initialStatus={userRequest?.status}
                                onSuccess={fetchDetails}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetDetailsPage;