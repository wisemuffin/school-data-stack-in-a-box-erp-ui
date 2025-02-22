import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "../school-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { getAllGeographies, createSchool } from "$lib/api/erp/erp_client";

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

        await createSchool(form.data);
        redirect(302, "/school-operations/schools");
    },
};