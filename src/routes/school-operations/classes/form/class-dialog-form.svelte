<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Field, Control, Label, FieldErrors } from "formsnap";
    import { Input } from "$lib/components/ui/input";
    import * as Dialog from "$lib/components/ui/dialog";
    import type { SuperForm } from "sveltekit-superforms";
    import type { FormSchema } from "./class-form-schema";
    import { page } from '$app/stores';

    let { form, open = $bindable() } = $props<{
        form: SuperForm<FormSchema>;
        open: boolean;
    }>();
    
    const { form: formData, enhance } = form;
    
    let isEdit = $derived(!!$page.url.searchParams.get('id'));
    let title = $derived(isEdit ? 'Edit Class' : 'Add Class');
    let description = $derived(isEdit ? 'Update class information.' : 'Create a new class record.');
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
            <Field {form} name="name">
                <Control>
                    <Label>Class Name</Label>
                    <Input 
                        bind:value={$formData.name} 
                        class="w-full"
                    />
                </Control>
                <FieldErrors class="text-red-500" />
            </Field>

            <Field {form} name="scholastic_year_id">
                <Control>
                    <Label>Scholastic year id</Label>
                    <Input 
                        type="number"
                        bind:value={$formData.scholastic_year_id} 
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