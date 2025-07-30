

import { DefaultSession, DefaultUser } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string;
        token: string;
        userName?: string;
        email: string;
    }

    interface Session extends DefaultSession {
        user: {
            id: string;
            userName: string;
            email: string;
            token: string;
        } & DefaultSession["user"];
    }
}

declare module "next-auth/jwt" {
    interface JWT extends NextAuthJWT {
        id: string;
        userName: string;
        email: string;
        token: string;
    }
}