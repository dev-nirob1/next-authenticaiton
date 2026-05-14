import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const POST = async (request) => {
    try {
        // step-1: connect to database
        const client = await clientPromise;
        const db = client.db('next-auth');
        // step-2: get email and password from request body
        const { email, password } = await request.json();
        // step-3: validate email and password
        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
        }
        // step-4: find user by email
        const user = await db.collection('users').findOne({ email })
        // step-5: if user not found, return error
        if (!user) {
            return NextResponse.json({ message: 'Invalid email or password' },
                { status: 401 }
            )
        }
        // step-6: compare password with hashed password in database
        const isPasswordValid = await bcrypt.compare(password, user.password);
        // step-7: if password is invalid, return error
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 })
        }
        // step-8: generate JWT token
        const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('jwt', token);
        // step-9: return success response with user info and token (exclude password)
        const userInfo = { name: user.name, email: user.email, userId: user._id }

        // step-10: set token in httpOnly cookie and return response with user info and token
        const response = NextResponse.json({ message: 'User signed in successfully', user: userInfo }, { status: 200 });

        response.cookies.set('token', token, { httpOnly: true })
        return response;
    }
    catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}