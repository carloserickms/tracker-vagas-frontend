import { z } from "zod";

export const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    image: z.string().url()
})