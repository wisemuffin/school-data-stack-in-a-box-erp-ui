<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card/index.js";
    import DataTable from "$lib/components/ui/data-table-general/data-table-general.svelte";
    import type { FacetedFilterColumn, TextFilterColumn } from "$lib/components/ui/data-table-general/types.js";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
    import { lboteColumns, lboteAggPivotColumns } from "./data-table-components/lbote-columns";
    import Filter from "$lib/components/ui/filter.svelte";

    let { data } = $props();
    
    // Filtered data with state
    let filteredLboteData = $state(data.lboteData);
    let filteredLboteAggPivotData = $state(data.lboteAggPivotData);
    
    // Selected school code
    let selectedSchool = $state(null);
    
    // Handle school filter change
    function handleSchoolChange(schoolCode) {
        selectedSchool = schoolCode;
        
        if (schoolCode) {
            // Filter data by selected school
            filteredLboteData = data.lboteData.filter(
                (item) => item.school_code === schoolCode
            );
            filteredLboteAggPivotData = data.lboteAggPivotData.filter(
                (item) => item.school_code === schoolCode
            );
        } else {
            // Reset to original data
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
    
    <div class="w-full max-w-sm">
        <Filter 
            items={data.lboteData.map(item => ({
                value: item.school_code,
                label: item.school_name
            }))} 
            selectedValue={selectedSchool}
            onValueChange={handleSchoolChange}
            title="School"
            placeholder="Select school..."
        />
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