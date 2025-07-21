export interface JobPayload {
    title: string;
    link: string;
    enterpriseName: string;
    status: string;
    modality: string;
}
export interface JobEditPayload {
    jobId: string;
    title: string;
    link: string;
    enterpriseName: string;
    status: string;
    modality: string;
}

export interface JobByid {
    id: String
}

export interface JobFormCardProps {
    cardTitle: string;
    title: string;
    setTitle: (value: string) => void;
    link: string;
    setLink: (value: string) => void;
    enterprise: string;
    setEnterprise: (value: string) => void;
    modality: any;
    setModality: (value: string) => void;
    modalityValue: string;
    status: any;
    setStatus: (value: string) => void;
    statusValue: string;
    loading: boolean;
    onSubmit: () => void;
}