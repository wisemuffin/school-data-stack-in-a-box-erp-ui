import type { PageServerLoad, Actions } from "./$types";
import { getAllStudents, createStudent } from "$lib/api/client";
import type { Student } from "$lib/api/types/api";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./student-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async () => {
    const [response, form] = await Promise.all([
        getAllStudents({ limit: 100000 }),
        superValidate(zod(formSchema))
    ]);
    
    return { 
        students: response.items,
        form
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        await createStudent(form.data);
        return { form };
    }
};