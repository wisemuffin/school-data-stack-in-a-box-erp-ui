<script lang="ts">
    import ChevronDown from "lucide-svelte/icons/chevron-down";
    import {
     type ColumnFiltersState,
     type PaginationState,
     type RowSelectionState,
     type SortingState,
     type VisibilityState,
     getCoreRowModel,
     getFilteredRowModel,
     getPaginationRowModel,
     getSortedRowModel
    } from "@tanstack/table-core";
    import * as Table from "$lib/components/ui/table/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import {
     FlexRender,
     createSvelteTable,
    } from "$lib/components/ui/data-table/index.js";

    import DataTable from "./data-table.svelte"

    import {columns} from "./columns"
    

    let { data } = $props();

    

   </script>
    
    
   <DataTable columns={columns} data={data.payments} />

   