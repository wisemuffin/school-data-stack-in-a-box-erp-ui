export interface DataTableFilterOption {
    value: string;
    label: string;
    icon?: string;
}

export interface TextFilterColumn {
    id: string;
    placeholder?: string;
}

export interface FacetedFilterColumn {
    id: string;
    title: string;
    options?: DataTableFilterOption[];
} 