import { IoIosBusiness } from "react-icons/io";
import { FaBusinessTime } from "react-icons/fa";
import { IoIosTime } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { FaExternalLinkSquareAlt } from "react-icons/fa";
import { GetAllJobs } from "@/app/dashboard/[id]/action";
import Link from "next/link";


export default function CardModal() {

    const { data: jobsInfo, isLoading, isError } = GetAllJobs();

    return (
        <>
            {
                jobsInfo?.data?.map((jobItem: any) => (
                    <div className="flex justify-between p-1 border rounded-md border-black">
                        <div className="w-full">
                            <div className="flex">
                                <div className="w-[80%] border-b font-bold border-[#18cb96]">
                                    <span>{jobItem.title}.</span>
                                </div>
                                <div className="flex justify-center items-center text-sm rounded-md bg-[#18cb96] w-[20%]">
                                    <span>{jobItem.status}</span>
                                </div>
                            </div>
                            <div className="flex">
                                <div className="text-sm w-[40%]">
                                    <div className="flex items-center gap-1">
                                        <IoIosBusiness size={18} />
                                        <span>{jobItem.enterpriseName}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <FaBusinessTime size={18} />
                                        <span>{jobItem.modality}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <IoIosTime size={18} />
                                        <span>{jobItem.createdAt}</span>
                                    </div>
                                </div>

                                <div className="flex items-end justify-end gap-1 w-[60%]">
                                    <div className="flex items-center text-sm bg-[#b0f3df] rounded-md p-0.5 hover:bg-[#18cb96]">
                                        <span>Editar</span>
                                        <MdEditSquare size={15} />
                                    </div>
                                    <div className="flex items-center text-sm bg-[#b0f3df] rounded-md p-0.5 hover:bg-red-400">
                                        <span>Excluir</span>
                                        <MdDeleteForever size={16} />
                                    </div>
                                    <div className="flex items-center text-sm bg-[#b0f3df] rounded-md p-0.5 hover:bg-[#18cb96] gap-1">
                                        <Link
                                            href={jobItem.link.startsWith("http") ? jobItem.link : `https://${jobItem.link}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-1  underline"
                                        >
                                            <span className="text-blue-600">Link</span>
                                            <FaExternalLinkSquareAlt size={14} />
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}