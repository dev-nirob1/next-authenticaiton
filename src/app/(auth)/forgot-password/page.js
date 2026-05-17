import React from 'react';

const ForgotPassword = () => {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <form className="max-w-xl mx-auto p-4 space-y-4 border">
                <label htmlFor="email">Email:</label>
                <input className='block p-2 border' type="email" id="email" name="email" placeholder="Enter Your Email" required />
                <button className='cursor-pointer bg-blue-500 text-white p-2 rounded' type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default ForgotPassword;