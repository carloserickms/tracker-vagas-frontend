"use client";

import { Input } from "@/components/ui/input";
import { SearchModalProps } from "@/types/pageProps";
import { BiSearch } from "react-icons/bi";

export default function SearchModal({
    search,
    setSearch,
}: SearchModalProps) {
    return (
        <div className="flex items-center border shadow-sm rounded-sm w-full">
            <div className="flex-1">
                <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Pesquisar..."
                    className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent shadow-none"
                />

            </div>
            <div className="p-2">
                <BiSearch size={20} />
            </div>
        </div>
    );
}
