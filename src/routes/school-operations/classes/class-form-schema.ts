import {z} from 'zod';

export const formSchema: z.ZodObject<{
    name: z.ZodString;
    scholastic_year_id: z.ZodNumber;
}> = z.object({
    name: z.string().min(3).max(255),
    scholastic_year_id: z.number(),
});

export type FormSchema = typeof formSchema; 