import { useQuery } from "react-query";

export function GetUserInfo() {
    return useQuery({
        queryKey: ['userInfo'],
        queryFn: async () => {
            const res = await fetch("/api/userInfo");
            if (!res.ok) throw new Error("Usuário não autenticado");
            return res.json();
        }
    })
}