import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet, renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableCheckbox from "./data-table-checkbox.svelte";
import type { Class } from "$lib/api/erp/types/erp_api";

// This type is used to define the shape of our data.
export const columns = (
    checkedRows: Set<string>, 
    handleDelete: (ids: string[]) => Promise<void>,
    setDialogOpen: (open: boolean) => void
): ColumnDef<Class>[] => [
  {
    id: "select",
    header: ({ table }) => renderComponent(DataTableCheckbox, {
      checked: table.getIsAllPageRowsSelected(),
      indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
      onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
      "aria-label": "Select all",
      checkedRows
    }),
    cell: ({ row }) => renderComponent(DataTableCheckbox, {
      checked: row.getIsSelected(),
      onCheckedChange: (value) => row.toggleSelected(!!value),
      "aria-label": "Select row",
      id: row.getValue("id") as string,
      checkedRows
    }),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "scholastic_year_id",
    header: "Scholastic Year ID",
  },
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => renderComponent(DataTableActions, {
      id: row.getValue("id") as string,
      checkedRows,
      onDelete: handleDelete,
      setDialogOpen
    })
  }
]; 