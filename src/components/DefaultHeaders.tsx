import Image from "next/image";


export default function DefaultHeaders() {
    return (
        <div className="flex w-full justify-center h-[10%] border-b border-[#18cb96]">
            <div className="flex justify-center gap-1 w-[80%]">
                <div className="flex items-center p-4">
                    <Image
                        src="/icons/tracker-vagas-logo.png"
                        alt="Icone de contrato"
                        width={120}
                        height={20}
                        className="h-auto w-auto max-h-12"
                    />
                </div>
            </div>
        </div>
    )
}