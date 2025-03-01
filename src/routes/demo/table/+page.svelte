<script lang="ts">
    import DataTable from "$lib/components/ui/data-table-general/data-table-general.svelte";
    import {columns as columns_task} from "./columns"
    import {data as data_task} from './data/tasks.js'
   
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">

    <DataTable 
        columns={columns_task} 
        data={data_task} 
        showColumnVisibility={true}
        textFilterColumns={[
            {
                id: "title",
                placeholder: "Filter by title..."
            },
        ]}
        filterableColumns={[
            {
                id: "status",
                title: "Status",
                // options: [
                //     { value: "actives", label: "Actives" },
                //     { value: "inactive", label: "Inactive" }
                // ]
            },
            {
                id: "priority",
                title: "Priority",
                // options: [
                //     { value: "Z", label: "Z" },
                //     { value: "B", label: "B" },
                //     { value: "C", label: "C" }
                // ]
            }
        ]}
/>
</div>



   