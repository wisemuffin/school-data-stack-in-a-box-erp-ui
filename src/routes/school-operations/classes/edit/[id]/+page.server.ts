import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect, error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "../../class-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { getClassById, updateClass } from "$lib/api/erp/erp_client";

export const load: PageServerLoad = (async ({ params }) => {
    const [form, class] = await Promise.all([
        superValidate(zod(formSchema)),
        getClassById(params.id)
    ]);

    if (!class) {
        throw error(404, 'Class not found');
    }

    // Pre-populate form with class data
    form.data = {
        name: class.name,
        scholastic_year_id: class.scholastic_year_id,
    };

    return {
        form,
        class
    };
});

export const actions: Actions = {
    default: async ({ request, params }) => {
        const form = await superValidate(request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        await updateClass(params.id, form.data);
        redirect(302, "/school-operations/classes");

    },
}; 