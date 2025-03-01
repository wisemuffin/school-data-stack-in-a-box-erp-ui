import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2, "Class name must be at least 2 characters").max(100, "Class name must be less than 100 characters"),
    scholastic_year_id: z.number({
        required_error: "scholastic_year_id is required",
        invalid_type_error: "scholastic_year_id must be a number"
    }),
    // Add other fields as needed
    // id: z.number().optional(),
});

export type FormSchema = typeof formSchema; 