'use client'
import { useSearchParams } from 'next/navigation';
import React from 'react';

const ResetPassword = () => {
    const searchParams = useSearchParams()
    const token = searchParams.get('token')

    const handleResetPassword = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const password = formData.get('new-password')
        const res = await fetch('/api/reset-password', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, password })
        })
        const data = await res.json();
        if(data){
            alert(data.message)
        }
    }
    return (
        <div className='flex min-h-screen w-full items-center justify-center'>
            <form onSubmit={handleResetPassword} className="max-w-xl mx-auto p-4 space-y-4 border">
                <label htmlFor="new-password"></label>
                <input className='block p-2 border' type="text" placeholder='new password' name='new-password' id='new-password' />
                <button className='cursor-pointer bg-blue-500 text-white p-2 rounded' type="submit"> Reset Password</button>
            </form>
        </div>
    );
};

export default ResetPassword;