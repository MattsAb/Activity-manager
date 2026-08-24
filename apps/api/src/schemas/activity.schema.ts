import { z } from "zod"

export const createActivitySchema = z.object({
    body: z.object({
        title: z
            .string()
            .min(5, {error: "title must be atleast 5 charcters long"})
            .max(30, {error: "title must be shorter than 30 chracaters long"})
            .regex(/^[a-zA-Z0-9_ ]+$/, {error: 'Alphanumeric, underscores, and spaces only'})
            
        })
})