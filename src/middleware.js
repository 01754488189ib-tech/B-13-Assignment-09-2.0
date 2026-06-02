import { NextResponse } from 'next/server'
import { getSessionCookie } from "better-auth/cookies";

export async function middleware(request) {
    const sessionCookie = getSessionCookie(request);

    if (!sessionCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/profile/:path*',
        '/my-listings/:path*',
        '/my-requests/:path*',
        '/edit-pet/:path*',
        '/add-pet/:path*',
        '/edit-request/:path*',
        '/add-request/:path*',
        '/all-pet/:path+',
    ],
}