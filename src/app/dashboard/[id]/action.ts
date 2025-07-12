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

export function LogOutAccount() {
    return useQuery({
        queryKey: ['logout'],
        queryFn: async () =>{
            const res = await fetch("/api/logout", {
                method: 'POST',
            });
        }
    });
}

export function GetAllJobs() {
    return useQuery({
        queryKey: ['getAllJobs'],
        queryFn: async () => {
            const res = await fetch("/api/getAllJobs");
            if (!res.ok) throw new Error("Usuário não autenticado");
            return res.json();
        }
    })
}