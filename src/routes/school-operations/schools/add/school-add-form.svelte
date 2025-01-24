<script lang="ts">
	import { Button } from "$lib/components/ui/button";
    import * as Form from "$lib/components/ui/form";
    import { Input } from "$lib/components/ui/input";
    import { formSchema, type FormSchema } from "./schema";
    import SuperDebug, {
     type SuperValidated,
     type Infer,
     superForm,
    } from "sveltekit-superforms";
    import { zodClient } from "sveltekit-superforms/adapters";
    

    export let data: SuperValidated<Infer<FormSchema>>;
    
    const form = superForm(data, {
     validators: zodClient(formSchema),
     dataType: 'json'
    });
    
    const { form: formData, enhance } = form;
   </script>
    
   <form method="POST" use:enhance>
    <Form.Field {form} name="name">
     <Form.Control let:attrs>
      <Form.Label class="text-nsw-brand-dark dark:text-white">School</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
     </Form.Control>
     <Form.Description class="text-nsw-brand-dark/70 dark:text-white/70">
        This is your public display name.
     </Form.Description>
     <Form.FieldErrors />
    </Form.Field>
    <Form.Button class="bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100">
        Submit
    </Form.Button>
    <Button 
        variant="outline" 
        href="/school-operations/schools" 
        class="border-nsw-brand-dark text-nsw-brand-dark dark:border-white dark:text-white hover:bg-nsw-brand-dark/10 dark:hover:bg-white/10"
    >
        Cancel
    </Button>
   </form>
   <!-- <SuperDebug data={$formData} />  -->
