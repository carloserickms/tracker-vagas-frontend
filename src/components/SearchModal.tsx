import { Input } from "@/components/ui/input";
import { BiSearch } from "react-icons/bi";

export default function SearchModal() {
    return (
        <div className="flex items-center border border-black rounded-sm w-full">
            <div className="flex-1">
                <Input placeholder="Pesquisar..." className="border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:border-transparent shadow-none" />
            </div>
            <div className="p-2">
                <BiSearch size={20} />
            </div>
        </div>
    );
}
