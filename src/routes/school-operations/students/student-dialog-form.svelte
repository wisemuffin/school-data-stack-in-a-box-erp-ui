<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Field, Control, Label, FieldErrors } from "formsnap";
    import { Input } from "$lib/components/ui/input";
    import * as Dialog from "$lib/components/ui/dialog";
    import type { SuperForm } from "sveltekit-superforms";
    import type { FormSchema } from "./student-form-schema";

    let { form, open = $bindable() } = $props<{
        form: SuperForm<FormSchema>;
        open: boolean;
    }>();
    
    const { form: formData, enhance } = form;
</script>

<Dialog.Root bind:open>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>Add Student</Dialog.Title>
            <Dialog.Description>
                Create a new student record.
            </Dialog.Description>
        </Dialog.Header>
        <form method="POST" use:enhance class="space-y-6">
            <Field {form} name="first_name">
                <Control>
                    <Label>First Name</Label>
                    <Input 
                        bind:value={$formData.first_name} 
                        class="w-full"
                    />
                </Control>
                <FieldErrors class="text-red-500" />
            </Field>

            <Field {form} name="last_name">
                <Control>
                    <Label>Last Name</Label>
                    <Input 
                        bind:value={$formData.last_name} 
                        class="w-full"
                    />
                </Control>
                <FieldErrors class="text-red-500" />
            </Field>

            <Dialog.Footer>
                <Button type="submit" class="bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100">
                    Create Student
                </Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root> 