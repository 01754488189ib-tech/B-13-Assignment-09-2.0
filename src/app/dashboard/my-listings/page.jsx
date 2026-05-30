"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrashAlt, FaEye, FaExclamationTriangle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { Button, Modal } from "@heroui/react";
import LoadingPage from '@/components/LoadingPage';

const MyListings = () => {
    const [listings, setListings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isOpen, setIsOpen] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState({ id: null, name: "" });

    const myEmail = "01754488189ib@gmail.com";

    const fetchMyPets = async () => {
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
        fetchMyPets();
    }, []);

    const openDeleteModal = (id, petName) => {
        setDeleteTarget({ id, name: petName });
        setIsOpen(true);
    };

    const handleConfirmDelete = async () => {
        const { id, name } = deleteTarget;
        try {
            const response = await fetch(`http://localhost:5000/pets/${id}`, {
                method: 'DELETE',
            });
            const result = await response.json();

            if (response.ok && result.deletedCount > 0) {
                toast.success(`"${name}" deleted successfully!`);
                setListings(listings.filter(pet => pet._id !== id));
                setIsOpen(false);
            } else {
                toast.error("Failed to delete from server.");
            }
        } catch (error) {
            console.error("Delete error:", error);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 text-slate-300 min-h-screen">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 border-b border-slate-800 pb-4">
                <div>
                    <h2 className="text-2xl md:text-3xl font-black text-white">My Listings</h2>
                    <p className="text-xs md:text-sm text-slate-500 mt-1">Manage and track your hosted pets</p>
                </div>
                <Link href="/dashboard/add-pets" className="bg-[#FF9505] text-black px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#ff9d1c] transition-all shadow-lg shadow-[#FF9505]/10 whitespace-nowrap">
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
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400">
                                                Available
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">

                                                <Link href={`/all-pet/${item._id}`} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors" title="View Details">
                                                    <FaEye size={14} />
                                                </Link>

                                                <Link href={`/dashboard/edit-pet/${item._id}`} className="p-2 bg-slate-800 hover:bg-[#FF9505]/10 hover:text-[#FF9505] rounded-lg text-slate-300 transition-colors" title="Edit">
                                                    <FaEdit size={14} />
                                                </Link>

                                                <button
                                                    onClick={() => openDeleteModal(item._id, item.petName)}
                                                    className="p-2 bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg text-slate-300 transition-colors"
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

            <Modal isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
                <Modal.Backdrop
                    className="bg-linear-to-t from-black/80 via-black/40 to-transparent dark:from-zinc-950/90 dark:via-zinc-900/50"
                    variant="blur"
                >
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
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    onClick={handleConfirmDelete}
                                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-rose-600/20"
                                >
                                    Delete
                                </Button>
                            </Modal.Footer>
                            <Modal.CloseTrigger />
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>

        </div>
    );
};

export default MyListings;