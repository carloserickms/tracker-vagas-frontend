"use client";

import DefaultNavBar from "@/components/DefaultNavBar";
import { useAllModality } from "@/hooks/query/useAllmodality";
import { useAllStatus } from "@/hooks/query/useAllStatus";
import { useJobById } from "@/hooks/query/useJobById";
import { JobInfoSchema } from "@/schemas/jobInfoSchema";
import { JobEditPayload, JobPayload } from "@/types/jobTypes";
import { useState, use, useEffect } from "react";
import { UpdateJob } from "./action";
import JobFormCard from "@/components/JobFormCard";

export default function JobEditPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const { data:
        jobInfo,
        isLoading: isJobLoading,
        isError: isJobError
    } = useJobById(id);

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

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [enterprise, setEnterprise] = useState('');
    const [statusSelect, setStatus] = useState('');
    const [modalitySelect, setModality] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (jobInfo?.data) {
            setTitle(jobInfo.data.title ?? '');
            setLink(jobInfo.data.link ?? '');
            setEnterprise(jobInfo.data.enterpriseName ?? '');
            setStatus(jobInfo.data.status ?? '');
            setModality(jobInfo.data.modality ?? '');
        }
    }, [jobInfo]);

    if (isJobLoading || isModalityLoading || isStatusLoading) {
        return <div>Carregando vaga...</div>;
    }

    if (isJobError || !jobInfo?.data) {
        return <div>Erro ao carregar dados da vaga.</div>;
    }

    const payload: JobEditPayload = {
        jobId: id,
        title,
        link,
        enterpriseName: enterprise,
        status: statusSelect,
        modality: modalitySelect,
    };

    async function handleSubmit() {
        const validatedFields = JobInfoSchema.safeParse(payload);
        if (!validatedFields.success) {
            alert("Dados inválidos.");
            return;
        }

        console.log('atualizaçao', payload)

        setLoading(true);
        try {
            await UpdateJob(payload);
            alert("Salvo com sucesso!");
        } catch (err) {
            alert("Erro ao cadastrar.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col h-dvh overflow-y-hidden p-1 gap-1">
            <div className="flex justify-center h-[10%]">
                <DefaultNavBar />
            </div>

            <JobFormCard
                cardTitle="Editar vaga"
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
