"use client";

import { useQuery } from "react-query";

export function useAllStatus() {

    return useQuery({
        queryKey: ['getAllStatus'],
        queryFn: async () => {
            const res = await fetch("/api/getAllStatus");
            if (!res.ok) throw new Error("Status não encontrado");
            return res.json();
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });
}