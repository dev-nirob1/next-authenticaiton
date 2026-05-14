'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);

                const res = await fetch('/api/me', {
                    credentials: 'include'
                });

                const data = await res.json();

                setUser(data?.user || null);

                console.log(data?.user); // correct place to log
            } catch (err) {
                console.log(err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch('/api/logout', {
                credentials: 'include',
                method: 'POST'
            });

            setUser(null);
        } catch (err) {
            console.log(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex justify-between">
                <div className="text-2xl font-bold">NestAuth</div>

                <div className="space-x-4">
                    <Link href="/login">Login</Link>
                    <Link href="/register">Register</Link>

                    {user && (
                        <button onClick={handleLogout}>
                            Logout
                        </button>
                    )}

                    <div>
                        user: {user?.userId}
                        email: {user?.email}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;