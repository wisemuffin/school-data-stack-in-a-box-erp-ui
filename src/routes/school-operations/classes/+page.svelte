<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card/index.js";
    import DataTable from "$lib/components/ui/data-table-general/data-table-general.svelte";
    import type { FacetedFilterColumn, TextFilterColumn } from "$lib/components/ui/data-table-general/types.js";
    import { PlusCircleIcon, Trash } from "lucide-svelte";
    import { deleteClass } from "$lib/api/erp/erp_client.js";
    import { invalidateAll } from "$app/navigation";
    import { goto } from "$app/navigation";
    import {columns} from "./data-table-components/data-table-columns.js";
    import ClassDialogForm from "./form/class-dialog-form.svelte";
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { formSchema } from "./form/class-form-schema";

    let { data } = $props();

    const filterColumns: FacetedFilterColumn[] = [ 
        // {
        //     id: "name",
        //     title: "Class Name",
        //     options: data.classes.map((classItem) => ({
        //         value: classItem.name,
        //         label: classItem.name
        //     }))
        // }
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

    const form = superForm(data.form, {
        validators: zodClient(formSchema),
        dataType: 'json',
        onResult: ({ result }) => {
            if (result.type === 'success') {
                dialogOpen = false;
                const url = new URL(window.location.href);
                url.searchParams.delete('id');
                history.pushState({}, '', url.toString());
            }
        }
    });
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <div class="flex gap-2 mb-4">
        <Button 
            onclick={() => dialogOpen = true}
            class="gap-2 "
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
        textClass=""
        textMutedClass=""
        textSubtleClass=""
    />
</div>

<ClassDialogForm {form} bind:open={dialogOpen} /> 