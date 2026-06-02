"use client";

import dynamic from "next/dynamic";

const NotFoundView = dynamic(() => import("@/components/NotFoundView"), { ssr: false });

export default function NotFound() {
    return <NotFoundView />;
}