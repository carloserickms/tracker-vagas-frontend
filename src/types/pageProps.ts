

export interface Props {
    id: string;
}

export interface CardProps {
    openConfirmDialog: (id: string) => void;
    openEditModal: (id: string) => void;

    jobsInfo: any;
    isLoading: boolean;
    isError: boolean;
    jobInfoRefetch: () => Promise<any>;
}


export interface ShowConfirmProps {
    cancelDelete: () => void;
    confirmDelete: () => void;
    loading: boolean;
}
