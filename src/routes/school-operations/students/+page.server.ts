import type { PageServerLoad, Actions } from "./$types";
import { getAllStudents, createStudent, getStudentById, updateStudent } from "$lib/api/erp/erp_client";
import type { Student } from "$lib/api/erp/types/erp_api";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./student-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {
    const id = url.searchParams.get('id');
    let form;

    if (id) {
        const student = await getStudentById(id);
        form = await superValidate(
            { 
                first_name: student.first_name, 
                last_name: student.last_name 
            }, 
            zod(formSchema)
        );
    } else {
        form = await superValidate(zod(formSchema));
    }

    const response = await getAllStudents({ limit: 100000 });
    
    return { 
        students: response.items,
        form
    };
};

export const actions: Actions = {
    default: async ({ request, url }) => {
        const form = await superValidate(request, zod(formSchema));
        const id = url.searchParams.get('id');

        if (!form.valid) {
            return fail(400, { form });
        }

        if (id) {
            await updateStudent(id, form.data);
        } else {
            await createStudent(form.data);
        }

        return { form };
    }
};