interface JobFormCardProps {
    cardTitle: string;
    title: string;
    setTitle: (value: string) => void;
    link: string;
    setLink: (value: string) => void;
    enterprise: string;
    setEnterprise: (value: string) => void;
    modality: any;
    setModality: (value: string) => void;
    status: any;
    setStatus: (value: string) => void;
    loading: boolean;
    onSubmit: () => void;
}