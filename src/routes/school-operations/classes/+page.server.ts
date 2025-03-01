import { getAllClasses, createClass, updateClass } from "$lib/api/erp/erp_client";
import type { Class } from "$lib/api/erp/types/erp_api";
import { superValidate } from "sveltekit-superforms/server";
import { formSchema } from "./form/class-form-schema";
import { zod } from "sveltekit-superforms/adapters";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ url }) => {
    const classes = await getAllClasses({ limit: 100000 });
    
    // Get the ID from the URL if it exists
    const id = url.searchParams.get('id');
    
    // Initialize the form with default values or existing class data
    let form;
    if (id) {
        const classItem = classes.items.find(c => c.id.toString() === id);
        if (classItem) {
            form = await superValidate(classItem, zod(formSchema));
        } else {
            form = await superValidate(zod(formSchema));
        }
    } else {
        form = await superValidate(zod(formSchema));
    }
    
    return {
        classes: classes.items,
        form
    };
};

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const form = await superValidate(formData, zod(formSchema));
        
        if (!form.valid) {
            return fail(400, { form });
        }
        
        try {
            const id = formData.get('id');
            
            if (id) {
                // Update existing class
                await updateClass({
                    id: Number(id),
                    ...form.data
                });
            } else {
                // Create new class
                await createClass(form.data);
            }
            
            return { form };
        } catch (error) {
            return fail(500, { 
                form,
                error: error instanceof Error ? error.message : 'An unknown error occurred'
            });
        }
    }
}; 