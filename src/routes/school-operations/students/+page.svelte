<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Card } from "$lib/components/ui/card/index.js";


    import DataTableDg from "$lib/components/ui/data-table-dg.svelte";
	import { PlusCircleIcon } from "lucide-svelte";

    import {columns} from "./columns.js"
    

    let { data } = $props();

    const filterColumns = ["first_name", "last_name"]

    

   </script>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4 p-4">
                <Button 
                    href="/school-operations/students/add" 
                    class="gap-2 bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100 mb-4"
                >
                <PlusCircleIcon/>Add Student
                </Button>
                <DataTableDg 
                    columns={columns} 
                    data={data.students} 
                    filterColumns={filterColumns} 
                    showColumnVisibility={true}
                    textClass="text-nsw-brand-dark dark:text-white"
                    textMutedClass="text-nsw-brand-dark/80 dark:text-white/80"
                    textSubtleClass="text-nsw-brand-dark/70 dark:text-white/70"
                />

            </Card>

</div>
   