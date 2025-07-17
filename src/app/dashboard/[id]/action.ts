import { JobPayload } from "@/types/jobTypes";
import { NextResponse } from "next/server";


export async function DeleteJob(id: string) {

    try {
        const response = await fetch(`/api/deleteJob?jobId=${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: "cors",
        });

        if (!response.ok) {
            return NextResponse.json({ message: "Erro ao comunicar" });
        }

        return NextResponse.json({ message: "Salvo com sucesso!" });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Erro interno!" });
    }
}