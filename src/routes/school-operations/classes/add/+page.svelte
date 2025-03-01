<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { formSchema } from "../class-form-schema";
    import ClassForm from "../class-form.svelte";

    let { data } = $props();
    
    const form = superForm(data.form, {
        validators: zodClient(formSchema),
        dataType: 'json'
    });
</script>

<ClassForm
    {form}
    title="Add Class"
    description="Create a new class record."
    submitLabel="Create"
/> 