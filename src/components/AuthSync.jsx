"use client";

import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';

export default function AuthSync() {
    const { data: session } = authClient.useSession();

    useEffect(() => {
        const syncJWT = async () => {
            if (session?.user?.email) {
                try {
                    const apiBase = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:5000";
                    await fetch(`${apiBase}/jwt`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email: session.user.email }),
                        credentials: 'include'
                    });
                } catch (err) {
                    console.error("Failed to synchronize JWT with Express server:", err);
                }
            }
        };

        syncJWT();
    }, [session]);

    return null;
}