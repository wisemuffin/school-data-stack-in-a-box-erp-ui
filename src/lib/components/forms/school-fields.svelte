<script lang="ts">
    import { Field, Control, Label, FieldErrors } from "formsnap";
    import { Input } from "$lib/components/ui/input";
    import type { SuperForm } from "sveltekit-superforms";
    import type { FormSchema } from "../../routes/school-operations/schools/add/schema";

    let { form, formData } = $props<{
        form: SuperForm<FormSchema, any>;
        formData: any;
    }>();
</script>

<Field {form} name="name">
    <Control>
        <Label >Name</Label>
        <Input 
            bind:value={$formData.name} 
            class="w-full"
        />
    </Control>
    <FieldErrors class="text-red-500" />
</Field> 