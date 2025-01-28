'use client';

import { signOut } from 'next-auth/react';

export const Navbar = () => (
    <nav className="bg-blue-600 text-white px-4 py-3 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">Admin Panel</h1>
        <button
            onClick={() => signOut()}
            className="px-4 py-2 bg-red-500 rounded-md hover:bg-red-600 transition"
        >
            Logout
        </button>
    </nav>
);
