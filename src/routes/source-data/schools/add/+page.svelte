<script lang="ts">
    import type { PageData } from "./$types.js";
    import SchoolAddForm from "./school-add-form.svelte";
    export let data: PageData;
   </script>
    
   <SchoolAddForm data={data.form} />