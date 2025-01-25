<script lang="ts">
    import { invalidateAll, goto } from '$app/navigation';
    import { Ellipsis, Pencil, Trash, Copy } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    
    let { id, checkedRows, onDelete } = $props<{
        id: string;
        checkedRows: Set<string>;
        onDelete: (ids: string[]) => Promise<void>;
    }>();

    const deleteRow = async () => {
        if (checkedRows.size > 0) {
            await onDelete(Array.from(checkedRows));
        } else {
            await onDelete([id]);
        }
    };

    const editCourse = (id: string) => {
        goto(`/school-operations/courses/edit/${id}`);
    };
</script>
    
<DropdownMenu.Root>
    <DropdownMenu.Trigger asChild>
        <div class="relative size-8 p-0">
            <span class="sr-only">Open menu</span>
            <Ellipsis class="size-4" />
        </div>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
            <DropdownMenu.Item onclick={() => editCourse(id)}>
                <Pencil class="mr-2 h-4 w-4" />
                Edit course
            </DropdownMenu.Item>
            <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
                <Copy class="mr-2 h-4 w-4" />
                Copy course ID
            </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onclick={deleteRow}>
            <Trash class="mr-2 h-4 w-4" />
            Delete {checkedRows.size > 0 ? 'Selected Courses' : 'Course'}
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root> 