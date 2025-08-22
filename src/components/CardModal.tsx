"use client"

import { GoLinkExternal } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import Link from "next/link";
import { CardProps } from "@/types/pageProps";
import { JobItens } from "@/types/jobTypes";
import { Skeleton } from "./ui/skeleton";

export default function CardModal({
    jobsInfo,
    isLoading,
    isError,
    openConfirmDialog,
    openEditModal
}: CardProps) {

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-200px)] p-2">
                {Array.from({ length: 9 }).map((_, i) => (
                    <div key={i} className="border rounded-md shadow-sm p-4 space-y-3">
                        <div className="flex justify-between items-center">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-5 w-16 rounded-full" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-1/4" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-1/5" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4 rounded-full" />
                                <Skeleton className="h-4 w-1/3" />
                            </div>
                        </div>

                        <div className="flex gap-2 justify-end pt-2">
                            <Skeleton className="h-8 w-20 rounded-md" />
                            <Skeleton className="h-8 w-20 rounded-md" />
                            <Skeleton className="h-8 w-20 rounded-md" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }
    if (isError) return <p className="p-2 text-red-500">Erro ao carregar os dados.</p>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 overflow-y-auto max-h-[calc(100vh-220px)] p-2">

            {jobsInfo.map((jobItem: JobItens) => (
                <div
                    key={jobItem.id}
                    className="flex flex-col p-2 border rounded-md shadow-sm"
                >
                    <div className="flex justify-between items-center text-black px-2 py-1 rounded-t-md border-b">
                        <div className="font-bold text-md">{jobItem.title}</div>
                        <span className={`text-black text-xs font-medium px-2 py-1 rounded-sm ${jobItem.status === 'Aguardando' ? 'bg-yellow-200' : jobItem.status === 'Aberto' ? 'bg-blue-300' : 'bg-red-300'}`}>
                            {jobItem.status}
                        </span>
                    </div>

                    <div className="flex flex-col gap-1 p-2 text-sm rounded-b-md">
                        <div className="flex items-center gap-2">
                            <LuBriefcaseBusiness size={20} />
                            <span>{jobItem.enterpriseName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <LiaBusinessTimeSolid size={20} />
                            <span>{jobItem.modality}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoCalendarOutline size={20} />
                            <span>{jobItem.createdAt}</span>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-2 text-black">
                        <button onClick={async () => { openEditModal(jobItem.id) }} className="flex items-center gap-1 text-sm shadow-md hover:bg-[#18cb96] hover:text-white px-2 py-1 rounded-sm">
                            <span>Editar</span>
                            <LiaEdit size={16} />
                        </button>

                        <button onClick={async () => { openConfirmDialog(jobItem.id) }} className="flex items-center gap-1 text-sm
                        shadow-md hover:bg-red-400 hover:text-white px-2 py-1 rounded-sm">
                            <span>Excluir</span>
                            <AiOutlineDelete size={16} />
                        </button>

                        <Link
                            href={jobItem.link?.startsWith("http") ? jobItem.link : `https://${jobItem.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm shadow-md hover:bg-[#18cb96] hover:text-white px-2 py-1 rounded-sm text-blue-600 underline"
                        >
                            <span>Link</span>
                            <GoLinkExternal size={16} />
                        </Link>
                    </div>
                </div>

            ))}
        </div>
    );
}
