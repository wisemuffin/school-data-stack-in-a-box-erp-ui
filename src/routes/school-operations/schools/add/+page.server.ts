import type { PageServerLoad, Actions } from "./$types.js";
import { fail, redirect } from "@sveltejs/kit";
import * as api from "$lib/api/client.ts";
import { superValidate } from "sveltekit-superforms";
import { formSchema } from "./schema.js";
import { zod } from "sveltekit-superforms/adapters";
 
export const load: PageServerLoad = async () => {
 return {
  form: await superValidate(zod(formSchema)),
 };
};

export const actions: Actions = {
    default: async (event) => {
      const form = await superValidate(event, zod(formSchema));
      if (!form.valid) {
        return fail(400, {
          form,
        });
      }

      await api.post(
        "schools", form.data    
    );
    //   return {
    //     form,
    //   };
    redirect(302,"/school-operations/schools");

    },
  };