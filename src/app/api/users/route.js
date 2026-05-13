import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server"

export const GET = async()=> {
    const client = await clientPromise
    return NextResponse.json({message: 'Hello World'})
}