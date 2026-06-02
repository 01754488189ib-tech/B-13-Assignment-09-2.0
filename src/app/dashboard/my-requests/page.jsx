"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { authClient } from '@/lib/auth-client';
import LoadingPage from '@/components/LoadingPage';
import { FaEye, FaTrashAlt, FaExclamationTriangle } from 'react-icons/fa';
import { Button, Modal } from "@heroui/react";

const MyRequestsPage = () => {
    const { data: session, isPending: sessionLoading } = authClient.useSession();
    const myEmail = session?.user?.email || "";

    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
    const [targetRequest, setTargetRequest] = useState(null);

    const fetchMyRequests = async () => {
        if (!myEmail) return;
        try {
            const apiBase = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
            const res = await fetch(`${apiBase}/user-adoptions/${myEmail}`, {
                credentials: 'include'
            });
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            } else {
                toast.error("Failed to load requests");
            }
        } catch (err) {
            console.error(err);
            toast.error("Could not connect to the server");
        } finally {
            setIsLoading(false);
        }
    };

    const initiateCancelRequest = (req) => {
        setTargetRequest(req);
        setIsCancelModalOpen(true);
    };

    const executeCancelRequest = async () => {
        if (!targetRequest) return;

        try {
            const apiBase = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
            const res = await fetch(`${apiBase}/adoptions/${targetRequest._id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const data = await res.json();

            if (res.ok && data.success) {
                toast.success(data.message || `Request for "${targetRequest.petName}" has been canceled successfully.`);
                setRequests(prev => prev.filter(req => req._id !== targetRequest._id));
                setIsCancelModalOpen(false);
                setTargetRequest(null);
            } else {
                toast.error(data.message || "Failed to cancel request.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Could not connect to server");
        }
    };

    useEffect(() => {
        if (!sessionLoading && myEmail) {
            fetchMyRequests();
        }
    }, [myEmail, sessionLoading]);

    if (sessionLoading) {
        return (
            <div className="w-full bg-[#0f172a] min-h-screen flex items-center justify-center">
                <LoadingPage />
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-8 text-slate-300 min-h-screen">
            <div className="mb-8 border-b border-slate-800 pb-4">
                <h2 className="text-2xl md:text-3xl font-black text-white">My Requests</h2>
                <p className="text-xs md:text-sm text-slate-500 mt-1">Track your adoption requests and status updates</p>
            </div>

            <div className="bg-[#0b1329]/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <table className="table w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-slate-800 text-slate-400 text-xs md:text-sm bg-slate-900/50">
                                <th className="p-4">Request ID</th>
                                <th className="p-4">Pet Name</th>
                                <th className="p-4">Pickup Date</th>
                                <th className="p-4">Message</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 text-xs md:text-sm">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">
                                        <LoadingPage />
                                    </td>
                                </tr>
                            ) : requests.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="p-8 text-center text-slate-500">
                                        You have not submitted any adoption requests yet.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((req) => (
                                    <tr key={req._id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="p-4 font-mono text-slate-400 font-bold">{req._id}</td>
                                        <td className="p-4 font-semibold text-white truncate max-w-[200px]">{req.petName}</td>
                                        <td className="p-4 text-slate-400">{req.pickupDate}</td>
                                        <td className="p-4 text-slate-300 truncate max-w-[250px]">{req.message}</td>
                                        <td className="p-4">
                                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${req.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                req.status === 'Rejected' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                                }`}>
                                                {req.status === 'Approved' ? 'Approved (Adopted)' : req.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/all-pet/${req.petId}`}
                                                    className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
                                                    title="View Details"
                                                >
                                                    <FaEye size={14} />
                                                </Link>
                                                {req.status !== "Approved" && (
                                                    <button
                                                        onClick={() => initiateCancelRequest(req)}
                                                        className="p-2 bg-slate-800 hover:bg-rose-500/10 hover:text-rose-400 rounded-lg text-slate-300 transition-colors cursor-pointer"
                                                        title="Cancel Request"
                                                    >
                                                        <FaTrashAlt size={14} />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={isCancelModalOpen} onOpenChange={(open) => setIsCancelModalOpen(open)}>
                <button className="hidden" aria-hidden="true" />
                <Modal.Backdrop variant="blur">
                    <Modal.Container>
                        <Modal.Dialog className="sm:max-w-[380px] bg-[#0b1329] border border-slate-800 text-slate-300 rounded-xl">
                            <Modal.Header className="items-center text-center flex flex-col pt-6">
                                <Modal.Icon className="bg-rose-500/10 text-rose-400 p-3 rounded-full mb-2">
                                    <FaExclamationTriangle className="size-6 animate-bounce" />
                                </Modal.Icon>
                                <Modal.Heading className="text-white text-lg font-bold">Confirm Cancellation</Modal.Heading>
                            </Modal.Header>
                            <Modal.Body className="text-center px-6 py-2">
                                <p className="text-sm text-slate-400">
                                    Are you sure you want to cancel your adoption request for <span className="text-rose-400 font-semibold">"{targetRequest?.petName}"</span>? This action cannot be undone.
                                </p>
                            </Modal.Body>
                            <Modal.Footer className="flex gap-3 p-6 w-full">
                                <Button
                                    onClick={() => {
                                        setIsCancelModalOpen(false);
                                        setTargetRequest(null);
                                    }}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-semibold cursor-pointer"
                                >
                                    No, Keep It
                                </Button>
                                <Button
                                    onClick={executeCancelRequest}
                                    className="flex-1 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-sm font-semibold shadow-lg shadow-rose-600/20 cursor-pointer"
                                >
                                    Yes, Cancel
                                </Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                    </Modal.Container>
                </Modal.Backdrop>
            </Modal>
        </div>
    );
};

export default MyRequestsPage;