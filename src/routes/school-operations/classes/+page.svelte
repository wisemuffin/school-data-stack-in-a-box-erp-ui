<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card/index.js";
    import DataTable from "$lib/components/ui/data-table-general/data-table-general.svelte";
    import type { FacetedFilterColumn, TextFilterColumn } from "$lib/components/ui/data-table-general/types.js";
    import { PlusCircleIcon, Trash } from "lucide-svelte";
    import { columns } from "./data-table-columns.js";
    import { deleteClass } from "$lib/api/erp/erp_client.js";
    import { invalidateAll } from "$app/navigation";
    import { goto } from "$app/navigation";

    let { data } = $props();

    const filterColumns: FacetedFilterColumn[] = [ 
        {
            id: "name",
            title: "Class Name",
            options: data.classes.map((x) => ({
                value: x.name,
                label: x.name
            }))
        }
    ];

    const textFilterColumns: TextFilterColumn[] = [
        {
            id: "name",
            placeholder: "Filter by class name..."
        }
    ];

    let checkedRows = $state(new Set<string>());
    
    let dialogOpen = $state(false);
    
    const handleDelete = async (ids: string[]) => {
        for (const id of ids) {
            await deleteClass(id);
        }
        checkedRows.clear();
        await invalidateAll();
    };
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex gap-2 mb-4">
        <Button 
            onclick={() => goto('/school-operations/classes/add')}
            class="gap-2 bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100"
        >
            <PlusCircleIcon/>Add Class
        </Button>
    </div>
    <DataTable 
        columns={columns(checkedRows, handleDelete, (open) => dialogOpen = open)} 
        data={data.classes} 
        filterableColumns={filterColumns}
        textFilterColumns={textFilterColumns}
        showColumnVisibility={true}
        textClass="text-nsw-brand-dark dark:text-white"
        textMutedClass="text-nsw-brand-dark/80 dark:text-white/80"
        textSubtleClass="text-nsw-brand-dark/70 dark:text-white/70"
    />
</div> 