<script lang="ts">
    import { MoreHorizontal, Pencil, Trash } from "lucide-svelte";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    import { goto } from "$app/navigation";
    
    let { id, checkedRows, onDelete, setDialogOpen } = $props<{
        id: string;
        checkedRows: Set<string>;
        onDelete: (ids: string[]) => Promise<void>;
        setDialogOpen?: (open: boolean) => void;
    }>();
    
    function handleEdit() {
        goto(`/school-operations/courses/edit/${id}`);
    }
    
    async function handleDelete() {
        await onDelete([id]);
    }
</script>

<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
            <Button {...props} variant="ghost" class="h-8 w-8 p-0">
                <span class="sr-only">Open menu</span>
                <MoreHorizontal class="h-4 w-4" />
            </Button>
        {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item onclick={handleEdit}>
            <Pencil class="mr-2 h-4 w-4" />
            Edit
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onclick={handleDelete} class="text-red-600">
            <Trash class="mr-2 h-4 w-4" />
            Delete
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root> 