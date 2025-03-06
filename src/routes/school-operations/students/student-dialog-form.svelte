<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Field, Control, Label, FieldErrors } from "formsnap";
    import { Input } from "$lib/components/ui/input";
    import * as Dialog from "$lib/components/ui/dialog";
    import type { SuperForm } from "sveltekit-superforms";
    import type { FormSchema } from "./form/student-form-schema";
    import { page } from '$app/stores';

    let { form, open = $bindable() } = $props<{
        form: SuperForm<FormSchema>;
        open: boolean;
    }>();
    
    const { form: formData, enhance } = form;
    
    let isEdit = $derived(!!$page.url.searchParams.get('id'));
    let title = $derived(isEdit ? 'Edit Student' : 'Add Student');
    let description = $derived(isEdit ? 'Update student information.' : 'Create a new student record.');
    let submitLabel = $derived(isEdit ? 'Update' : 'Create');
</script>

<Dialog.Root bind:open>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
            <Dialog.Description>
                {description}
            </Dialog.Description>
        </Dialog.Header>
        <form method="POST" use:enhance class="space-y-6">
            {#if isEdit}
                <input type="hidden" name="id" value={$page.url.searchParams.get('id')} />
            {/if}
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
                <Button type="submit" >
                    {submitLabel}
                </Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root> 