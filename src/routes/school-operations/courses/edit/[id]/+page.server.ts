import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect, error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "../../course-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { getClassById, updateClass } from "$lib/api/client";

export const load: PageServerLoad = (async ({ params }) => {
    const [form, course] = await Promise.all([
        superValidate(zod(formSchema)),
        getClassById(params.id)
    ]);

    if (!course) {
        throw error(404, 'Course not found');
    }

    // Pre-populate form with course data
    form.data = {
        name: course.name,
        scholastic_year_id: course.scholastic_year_id,
    };

    return {
        form,
        course
    };
});

export const actions: Actions = {
    default: async ({ request, params }) => {
        const form = await superValidate(request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            await updateClass(params.id, form.data);
            throw redirect(302, "/school-operations/courses");
        } catch (err) {
            return fail(500, { 
                form, 
                error: 'Failed to update course' 
            });
        }
    },
}; 