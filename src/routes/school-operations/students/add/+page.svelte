<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Field, Control, Label, FieldErrors } from "formsnap";
    import { Input } from "$lib/components/ui/input";
    import * as Select from "$lib/components/ui/select";
    import { formSchema, type FormSchema } from "./schema.ts";
    import type { SuperValidated, Infer } from "sveltekit-superforms";
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import * as Card from "$lib/components/ui/card";
	import { Proportions } from "lucide-svelte";
    
    // export let data: SuperValidated<Infer<FormSchema>>;
    // export let schools: Array<{ id: number; name: string }>;

    let { data } = $props();
    
    const form = superForm(data.form, {
     validators: zodClient(formSchema),
     dataType: 'json'
    });

    const { form: formData, enhance } = form;

    let selectedSchoolId: string = $state("");
</script>

<div class="container mx-auto p-6">
    <Card.Root class="max-w-md mx-auto">
        <Card.Header>
            <Card.Title class="text-nsw-brand-dark dark:text-white">Add New Student</Card.Title>
            <Card.Description class="text-nsw-brand-dark/70 dark:text-white/70">
                Enter the student's details below.
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <form method="POST" use:enhance class="space-y-6">
                <Field {form} name="first_name">
                    <Control>
                        <Label class="text-nsw-brand-dark dark:text-white">First Name</Label>
                        <Input 
                            bind:value={$formData.first_name} 
                            class="w-full"
                        />
                    </Control>
                    <FieldErrors class="text-red-500" />
                </Field>

                <Field {form} name="last_name">
                    <Control>
                        <Label class="text-nsw-brand-dark dark:text-white">Last Name</Label>
                        <Input 
                            bind:value={$formData.last_name} 
                            class="w-full"
                        />
                    </Control>
                    <FieldErrors class="text-red-500" />
                </Field>

          

                <div class="flex justify-end gap-4 pt-4">
                    <Button 
                        variant="outline" 
                        href="/school-operations/students" 
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