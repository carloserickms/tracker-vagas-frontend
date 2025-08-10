import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prefix = process.env.NEXT_BACKEND_API_URL;

export async function GET(req: NextRequest) {
    try {
        const userInfo = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        const { searchParams } = new URL(req.url)
        const page = searchParams.get("page")

        const response = await fetch(`${prefix}/get-all-jobs?page=${page}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            },
            mode: "cors"
        });

        const responseData = await response.json();

        console.log(responseData)

        if (Array.isArray(responseData?.data)) {
            for (const job of responseData.data) {
                if (typeof job.createdAt === "string") {
                    const safeDate = new Date(job.createdAt.slice(0, 19));
                    job.createdAt = safeDate.toLocaleDateString("pt-BR");
                }

                if (typeof job.updatedAt === "string") {
                    const safeDate = new Date(job.updatedAt.slice(0, 19));
                    job.updatedAt = safeDate.toLocaleDateString("pt-BR");
                }
            }
        }

        // console.log(responseData)

        if (!response.ok) {
            throw new Error(responseData.message || 'Erro na solicitação dos registros');
        };

        return NextResponse.json(responseData);

    } catch (error) {
        return NextResponse.json(`Erro interno: ${error}`);
    }
}