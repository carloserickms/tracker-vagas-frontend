import { useQuery } from "react-query";

export function GetAllStatus() {

    console.log('>>>>>>> cheguei aqu')

    return useQuery({
        queryKey: ['getAllStatus'],
        queryFn: async () => {
            const res = await fetch("/api/getAllStatus");
            console.log('RESPOSTA DO GETTOKEN', res);
            if (!res.ok) throw new Error("Status não encontrado");
            return res.json();
        }
    })
}