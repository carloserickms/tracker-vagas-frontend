import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prefix = process.env.NEXT_BACKEND_API_URL;

export async function DELETE(req: NextRequest) {

    try {
        const userInfo = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        const response = await fetch(`${prefix}/logout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            },
            mode: "cors",
        });

        console.log(response)

        if (!response.ok) {
            return NextResponse.json({message: `${response}`})
        }


        const responseData = await response.json();
        return NextResponse.json(responseData);

    } catch (error) {
        return NextResponse.json({message: `Internal error: ${error}`})
    }
}