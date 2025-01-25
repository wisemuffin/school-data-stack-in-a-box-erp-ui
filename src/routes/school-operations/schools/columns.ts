import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet, renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableCheckbox from "./data-table-checkbox.svelte";
import type { School } from "$lib/api/types/api";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns = (checkedRows: Set<string>, handleDelete: (ids: string[]) => Promise<void>): ColumnDef<School>[] => [
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
  //  cell: ({ row }) => {
  //   const nameSnippet = createRawSnippet<[string]>((getName) => {
  //    const name = getName();
  //    return {
  //     render: () => `<div class="capitalize">${name}</div>`
  //    };
  //   });
  //   return renderSnippet(nameSnippet, row.getValue("name"));
  //  }
  },
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => renderComponent(DataTableActions, {
      id: row.getValue("id") as string,
      checkedRows,
      onDelete: handleDelete
    })
  }
 ];