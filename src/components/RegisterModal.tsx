'use client'

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

export default function RegisterModal() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (provider: string) => {
        setError(null);
        if (provider === "google") {
            await signIn("google", { redirect: false });
        } else {
            alert(error);
        }
    };

    return (
        <div
            className="
                w-full max-w-md 
                bg-white shadow-xl 
                rounded-2xl 
                p-6 sm:p-8
                flex flex-col items-center gap-6
            "
        >
            {/* TÍTULO */}
            <span
                className="
                    text-xl sm:text-2xl 
                    font-semibold text-center
                "
            >
                Bem-vindo(a) ao <br /> TrackerVagas.
            </span>

            {/* BOTÃO GOOGLE */}
            <Button
                onClick={() => handleSubmit("google")}
                className="
                    w-full py-3
                    bg-white text-black 
                    rounded-2xl border 
                    flex items-center justify-center gap-2
                    hover:bg-[#18cb96] hover:text-white hover:shadow
                "
            >
                <FcGoogle size={24} />
                Entrar com o Google
            </Button>
        </div>
    );
}
