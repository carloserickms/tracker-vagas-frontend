"use client";

import { useQuery } from "react-query";

export function useJobById(jobId: string) {
    return useQuery({
        queryKey: ['getJoById', jobId],
        queryFn: async () => {
            const res = await fetch(`/api/getJobById?jobId=${jobId}`);
            if (!res.ok) throw new Error("Vaga não Não encontrada");
            return res.json();
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    })
}