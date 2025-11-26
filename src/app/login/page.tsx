import RegisterModal from "@/components/RegisterModal";
import Image from "next/image";



export default function Login() {
    return (
        <div className="flex flex-col h-dvh overflow-hidden bg-[#18cb96]">
            <div className="flex flex-col lg:flex-row h-full">

                <div className="relative flex items-center justify-center w-full lg:w-1/2 h-1/2 lg:h-full">

                    <div className="z-10 flex flex-col items-center lg:items-start text-center lg:text-left w-3/5">
                        <span className="font-bold text-4xl lg:text-6xl text-white leading-tight select-none">
                            Sua busca por vagas, em um só lugar.
                        </span>
                    </div>

                    <div className="absolute bottom-0 right-10 w-[500px] h-[450px]">
                        <Image
                            src="/images/abducting.png"
                            alt="Ilustração"
                            fill
                            className="object-contain select-none pointer-events-none"
                            draggable={false}
                            priority
                        />
                    </div>

                </div>
                <div className="flex items-center justify-center w-full lg:w-1/2 h-1/2 lg:h-full p-4">
                    <RegisterModal />
                </div>
            </div>
        </div>
    );
}