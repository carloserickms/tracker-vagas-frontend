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

export interface JobItens {
    id: string;
    title: string;
    link: string;
    enterpriseName: string;
    status: string;
    modality: string;
    createdAt: string;
}

export interface JobsInfo {
    data: JobItens[];
}

export interface JobByid {
    id: string;
}

export interface SelectOption {
    id: string;
    name: string;
}

export interface SelectOptionsData {
    data: SelectOption[];
}