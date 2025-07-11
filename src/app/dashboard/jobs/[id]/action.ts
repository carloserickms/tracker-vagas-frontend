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