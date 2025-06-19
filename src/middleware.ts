// middleware.ts na raiz do projeto
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    console.log(">>> middleware ativo");

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    console.log("SESSION TOKEN:", token);

    if (token) {
        const userId = token.sub || token.id;

        return NextResponse.redirect(new URL(`/dashboard/${userId}`, req.url))
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login"],
};
