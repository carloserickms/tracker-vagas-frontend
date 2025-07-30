'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useState } from "react";


export default function RegisterModal() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    // const router = useRouter();

    const handleSubmit = async (e: React.FormEvent, providers: string) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (providers === "google") {
            await signIn("google", {
                redirect: false,
            });
            
            setLoading(false);
        } else {
            alert(error)
        }
    }

    return (
        <div className="w-[90%] max-w-md h-[60%] mb-20 bg-gray-100 shadow-lg rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center bg-[#18cb96] h-[15%] gap-2">
                <h1 className="text-xl font-bold text-white">Wellcome</h1>
                <div>
                    <Image
                        src="/icons/waving_hand.svg"
                        alt="Ícone de segurança"
                        width={20}
                        height={20}
                        className="object-contain"
                    />
                </div>
            </div>

            <div className="flex flex-col items-center justify-evenly h-[85%] p-6">
                <div className="flex justify-center">
                    <Image
                        src="/icons/lock_person.svg"
                        alt="Ícone de segurança"
                        width={100}
                        height={64}
                        className="object-contain"
                    />
                </div>

                <Button disabled={loading} onClick={(e) => handleSubmit(e, "google")} className="flex items-center gap-3 w-full justify-center  border border-gray-300" >
                    <Image
                        src="/icons/google-logo.png"
                        alt="Logo do Google"
                        width={24}
                        height={24}
                        className="h-auto w-auto"
                    />
                    Login com o Google
                </Button>
            </div>
        </div>
    )
}