<script lang="ts">
    import { Field, Control, Label, FieldErrors } from "formsnap";
    import { Input } from "$lib/components/ui/input";
    import type { SuperForm } from "sveltekit-superforms";
    import type { FormSchema } from "../../routes/school-operations/students/add/schema";

    let { form, formData } = $props<{
        form: SuperForm<FormSchema, any>;
        formData: any;
    }>();
</script>

<Field {form} name="first_name">
    <Control>
        <Label >First Name</Label>
        <Input 
            bind:value={$formData.first_name} 
            class="w-full"
        />
    </Control>
    <FieldErrors class="text-red-500" />
</Field>

<Field {form} name="last_name">
    <Control>
        <Label >Last Name</Label>
        <Input 
            bind:value={$formData.last_name} 
            class="w-full"
        />
    </Control>
    <FieldErrors class="text-red-500" />
</Field> 