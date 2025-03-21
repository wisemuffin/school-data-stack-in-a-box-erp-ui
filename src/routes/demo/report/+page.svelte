<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card/index.js";
    import DataTable from "$lib/components/ui/data-table-general/data-table-general.svelte";
    import type { FacetedFilterColumn, TextFilterColumn } from "$lib/components/ui/data-table-general/types.js";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
    import { lboteColumns, lboteAggPivotColumns } from "./data-table-components/lbote-columns";
    import Filter from "$lib/components/ui/filter.svelte";
    import ComboboxFilter from "$lib/components/ui/combobox-filter.svelte";

    let { data } = $props();
    
    // Filtered data with state
    let filteredLboteData = $state(data.lboteData);
    let filteredLboteAggPivotData = $state(data.lboteAggPivotData);
    
    // Selected schools
    let selectedSchools = $state<string[]>([]);

    // Handle multiple schools filter change
    function handleSchoolsChange(schools) {
        selectedSchools = schools;
        
        if (schools.length > 0) {
            // Apply school filter for multiple schools
            filteredLboteData = data.lboteData.filter(item => schools.includes(item.school_name));
            filteredLboteAggPivotData = data.lboteAggPivotData.filter(item => schools.includes(item.school_name));
        } else {
            // Just use the original data
            filteredLboteData = data.lboteData;
            filteredLboteAggPivotData = data.lboteAggPivotData;
        }
    }

    // Filter columns for LBOTE data
    const lboteFilterColumns: FacetedFilterColumn[] = [ 
        {
            id: "language_nm",
            title: "Language",
            options: Array.from(new Set(data.lboteData.map((item) => item.language_nm)))
                .map((language) => ({
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
            options: Array.from(new Set(data.lboteData.map((item) => item.scholastic_year)))
                .map((year) => ({
                    value: year,
                    label: year
                }))
        }
    ];

    const lboteTextFilterColumns = [
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
    const lboteAggPivotFilterColumns = $derived([ 
        {
            id: "language_nm",
            title: "Language",
            options: Array.from(new Set(filteredLboteAggPivotData.map((item) => item.language_nm)))
                .map((language) => ({
                    value: language,
                    label: language
                }))
        }
    ]);

    const lboteAggPivotTextFilterColumns = [
        {
            id: "school_name",
            placeholder: "Filter school name..."
        }
    ];
</script>

<div class="h-full flex-1 flex-col space-y-8 p-8 md:flex">
    <h1 class="text-2xl font-bold">LBOTE Report</h1>
    
    <div class="flex flex-wrap gap-4">
       
        <div class="w-full max-w-sm">
            <ComboboxFilter 
                items={Array.from(new Set(data.lboteData.map(item => item.school_name))).map(school => ({
                    value: school,
                    label: school
                }))} 
                selected={selectedSchools}
                onChange={handleSchoolsChange}
                multiSelect={true}
                title="School"
                placeholder="Select schools..."
            />
        </div>
    </div>
    
    <Tabs value="student-data" class="w-full">
        <TabsList>
            <TabsTrigger value="student-data">Student Data</TabsTrigger>
            <TabsTrigger value="aggregate-data">Aggregate Data</TabsTrigger>
        </TabsList>
        
        <TabsContent value="student-data">
            <Card class="p-4">
                <h2 class="text-xl font-semibold mb-4">Student LBOTE Data</h2>
                <DataTable 
                    columns={lboteColumns} 
                    data={filteredLboteData} 
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
                    data={filteredLboteAggPivotData} 
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