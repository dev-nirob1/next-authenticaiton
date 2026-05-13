import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export const POST = async (request) => {
    try {
        const client = await clientPromise;
        const db = client.db('next-auth');
        const { email, password } = await request.json();
        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
        }
        const user = await db.collection('users').findOne({ email })
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' },
                { status: 401 }
            )
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
        }
        const userInfo = { name: user.name, email: user.email, userId: user._id }
        return NextResponse.json({ message: 'User signed in successfully', user: userInfo }, { status: 200 })
    }
    catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}