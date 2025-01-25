<script lang="ts">
    import { invalidateAll, goto } from '$app/navigation';
    import { Ellipsis, Pencil, Trash, Copy } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import * as api from "$lib/api/client.ts";
    
    let { id }: { id: string } = $props();

    const deleteStudent = async (id: string) => {
        await api.del("students/"+id);
        invalidateAll();
    };

    const editStudent = (id: string) => {
        goto(`/school-operations/students/edit/${id}`);
    };
</script>
    
<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        <Button variant="ghost" size="icon" class="relative size-8 p-0">
            <span class="sr-only">Open menu</span>
            <Ellipsis class="size-4" />
        </Button>
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
        <DropdownMenu.Item onclick={() => deleteStudent(id)}>
            <Trash class="mr-2 h-4 w-4" />
            Delete Student
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>