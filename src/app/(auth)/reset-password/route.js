import bcrypt from 'bcrypt';
import clientPromise from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export const PUT = async (request) => {
    // connect database and get the user by token
    const client = await clientPromise;
    const db = client.db('next-auth');
    // step-1: get the token and new password from the request body
    const { token, password } = await request.json();
    // step-2: find the user with the reset token and check if the token is valid
    const user = await db.collection('users').findOne({ resetToken: token });

    if (!user || user.resetTokenExpires < new Date()) {
        return NextResponse.json({ error: 'Invalid or expired token' }, { status: 400 });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    // step-3: update the user's password and remove the reset token from the database
    await db.collection('users').updateOne({ _id: user._id }, { $set: { password: hashedPassword }, $unset: { resetToken: '', resetTokenExpires: '' } });
    // step-4: return a success response
    return NextResponse.json({ message: 'Password reset successful' }, { status: 200 });
}