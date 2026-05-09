import Link from 'next/link';
import React from 'react';

const Register = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-xl mx-auto p-4 space-y-4 border">
                <form>
                    <div>
                        <label htmlFor="name">Name:</label>
                        <input className='block p-2 border' type="text" id="name" name="name" placeholder='Enter Your Name' />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input className='block p-2 border' type="email" id="email" name="email" placeholder='Enter Your Email' />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input className='block p-2 border' type="password" id="password" name="password" placeholder='Enter Your Password' />
                    </div>
                    <button className='cursor-pointer bg-blue-500 text-white p-2 rounded w-full mt-2' type="submit">Register</button>
                </form>
                <div>
                    <button className='cursor-pointer bg-red-500 text-white p-2 rounded w-full mt-2'>Google</button>
                    <p className='text-center text-sm text-gray-500 mt-2'>already have an account? <Link href="/login" className='text-blue-500 hover:underline'>Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;