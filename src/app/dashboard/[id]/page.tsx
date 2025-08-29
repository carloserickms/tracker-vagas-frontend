"use client";

import DefaultNavBar from "@/components/DefaultNavBar";
import SearchModal from "@/components/SearchModal";
import { useEffect, useState } from "react";
import { CreateNewJob, DeleteJob, UpdateJob, Logout } from "./action";
import ShowConfirm from "@/components/ShowConfirm";
import { useAllStatus } from "@/hooks/query/useAllStatus";
import { useAllModality } from "@/hooks/query/useAllmodality";
import { JobInfoSchema } from "@/schemas/jobInfoSchema";
import { FormItens, JobEditPayload, JobItens, JobPayload } from "@/types/jobTypes";
import { useRef } from "react";
import { useAllJobs } from "@/hooks/query/useAllJobs";
import { useDebounce } from "@/hooks/query/useDebounce";
import { toast } from 'react-toastify';
import React from "react";
import Footer from "@/components/Footer";
import { signOut } from "next-auth/react";
import Image from "next/image";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import { redirect } from "next/navigation";
import { useAllinterestLevels } from "@/hooks/query/useAllInterestLevels";
import { useAllTypeOfContracts } from "@/hooks/query/useTypeOfContracts";
import Card from "@/components/Card";
import JobFormModal from "@/components/jobFormModal";
import ActionBar from "@/components/ActionBar";
import emptyState from '../../../../public/images/empty-state.png';


export default function Page() {

    const [loading, setLoading] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [showFormJob, setFormJob] = useState(false);
    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 500);
    const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
    const editModalRef = useRef<HTMLDivElement>(null);
    const [current_page, set_page] = useState(1);
    const [filterModality, setFilterModality] = useState('all');
    const [currentCards, setCurrentCards] = useState<JobItens[]>([]);

    const {
        data: allJobs,
        isLoading,
        isError,
        refetch: allJobsRefetch,
    } = useAllJobs(current_page);

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

    const {
        data: interestLevel,
        // isLoading: isModalityLoading,
        // isError: isModalityError,
        // refetch: interestLevelRefetch
    } = useAllinterestLevels();

    const {
        data: typeOfContract,
        // isLoading: isModalityLoading,
        // isError: isModalityError,
        // refetch: modalityRefetch
    } = useAllTypeOfContracts();

    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [enterprise, setEnterprise] = useState('');
    const [statusSelectId, setStatusSelectId] = useState('');
    const [modalitySelectId, setModalitySelectId] = useState('');
    const [locationSelect, setLocation] = useState('');
    const [interestLevelSelectId, setInterestLevelSelectId] = useState('');
    const [salarySelect, setSalary] = useState(0);
    const [typeOfContractSelectId, setTypeOfContractSelectId] = useState('');
    const [workloadSelect, setWorkload] = useState(0);
    const [selectedCardData, setSelectedCardData] = useState<JobItens>();


    useEffect(() => {
        if (selectedCardData) {
            setTitle(selectedCardData.title)
            setLink(selectedCardData.link)
            setEnterprise(selectedCardData.enterpriseName)
            setInterestLevelSelectId(selectedCardData.interestLevelId!)
            setLocation(selectedCardData.location!)
            setSalary(selectedCardData.salary!)
            setTypeOfContractSelectId(selectedCardData.typeOfContractId!)
            setWorkload(selectedCardData.workload!)
            setStatusSelectId(selectedCardData.statusId!)
            setModalitySelectId(selectedCardData.modalityId)
        }
    }, [selectedCardData])

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

    useEffect(() => {
        if (allJobs?.data) {
            const filteredJobs = allJobs.data.filter((jobItem: JobItens) => {
                const matchesSearch =
                    debouncedSearch === '' ||
                    jobItem.title.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
                    jobItem.enterpriseName.toLowerCase().includes(debouncedSearch.toLowerCase());

                const matchesModality =
                    filterModality === 'all' || jobItem.modality === filterModality;

                return matchesSearch && matchesModality;
            });

            setCurrentCards(filteredJobs);
        }
    }, [debouncedSearch, filterModality, allJobs]);

    const SelectCardPayload: FormItens = {
        title: title,
        link: link,
        enterprise: enterprise,
        locationValue: locationSelect,
        salaryValue: salarySelect,
        workloadValue: workloadSelect,
        loading: loading,
        modalityId: modalitySelectId,
        statusId: statusSelectId,
        interestLevelId: interestLevelSelectId,
        typeOfContractId: typeOfContractSelectId,
        setIterestLevelId: setInterestLevelSelectId,
        setModalityId: setModalitySelectId,
        setStatusId: setStatusSelectId,
        setTypeOfContractId: setTypeOfContractSelectId,
        setTitle: setTitle,
        setLink: setLink,
        setEnterprise: setEnterprise,
        setLocation: setLocation,
        setSalary: setSalary,
        setWorkload: setWorkload,
        onSubmit: handleSubmit,
        cardTitle: selectedJobId ? "Editar vaga" : "Criar vaga",
        modality: modality,
        status: status,
        interestLevel: interestLevel,
        typeOfContract: typeOfContract
    }

    const CreatePayload: JobPayload = {
        title: title,
        link: link,
        enterpriseName: enterprise,
        status: statusSelectId,
        modality: modalitySelectId,
        location: locationSelect,
        interestLevel: interestLevelSelectId,
        salary: salarySelect,
        typeOfContract: typeOfContractSelectId,
        workload: workloadSelect
    };

    const EditPayload: JobEditPayload = {
        jobId: selectedJobId!,
        title: title,
        link: link,
        enterpriseName: enterprise,
        status: statusSelectId,
        modality: modalitySelectId,
        location: locationSelect,
        interestLevel: interestLevelSelectId,
        salary: salarySelect,
        typeOfContract: typeOfContractSelectId,
        workload: workloadSelect
    };

    function showlert(validated: boolean, mensage: string) {
        if (!validated) {
            toast.error(mensage);
            return
        }

        toast.success(mensage)
    }

    function cleanFilds() {
        setSelectedJobId(null);
        setTitle('');
        setLink('');
        setEnterprise('');
        setSalary(0.00);
        setWorkload(0.00);
        setLocation('');
        setInterestLevelSelectId('')
        setStatusSelectId('')
        setModalitySelectId('')
        setTypeOfContractSelectId('')
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
                cleanFilds()

            } else {
                const validatedFields = JobInfoSchema.safeParse(CreatePayload);

                if (!validatedFields.success) {
                    showlert(false, `Preencha os campos corretamente. ${validatedFields.error}`);
                    return;
                }

                await CreateNewJob(CreatePayload);

                showlert(true, "Vaga criada com sucesso!.");

                await allJobsRefetch()
                cleanFilds()
            }

            setFormJob(false);
            setSelectedJobId(null);
        } catch (error) {
            showlert(false, `Ocorreu um error ao salvar: ${error}`);
        } finally {
            setLoading(false);
        }
    }

    async function hendleLogOut() {

        const res = await Logout()

        if (!res.ok) {
            showlert(false, 'Erro ao deslogar');
            return
        }

        showlert(true, 'Deslogando...');

        await signOut();

        redirect('/login')
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
        setFormJob(true);
        cleanFilds()
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
                <div className="flex flex-col h-dvh overflow-y-hidden p-1 gap-1 w-[100%] lg:w-[70%]">
                    <div className="flex justify-center h-[10%]">
                        <DefaultNavBar
                            onSubmit={hendleLogOut}
                        />
                    </div>

                    <div className="flex flex-col w-full h-full">
                        <ActionBar
                            filterModality={filterModality}
                            modality={modality}
                            openCreateModal={openCreateModal}
                            setFilterModality={setFilterModality}
                        />

                        <div className="p-1">
                            <SearchModal
                                search={search}
                                setSearch={setSearch}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4 overflow-y-auto max-h-[calc(100vh-200px)] pt-5 pb-5">
                            {currentCards?.length === 0 ? (
                                <div className="flex flex-col items-center justify-center col-span-full py-10 text-gray-500">
                                    <Image
                                        src={emptyState} 
                                        alt="Nenhum item encontrado"
                                        width={260}
                                        height={260}
                                        className="opacity-70 mb-4"
                                    />
                                    <p className="text-lg font-medium popup">Nada aqui por enquanto...</p>
                                </div>
                            ) : (
                                currentCards.map((jobItem: JobItens) => (
                                    <Card
                                        key={jobItem.id}
                                        jobsInfo={jobItem}
                                        interestLevels={interestLevel}
                                        isLoading={isLoading}
                                        isError={isError}
                                        setSelectedCardData={setSelectedCardData}
                                        allJobsRefetch={allJobsRefetch}
                                        openConfirmDialog={openConfirmDialog}
                                        openEditModal={openEditModal}
                                    />
                                ))
                            )}
                        </div>
                    </div>

                    <div className="sticky bottom-0 p-2 flex justify-end shadow-md">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem className="shadow rounded-md">
                                    <PaginationPrevious className="hover:bg-[#18cb96] hover:text-white" onClick={() => set_page(prev => Math.max(prev - 1, 1))} />
                                </PaginationItem>

                                <PaginationItem className="shadow rounded-md">
                                    <PaginationLink>{current_page}</PaginationLink>
                                </PaginationItem>

                                <PaginationItem className="shadow rounded-md">
                                    <PaginationNext className="hover:bg-[#18cb96] hover:text-white" onClick={() => set_page(prev => prev + 1)} />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
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
                                <JobFormModal
                                    cardTitle={selectedJobId ? "Editar vaga" : "Criar vaga"}
                                    formParms={SelectCardPayload}
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
