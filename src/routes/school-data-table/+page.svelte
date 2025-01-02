<script lang="ts">

    import DataTableDg from "$lib/components/ui/data-table-dg.svelte";

    import {columns} from "./columns"
    

    let { data } = $props();

    const filterColumns = ["name"]

    

   </script>
    
   <DataTableDg columns={columns} data={data.schools} filterColumns={filterColumns} showColumnVisibility={true} />

   