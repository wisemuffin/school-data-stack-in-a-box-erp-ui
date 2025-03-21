<script lang="ts">
  import { Check, ChevronsUpDown } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Command from "$lib/components/ui/command";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { cn } from "$lib/utils";

  let { 
    schools = [], 
    selectedSchool = null, 
    onSchoolChange 
  }: {
    schools: { school_code: string; school_name: string }[];
    selectedSchool: string | null;
    onSchoolChange: (schoolCode: string | null) => void;
  } = $props();
  
  let open = $state(false);

  // Get unique schools from the data
  const uniqueSchools = $derived(() => {
    console.log("Schools data:", schools);
    const uniqueMap = new Map();
    schools.forEach(item => {
      if (!uniqueMap.has(item.school_code)) {
        uniqueMap.set(item.school_code, item);
      }
    });
    const result = Array.from(uniqueMap.values());
    console.log("Unique schools:", result);
    return result;
  });

  function handleSelect(schoolCode: string) {
    if (selectedSchool === schoolCode) {
      selectedSchool = null;
    } else {
      selectedSchool = schoolCode;
    }
    onSchoolChange(selectedSchool);
    open = false;
  }

  function clearFilter() {
    selectedSchool = null;
    onSchoolChange(null);
  }
</script>

<div class="flex flex-col gap-2">
  <div class="font-medium">School</div>
  <Popover.Root bind:open>
    <Popover.Trigger>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-full justify-between"
      >
        {#if selectedSchool}
          {uniqueSchools().find(s => s.school_code === selectedSchool)?.school_name || "Select school..."}
        {:else}
          Select school...
        {/if}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-full p-0">
      <Command.Root>
        <Command.Input placeholder="Search school..." />
        <Command.Empty>No school found.</Command.Empty>
        <Command.List>
          <Command.Group>
            {#each uniqueSchools() as school (school.school_code)}
              <Command.Item
                value={school.school_code}
                onSelect={() => handleSelect(school.school_code)}
                class="flex items-center justify-between"
              >
                <span>{school.school_name}</span>
                {#if selectedSchool === school.school_code}
                  <Check class="h-4 w-4" />
                {/if}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
  
  {#if selectedSchool}
    <div class="flex items-center gap-1 mt-1">
      <Badge variant="secondary" class="rounded-sm px-1 font-normal">
        {uniqueSchools().find(s => s.school_code === selectedSchool)?.school_name}
        <span
          class="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onclick={() => clearFilter()}
          onkeydown={(e) => e.key === 'Enter' && clearFilter()}
          role="button"
          tabindex="0"
        >
          <span class="sr-only">Remove</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="h-3 w-3"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </span>
      </Badge>
    </div>
  {/if}
</div> 