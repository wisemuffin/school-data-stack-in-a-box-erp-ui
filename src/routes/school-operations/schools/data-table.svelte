<script lang="ts">
    import { TableIcon, SearchIcon, FilterIcon, ArrowUpDown } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Badge } from "$lib/components/ui/badge";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Checkbox } from "$lib/components/ui/checkbox";
    import type { School } from "$lib/api/types/api";
    import DataTableActions from "./data-table-actions.svelte";

    // Props
    let { data, onDelete } = $props<{
        data: School[];
        onDelete: (ids: string[]) => Promise<void>;
    }>();

    // Table state
    let schools: School[] = $state(data);
    let searchQuery: string = $state("");
    let sortField: keyof School = $state("name");
    let sortDirection: "asc" | "desc" = $state("asc");
    let selectedRows = $state(new Set<string>());
    let currentPage = $state(0);
    let pageSize = $state(10);
    const pageSizeOptions = [5, 10, 20, 50];

    // Derived values
    const filteredSchools = $derived.by(() => {
        let filtered = [...schools];

        // Apply search
        if (searchQuery) {
            filtered = filtered.filter((school) => 
                school.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Apply sorting
        filtered.sort((a, b) => {
            const aValue = a[sortField];
            const bValue = b[sortField];

            if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
            if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
            return 0;
        });

        return filtered;
    });

    // Pagination
    const paginatedSchools = $derived.by(() => {
        const start = currentPage * pageSize;
        const end = start + pageSize;
        return filteredSchools.slice(start, end);
    });

    const pageCount = $derived(() => Math.ceil(filteredSchools.length / pageSize));
    const hasNextPage = $derived(() => currentPage < pageCount - 1);
    const hasPreviousPage = $derived(() => currentPage > 0);

    // Handlers
    function handleSort(field: keyof School) {
        if (sortField === field) {
            sortDirection = sortDirection === "asc" ? "desc" : "asc";
        } else {
            sortField = field;
            sortDirection = "asc";
        }
    }

    function toggleSelectAll(checked: boolean) {
        if (checked) {
            paginatedSchools.forEach(school => selectedRows.add(school.id.toString()));
        } else {
            selectedRows.clear();
        }
    }

    function toggleSelectRow(id: string, checked: boolean) {
        if (checked) {
            selectedRows.add(id);
        } else {
            selectedRows.delete(id);
        }
    }

    function handleDeleteSelected() {
        if (selectedRows.size > 0) {
            onDelete(Array.from(selectedRows));
            selectedRows.clear();
        }
    }

    // Update schools when data changes
    $effect(() => {
        schools = data;
    });
</script>

<!-- Filters section -->
<div class="flex flex-col gap-4 mb-4">
    <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
            <Input type="search" placeholder="Search schools..." bind:value={searchQuery} class="w-[250px]">
                <SearchIcon slot="leading" class="size-4" />
            </Input>
        </div>
        
        {#if selectedRows.size > 0}
            <div class="flex items-center gap-2">
                <span class="text-sm text-muted-foreground">
                    {selectedRows.size} {selectedRows.size === 1 ? 'row' : 'rows'} selected
                </span>
                <Button variant="outline" size="sm" onclick={handleDeleteSelected} class="text-destructive">
                    Delete
                </Button>
            </div>
        {/if}
    </div>
</div>

<!-- Schools table -->
<div class="rounded-md border">
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead class="w-[40px]">
                    <Checkbox 
                        checked={paginatedSchools.length > 0 && selectedRows.size === paginatedSchools.length}
                        onCheckedChange={toggleSelectAll}
                    />
                </TableHead>
                <TableHead class="w-[80px]">ID</TableHead>
                <TableHead class="cursor-pointer" onclick={() => handleSort("name")}>
                    <div class="flex items-center gap-1">
                        Name
                        {#if sortField === "name"}
                            <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                        {:else}
                            <ArrowUpDown class="size-4 opacity-50" />
                        {/if}
                    </div>
                </TableHead>
                <TableHead class="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {#each paginatedSchools as school}
                <TableRow>
                    <TableCell>
                        <Checkbox 
                            checked={selectedRows.has(school.id.toString())}
                            onCheckedChange={(checked) => toggleSelectRow(school.id.toString(), !!checked)}
                        />
                    </TableCell>
                    <TableCell>{school.id}</TableCell>
                    <TableCell>
                        <div class="font-medium">{school.name}</div>
                    </TableCell>
                    <TableCell>
                        <div class="flex justify-end">
                            <DataTableActions 
                                id={school.id.toString()} 
                                checkedRows={selectedRows} 
                                onDelete={onDelete}
                            />
                        </div>
                    </TableCell>
                </TableRow>
            {/each}
            {#if paginatedSchools.length === 0}
                <TableRow>
                    <TableCell colspan="4" class="h-24 text-center">No results found.</TableCell>
                </TableRow>
            {/if}
        </TableBody>
    </Table>
</div>

<!-- Pagination -->
<div class="flex items-center justify-between px-2 py-4">
    <div class="flex items-center gap-2">
        <p class="text-sm text-muted-foreground">
            Rows per page
        </p>
        <Select.Root type="single" value={pageSize.toString()} onValueChange={(value) => {
            pageSize = parseInt(value);
            currentPage = 0;
        }}>
            <Select.Trigger class="h-8 w-[70px]">
                {pageSize}
            </Select.Trigger>
            <Select.Content>
                <Select.Group>
                    {#each pageSizeOptions as size}
                        <Select.Item value={size.toString()}>{size}</Select.Item>
                    {/each}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    </div>
    <div class="flex items-center gap-1 text-sm text-muted-foreground">
        <div>Page {currentPage + 1} of {Math.max(1, pageCount())}</div>
    </div>
    <div class="flex items-center gap-2">
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8"
            disabled={!hasPreviousPage}
            onclick={() => currentPage = 0}
        >
            <span class="sr-only">Go to first page</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-left"><path d="m11 17-5-5 5-5"/><path d="m18 17-5-5 5-5"/></svg>
        </Button>
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8"
            disabled={!hasPreviousPage}
            onclick={() => currentPage--}
        >
            <span class="sr-only">Go to previous page</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6"/></svg>
        </Button>
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8"
            disabled={!hasNextPage}
            onclick={() => currentPage++}
        >
            <span class="sr-only">Go to next page</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
        </Button>
        <Button
            variant="outline"
            size="icon"
            class="h-8 w-8"
            disabled={!hasNextPage}
            onclick={() => currentPage = Math.max(0, Math.ceil(filteredSchools.length / pageSize) - 1)}
        >
            <span class="sr-only">Go to last page</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevrons-right"><path d="m13 17 5-5-5-5"/><path d="m6 17 5-5-5-5"/></svg>
        </Button>
    </div>
</div>