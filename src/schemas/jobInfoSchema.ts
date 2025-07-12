import { z } from "zod";

export const JobInfoSchema = z.object({
    title: z.string(),
    link: z.string(),
    enterpriseName: z.string(),
    status: z.string(),
    modality: z.string(),
})