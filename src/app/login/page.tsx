import RegisterModal from "@/components/RegisterModal";
import Image from "next/image";

export default function Login() {
    return (
        <div className="flex flex-col min-h-screen bg-[#18cb96] overflow-hidden">

            {/* CONTAINER GERAL */}
            <div className="flex flex-col lg:flex-row h-full">

                {/* --- LADO ESQUERDO (TEXTO + IMAGEM) --- */}
                <div className="
                    relative 
                    flex flex-col items-center justify-center 
                    w-full lg:w-1/2 
                    px-6 pt-14 pb-10
                    text-center lg:text-left
                    h-auto lg:h-screen
                ">
                    {/* TEXTO */}
                    <span className="
                        font-bold 
                        text-white 
                        leading-tight 
                        text-3xl sm:text-4xl lg:text-6xl 
                        max-w-md lg:max-w-xl
                        select-none
                    ">
                        Sua busca por vagas, em um só lugar.
                    </span>

                    {/* IMAGEM NO MOBILE (REPOSICIONADA) */}
                    <div className="
                        relative 
                        w-64 h-64 sm:w-72 sm:h-72 
                        mt-8 lg:hidden
                    ">
                        <Image
                            src="/images/abducting.png"
                            alt="Ilustração"
                            fill
                            className="object-contain pointer-events-none select-none"
                            draggable={false}
                            priority
                        />
                    </div>

                    {/* IMAGEM NO DESKTOP (POSICIONADA ABSOLUTA COMO ORIGINAL) */}
                    <div className="
                        hidden lg:block
                        absolute bottom-0 right-10 
                        w-[450px] h-[420px]
                    ">
                        <Image
                            src="/images/abducting.png"
                            alt="Ilustração"
                            fill
                            className="object-contain pointer-events-none select-none"
                            draggable={false}
                            priority
                        />
                    </div>
                </div>

                {/* --- LADO DIREITO (CARD) --- */}
                <div className="
                    flex items-start lg:items-center justify-center 
                    w-full lg:w-1/2 
                    h-auto lg:h-screen 
                    p-6 pt-10 lg:pt-0
                ">
                    <RegisterModal />
                </div>

            </div>
        </div>
    );
}
