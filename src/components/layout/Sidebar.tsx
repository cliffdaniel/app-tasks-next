'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="bg-gray-800 text-white w-60 h-screen px-4 py-6">
            <h2 className="text-lg font-semibold mb-4">Menu</h2>
            <ul className="space-y-2">
                <li>
                    <Link
                        href="/dashboard"
                        className={`block px-4 py-2 rounded-md ${
                            pathname === '/dashboard' ? 'bg-gray-700' : 'hover:bg-gray-700'
                        }`}
                    >
                        Dashboard
                    </Link>
                </li>
                <li>
                    <Link
                        href="/dashboard/tasks"
                        className={`block px-4 py-2 rounded-md ${
                            pathname === '/dashboard/tasks' ? 'bg-gray-700' : 'hover:bg-gray-700'
                        }`}
                    >
                        Tasks
                    </Link>
                </li>
            </ul>
        </aside>
    );
};
