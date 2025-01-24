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
    import * as Card from "$lib/components/ui/card";
    

    export let data: SuperValidated<Infer<FormSchema>>;
    
    const form = superForm(data, {
     validators: zodClient(formSchema),
     dataType: 'json'
    });
    
    const { form: formData, enhance } = form;
</script>

<div class="container mx-auto p-6">
    <Card.Root class="max-w-md mx-auto">
        <Card.Header>
            <Card.Title class="text-nsw-brand-dark dark:text-white">Add New School</Card.Title>
            <Card.Description class="text-nsw-brand-dark/70 dark:text-white/70">
                Enter the details for the new school.
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <form method="POST" use:enhance class="space-y-6">
                <Form.Field {form} name="name">
                    <Form.Control let:attrs>
                        <Form.Label class="text-nsw-brand-dark dark:text-white">School Name</Form.Label>
                        <Input 
                            {...attrs} 
                            bind:value={$formData.name} 
                            class="w-full"
                        />
                    </Form.Control>
                    <Form.Description class="text-nsw-brand-dark/70 dark:text-white/70">
                        This is your public display name.
                    </Form.Description>
                    <Form.FieldErrors class="text-red-500" />
                </Form.Field>

                <div class="flex justify-end gap-4 pt-4">
                    <Button 
                        variant="outline" 
                        href="/school-operations/schools" 
                        class="border-nsw-brand-dark text-nsw-brand-dark dark:border-white dark:text-white hover:bg-nsw-brand-dark/10 dark:hover:bg-white/10"
                    >
                        Cancel
                    </Button>
                    <Form.Button class="bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100">
                        Submit
                    </Form.Button>
                </div>
            </form>
        </Card.Content>
    </Card.Root>
</div>
   <!-- <SuperDebug data={$formData} />  -->
