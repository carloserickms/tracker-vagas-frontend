"use client";

import { useQuery } from "react-query";

export function useAllJobs(page:Number) {
    return useQuery({
        queryKey: ['AllJobs', page],
        queryFn: async () => {
            if(page === null){
                page = 1
            }
            const res = await fetch(`/api/getAllJobs?page=${page}`);
            if (!res.ok) throw new Error("Usuário não autenticado");
            return res.json();
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    })
}