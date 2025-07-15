"use client";

import { useQuery } from "react-query";

export function useLogOut() {
    return useQuery({
        queryKey: ['logout'],
        queryFn: async () =>{
            const res = await fetch("/api/logout", {
                method: 'POST',
            });
        }
    });
}