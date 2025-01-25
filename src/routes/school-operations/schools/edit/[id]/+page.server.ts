import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect, error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "../../add/schema";
import { zod } from "sveltekit-superforms/adapters";
import { getSchoolById, updateSchool, getAllGeographies } from "$lib/api/client";

export const load: PageServerLoad = (async ({ params }) => {
    const [form, school, geographiesResponse] = await Promise.all([
        superValidate(zod(formSchema)),
        getSchoolById(params.id),
        getAllGeographies()
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
        school,
        geographies: geographiesResponse.items
    };
});

export const actions: Actions = {
    default: async ({ request, params }) => {
        const form = await superValidate(request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            await updateSchool(params.id, form.data);
            throw redirect(302, "/school-operations/schools");
        } catch (err) {
            return fail(500, { 
                form, 
                error: 'Failed to update school' 
            });
        }
    },
}; 