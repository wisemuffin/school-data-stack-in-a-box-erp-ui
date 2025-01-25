<script lang="ts">
    import { invalidateAll } from '$app/navigation';
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as api from "$lib/api/client.ts";
    
    let { id }: { id: string } = $props();

    const deleteStudent = async (id: string) => {
        await api.del("students/"+id);
        invalidateAll();
    };
</script>
    
<DropdownMenu.Root>
    <DropdownMenu.Trigger>
        {#snippet child({ props })}
            <Button
                {...props}
                variant="ghost"
                size="icon"
                class="relative size-8 p-0"
            >
                <span class="sr-only">Open menu</span>
                <Ellipsis class="size-4" />
            </Button>
        {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
        <DropdownMenu.Group>
            <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
            <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
                Copy student ID
            </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Item onclick={() => deleteStudent(id)}>
            Delete Student
        </DropdownMenu.Item>
    </DropdownMenu.Content>
</DropdownMenu.Root>