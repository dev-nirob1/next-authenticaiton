import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <div>
            <div className="flex justify-between">
                <div className="text-2xl font-bold">MyApp</div>
                <div className="space-x-4">
                    <Link href="/login" className="text-gray-600 hover:text-gray-800">Login</Link>
                    <Link href="/register" className="text-gray-600 hover:text-gray-800">Register</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;