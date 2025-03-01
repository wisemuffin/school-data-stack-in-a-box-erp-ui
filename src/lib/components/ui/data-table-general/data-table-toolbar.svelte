<script lang="ts" module>
	type TData = unknown;
</script>

<script lang="ts" generics="TData">
	import X from "lucide-svelte/icons/x";
	import type { Table } from "@tanstack/table-core";
	import { DataTableFacetedFilter, DataTableViewOptions } from "./index.ts";
	import Button from "$lib/components/ui/button/button.svelte";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Search } from "lucide-svelte";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	// import { Cross2Icon } from "$lib/components/ui/icons/index.js";
	import type { DataTableFilterOption, TextFilterColumn, FacetedFilterColumn } from "./types";

	let { table, showColumnVisibility, filterableColumns = [], textFilterColumns = [] } = $props<{
		table: Table<TData>;
		showColumnVisibility?: boolean;
		filterableColumns?: FacetedFilterColumn[];
		textFilterColumns?: TextFilterColumn[];
	}>();

	let globalFilter = $state(table.getState().globalFilter || "");
	
	
	const isFiltered = $derived(
		!!globalFilter || table.getState().columnFilters.length > 0
	);

	function getOptionsForColumn(columnId: string): DataTableFilterOption[] {
		const column = table.getColumn(columnId);
		if (!column) return [];
		
		const facetedValues = column.getFacetedUniqueValues();
		if (!facetedValues) return [];
		
		return Array.from(facetedValues.entries())
			.filter(([value]) => value != null && value !== '')
			.map(([value, count]) => ({
				value: String(value),
				label: `${String(value)} (${count})`,
			}));
	}

	function clearFilters() {
		globalFilter = "";
		table.resetColumnFilters();
	}
</script>
<div class="flex items-center justify-between">
	<div class="flex flex-1 items-center space-x-2">
		{#each textFilterColumns as column}
			{#if table.getColumn(column.id)}
				<Input
					placeholder={column.placeholder || `Filter ${column.id}...`}
					value={(table.getColumn(column.id)?.getFilterValue() as string) ?? ""}
					oninput={(e) => {
						table.getColumn(column.id)?.setFilterValue(e.currentTarget.value);
					}}
					onchange={(e) => {
						table.getColumn(column.id)?.setFilterValue(e.currentTarget.value);
					}}
					class="h-8 w-[150px] lg:w-[250px]"
				>
					<Search slot="leading" class="h-4 w-4" />
				</Input>
			{/if}
		{/each}

		{#each filterableColumns as column}
			{#if table.getColumn(column.id) && table.getColumn(column.id).getCanFilter()}
				<DataTableFacetedFilter
					column={table.getColumn(column.id)}
					title={column.title}
					options={column.options || getOptionsForColumn(column.id)}
				/>
			{/if}
		{/each}

		{#if isFiltered}
			<Button
				variant="ghost"
				onclick={clearFilters}
				class="h-8 px-2 lg:px-3"
			>
				Reset
				<X class="ml-2 h-4 w-4" />
			</Button>
		{/if}
	</div>
	{#if showColumnVisibility}
		<DataTableViewOptions {table} />
	{/if}
</div>