"use client"

import DefaultNavBar from "@/components/DefaultNavBar";
import { useState } from "react";
import { JobPayload } from "@/types/jobTypes";
import { CreateNewJob } from "./action";
import { JobInfoSchema } from "@/schemas/jobInfoSchema";
import { useAllModality } from "@/hooks/query/useAllmodality";
import { useAllStatus } from "@/hooks/query/useAllStatus";
import { JobFormCard } from "@/components/JobFormCard";


export default function () {

    const [title, setTitle] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [enterprise, setEnterprise] = useState<string>('');
    const [statusSelect, setStatus] = useState<string>('');
    const [modalitySelect, setModality] = useState<string>('');
    const [loading, setLoading] = useState(false);

    let payload: JobPayload = {
        title: title,
        link: link,
        enterpriseName: enterprise,
        status: statusSelect,
        modality: modalitySelect
    }

    async function handleSubmit() {

        const validatedFields = JobInfoSchema.safeParse(payload)

        if (!validatedFields.success) {
            console.log(validatedFields.success)

            alert('Dados inseridos não são validos, verifique e tente novamente');
            return
        }

        setLoading(true);
        try {
            await CreateNewJob(payload);
            alert("Salvo Com Sucesso!");
        } catch (error) {
            alert("Erro ao Cadastrar.");
        } finally {
            setLoading(false);
        }
    }

    const {
        data: status,
        isLoading: isStatusLoading,
        isError: isStatusError,
    } = useAllStatus();

    const {
        data: modality,
        isLoading: isModalityLoading,
        isError: isModalityError,
    } = useAllModality();

    return (
        <div className="flex flex-col h-dvh overflow-y-hidden p-1 gap-1">
            <div className="flex justify-center h-[10%]">
                <DefaultNavBar />
            </div>

            <JobFormCard
                cardTitle="Criar nova vaga"
                title={title}
                setTitle={setTitle}
                link={link}
                setLink={setLink}
                enterprise={enterprise}
                setEnterprise={setEnterprise}
                modality={modality}
                setModality={setModality}
                status={status}
                setStatus={setStatus}
                loading={loading}
                onSubmit={handleSubmit}
            />
        </div>
    );
}