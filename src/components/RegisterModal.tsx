'use client'

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";


export default function RegisterModal() {

    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (providers: string) => {
        setError(null);

        if (providers === "google") {
            await signIn("google", {
                redirect: false,
            });
        } else {
            alert(error)
        }
    }

    return (
        <div className="flex justify-center items-center w-[90%] max-w-lg h-[35%] bg-white shadow-lg rounded-2xl">
            <div className="flex flex-col items-center justify-center w-4/5 h-4/5 rounded-xl">

                <div className="flex justify-center items-center h-1/3 w-full rounded-t-xl">
                    <span className="text-3xl text-center font-semibold select-none pointer-events-none">Bem-vindo(a) ao <br /> TrackerVagas.</span>
                </div>

                <div className="flex items-center justify-center h-1/3 w-4/5 rounded-lg">
                    <Button onClick={() => handleSubmit("google")}  className="w-full h-[60%] bg-white text-black rounded-2xl border hover:bg-[#18cb96] hover:text-white hover:shadow">
                        <FcGoogle/>
                        Entrar com o google

                    </Button>
                </div>  
            </div>
        </div>
    )
}