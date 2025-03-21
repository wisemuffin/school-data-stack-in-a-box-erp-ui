<script lang="ts">
  import { Check, ChevronsUpDown } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import * as Command from "$lib/components/ui/command";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { cn } from "$lib/utils";

  let { 
    items = [], 
    selectedValue = null,
    onValueChange,
    valueKey = "value",
    labelKey = "label",
    title = "Filter",
    placeholder = "Select value..."
  }: {
    items: Record<string, any>[];
    selectedValue: string | null;
    onValueChange: (value: string | null) => void;
    valueKey?: string;
    labelKey?: string;
    title?: string;
    placeholder?: string;
  } = $props();
  
  let open = $state(false);

  // Get unique values from the data
  const uniqueItems = $derived(() => {
    console.log("Items data:", items);
    const uniqueMap = new Map();
    items.forEach(item => {
      if (!uniqueMap.has(item[valueKey])) {
        uniqueMap.set(item[valueKey], item);
      }
    });
    const result = Array.from(uniqueMap.values());
    console.log("Unique items:", result);
    return result;
  });

  function handleSelect(value: string) {
    if (selectedValue === value) {
      selectedValue = null;
    } else {
      selectedValue = value;
    }
    onValueChange(selectedValue);
    open = false;
  }

  function clearFilter() {
    selectedValue = null;
    onValueChange(null);
  }
</script>

<div class="flex flex-col gap-2">
  <div class="font-medium">{title}</div>
  <Popover.Root bind:open>
    <Popover.Trigger>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        class="w-full justify-between"
      >
        {#if selectedValue}
          {uniqueItems().find(item => item[valueKey] === selectedValue)?.[labelKey] || placeholder}
        {:else}
          {placeholder}
        {/if}
        <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
    </Popover.Trigger>
    <Popover.Content class="w-full p-0">
      <Command.Root>
        <Command.Input placeholder={`Search ${title.toLowerCase()}...`} />
        <Command.Empty>No {title.toLowerCase()} found.</Command.Empty>
        <Command.List>
          <Command.Group>
            {#each uniqueItems() as item (item[valueKey])}
              <Command.Item
                value={item[valueKey]}
                onSelect={() => handleSelect(item[valueKey])}
                class="flex items-center justify-between"
              >
                <span>{item[labelKey]}</span>
                {#if selectedValue === item[valueKey]}
                  <Check class="h-4 w-4" />
                {/if}
              </Command.Item>
            {/each}
          </Command.Group>
        </Command.List>
      </Command.Root>
    </Popover.Content>
  </Popover.Root>
  
  {#if selectedValue}
    <div class="flex items-center gap-1 mt-1">
      <Badge variant="secondary" class="rounded-sm px-1 font-normal">
        {uniqueItems().find(item => item[valueKey] === selectedValue)?.[labelKey]}
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