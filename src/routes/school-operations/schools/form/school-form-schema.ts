import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(2, "School name must be at least 2 characters").max(100, "School name must be less than 100 characters"),
    geography_id: z.number({
        required_error: "Geography ID is required",
        invalid_type_error: "Geography ID must be a number"
    }),
    // id: z.number().optional(),
});

export type FormSchema = typeof formSchema; 