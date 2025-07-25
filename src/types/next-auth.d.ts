import NextAuth from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            userName: string;
            email: string;
            token: string;
        };
    }

    interface User {
        id: string;
        name: string;
        email: string;
        token: string;
    }
}
