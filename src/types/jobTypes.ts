export interface JobPayload {
    title: string;
    link: string;
    enterpriseName: string;
    status: string;
    modality: string;
    location: string | null;
    interestLevel: string | null;
    salary: number | null;
    typeOfContract: string | null;
    workload: number | null
}

export interface JobEditPayload {
    jobId: string;
    title: string;
    link: string;
    enterpriseName: string;
    status: string;
    modality: string;
    location: string | null;
    interestLevel: string | null;
    salary: number | null;
    typeOfContract: string | null;
    workload: number | null
}

export interface JobItens {
    id: string;
    title: string;
    link: string;
    enterpriseName: string;
    status: string;
    statusId: string;
    modality: string;
    modalityId: string;
    createdAt: string;
    location: string | null;
    interestLevel: string | null;
    interestLevelId: string | null;
    salary: number | null;
    typeOfContract: string | null;
    typeOfContractId: string | null;
    workload: number | null
}

export interface FormItens {
    cardTitle: string;
    title: string;
    setTitle: (value: string) => void;
    link: string;
    setLink: (value: string) => void;
    enterprise: string;
    setEnterprise: (value: string) => void;
    modality: SelectOptionsData | undefined;
    setModalityId: (value: string) => void;
    modalityId: string;
    status: SelectOptionsData | undefined;
    setStatusId: (value: string) => void;
    statusId: string;
    setLocation: (value: string) => void;
    locationValue?: string | null;
    interestLevel?: SelectOptionsData | undefined;
    setIterestLevelId: (value: string) => void;
    interestLevelId?: string | null;
    setSalary: (value: number) => void;
    salaryValue?: number | null;
    setWorkload: (value: number) => void;
    workloadValue?: number | null
    typeOfContract: SelectOptionsData | undefined;
    setTypeOfContractId: (value: string) => void;
    typeOfContractId?: string | null;
    loading: boolean;
    onSubmit: () => void;
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