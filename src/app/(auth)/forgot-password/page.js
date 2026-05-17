'use client'

import Link from "next/link";
import { useState } from "react";

const ForgotPassword = () => {
    const [resetLink, setResetLink] = useState('')
    const handleForgotPassword = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        console.log(email);
        const res = await fetch('/api/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        })
        const data = await res.json()
        if(data.resetLink){
            alert(data.message)
            setResetLink(data.resetLink)
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleForgotPassword} className="max-w-xl mx-auto p-4 space-y-4 border">
                <label htmlFor="email">Email:</label>
                <input className='block p-2 border' type="email" id="email" name="email" placeholder="Enter Your Email" required />
                <button className='cursor-pointer bg-blue-500 text-white p-2 rounded' type="submit">Send Reset Link</button>
               {resetLink && <Link className="block text-blue-400 hover:underline" href={resetLink}>ResetLink</Link>}
            </form>
        </div>
    );
};

export default ForgotPassword;