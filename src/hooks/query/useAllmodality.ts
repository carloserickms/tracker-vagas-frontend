"use client";

import { useQuery } from "react-query";

export function useAllModality() {

    return useQuery({
        queryKey: ['getAllModality'],
        queryFn: async () => {
            const res = await fetch("/api/getAllModality");
            if (!res.ok) throw new Error("Modality não encontrado");
            return res.json();
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    })
}