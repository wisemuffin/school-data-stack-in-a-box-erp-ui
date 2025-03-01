<script lang="ts">
    import { Button } from "$lib/components/ui/button";
    import { Field, Control, Label, FieldErrors } from "formsnap";
    import { Input } from "$lib/components/ui/input";
    import * as Dialog from "$lib/components/ui/dialog";
    import type { SuperForm } from "sveltekit-superforms";
    import type { FormSchema } from "./school-form-schema";
    import { page } from '$app/stores';

    let { form, open = $bindable() } = $props<{
        form: SuperForm<FormSchema>;
        open: boolean;
    }>();
    
    const { form: formData, enhance } = form;
    
    let isEdit = $derived(!!$page.url.searchParams.get('id'));
    let title = $derived(isEdit ? 'Edit School' : 'Add School');
    let description = $derived(isEdit ? 'Update school information.' : 'Create a new school record.');
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
                    <Label>School Name</Label>
                    <Input 
                        bind:value={$formData.name} 
                        class="w-full"
                    />
                </Control>
                <FieldErrors class="text-red-500" />
            </Field>

            <Field {form} name="geography_id">
                <Control>
                    <Label>Geography ID</Label>
                    <Input 
                        type="number"
                        bind:value={$formData.geography_id} 
                        class="w-full"
                    />
                </Control>
                <FieldErrors class="text-red-500" />
            </Field>

            <Dialog.Footer>
                <Button type="submit" class="bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100">
                    {submitLabel}
                </Button>
            </Dialog.Footer>
        </form>
    </Dialog.Content>
</Dialog.Root> 