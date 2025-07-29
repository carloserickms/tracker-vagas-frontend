"use client";

import { useQuery } from "react-query";

export function useFilterByTitle(title: string) {
    return useQuery({
        queryKey: ['getByTitle', title],
        queryFn: async () => {
            const res = await fetch(`/api/getJobByTitle?title=${title}`);
            if (!res.ok) throw new Error("Vaga não Não encontrada");
            return res.json();
        },
        enabled: !!title.trim(),
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    })
}