"use client";

import { useQuery } from "react-query";

export function useAllJobs() {
    return useQuery({
        queryKey: ['AllJobs'],
        queryFn: async () => {
            const res = await fetch("/api/getAllJobs");
            if (!res.ok) throw new Error("Usuário não autenticado");
            return res.json();
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    })
}