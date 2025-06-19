import { z } from "zod";
import { email } from "zod/v4";

export const UserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    image: z.string().url()
})