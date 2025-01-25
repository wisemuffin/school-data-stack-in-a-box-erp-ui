import type { ColumnDef } from "@tanstack/table-core";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableActions from "./data-table-actions.svelte";
import DataTableCheckbox from "./data-table-checkbox.svelte";
import type { Class } from "$lib/api/types/api";

export const createColumns = (checkedRows: Set<string>, handleDelete: (ids: string[]) => Promise<void>): ColumnDef<Class>[] => [
    {
        id: "select",
        header: ({ table }) => renderComponent(DataTableCheckbox, {
            checked: table.getIsAllPageRowsSelected(),
            indeterminate: table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected(),
            onCheckedChange: (value: boolean) => table.toggleAllPageRowsSelected(!!value),
            "aria-label": "Select all",
            checkedRows
        }),
        cell: ({ row }) => renderComponent(DataTableCheckbox, {
            checked: row.getIsSelected(),
            onCheckedChange: (value: boolean) => row.toggleSelected(!!value),
            "aria-label": "Select row",
            id: String(row.original.id),
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
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => renderComponent(DataTableActions, {
            id: String(row.original.id),
            checkedRows,
            onDelete: handleDelete
        })
    }
]; 