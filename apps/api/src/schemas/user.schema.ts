import { z } from 'zod';

export const searchSchema = z.object({
  query: z.object({
    q: z.string().min(1, { error: 'Search query is required' }),
  }),
});

export const updateProfileSchema = z.object({
    body: z.object({
        username: z
            .string()
            .min(5, {error: "username must be atleast 5 charcters long"})
            .max(30, {error: "username must be shorter than 30 chracaters long"})
            .regex(/^[a-zA-Z0-9_]+$/, {error: 'Alphanumeric and underscores only'}),

        })
    })