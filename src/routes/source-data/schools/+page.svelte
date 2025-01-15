<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Card } from "$lib/components/ui/card/index.js";


    import DataTableDg from "$lib/components/ui/data-table-dg.svelte";
	import { icons } from "lucide-svelte";

    import {columns} from "./columns.js"
    

    let { data } = $props();

    const filterColumns = ["name"]
    import { PlusCircleIcon } from "lucide-svelte";

    function greet() {
		alert('Welcome to Svelte!');
	}
    

   </script>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4 p-4">
                <Button onclick={greet}><PlusCircleIcon/>Add School</Button>
                <DataTableDg columns={columns} data={data.schools} filterColumns={filterColumns} showColumnVisibility={true} />

            </Card>

</div>
   