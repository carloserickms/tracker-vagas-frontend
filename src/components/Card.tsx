'use client'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { LuBriefcaseBusiness } from "react-icons/lu";
import { LiaBusinessTimeSolid, LiaEdit, LiaFileContractSolid } from "react-icons/lia";
import { IoCalendarOutline, IoLocationOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import { CardProps } from "@/types/pageProps";
import { JobEditPayload, SelectOption } from "@/types/jobTypes";
import { FiClock } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import Link from "next/link";
import { GoLinkExternal } from "react-icons/go";
import { useEffect, useState } from "react";
import { UpdateJob } from "@/app/dashboard/[id]/action";

export default function Card({
    jobsInfo,
    interestLevels,
    setSelectedCardData,
    allJobsRefetch,

    openConfirmDialog,
    openEditModal
}: CardProps) {

    const [interestLevelId, setInterestLevelId] = useState<string>(jobsInfo.interestLevelId!)

    useEffect(() => {
        setInterestLevelId(jobsInfo.interestLevelId!)
    }, [jobsInfo])

    useEffect(() => {
        const update = async () => {

            const EditPayload: JobEditPayload = {
                jobId: jobsInfo.id,
                title: jobsInfo.title,
                link: jobsInfo.link,
                enterpriseName: jobsInfo.enterpriseName,
                status: jobsInfo.statusId,
                modality: jobsInfo.modalityId,
                location: jobsInfo.location,
                interestLevel: interestLevelId,
                salary: jobsInfo.salary,
                typeOfContract: jobsInfo.typeOfContractId,
                workload: jobsInfo.workload
            };

            await UpdateJob(EditPayload);

            allJobsRefetch()
        };

        update();
    }, [interestLevelId])


    return (
        <div className="pt-3 fade-in md:pt-10">
            <div className="relative">
                <div className={`absolute top-[-28px] left-[calc(85%-15%)] flex justify-center border rounded-t-lg shadow-t-md p-1 w-[30%] bg-amber-50 z-[-10] ${jobsInfo.status === 'Aguardando' ? 'bg-yellow-100' : jobsInfo.status === 'Aberto' ? 'bg-blue-200' : 'bg-red-200'}`}>
                    <span>{jobsInfo.status}</span>
                </div>
                <div className="flex rounded-t-lg border border-b-0 p-3 z-[10] bg-white">
                    <div className="flex items-center p-1 w-[80%] font-semibold text-lg">
                        <span className="truncate">{jobsInfo.title}</span>
                    </div>
                    <div className="flex justify-center w-[20%] font-semibold text-lg">
                        <Select value={interestLevelId} onValueChange={(value) => setInterestLevelId(value)}>
                            <SelectTrigger className="h-12 w-12 flex items-center justify-center [&>svg]:hidden rounded-full cursor-pointer border-0 border-white shadow-md hover:bg-[#18cb96]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="relative">
                                {interestLevels?.data.map((interestLevelItem: SelectOption) => (
                                    <SelectItem key={interestLevelItem.id} value={String(interestLevelItem.id)}>
                                        {interestLevelItem.name === 'Neutro' ? (
                                            <div className="flex gap-1">
                                                <span className="w-[23px]">😐</span>
                                                <span>{interestLevelItem.name}</span>
                                            </div>
                                        ) : interestLevelItem.name === 'Pouco Interessado' ? (
                                            <div className="flex gap-1">
                                                <span className="w-[23px]">🙂</span>
                                                <span>{interestLevelItem.name}</span>
                                            </div>
                                        ) : (
                                            <div className="flex gap-1">
                                                <span className="w-[23px]">🔥</span>
                                                <span>{interestLevelItem.name}</span>
                                            </div>
                                        )}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            <div className="border border-t-0 rounded-b-md flex flex-col gap-1 p-3 pt-0 text-sm shadow-md/20 bg-white">
                <div className="grid grid-cols-2 gap-1 p-2 pt-5 border-t">
                    <div className="flex items-center gap-2">
                        <LuBriefcaseBusiness size={20} className="shrink-0"/>
                        <span className="truncate">{jobsInfo.enterpriseName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <LiaBusinessTimeSolid size={20} />
                        <span>{jobsInfo.modality}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoLocationOutline size={20} className="shrink-0"/>
                        <span className="truncate">{jobsInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MdOutlineAttachMoney size={20} />
                        <span>{jobsInfo.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FiClock size={20} />
                        <span>{jobsInfo.workload ? jobsInfo.workload + 'h' : ' '}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <LiaFileContractSolid size={20} />
                        <span>{jobsInfo.typeOfContract}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <IoCalendarOutline size={20} />
                        <span>{jobsInfo.createdAt}</span>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-2 text-black">
                    <button onClick={async () => { openEditModal(jobsInfo.id), setSelectedCardData({ ...jobsInfo }) }} className="flex items-center gap-1 text-sm shadow-md hover:bg-[#18cb96] hover:text-white px-2 py-1 rounded-sm cursor-pointer">
                        <span>Editar</span>
                        <LiaEdit size={16} />
                    </button>

                    <button onClick={async () => { openConfirmDialog(jobsInfo.id) }} className="flex items-center gap-1 text-sm shadow-md hover:bg-red-400 hover:text-white px-2 py-1 rounded-sm cursor-pointer">

                        <span>Excluir</span>
                        <AiOutlineDelete size={16} />
                    </button>

                    <Link
                        href={jobsInfo.link?.startsWith("http") ? jobsInfo.link : `https://${jobsInfo.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm shadow-md hover:bg-[#18cb96] hover:text-white px-2 py-1 rounded-sm text-blue-600 underline"
                    >
                        <span>Link</span>
                        <GoLinkExternal size={16} />
                    </Link>
                </div>
            </div>
        </div>
    );
}