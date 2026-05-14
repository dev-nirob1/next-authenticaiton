import { NextResponse } from "next/server";

export const POST = async () => {
    try {
        const res = NextResponse.json({ message: 'User logged out successfully' }, { status: 200 })
        res.cookies.delete("token", { path: "/" });
        return res;
    } catch (error) {
        console.log(error.message);

        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}