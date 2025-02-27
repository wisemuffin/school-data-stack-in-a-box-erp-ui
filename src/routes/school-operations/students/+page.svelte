<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import { Card } from "$lib/components/ui/card/index.js";


    import DataTable from "$lib/components/ui/data-table-general/data-table-general.svelte";
	import { PlusCircleIcon, Trash } from "lucide-svelte";

    import {columns} from "./data-table-columns.js"

    import {columns as columns_task} from '$lib/components/ui/data-table-general/columns.js'
    import {data as data_task} from '$lib/components/ui/data-table-general/data/tasks.js'
    
    import { deleteStudent } from "$lib/api/erp/erp_client.js";
    import { invalidateAll } from "$app/navigation";
    import StudentDialogForm from "./student-dialog-form.svelte";
    import { superForm } from "sveltekit-superforms/client";
    import { zodClient } from "sveltekit-superforms/adapters";
    import { formSchema } from "./student-form-schema";

    let { data } = $props();

    const filterColumns = ["first_name", "last_name"]

    let checkedRows = $state(new Set<string>());
    
    let dialogOpen = $state(false);
    
    const handleDelete = async (ids: string[]) => {
        for (const id of ids) {
            await deleteStudent(id);
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
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <DataTable 
            columns={columns_task} 
            data={data_task} 
        />
            <Card class="col-span-4 p-4">
                <div class="flex gap-2 mb-4">
                    <Button 
                        onclick={() => dialogOpen = true}
                        class="gap-2 bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100"
                    >
                        <PlusCircleIcon/>Add Student
                    </Button>
                </div>
                <DataTable 
                    columns={columns(checkedRows, handleDelete, (open) => dialogOpen = open)} 
                    data={data.students} 
                    filterColumns={filterColumns} 
                    showColumnVisibility={true}
                    textClass="text-nsw-brand-dark dark:text-white"
                    textMutedClass="text-nsw-brand-dark/80 dark:text-white/80"
                    textSubtleClass="text-nsw-brand-dark/70 dark:text-white/70"
                />

            </Card>

</div>

<StudentDialogForm {form} bind:open={dialogOpen} />
   