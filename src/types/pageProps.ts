import { JobItens, SelectOptionsData } from "@/types/jobTypes";

export interface CardProps {
    openConfirmDialog: (id: string) => void;
    openEditModal: (id: string) => void;
    jobsInfo: JobItens[];
    isLoading: boolean;
    isError: boolean;
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