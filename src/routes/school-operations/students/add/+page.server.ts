import type { PageServerLoad, Actions } from "./$types.js";
import { fail, redirect } from "@sveltejs/kit";
import * as api from "$lib/api/client.ts";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./schema.js";
import { zod } from "sveltekit-superforms/adapters";
import type { School, ApiResponse } from '$lib/api/types/api.js';


export const load: PageServerLoad = (async () => {
    const form = await superValidate(zod(formSchema));
    const schools = await api.get<School>("schools");
    
    return {
        form,
        schools: schools.items
    };
}) satisfies PageServerLoad;

export const actions: Actions  = {
    default: async (event) => {
        const form = await superValidate(event, zod(formSchema));
        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        await api.post("students", form.data);
        redirect(302, "/school-operations/students");
    },
} satisfies Actions; 