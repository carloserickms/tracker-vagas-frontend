"use client";

import DefaultNavBar from "@/components/DefaultNavBar";
import SearchModal from "@/components/SearchModal";
import { Button } from "@/components/ui/button"
import { IoFilter } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import CardModal from "@/components/CardModal";
import { useEffect, useState } from "react";
import { CreateNewJob, DeleteJob, UpdateJob } from "./action";
import ShowConfirm from "@/components/ShowConfirm";
import { useAllStatus } from "@/hooks/query/useAllStatus";
import { useAllModality } from "@/hooks/query/useAllmodality";
import JobFormCard from "@/components/JobFormCard";
import { JobInfoSchema } from "@/schemas/jobInfoSchema";
import { JobEditPayload, JobPayload } from "@/types/jobTypes";
import { useJobById } from "@/hooks/query/useJobById";
import { useRef } from "react";
import { useAllJobs } from "@/hooks/query/useAllJobs";
import { useFilterByTitle } from "@/hooks/query/useFilterByTitle";
import { useDebounce } from "@/hooks/query/useDebounce";
import { toast } from 'react-toastify';
import React from "react";
import Footer from "@/components/Footer";


export default function Page() {

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showFormJob, setFormJob] = useState(false);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const isSearching = debouncedSearch.trim() !== '';
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const editModalRef = useRef<HTMLDivElement>(null);

    const {
        data: allJobs,
        isLoading,
        isError,
        refetch: allJobsRefetch,
    } = useAllJobs();

    const {
        data: filterByTitle,
        isLoading: isFilterByTitleLoading,
        isError: isFilterByTitleError,
        // refetch: filterByTitleRefetch
    } = useFilterByTitle(search);

    const {
        data: jobInfo,
        // isLoading: isJobLoading,
        // isError: isJobError,
        refetch: jobInfoRefetch,
    } = useJobById(selectedJobId!);

    const {
        data: status,
        // isLoading: isStatusLoading,
        // isError: isStatusError,
        // refetch: statusRefetch
    } = useAllStatus();

    const {
        data: modality,
        // isLoading: isModalityLoading,
        // isError: isModalityError,
        // refetch: modalityRefetch
    } = useAllModality();

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [enterprise, setEnterprise] = useState('');
    const [statusSelect, setStatus] = useState('');
    const [modalitySelect, setModality] = useState('');

    useEffect(() => {
        if (selectedJobId) {
            if (jobInfo?.data) {
                setTitle(jobInfo.data.title ?? '');
                setLink(jobInfo.data.link ?? '');
                setEnterprise(jobInfo.data.enterpriseName ?? '');
                setStatus(jobInfo.data.status ?? '');
                setModality(jobInfo.data.modality ?? '');
            }
        }
    }, [jobInfo]);

    useEffect(() => {

        if (debouncedSearch.trim() !== '') {
            // console.log("Pesquisa debounced acionada com:", debouncedSearch);
        }
    }, [debouncedSearch]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                editModalRef.current &&
                !editModalRef.current.contains(event.target as Node) &&
                !(event.target as HTMLElement).closest("[data-radix-popper-content-wrapper]")
            ) {
                setFormJob(false);
                setSelectedJobId(null);
            }
        }

        if (showFormJob) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showFormJob]);



    const CreatePayload: JobPayload = {
        title: title,
        link: link,
        enterpriseName: enterprise,
        status: statusSelect,
        modality: modalitySelect
    }

    const EditPayload: JobEditPayload = {
        jobId: selectedJobId!,
        title,
        link,
        enterpriseName: enterprise,
        status: statusSelect,
        modality: modalitySelect,
    };

    function showlert(validated: boolean, mensage: string) {
        if (!validated) {
            toast.error(mensage);
            return
        }

        toast.success(mensage)
    }


    async function handleSubmit() {
        setLoading(true);

        try {
            if (selectedJobId) {

                const validatedFields = JobInfoSchema.safeParse(EditPayload);

                if (!validatedFields.success) {
                    showlert(false, 'Preencha todos os campos!')
                    return;
                }

                await UpdateJob(EditPayload);

                showlert(true, 'Vaga salva com sucesso!')

                await allJobsRefetch()
                await jobInfoRefetch()

            } else {

                const validatedFields = JobInfoSchema.safeParse(CreatePayload);

                if (!validatedFields.success) {
                    showlert(false, "Preencha os campos corretamente.");
                    return;
                }

                await CreateNewJob(CreatePayload);

                showlert(true, "Vaga criada com sucesso!.");

                await allJobsRefetch()
                await jobInfoRefetch()
            }

            setFormJob(false);
            setSelectedJobId(null);
        } catch (error) {
            showlert(false, `Ocorreu um error ao salvar: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    const openConfirmDialog = (id: string) => {
        setSelectedJobId(id);
        setShowConfirm(true);
    };

    const openEditModal = (id: string) => {
        setSelectedJobId(id);
        setFormJob(true);
    };

    const openCreateModal = () => {
        setSelectedJobId(null);
        setTitle('');
        setLink('');
        setEnterprise('');
        setStatus('');
        setModality('');

        setFormJob(true);
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

            showlert(true, "Vaga deletada com sucesso!")

            await allJobsRefetch()
        } catch {
            showlert(false, "Ocorreu um erro ao tentar deletar")
        } finally {
            setLoading(false);
            setShowConfirm(false);
            setSelectedJobId(null);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex w-full justify-center">
                <div className="flex flex-col h-dvh overflow-y-hidden p-1 gap-1 w-[100%] md:w-[70%]">
                    <div className="flex justify-center h-[10%]">
                        <DefaultNavBar />
                    </div>

                    <div className="flex flex-col w-full h-full p-1">
                        <div className="flex w-full h-[7%] justify-end items-center text-black gap-1 p-1">
                            <div className="flex">
                                <Button className="rounded-sm bg-[#b0f3df] hover:bg-[#18cb96] hover:text-white" variant="outline">
                                    Filtrar <IoFilter />
                                </Button>
                            </div>
                            <div className="flex">
                                <Button
                                    onClick={() => { openCreateModal() }}
                                    asChild
                                    className="rounded-sm bg-[#b0f3df] hover:bg-[#18cb96] hover:text-white"
                                    variant="outline"
                                >
                                    <span className="flex items-center gap-2">
                                        Adicionar <FiPlus />
                                    </span>
                                </Button>
                            </div>
                        </div>

                        <div className="p-1">
                            <SearchModal
                                search={search}
                                setSearch={setSearch}
                            />

                        </div>

                        <div className="flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-200px)]">

                            <CardModal
                                jobsInfo={isSearching ? filterByTitle : allJobs}
                                isLoading={isSearching ? isFilterByTitleLoading : isLoading}
                                isError={isSearching ? isFilterByTitleError : isError}

                                openConfirmDialog={openConfirmDialog}
                                openEditModal={openEditModal}
                            />
                        </div>
                    </div>

                    {showConfirm && (
                        <ShowConfirm
                            cancelDelete={cancelDelete}
                            confirmDelete={confirmDelete}
                            loading={loading}
                        />
                    )}

                    {showFormJob && (
                        <div
                            className="fixed inset-0 backdrop-blur-sm bg-black/30 flex items-center justify-center z-50"
                        >
                            <div className=" w-[90%] md:w-[40%]" ref={editModalRef}>
                                <JobFormCard
                                    cardTitle={selectedJobId ? "Editar vaga" : "Criar vaga"}
                                    title={title}
                                    setTitle={setTitle}
                                    link={link}
                                    setLink={setLink}
                                    enterprise={enterprise}
                                    setEnterprise={setEnterprise}
                                    modality={modality}
                                    setModality={setModality}
                                    modalityValue={modalitySelect}
                                    status={status}
                                    setStatus={setStatus}
                                    statusValue={statusSelect}
                                    loading={loading}
                                    onSubmit={handleSubmit}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <Footer />
            </div>
        </div>
    );
}
