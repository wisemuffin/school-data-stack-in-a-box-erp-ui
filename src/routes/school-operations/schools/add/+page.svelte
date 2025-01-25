<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { formSchema } from "../school-form-schema";
    import SchoolForm from "../school-form.svelte";

    let { data } = $props();
    
    const form = superForm(data.form, {
        validators: zodClient(formSchema),
        dataType: 'json'
    });
</script>

<SchoolForm
    {form}
    title="Add School"
    description="Create a new school record."
    submitLabel="Create"
/>