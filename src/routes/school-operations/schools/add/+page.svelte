<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Field, Control, Label, FieldErrors } from "formsnap";
    import { Input } from "$lib/components/ui/input";
    import { formSchema, type FormSchema } from "./schema";
    import type { SuperValidated, Infer } from "sveltekit-superforms";
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import * as Card from "$lib/components/ui/card";

    let { data } = $props();
    
    const form = superForm(data.form, {
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
                <Field {form} name="name">
                    <Control>
                        <Label class="text-nsw-brand-dark dark:text-white">School Name</Label>
                        <Input 
                            bind:value={$formData.name} 
                            class="w-full"
                        />
                    </Control>
                    <FieldErrors class="text-red-500" />
                </Field>

                <div class="flex justify-end gap-4 pt-4">
                    <Button 
                        variant="outline" 
                        href="/school-operations/schools" 
                        class="border-nsw-brand-dark text-nsw-brand-dark dark:border-white dark:text-white hover:bg-nsw-brand-dark/10 dark:hover:bg-white/10"
                    >
                        Cancel
                    </Button>
                    <Button type="submit" class="bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100">
                        Submit
                    </Button>
                </div>
            </form>
        </Card.Content>
    </Card.Root>
</div>