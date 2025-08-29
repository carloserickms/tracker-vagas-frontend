"use client";

import { useQuery } from "react-query";

export function useAllTypeOfContracts() {

    return useQuery({
        queryKey: ['getTypeOfContract'],
        queryFn: async () => {
            const res = await fetch("/api/getAllTypeOfContracts");
            if (!res.ok) throw new Error("TypeOfContracts não encontrado");
            return res.json();
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    })
}