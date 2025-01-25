<script lang="ts">
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { formSchema } from "../course-form-schema";
    import CourseForm from "../course-form.svelte";

    let { data } = $props();
    
    const form = superForm(data.form, {
        validators: zodClient(formSchema),
        dataType: 'json'
    });
</script>

<CourseForm
    {form}
    title="Add Course"
    description="Create a new course record."
    submitLabel="Create"
/> 