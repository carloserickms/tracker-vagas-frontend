import { JobsInfo, SelectOptionsData } from "@/types/jobTypes";

export interface CardProps {
    openConfirmDialog: (id: string) => void;
    openEditModal: (id: string) => void;
    jobsInfo: JobsInfo | undefined;
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
    onDebouncedSearch: () => void;
}