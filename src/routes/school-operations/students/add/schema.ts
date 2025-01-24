import { z } from "zod";

export const formSchema = z.object({
    first_name: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be less than 50 characters"),
    last_name: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be less than 50 characters"),
    school_id: z.string({ 
        required_error: "Please select a school",
        invalid_type_error: "Please select a valid school" 
    }),
});

export type FormSchema = typeof formSchema;

