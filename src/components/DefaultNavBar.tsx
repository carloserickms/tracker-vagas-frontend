"use client"
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { date } from "zod/v4";
import Link from 'next/link';
import { useUserInfo } from "@/hooks/query/useUserInfo";


export default function DefaultNavBar() {

    const { data: user, isLoading, isError } = useUserInfo();

    if (isLoading) return <p>Carregando...</p>;
    if (isError || !user) return <p>Erro ao carregar usuário</p>;

    return (
        <div className="flex w-full h-full border shadow-sm rounded-md px-2">
            <div className="flex justify-between w-full">
                <div className="flex items-center">
                    <Link href="/dashboard">
                        <Image
                            src="/icons/tracker-vagas-logo.png"
                            alt="logo"
                            width={100}
                            height={100}
                            className="object-contain"
                        />
                    </Link>
                </div>
                <div className="flex justify-end items-center w-[40%]">
                    <div className="flex h-[90%] w-full bg-[#b0f3df] hover:bg-[#18cb96] hover:text-white rounded-md gap-2 items-center md:w-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex justify-center items-center w-full h-full rounded-md gap-1 p-1">
                                {/* Avatar */}
                                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 p-1">
                                    <img
                                        src={user.image}
                                        alt={user.name || "User Image"}
                                        className="object-cover w-full h-full rounded-full"
                                    />
                                </div>

                                {/* Username */}
                                <div className="flex items-center justify-center max-w-[200px] overflow-hidden rounded">
                                    <p className="text-sm truncate">{user.name}</p>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="flex justify-center">Log out</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

            </div>
        </div>
    );
}