import { FormItens, JobItens, SelectOptionsData } from "@/types/jobTypes";

export interface CardProps {
    openConfirmDialog: (id: string) => void;
    openEditModal: (id: string) => void;
    setSelectedCardData: (cardData: JobItens) => void;
    allJobsRefetch: () => void;
    jobsInfo: JobItens;
    interestLevels: SelectOptionsData | undefined;
    isLoading: boolean;
    isError: boolean;
}

export interface JobFormProps {
    cardTitle: string;
    formParms: FormItens;
}

export interface ActionBarProps {
    filterModality : string;
    modality: SelectOptionsData | undefined;
    setFilterModality: (value: string) => void;
    openCreateModal: () => void;
}

export interface JobFormCardProps {
    cardTitle: string;
    title: string;
    setTitle: (value: string) => void;
    link: string;
    setLink: (value: string) => void;
    enterprise: string;
    setEnterprise: (value: string) => void;
    modality: SelectOptionsData | undefined;
    setModality: (value: string) => void;
    modalityValue: string;
    status: SelectOptionsData | undefined;
    setStatus: (value: string) => void;
    statusValue: string;
    setLocation: (value: string) => void;
    locationValue?: string | null;
    interestLevel?: SelectOptionsData | undefined;
    setInterestLevel: (value: string) => void;
    interestLevelValue?: string | null;
    setSalary: (value: number) => void;
    salaryValue?: number | null;
    setWorkload: (value: number) => void;
    workloadValue?: number | null
    typeOfContract: SelectOptionsData | undefined;
    setTypeOfContract: (value: string) => void;
    typeOfContractValue?: string | null
    loading: boolean;
    onSubmit: () => void;
}

export interface SearchModalProps {
    search: string;
    setSearch: (value: string) => void;
}

export interface ShowConfirmProps {
    cancelDelete: () => void;
    confirmDelete: () => Promise<void>;
    loading: boolean;
}

export interface NavbarProps {
    onSubmit: () => void
}