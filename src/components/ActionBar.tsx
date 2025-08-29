
import { IoFilter } from "react-icons/io5"
import { Button } from "./ui/button"
import { FiPlus } from "react-icons/fi"
import { ActionBarProps } from "@/types/pageProps"
import { SelectOption } from "@/types/jobTypes"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select"

export default function ActionBar({
    filterModality,
    modality,
    openCreateModal,
    setFilterModality
}: ActionBarProps) {
    return (
        <div className="flex w-full h-[7%] justify-end items-center text-black gap-1 p-1">
            <div className="flex rounded-md shadow-md bg-white">
                <Select value={filterModality} onValueChange={(value) => setFilterModality(value)}>
                    <SelectTrigger className="group hover:bg-[#18cb96]">
                        <span className="flex items-center gap-2 font-semibold group-hover:text-white">
                            Filtrar <IoFilter className="group-hover:text-white" />
                        </span>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            modality?.data.map((modalityItem: SelectOption) => (
                                <SelectItem key={modalityItem.id} value={modalityItem.name}>
                                    {modalityItem.name}
                                </SelectItem>
                            ))
                        }
                        <SelectItem key={0} value="all">
                            Todos
                        </SelectItem>

                    </SelectContent>
                </Select>
            </div>
            <div className="flex bg-white">
                <Button
                    onClick={() => { openCreateModal() }}
                    asChild
                    className="shadow-md hover:bg-[#18cb96] hover:text-white"
                    variant="outline"
                >
                    <span className="flex items-center gap-2">
                        Adicionar <FiPlus />
                    </span>
                </Button>
            </div>
        </div>
    )
}