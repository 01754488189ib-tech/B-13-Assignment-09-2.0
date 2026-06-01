"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrashAlt, FaEye, FaExclamationTriangle, FaUserAlt } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import { Button, Modal } from "@heroui/react";
import LoadingPage from '@/components/LoadingPage';

const MyListings = () => {
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const myEmail = session?.user?.email || "";

    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

    const [isReqOpen, setIsReqOpen] = useState(false);
    const [activePetRequests, setActivePetRequests] = useState([]);
    const [selectedPetId, setSelectedPetId] = useState(null);

    const fetchMyPets = async () => {
        if (!myEmail) return;
        try {
            const response = await fetch('http://localhost:5000/pets');
            if (response.ok) {
                const data = await response.json();
                const myFilteredPets = data.filter(pet => pet.ownerEmail === myEmail);
                setListings(myFilteredPets);
            } else {
                toast.error("Failed to load listings");
            }
        } catch (error) {
            console.error("Error fetching pets:", error);
            toast.error("Could not connect to the server");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!sessionLoading && myEmail) {
            fetchMyPets();
        }
    }, [myEmail, sessionLoading]);

    const openRequestsModal = async (petId) => {
        setSelectedPetId(petId);
        try {
            const res = await fetch(`http://localhost:5000/adoptions/${petId}`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setActivePetRequests(data);
                setIsReqOpen(true);
            } else {
                toast.error("Failed to fetch requests.");
            }
        } catch (err) {
            toast.error("Server connection failed.");
        }
    };

    const handleStatusAction = async (requestId, statusName) => {
        try {
            const res = await fetch(`http://localhost:5000/adoptions-status/${requestId}`, {
                method: 'PATCH',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ petId: selectedPetId, status: statusName }),
                credentials: 'include'
            });
            const result = await res.json();

            if (res.ok && result.success) {
                toast.success(result.message);
                setIsReqOpen(false);
                fetchMyPets();
            } else {
                toast.error(result.message || "Action failed.");
            }
        } catch (err) {
            toast.error("Action error occurred.");
        }
    };

    const openDeleteModal = (id, petName) => {
        setDeleteTarget({ id, name: petName });
        setIsOpen(true);
    };

    const handleConfirmDelete = async () => {
        const { id, name } = deleteTarget;
        try {
            const response = await fetch(`http://localhost:5000/pets/${id}?userEmail=${myEmail}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const result = await response.json();

            if (response.ok && result.deletedCount > 0) {
                toast.success(`"${name}" deleted successfully!`);
                setListings(listings.filter(pet => pet._id !== id));
                setIsOpen(false);
            } else {
                toast.error(result.error || "Failed to delete from server.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong!");
        }
    };

    if (sessionLoading) {
        return <div className="text-center py-20 text-slate-400"><LoadingPage /></div>;
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 text-slate-300 min-h-screen">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white">My Listings</h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">Manage and track your hosted pets</p>
                </div>
                <Link href="/dashboard/add-pets" className="bg-[#FF9505] text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#ff9d1c] transition-all shadow-lg shadow-[#FF9505]/10 whitespace-nowrap cursor-pointer">
                    + Add New Pet
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-[#0b1329]/50 border border-slate-800 p-4 rounded-xl shadow-md">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">Total Listings</p>
                    <h3 className="text-2xl font-black text-white mt-1">{listings.length}</h3>
                </div>
                <div className="bg-[#0b1329]/50 border border-slate-800 p-4 rounded-xl shadow-md">
                    <p className="text-xs text-emerald-500 font-bold uppercase tracking-wider">Available</p>
                    <h3 className="text-2xl font-black text-emerald-400 mt-1">
                        {listings.filter(pet => pet.status !== "adopted").length}
                    </h3>
                </div>
                <div className="bg-[#0b1329]/50 border border-slate-800 p-4 rounded-xl shadow-md">
                    <p className="text-xs text-[#FF9505] font-bold uppercase tracking-wider">Adopted</p>
                    <h3 className="text-2xl font-black text-[#FF9505] mt-1">
                        {listings.filter(pet => pet.status === "adopted").length}
                    </h3>
                </div>
            </div>

            <div className="bg-[#0b1329]/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <table className="table w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-400 text-xs md:text-sm bg-slate-900/50">
                                <th className="p-4">Pet Details</th>
                                <th className="p-4">Species</th>
                                <th className="p-4">Adoption Fee</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs md:text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500 animate-pulse">
                                        <LoadingPage />
                                    </td>
                                </tr>
                            ) : listings.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500">
                                        No pets listed by you yet.
                                    </td>
                                </tr>
                            ) : (
                                listings.map((item) => (
                                    <tr key={item._id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0">
                                                    <img
                                                        src={item.imageUrl || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1'}
                                                        alt={item.petName}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div>
                                                    <span className="font-semibold text-white block truncate max-w-[150px] sm:max-w-xs">{item.petName}</span>
                                                    <span className="text-[11px] text-slate-500 block">{item.breed || "Unknown Breed"}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-slate-400 font-medium">{item.species}</td>
                                        <td className="p-4 font-bold text-[#FF9505]">
                                            {item.adoptionFee === "0" || !item.adoptionFee ? "Free" : `$${item.adoptionFee}`}
                                        </td>
                                        <td className="p-4">
                                            {item.status === "adopted" ? (
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#FF9505]/10 text-[#FF9505] border border-[#FF9505]/20">
                                                    Adopted
                                                </span>
                                            ) : (
                                                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                    Available
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openRequestsModal(item._id)}
                                                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 rounded-lg border border-slate-700 transition-colors cursor-pointer"
                                                >
                                                    Requests ({item.status === "adopted" ? "Closed" : "Manage"})
                                                </button>

                                                <Link href={`/all-pet/${item._id}`} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="View Details">
                                                    <FaEye size={14} />
                                                </Link>

                                                <Link href={`/dashboard/edit-pet/${item._id}`} className="p-2 bg-slate-800 hover:bg-[#FF9505]/10 hover:text-[#FF9505] rounded-lg text-slate-300 transition-colors" title="Edit">
                                                    <FaEdit size={14} />
                                                </Link>

                                                <button
                                                    onClick={() => openDeleteModal(item._id, item.petName)}
                                                    className="p-2 bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg text-slate-300 transition-colors cursor-pointer"
                                                    title="Delete"
                                                >
                                                    <FaTrashAlt size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isReqOpen} onOpenChange={(open) => setIsReqOpen(open)}>
                <Modal.Backdrop variant="blur">
                    <Modal.Container>
                        <Modal.Dialog className="max-w-xl w-full bg-[#0b1329] border border-slate-800 text-slate-300 rounded-xl">
                            <Modal.Header className="pt-6 px-6">
                                <Modal.Heading className="text-white text-lg font-bold">Adoption Requests Received</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="p-6 max-h-[60vh] overflow-y-auto">
                                {activePetRequests.length === 0 ? (
                                    <p className="text-center text-slate-500 text-sm py-4">No adoption requests received for this pet yet.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {activePetRequests.map((req) => (
                                            <div key={req._id} className="bg-[#0f172a] border border-slate-800/80 p-4 rounded-xl flex flex-col gap-3">
                                                <div className="flex justify-between items-start border-b border-slate-800/60 pb-2">
                                                    <div>
                                                        <h4 className="font-bold text-white flex items-center gap-1.5 text-sm">
                                                            <FaUserAlt className="text-slate-500 text-xs" /> {req.userName}
                                                        </h4>
                                                        <p className="text-xs text-slate-500 mt-0.5">{req.userEmail}</p>
                                                    </div>
                                                    <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${req.status === "Approved" ? "bg-emerald-500/10 text-emerald-400" :
                                                        req.status === "Rejected" ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-amber-400"
                                                        }`}>
                                                        {req.status}
                                                    </span>
                                                </div>
                                                <div className="text-xs space-y-1">
                                                    <p className="text-slate-400"><span className="text-slate-500 font-semibold">Pickup Date:</span> {req.pickupDate}</p>
                                                    <p className="text-slate-300 italic"><span className="text-slate-500 font-semibold not-italic">Message:</span> "{req.message}"</p>
                                                </div>

                                                {req.status === "pending" && !activePetRequests.some(r => r.status === "Approved") && (
                                                    <div className="flex gap-2 justify-end mt-1">
                                                        <button
                                                            onClick={() => handleStatusAction(req._id, "Rejected")}
                                                            className="px-3 py-1 bg-rose-600/10 text-rose-400 border border-rose-500/20 text-xs font-bold rounded-lg hover:bg-rose-600 hover:text-white transition-all cursor-pointer"
                                                        >
                                                            Reject
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusAction(req._id, "Approved")}
                                                            className="px-3 py-1 bg-emerald-500 text-black text-xs font-black rounded-lg hover:bg-emerald-400 transition-all cursor-pointer"
                                                        >
                                                            Confirm
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Modal.Body>
                            <Modal.Footer className="p-4 bg-slate-900/40 border-t border-slate-800/50 flex justify-end">
                                <Button onClick={() => setIsReqOpen(false)} className="bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold px-4 py-2 cursor-pointer">
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

            <Modal isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <Modal.Backdrop variant="blur">
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[380px] bg-[#0b1329] border border-slate-800 text-slate-300 rounded-xl">
                            <Modal.Header className="items-center text-center flex flex-col pt-6">
                                <Modal.Icon className="bg-rose-500/10 text-rose-400 p-3 rounded-full mb-2">
                                    <FaExclamationTriangle className="size-6 animate-bounce" />
                                </Modal.Icon>
                                <Modal.Heading className="text-white text-lg font-bold">Confirm Deletion</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="text-center px-6 py-2">
                                <p className="text-sm text-slate-400">
                                    Are you sure you want to delete <span className="text-rose-400 font-semibold">"{deleteTarget.name}"</span>? This action cannot be undone.
                                </p>
                            </Modal.Body>
                            <Modal.Footer className="flex gap-3 p-6 w-full">
                                <Button
                                    onClick={() => setIsOpen(false)}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold cursor-pointer"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirmDelete}
                                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-rose-600/20 cursor-pointer"
                                >
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default MyListings;