import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userInfo = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!userInfo) {
        return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
    }

    return NextResponse.json({
        name: userInfo.name,
        email: userInfo.email,
        image: userInfo.picture,
    });
}