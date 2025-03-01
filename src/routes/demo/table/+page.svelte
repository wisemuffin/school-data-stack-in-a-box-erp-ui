<script lang="ts">
    import DataTable from "$lib/components/ui/data-table-general/data-table-general.svelte";
    import {columns as columns_task} from '$lib/components/ui/data-table-general/columns.js'
    import {data as data_task} from '$lib/components/ui/data-table-general/data/tasks.js'
   
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">

    <DataTable 
        columns={columns_task} 
        data={data_task} 
    />
</div>



   