import { JobPayload } from "@/types/jobTypes";
import { NextResponse } from "next/server";
import { useQuery } from "react-query";

export function GetAllStatus() {

    return useQuery({
        queryKey: ['getAllStatus'],
        queryFn: async () => {
            const res = await fetch("/api/getAllStatus");
            if (!res.ok) throw new Error("Status não encontrado");
            return res.json();
        }
    })
}

export function GetAllModality() {

    return useQuery({
        queryKey: ['getAllModality'],
        queryFn: async () => {
            const res = await fetch("/api/getAllModality");
            if (!res.ok) throw new Error("Modality não encontrado");
            return res.json();
        }
    })
}

export async function CreateNewJob(payload:JobPayload) {
    
    const response = await fetch('/api/createNewJob',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        mode: "cors",
        body: JSON.stringify(payload)
    });

    const responseData = await response.json();

    if (!response.ok) {
        return NextResponse.json({message: "Erro ao comunicar"})
    }
}