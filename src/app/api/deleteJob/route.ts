import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prefix = process.env.NEXT_BACKEND_API_URL;

export async function DELETE(req: NextRequest) {

    try {
        const userInfo = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get("jobId");
        if (!jobId) {
            return NextResponse.json({ error: "jobId is required" }, { status: 400 });
        }

        const response = await fetch(`${prefix}/delete-job?jobId=${jobId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo?.token}`
            },
            mode: "cors",
        });

        if (!response.ok) {
            return NextResponse.json({message: `${response}`})
        }

        const responseData = await response.json();
        return NextResponse.json(responseData);

    } catch (error) {
        return NextResponse.json({message: `Internal error: ${error}`})
    }
}