import { convertDataString } from "@/utils/convertDataString";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prefix = process.env.NEXT_BACKEND_API_URL;

export async function GET(req: NextRequest) {
    try {
        const userInfo = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        const { searchParams } = new URL(req.url);
        const title = searchParams.get("title");
        if (!title) {
            console.log('entrou aqui')
            return NextResponse.json({ error: "jobId is required" }, { status: 400 });
        }

        const response = await fetch(`${prefix}/get-job-bytitle?title=${title}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            },
            mode: "cors",
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
            throw new Error(responseData.message || 'Erro na solicitação da Vaga');
        };

        return NextResponse.json(responseData);

    } catch (error) {
        return NextResponse.json(`Erro interno: ${error}`);
    }
}