import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';


// This route is for testing the protected route and getting user info from token payload
export const GET = async () => {
    //step-1: create cookie store instance
    const cookieStore = await cookies();
    // step-2: get token from cookie store
    const token = cookieStore.get('token')?.value;
    console.log(token);
    // step-3: if token not found, return error response
    if (!token) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }
    let decode;
    try {
        // step-4: verify token and get user info from token payload    
        decode = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decode);

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    return NextResponse.json({ message: "me route working", user: decode })
}