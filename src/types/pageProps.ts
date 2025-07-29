

export interface Props {
    id: string;
}

export interface CardProps {
    openConfirmDialog: (id: string) => void;
    openEditModal: (id: string) => void;

    jobsInfo: any;
    isLoading: boolean;
    isError: boolean;
    allJobsRefetch: () => Promise<any>;
}

export interface ShowConfirmProps {
    cancelDelete: () => void;
    confirmDelete: () => void;
    loading: boolean;
}

export interface SearchModalProps {
    search: string;
    setSearch: (value: string) => void;
    onDebouncedSearch: (value: string) => void;
}