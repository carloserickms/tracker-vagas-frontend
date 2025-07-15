"use client";
import DefaultNavBar from "@/components/DefaultNavBar";
import SearchModal from "@/components/SearchModal";
import { Button } from "@/components/ui/button"
import { IoFilter } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import Link from 'next/link';
import CardModal from "@/components/CardModal";

export default function () {

    return (
        <div className="flex flex-col h-dvh overflow-y-hidden p-1 gap-1">
            <div className="flex justify-center h-[10%]">
                <DefaultNavBar />
            </div>

            <div className="flex flex-col w-full h-full p-1">
                <div className="flex w-[100%] h-[7%] justify-end items-center gap-1 p-1">
                    {/* <SearchModal/> */}
                    <div className="flex text-gray-600">
                        <Button className="rounded-sm bg-[#b0f3df] hover:bg-[#18cb96] hover:text-white" variant="outline">Filtrar
                            <IoFilter />
                        </Button>
                    </div>
                    <div className="flex text-gray-600">
                        <Link href="/dashboard/jobs">
                            <Button
                                asChild
                                className="rounded-sm bg-[#b0f3df] hover:bg-[#18cb96] hover:text-white"
                                variant="outline"
                            >
                                <span className="flex items-center gap-2">
                                    Adicionar <FiPlus />
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="p-1">
                    <SearchModal />
                </div>

                <div className="flex flex-col gap-1 overflow-x-auto">
                    <div className="overflow-y-auto">
                        <CardModal />
                    </div>
                </div>
            </div>
        </div>
    );
}