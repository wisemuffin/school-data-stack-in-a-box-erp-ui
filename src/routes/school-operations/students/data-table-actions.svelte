<script lang="ts">
    import { invalidateAll, goto } from '$app/navigation';
    import { Ellipsis, Pencil, Trash, Copy } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import * as api from "$lib/api/client.ts";
    
    let { id, checkedRows, onDelete, setDialogOpen } = $props<{
        id: string;
        checkedRows: Set<string>;
        onDelete: (ids: string[]) => Promise<void>;
        setDialogOpen: (open: boolean) => void;
    }>();

    const deleteRow = async () => {
        if (checkedRows.size > 0) {
            await onDelete(Array.from(checkedRows));
        } else {
            await onDelete([id]);
        }
    };

    const editStudent = (id: string) => {
        const url = new URL(window.location.href);
        url.searchParams.set('id', id);
        goto(url.toString());
        setDialogOpen(true);
    };
</script>
    
<DropdownMenu.Root>
    <DropdownMenu.Trigger>
            <span class="sr-only">Open menu</span>
            <Ellipsis class="size-4" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
            <DropdownMenu.Item onclick={() => editStudent(id)}>
                <Pencil class="mr-2 h-4 w-4" />
                Edit student
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
                <Copy class="mr-2 h-4 w-4" />
                Copy student ID
            </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onclick={deleteRow}>
            <Trash class="mr-2 h-4 w-4" />
            Delete {checkedRows.size > 0 ? 'Selected Students' : 'Student'}
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>