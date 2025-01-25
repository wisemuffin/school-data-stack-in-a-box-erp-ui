import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema";
import { zod } from "sveltekit-superforms/adapters";
import { getAllGeographies, createSchool } from "$lib/api/client";

export const load: PageServerLoad = (async () => {
    const [form, geographiesResponse] = await Promise.all([
        superValidate(zod(formSchema)),
        getAllGeographies()
    ]);

    return {
        form,
        geographies: geographiesResponse.items
    };
});

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            await createSchool(form.data);
            throw redirect(302, "/school-operations/schools");
        } catch (error) {
            return fail(500, { 
                form, 
                error: 'Failed to create school' 
            });
        }
    },
};