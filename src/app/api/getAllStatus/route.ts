import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prefix = process.env.NEXT_BACKEND_API_URL;

export async function GET(req: NextRequest) {
    const userInfo = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const response = await fetch(`${prefix}/get-all-status`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo?.token}`
        },
        mode: "cors"
    });

    const responseData = await response.json();
    console.log('Resposta do backend', responseData);

    if (!response.ok) {
        throw new Error(responseData.message || 'Erro na solicitação do Status');
    };

    return NextResponse.json(responseData);

}