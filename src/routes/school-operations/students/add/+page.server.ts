import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "../student-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { getAllSchools, createStudent } from "$lib/api/client";
import type { School } from "$lib/api/types/api";

export const load: PageServerLoad = (async () => {
    const [form, schoolsResponse] = await Promise.all([
        superValidate(zod(formSchema)),
        getAllSchools()
    ]);

    return {
        form,
        schools: schoolsResponse.items
    };
});

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        await createStudent(form.data);
        redirect(302, "/school-operations/students");
    },
}; 