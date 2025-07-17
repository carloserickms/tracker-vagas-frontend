export interface Props {
    id: string;
}

export interface CardProps {
    deleteSubmit: (id: string) => void;
    handleEdit: (id: string) => void;
    openConfirmDialog: (id: string) => void;
}
