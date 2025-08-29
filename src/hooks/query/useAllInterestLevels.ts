"use client";

import { useQuery } from "react-query";

export function useAllinterestLevels() {

    return useQuery({
        queryKey: ['getAllinterestLevels'],
        queryFn: async () => {
            const res = await fetch("/api/getAllInterestLevels");
            if (!res.ok) throw new Error("interestLevels não encontrado");
            return res.json();
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    })
}