'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const authInfo = {
        user,
        setUser,
        loading,
        setLoading
    };

    //set user and loading state here, for example, you can fetch user data from an API and update the states accordingly.
    useEffect(() => {
        const fetchUser = async () => {
            const res = await fetch('/api/me', {
                credentials: 'include'
            })
            if (!res.ok) {
                setUser(null);
                setLoading(false);
                return;
            }
            const user = await res.json();
            const currentUser = user?.user;
            setUser(currentUser);
            setLoading(false);
        };
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}

export default AuthProvider;