import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
const crypto = require('crypto');

export const POST = async (request) => {

    // step-1: connect to the database
    const client = await clientPromise;
    const db = client.db('next-auth');
    //step-2: get the email from the request body and find the user in the database
    const { email } = await request.json();
    const user = await db.collection('users').findOne({ email });
    //step-3: if user not found, return an error response
    if (!user) {
        return NextResponse.json({ error: 'user not found' }, { status: 404 });
    }
    // step-4: generate a reset token and save it to the database with an expiration time
    const token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 3600000); //add token expires in 1 hour
    await db.collection('users').updateOne({ email }, { $set: { resetToken: token, resetTokenExpires: expires } });
    // step-5: create a reset link and send it to the user's email (for demonstration, we will just return the reset link in the response)
    const resetLink = `https://localhost:3000/reset-password?token=${token}`;

    return NextResponse.json({ message: 'Password reset link sent to your email', resetLink }, { status: 200 });
};