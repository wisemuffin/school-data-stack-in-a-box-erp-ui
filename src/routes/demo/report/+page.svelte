<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card/index.js";
    import DataTable from "$lib/components/ui/data-table-general/data-table-general.svelte";
    import type { FacetedFilterColumn, TextFilterColumn } from "$lib/components/ui/data-table-general/types.js";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
    import { lboteColumns, lboteAggPivotColumns } from "./data-table-components/lbote-columns";

    let { data } = $props();

    // Filter columns for LBOTE data
    const lboteFilterColumns: FacetedFilterColumn[] = [ 
        {
            id: "language_nm",
            title: "Language",
            options: Array.from(new Set(data.lboteData.map((item: any) => item.language_nm)))
                .map((language: string) => ({
                    value: language,
                    label: language
                }))
        },
        {
            id: "gender",
            title: "Gender",
            options: [
                { value: "M", label: "Male" },
                { value: "F", label: "Female" }
            ]
        },
        {
            id: "scholastic_year",
            title: "Year",
            options: Array.from(new Set(data.lboteData.map((item: any) => item.scholastic_year)))
                .map((year: string) => ({
                    value: year,
                    label: year
                }))
        }
    ];

    const lboteTextFilterColumns: TextFilterColumn[] = [
        {
            id: "first_nm",
            placeholder: "Filter first name..."
        },
        {
            id: "family_nm",
            placeholder: "Filter family name..."
        }
    ];

    // Filter columns for LBOTE Aggregate Pivot data
    const lboteAggPivotFilterColumns: FacetedFilterColumn[] = [ 
        {
            id: "language_nm",
            title: "Language",
            options: Array.from(new Set(data.lboteAggPivotData.map((item: any) => item.language_nm)))
                .map((language: string) => ({
                    value: language,
                    label: language
                }))
        }
    ];

    const lboteAggPivotTextFilterColumns: TextFilterColumn[] = [
        {
            id: "school_name",
            placeholder: "Filter school name..."
        }
    ];
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <h1 class="text-2xl font-bold">LBOTE Report</h1>
    
    <Tabs defaultValue="student-data" class="w-full">
        <TabsList>
            <TabsTrigger value="student-data">Student Data</TabsTrigger>
            <TabsTrigger value="aggregate-data">Aggregate Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student-data">
            <Card class="p-4">
                <h2 class="text-xl font-semibold mb-4">Student LBOTE Data</h2>
                <DataTable 
                    columns={lboteColumns} 
                    data={data.lboteData} 
                    filterableColumns={lboteFilterColumns}
                    textFilterColumns={lboteTextFilterColumns}
                    showColumnVisibility={true}
                    textClass=""
                    textMutedClass=""
                    textSubtleClass=""
                />
            </Card>
        </TabsContent>
        
        <TabsContent value="aggregate-data">
            <Card class="p-4">
                <h2 class="text-xl font-semibold mb-4">Aggregate LBOTE Data</h2>
                <DataTable 
                    columns={lboteAggPivotColumns} 
                    data={data.lboteAggPivotData} 
                    filterableColumns={lboteAggPivotFilterColumns}
                    textFilterColumns={lboteAggPivotTextFilterColumns}
                    showColumnVisibility={true}
                    textClass=""
                    textMutedClass=""
                    textSubtleClass=""
                />
            </Card>
        </TabsContent>
    </Tabs>
</div> 