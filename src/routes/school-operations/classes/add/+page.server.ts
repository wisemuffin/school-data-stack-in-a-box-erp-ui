import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "../class-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { createClass } from "$lib/api/erp/erp_client";

export const load: PageServerLoad = (async () => {
    const form = await superValidate(zod(formSchema));
    
    return {
        form
    };
});

export const actions: Actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        await createClass(form.data);
        redirect(302, "/school-operations/classes");
    },
}; 