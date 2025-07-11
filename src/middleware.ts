// middleware.ts na raiz do projeto
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
    console.log(">>> MIDDLEWARE ATIVO <<<");

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    let currentPath = req.nextUrl.pathname;
    let pathlist: string[] = ['/dashboard', '/dashboard/jobs'];
    let expectedPath: string = ''

    console.log('CURRENT >>>>>>>>>>>>', currentPath)

    if (token) {
        const userId = token.sub || token.id;

        console.log('CONTEM?:', pathlist.includes(currentPath), 'CurrentPath', currentPath)

        if (pathlist.includes(currentPath)) {
            expectedPath = `${currentPath}/${userId}`

            if (currentPath !== expectedPath) {
                return NextResponse.redirect(new URL(expectedPath, req.url));
            }

            return NextResponse.next();
        }

        if (currentPath == '/login') {
            console.log('entrei aqui')
            return NextResponse.redirect(new URL('/dashboard', req.url));
        }

        return NextResponse.next();
    }
    
    expectedPath = '/login'
    
    if (currentPath !== expectedPath) {
        console.log("entrou aqui");
        return NextResponse.redirect(new URL("/login", req.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*", "/login"]
};
