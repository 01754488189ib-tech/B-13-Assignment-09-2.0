import { NextResponse } from 'next/server'
import { auth } from './lib/auth'

export async function proxy(request) {
    const session = await auth.api.getSession({
        headers: request.headers
    });

    if (!session) {
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