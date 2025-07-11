"use client"
import DefaultNavBar from "@/components/DefaultNavBar";
import SearchModal from "@/components/SearchModal";
import { Button } from "@/components/ui/button"
import { IoFilter } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";

export default function () {
    return (
        <div className="flex flex-col h-dvh overflow-y-hidden p-1 gap-1">
            <div className="flex justify-center h-[10%]">
                <DefaultNavBar />
            </div>

            <div className="flex flex-col w-full h-full border rounded-md border-black p-1">
                <div className="flex w-[100%] h-[7%] justify-end items-center gap-1 p-1">
                    {/* <SearchModal/> */}
                    <div className="flex">
                        <Button className="border border-black rounded-sm hover:bg-[#18cb96]" variant="outline">Filtrar
                            <IoFilter />
                        </Button>
                    </div>
                    <div className="flex">
                        <Button className="border border-black rounded-sm hover:bg-[#18cb96]" variant="outline">Adicionar
                            <FiPlus />
                        </Button>
                    </div>
                </div>

                <div className="p-1">
                    <SearchModal/>
                </div>
            </div>
        </div>
    );
}