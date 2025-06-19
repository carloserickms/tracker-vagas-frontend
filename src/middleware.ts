// middleware.ts na raiz do projeto
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    console.log(">>> middleware ativo");

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    const currentPath = req.nextUrl.pathname;

    console.log("SESSION TOKEN:", token);

    if (token) {
        const userId = token.sub || token.id;

        const expectedPath = `/dashboard/${userId}`;

        console.log('ESTOU DENTRO DO TOKEN')

        if (currentPath !== expectedPath) {
            console.log('ENTREI AQUI')
            return NextResponse.redirect(new URL(expectedPath, req.url));
        }

        return NextResponse.next();
    }

    if (currentPath.startsWith("/dashboard")) {
        console.log("SESSION TOKEN NULL — redirecionando para /login");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"],
};
