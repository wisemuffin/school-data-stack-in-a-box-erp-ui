import {z} from 'zod';

export const formSchema = z.object({
    name: z.string().min(3).max(255),
    geography_id: z.number(),
    // id: z.number().optional(),
});

export type FormSchema = typeof formSchema;
