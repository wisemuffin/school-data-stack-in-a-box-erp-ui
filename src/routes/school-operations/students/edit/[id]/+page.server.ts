import type { PageServerLoad, Actions } from "./$types";
import { fail, redirect, error } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "../../student-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { getStudentById, updateStudent } from "$lib/api/client";

export const load: PageServerLoad = (async ({ params }) => {
    const [form, student] = await Promise.all([
        superValidate(zod(formSchema)),
        getStudentById(params.id)
    ]);

    if (!student) {
        throw error(404, 'Student not found');
    }

    // Pre-populate form with student data
    form.data = {
        first_name: student.first_name,
        last_name: student.last_name,
    };

    return {
        form,
        student
    };
});

export const actions: Actions = {
    default: async ({ request, params }) => {
        const form = await superValidate(request, zod(formSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        await updateStudent(params.id, form.data);
        redirect(302, "/school-operations/students");
    },
}; 