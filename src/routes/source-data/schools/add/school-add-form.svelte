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
      <Form.Label>School</Form.Label>
      <Input {...attrs} bind:value={$formData.name} />
     </Form.Control>
     <Form.Description>This is your public display name.</Form.Description>
     <Form.FieldErrors />
    </Form.Field>
    <Form.Button>Submit</Form.Button>
    <Button  variant="secondary" href="/source-data/schools">Cancel</Button>
   </form>
   <!-- <SuperDebug data={$formData} />  -->
