<script lang="ts">
  import { Check, ChevronsUpDown } from "lucide-svelte";
  import * as Popover from "$lib/components/ui/popover";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { Input } from "$lib/components/ui/input";
  import { cn } from "$lib/utils";
  import { tick } from "svelte";

  let { 
    items = [], 
    selected = null,
    onChange,
    valueKey = "value",
    labelKey = "label",
    title = "Filter",
    placeholder = "Select value...",
    multiSelect = false
  }: {
    items: Record<string, any>[];
    selected: string | null | string[];
    onChange: (value: string | null | string[]) => void;
    valueKey?: string;
    labelKey?: string;
    title?: string;
    placeholder?: string;
    multiSelect?: boolean;
  } = $props();
  
  let open = $state(false);
  let search = $state("");

  // Get unique values from the data
  const uniqueItems = $derived(() => {
    const uniqueMap = new Map();
    items.forEach(item => {
      if (!uniqueMap.has(item[valueKey])) {
        uniqueMap.set(item[valueKey], item);
      }
    });
    return Array.from(uniqueMap.values());
  });

  // Filter items based on search
  const filteredItems = $derived(() => {
    if (!search) return uniqueItems();
    
    return uniqueItems().filter(item => 
      item[labelKey].toLowerCase().includes(search.toLowerCase())
    );
  });

  function handleSelect(value: string) {
    if (multiSelect) {
      // Ensure selected is an array
      const currentSelected = Array.isArray(selected) ? selected : [];
      const index = currentSelected.indexOf(value);
      
      if (index >= 0) {
        // Remove value if already selected
        const newValues = [...currentSelected];
        newValues.splice(index, 1);
        selected = newValues;
      } else {
        // Add value if not already selected
        selected = [...currentSelected, value];
      }
      onChange(selected);
      
      // Keep the popover open for multi-select
      // Only clear the search
      search = "";
    } else {
      if (selected === value) {
        selected = null;
      } else {
        selected = value;
      }
      onChange(selected);
      open = false;
      search = "";
    }
  }

  function clearFilter() {
    if (multiSelect) {
      selected = [];
    } else {
      selected = null;
    }
    onChange(multiSelect ? [] : null);
    search = "";
  }
  
  // Helper function to get display text for selected values
  function getSelectedDisplayText() {
    if (multiSelect) {
      const selectedArray = Array.isArray(selected) ? selected : [];
      if (selectedArray.length === 0) return placeholder;
      if (selectedArray.length === 1) {
        return uniqueItems().find(item => item[valueKey] === selectedArray[0])?.[labelKey] || placeholder;
      }
      return `${selectedArray.length} selected`;
    } else {
      if (!selected) return placeholder;
      return uniqueItems().find(item => item[valueKey] === selected)?.[labelKey] || placeholder;
    }
  }
  
  // Helper function to check if a value is selected
  function isSelected(value: string) {
    if (multiSelect) {
      return Array.isArray(selected) && selected.includes(value);
    } else {
      return selected === value;
    }
  }
</script>

<div class="flex flex-col gap-2">
  <div class="font-medium">{title}</div>
  <Popover.Root bind:open>
    <Popover.Trigger>
      {#snippet child({ props })}
        <div
          {...props}
          class="flex w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          role="combobox"
          aria-expanded={open}
          aria-controls="combobox-content-{title.toLowerCase().replace(/\s+/g, '-')}"
          tabindex="0"
        >
          <span>{getSelectedDisplayText()}</span>
          <ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </div>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-full p-0" id="combobox-content-{title.toLowerCase().replace(/\s+/g, '-')}">
      <div class="flex flex-col">
        <div class="p-2">
          <Input 
            placeholder={`Search ${title.toLowerCase()}...`}
            bind:value={search}
            class="h-8 w-full"
          />
        </div>
        
        {#key search}
        <div class="max-h-[300px] overflow-y-auto">
          {#if filteredItems().length === 0}
            <div class="p-2 text-center text-sm text-muted-foreground">
              No {title.toLowerCase()} found.
            </div>
          {:else}
            <div class="p-1">
              {#each filteredItems() as item (item[valueKey])}
                <div
                  class={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    isSelected(item[valueKey]) && "bg-accent text-accent-foreground"
                  )}
                  onclick={() => handleSelect(item[valueKey])}
                  onkeydown={(e) => e.key === 'Enter' && handleSelect(item[valueKey])}
                  role="option"
                  tabindex="0"
                  aria-selected={isSelected(item[valueKey])}
                >
                  <span>{item[labelKey]}</span>
                  {#if isSelected(item[valueKey])}
                    <Check class="ml-auto h-4 w-4" />
                  {/if}
                </div>
              {/each}
            </div>
          {/if}
        </div>
        {/key}
      </div>
    </Popover.Content>
  </Popover.Root>
  
  {#if (!multiSelect && selected) || (multiSelect && Array.isArray(selected) && selected.length > 0)}
    <div class="flex items-center gap-1 mt-1">
      {#if multiSelect}
        {#each Array.isArray(selected) ? selected : [] as value}
          <Badge variant="secondary" class="rounded-sm px-1 font-normal">
            {uniqueItems().find(item => item[valueKey] === value)?.[labelKey]}
            <span
              class="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
              onclick={() => handleSelect(value)}
              onkeydown={(e) => e.key === 'Enter' && handleSelect(value)}
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
        {/each}
        {#if Array.isArray(selected) && selected.length > 1}
          <Badge variant="outline" class="rounded-sm px-1 font-normal cursor-pointer" onclick={clearFilter}>
            Clear all
          </Badge>
        {/if}
      {:else}
      <Badge variant="secondary" class="rounded-sm px-1 font-normal">
        {uniqueItems().find(item => item[valueKey] === selected)?.[labelKey]}
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
      {/if}
    </div>
  {/if}
</div> 