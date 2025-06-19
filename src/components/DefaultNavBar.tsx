import { GetUserInfo } from "@/app/dashboard/[id]/action";
import Image from "next/image";


export default function DefaultNavBar() {

    const { data: user, isLoading, isError } = GetUserInfo();

    console.log(user);

    if (isLoading) return <p>Carregando...</p>;
    if (isError || !user) return <p>Erro ao carregar usuário</p>;

    return (
        <div className="flex w-full h-full border border-black rounded-md px-2">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    <Image
                        src="/icons/tracker-vagas-logo.png"
                        alt="Ícone de segurança"
                        width={100}
                        height={100}
                        className="object-contain"
                    />
                </div>
                <div className="flex justify-end items-center w-[40%]">
                    <div className="flex h-[90%] w-full border border-black bg-[#18cb96] rounded-md gap-2 items-center px-1">

                        {/* Avatar */}
                        <div className="w-12 h-12 rounded-full p-1 overflow-hidden flex-shrink-0">
                            <img
                                src={user.image}
                                alt={user.name || "User Image"}
                                className="object-cover w-full h-full rounded-full"
                            />
                        </div>

                        {/* Username */}
                        <div className="flex items-center justify-center max-w-[200px] overflow-hidden rounded ">
                            <p className="text-sm truncate">{user.name}</p>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}