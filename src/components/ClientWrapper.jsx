"use client";

import dynamic from 'next/dynamic';

const AuthSync = dynamic(() => import("@/components/AuthSync"), { ssr: false });
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });

export default function ClientWrapper() {
    return (
        <>
            <AuthSync />
            <Navbar />
        </>
    );
}