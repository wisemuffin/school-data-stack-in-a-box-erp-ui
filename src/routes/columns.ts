import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet, renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableEmailButton from "./data-table-email-button.svelte";
import DataTableCheckbox from "./data-table-checkbox.svelte";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
 id: string;
 amount: number;
 status: "pending" | "processing" | "success" | "failed";
 email: string;
};
 
 
export const columns: ColumnDef<Payment>[] = [
  {
   id: "select",
   header: ({ table }) =>
    renderComponent(DataTableCheckbox, {
     checked: table.getIsAllPageRowsSelected(),
     indeterminate:
      table.getIsSomePageRowsSelected() &&
      !table.getIsAllPageRowsSelected(),
     onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
     "aria-label": "Select all"
    }),
   cell: ({ row }) =>
    renderComponent(DataTableCheckbox, {
     checked: row.getIsSelected(),
     onCheckedChange: (value) => row.toggleSelected(!!value),
     "aria-label": "Select row"
    }),
   enableSorting: false,
   enableHiding: false
  },
  {
   accessorKey: "status",
   header: "Status",
   cell: ({ row }) => {
    const statusSnippet = createRawSnippet<[string]>((getStatus) => {
     const status = getStatus();
     return {
      render: () => `<div class="capitalize">${status}</div>`
     };
    });
    return renderSnippet(statusSnippet, row.getValue("status"));
   }
  },
  {
   accessorKey: "email",
   header: ({ column }) =>
    renderComponent(DataTableEmailButton, {
     onclick: () => column.toggleSorting(column.getIsSorted() === "asc")
    }),
   cell: ({ row }) => {
    const emailSnippet = createRawSnippet<[string]>((getEmail) => {
     const email = getEmail();
     return {
      render: () => `<div class="lowercase">${email}</div>`
     };
    });
 
    return renderSnippet(emailSnippet, row.getValue("email"));
   }
  },
  {
   accessorKey: "amount",
   header: () => {
    const amountHeaderSnippet = createRawSnippet(() => {
     return {
      render: () => `<div class="text-right">Amount</div>`
     };
    });
    return renderSnippet(amountHeaderSnippet, "");
   },
   cell: ({ row }) => {
    const amountCellSnippet = createRawSnippet<[string]>((getAmount) => {
     const amount = getAmount();
     return {
      render: () => `<div class="text-right font-medium">${amount}</div>`
     };
    });
    const formatter = new Intl.NumberFormat("en-US", {
     style: "currency",
     currency: "USD"
    });
 
    return renderSnippet(
     amountCellSnippet,
     formatter.format(Number.parseFloat(row.getValue("amount")))
    );
   }
  },
  {
   id: "actions",
   enableHiding: false,
   cell: ({ row }) =>
    renderComponent(DataTableActions, { id: row.original.id })
  }
 ];