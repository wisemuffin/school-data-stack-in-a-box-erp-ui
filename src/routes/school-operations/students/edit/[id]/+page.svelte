<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { formSchema } from "../../student-form-schema";
    import StudentForm from "../../student-form.svelte";

    let { data } = $props();
    
    const form = superForm(data.form, {
        validators: zodClient(formSchema),
        dataType: 'json'
    });
</script>

<StudentForm
    {form}
    title="Edit Student"
    description="Update student information."
    submitLabel="Update"
/> 