<script lang="ts">
   import { invalidateAll } from '$app/navigation';

    import { Ellipsis } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { deleteSchool } from "$lib/api/client";
    
    let { id }: { id: string } = $props();

    const deleteRow = async (id: string) => {
        await deleteSchool(id);
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
       Copy school ID
      </DropdownMenu.Item>
     </DropdownMenu.Group>
     <DropdownMenu.Separator />
     <DropdownMenu.Item>
        <a href="/school-operations/schools/edit/{id}">Edit School</a>
     </DropdownMenu.Item>
     <DropdownMenu.Item>View students 🚧</DropdownMenu.Item>
     <DropdownMenu.Item onclick={() => deleteRow(id)}>
        Delete School
       </DropdownMenu.Item>
    </DropdownMenu.Content>
   </DropdownMenu.Root>