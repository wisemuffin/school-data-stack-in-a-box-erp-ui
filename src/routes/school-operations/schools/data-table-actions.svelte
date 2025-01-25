<script lang="ts">
   import { invalidateAll } from '$app/navigation';

    import { Ellipsis, Pencil, Trash, Copy, Search } from "lucide-svelte";
    import { Button } from "$lib/components/ui/button";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { deleteSchool } from "$lib/api/client";
    
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
       <Copy class="mr-2 h-4 w-4" />
       Copy school ID
      </DropdownMenu.Item>
     </DropdownMenu.Group>
     <DropdownMenu.Item>
      <Pencil class="mr-2 h-4 w-4" />
      <a href="/school-operations/schools/edit/{id}">Edit School</a>
     </DropdownMenu.Item>
     <DropdownMenu.Item>
      <Search class="mr-2 h-4 w-4" />
      View students 🚧</DropdownMenu.Item>
     <DropdownMenu.Separator />

     <DropdownMenu.Item onclick={deleteRow}>
        <Trash class="mr-2 h-4 w-4" />
        Delete {checkedRows.size > 0 ? 'Selected Schools' : 'School'}
       </DropdownMenu.Item>
    </DropdownMenu.Content>
   </DropdownMenu.Root>