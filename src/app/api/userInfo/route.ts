import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    return NextResponse.json({
        name: token.name,
        email: token.email,
        image: token.picture,
    });
}