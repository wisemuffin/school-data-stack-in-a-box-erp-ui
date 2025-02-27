<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card/index.js";
    import DataTableDg from "$lib/components/ui/data-table-general/data-table-general.svelte";
    import { PlusCircleIcon, Trash } from "lucide-svelte";
    import { createColumns } from "./data-table-columns.js";
    import { deleteClass } from "$lib/api/erp/erp_client.js";
    import { invalidateAll } from "$app/navigation";

    let { data } = $props();
    const filterColumns = ["name"];
    
    let checkedRows = $state(new Set<string>());
    
    const handleDelete = async (ids: string[]) => {
        for (const id of ids) {
            await deleteClass(id);
        }
        checkedRows.clear();
        await invalidateAll();
    };
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    <Card class="col-span-4 p-4">
        <div class="flex gap-2 mb-4">
            <Button 
                href="/school-operations/courses/add" 
                class="gap-2 bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100"
            >
                <PlusCircleIcon/>Add Course
            </Button>
        </div>
        <DataTableDg 
            columns={createColumns(checkedRows, handleDelete)} 
            data={data.courses} 
            filterColumns={filterColumns} 
            showColumnVisibility={true} 
        />
    </Card>
</div> 