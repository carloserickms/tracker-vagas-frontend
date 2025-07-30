"use client";

import { useQuery } from "react-query";

export function useLogOut() {
    return useQuery({
        queryKey: ['logout'],
        queryFn: async () =>{
            await fetch("/api/logout", {
                method: 'POST',
            });
        },
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });
}