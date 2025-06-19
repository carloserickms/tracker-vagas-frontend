
import GoogleProvider from "next-auth/providers/google";
import { RegisterGooglePayload } from "@/types/authTypes";
import NextAuth, { NextAuthOptions } from "next-auth";

const prefix = process.env.NEXT_BACKEND_API_URL;
const defaltSecretKey = process.env.SECRET_KEY || '';

const nextAuthOptions : NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],

    session: {
        strategy: "jwt"
    },

    callbacks: {
        async signIn({ profile, account, user }: any) {
            if (account.provider === "google") {

                const payload: RegisterGooglePayload = {
                    userName: user.name,
                    email: user.email,
                    providerId: user.id,
                    provider: account.provider,
                    password: defaltSecretKey,
                    rePassword: defaltSecretKey
                };

                console.log('USUARIO NO SIGNIN:', user)

                try {
                    const response = await fetch(`${prefix}/create-google-account`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        mode: "cors",
                        body: JSON.stringify(payload),
                    });

                    const responseData = await response.json();

                    console.log('Resposta do backend', responseData);

                    if (!response.ok) {
                        throw new Error(responseData.message || 'Erro ao criar conta');
                    };

                    user.token = responseData?.data.session.token;
                    //Subistituindo o id do google pelo id do backend
                    user.id = responseData?.data.id

                    console.log('USER DEPOIS DO TOKEN',user)

                    return true;

                } catch (error) {
                    throw new Error(`Internal error: ${error}`);
                }
            }
            return true
        },

        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.userName = user.name;
                token.email = user.email;
                token.token = user.token;
            }

            console.log("JWT gerado:", token);

            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id as string;
            session.user.userName = token.userName as string;
            session.user.email = token.email as string;
            session.user.token = token.token as string;
            return session;
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }