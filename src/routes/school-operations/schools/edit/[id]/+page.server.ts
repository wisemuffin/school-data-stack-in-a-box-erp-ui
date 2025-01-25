import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect, error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "../../school-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { getSchoolById, updateSchool } from "$lib/api/client";

export const load: PageServerLoad = (async ({ params }) => {
    const [form, school] = await Promise.all([
        superValidate(zod(formSchema)),
        getSchoolById(params.id)
    ]);

    if (!school) {
        throw error(404, 'School not found');
    }

    // Pre-populate form with school data
    form.data = {
        name: school.name,
        geography_id: school.geography_id,
    };

    return {
        form,
        school
    };
});

export const actions: Actions = {
    default: async ({ request, params }) => {
        const form = await superValidate(request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        await updateSchool(params.id, form.data);
        redirect(302, "/school-operations/schools");
    },
}; 