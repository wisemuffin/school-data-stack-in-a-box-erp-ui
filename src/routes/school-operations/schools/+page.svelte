<script lang="ts">
    
    import { Button } from "$lib/components/ui/button/index.js";
	import { Card } from "$lib/components/ui/card/index.js";

    import { PlusCircleIcon } from "lucide-svelte";
	import { deleteSchool } from "$lib/api/erp/erp_client.js";
	import { invalidateAll } from "$app/navigation";
    import DataTable from "./data-table.svelte";

    let { data } = $props();

    let checkedRows = $state(new Set<string>());
    
    const handleDelete = async (ids: string[]) => {
        for (const id of ids) {
            await deleteSchool(id);
        }
        checkedRows.clear();
        await invalidateAll();
    };

    function greet() {
		alert('Welcome to Svelte!');
	}
    

   </script>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card class="col-span-4 p-4">
                <div class="flex gap-2 mb-4">
                    <Button 
                        href="/school-operations/schools/add" 
                        onclick={greet} 
                        class="gap-2 bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100"
                    >
                        <PlusCircleIcon/>Add School
                    </Button>
                </div>
                <DataTable 
                    data={data.schools} 
                    onDelete={handleDelete} 
                />

            </Card>

</div>
   