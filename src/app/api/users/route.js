import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"
import bcrypt from 'bcrypt'

export const GET = async () => {
    try {
        const client = await clientPromise
        const db = client.db('next-auth')
        const users = await db.collection('users').find({}).toArray()
        return NextResponse.json({ message: 'Users fetched successfully', users }, { status: 200 })
    }
    catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}

// sign up api 
export const POST = async (request) => {
    try {
        // step-1: connect to mongodb
        const client = await clientPromise
        const db = client.db('next-auth')
        // step-2: get data from request body
        const { name, email, password } = await request.json()
        // step-3: validate data
        if (!name || !email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
        }
        // step-4: check if user already exists
        const existinguser = await db.collection('users').findOne({ email })
        if (existinguser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 })
        }
        // step-5: hash password and store user in database
        const hashedPassword = await bcrypt.hash(password, 10)
        // step-6: insert user into database
        const result = await db.collection('users').insertOne({ name, email, password: hashedPassword })

        // step-7: return response
        return NextResponse.json({ message: 'User created successfully', insertedId: result.insertedId }, { status: 201 })
    } catch (error) {
        console.error('Error creating user:', error)
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 })
    }
}
