<script lang="ts">
	import { Card } from "$lib/components/ui/card/index.js";


    import DataTableDg from "$lib/components/ui/data-table-dg.svelte";

    import {columns} from "./columns.js"
    

    let { data } = $props();

    const filterColumns = ["first_name"]

    

   </script>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4 p-4">
                <DataTableDg columns={columns} data={data.students} filterColumns={filterColumns} showColumnVisibility={true} />

            </Card>

</div>
   