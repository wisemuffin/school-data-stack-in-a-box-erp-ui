<script lang="ts">

    import DataTableDg from "$lib/components/ui/data-table-dg.svelte";

    import {columns} from "./columns"
    

    let { data } = $props();

    

   </script>
    
    
   <DataTableDg columns={columns} data={data.payments} filterColumn="email" />

   