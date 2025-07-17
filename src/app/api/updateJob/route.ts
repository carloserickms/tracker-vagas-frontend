import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prefix = process.env.NEXT_BACKEND_API_URL;

export async function PUT(req: NextRequest) {

    try {
        const userInfo = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        const payload = await req.json();

        const response = await fetch(`${prefix}/update-job`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            },
            mode: "cors",
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            return NextResponse.json({message: `${response}`})
        }

        const responseData = await response.json();
        return NextResponse.json(responseData);

    } catch (error) {
        return NextResponse.json({message: "Internal error"})
    }
}