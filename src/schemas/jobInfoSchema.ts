import { z } from "zod";

export const JobInfoSchema = z.object({
    title: z.string().min(1, 'Título obrigatório'),
    link: z.string().min(1, 'Link obrigatório'),
    enterpriseName: z.string().min(1, 'Nome da empresa obrigatório'),
    status: z.string().min(1, 'Status obrigatório'),
    modality: z.string().min(1, 'Modalidade obrigatória'),
    location: z.string().min(1).nullable(),
    interestLevel: z.string().min(1).nullable(),
    salary: z.number().nullable(),
    typeOfContract: z.string().min(1).nullable(),
    workload: z.number().nullable(),
});