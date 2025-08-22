import { convertDataString } from "@/utils/convertDataString";
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

        if (Array.isArray(responseData?.data)) {
            for (const job of responseData.data) {
                if (typeof job.createdAt === "string") {
                    job.createdAt = convertDataString(job.createdAt);
                }

                if (typeof job.updatedAt === "string") {
                    job.updatedAt = convertDataString(job.updatedAt);
                }
            }
        }

        if (!response.ok) {
            throw new Error(responseData.message || 'Erro na solicitação dos registros');
        };

        return NextResponse.json(responseData);

    } catch (error) {
        return NextResponse.json(`Erro interno: ${error}`);
    }
}