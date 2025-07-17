"use client";

import DefaultNavBar from "@/components/DefaultNavBar";
import SearchModal from "@/components/SearchModal";
import { Button } from "@/components/ui/button"
import { IoFilter } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import Link from 'next/link';
import CardModal from "@/components/CardModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DeleteJob } from "./action";

export default function () {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

    const openConfirmDialog = (id: string) => {
        setSelectedJobId(id);
        setShowConfirm(true);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
        setSelectedJobId(null);
    };

    const confirmDelete = async () => {
        if (!selectedJobId) return;
        setLoading(true);
        try {
            await DeleteJob(selectedJobId);
            alert("Deletado com sucesso!");
        } catch {
            alert("Erro ao deletar.");
        } finally {
            setLoading(false);
            setShowConfirm(false);
            setSelectedJobId(null);
        }
    };

    const handleEdit = (id: string) => {
        router.push(`/dashboard/jobs/edit/${id}`);
    };

    return (
        <div className="flex flex-col h-dvh overflow-y-hidden p-1 gap-1">
            <div className="flex justify-center h-[10%]">
                <DefaultNavBar />
            </div>

            <div className="flex flex-col w-full h-full p-1">
                <div className="flex w-full h-[7%] justify-end items-center gap-1 p-1">
                    <div className="flex text-gray-600">
                        <Button className="rounded-sm bg-[#b0f3df] hover:bg-[#18cb96] hover:text-white" variant="outline">
                            Filtrar <IoFilter />
                        </Button>
                    </div>
                    <div className="flex text-gray-600">
                        <Link href="/dashboard/jobs">
                            <Button
                                asChild
                                className="rounded-sm bg-[#b0f3df] hover:bg-[#18cb96] hover:text-white"
                                variant="outline"
                            >
                                <span className="flex items-center gap-2">
                                    Adicionar <FiPlus />
                                </span>
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="p-1">
                    <SearchModal />
                </div>

                <div className="flex flex-col gap-1 overflow-x-auto">
                    <CardModal
                        handleEdit={handleEdit}
                        deleteSubmit={confirmDelete}
                        openConfirmDialog={openConfirmDialog}
                    />
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50">

                    <div className="bg-white p-6 rounded-md shadow-md text-center">
                        <p className="text-lg font-semibold mb-4">Deseja realmente excluir esta vaga?</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={cancelDelete}
                                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={confirmDelete}
                                disabled={loading}
                                className="px-4 py-2 bg-red-500 text-white hover:bg-red-600 rounded"
                            >
                                {loading ? "Excluindo..." : "Confirmar"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
