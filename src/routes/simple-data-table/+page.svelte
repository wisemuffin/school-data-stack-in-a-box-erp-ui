<script lang="ts">

    import DataTableDg from "$lib/components/ui/data-table-dg.svelte";

    import {columns} from "./columns"
    

    let { data } = $props();

    const filterColumns = ["email","status"]

    

   </script>
    
    
   <DataTableDg columns={columns} data={data.payments} filterColumns={filterColumns} showColumnVisibility={true} />

   