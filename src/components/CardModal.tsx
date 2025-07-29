"use client"

import { GoLinkExternal } from "react-icons/go";
import { AiOutlineDelete } from "react-icons/ai";
import { LiaEdit } from "react-icons/lia";
import { LuBriefcaseBusiness } from "react-icons/lu";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { IoCalendarOutline } from "react-icons/io5";
import Link from "next/link";
import { useAllJobs } from "@/hooks/query/useAllJobs";
import { useRouter } from 'next/navigation';
import { CardProps } from "@/types/pageProps";

export default function CardModal({
    jobsInfo,
    isLoading,
    isError,
    allJobsRefetch,
    openConfirmDialog,
    openEditModal
}: CardProps & {
    jobsInfo: any;
    isLoading: boolean;
    isError: boolean;
    allJobsRefetch: () => void;
}) {

    console.log(jobsInfo)

    if (isLoading) return <p className="p-2">Carregando...</p>;
    if (isError) return <p className="p-2 text-red-500">Erro ao carregar os dados.</p>;


    return (
        <div className="flex flex-col h-full overflow-y-auto p-2 gap-2">
            {jobsInfo?.data?.map((jobItem: any) => (
                <div
                    key={jobItem.id}
                    className="flex flex-col p-2 border rounded-md shadow-sm"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center text-black px-2 py-1 rounded-t-md border-b">
                        <div className="font-bold text-sm">{jobItem.title}</div>
                        <span className="bg-[#18cb96] text-white text-xs px-2 py-0.5 rounded-md">
                            {jobItem.status}
                        </span>
                    </div>

                    {/* Informações principais */}
                    <div className="flex flex-col gap-1 p-2 text-sm rounded-b-md">
                        <div className="flex items-center gap-2">
                            <LuBriefcaseBusiness size={16} />
                            <span>{jobItem.enterpriseName}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <LiaBusinessTimeSolid size={16} />
                            <span>{jobItem.modality}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <IoCalendarOutline size={16} />
                            <span>{jobItem.createdAt}</span>
                        </div>
                    </div>

                    {/* Ações */}
                    <div className="flex justify-end gap-2 mt-2">
                        <button onClick={async () => { openEditModal(jobItem.id)}} className="flex items-center gap-1 text-sm text-gray-600 bg-[#b0f3df] hover:bg-[#18cb96] hover:text-white px-2 py-1 rounded-md">
                            <span>Editar</span>
                            <LiaEdit size={16} />
                        </button>

                        <button onClick={async () => { openConfirmDialog(jobItem.id)}} className="flex items-center gap-1 text-sm text-gray-600 bg-[#b0f3df] hover:bg-red-400 hover:text-white px-2 py-1 rounded-md">
                            <span>Excluir</span>
                            <AiOutlineDelete size={16} />
                        </button>

                        <Link
                            href={jobItem.link?.startsWith("http") ? jobItem.link : `https://${jobItem.link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-sm bg-[#b0f3df] hover:bg-[#18cb96] hover:text-white px-2 py-1 rounded-md text-blue-600 underline"
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
