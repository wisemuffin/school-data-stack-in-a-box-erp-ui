import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet, renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableEmailButton from "./data-table-email-button.svelte";
import DataTableCheckbox from "./data-table-checkbox.svelte";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type School = {
 name: string;
 geography_id: number;
 id: number
};
 
 
export const columns: ColumnDef<School>[] = [
  // {
  //  id: "select",
  //  header: ({ table }) =>
  //   renderComponent(DataTableCheckbox, {
  //    checked: table.getIsAllPageRowsSelected(),
  //    indeterminate:
  //     table.getIsSomePageRowsSelected() &&
  //     !table.getIsAllPageRowsSelected(),
  //    onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
  //    "aria-label": "Select all"
  //   }),
  //  cell: ({ row }) =>
  //   renderComponent(DataTableCheckbox, {
  //    checked: row.getIsSelected(),
  //    onCheckedChange: (value) => row.toggleSelected(!!value),
  //    "aria-label": "Select row"
  //   }),
  //  enableSorting: false,
  //  enableHiding: false
  // },
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
  
  // {
  //  id: "actions",
  //  enableHiding: false,
  //  cell: ({ row }) =>
  //   renderComponent(DataTableActions, { id: row.original.id })
  // }
 ];