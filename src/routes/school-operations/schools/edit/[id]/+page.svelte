<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { formSchema } from "../../add/schema";
    import SchoolForm from "../../school-form.svelte";

    let { data } = $props();
    
    const form = superForm(data.form, {
        validators: zodClient(formSchema),
        dataType: 'json'
    });
</script>

<SchoolForm
    {form}
    title="Edit School"
    description="Update school information."
    submitLabel="Update"
/> 