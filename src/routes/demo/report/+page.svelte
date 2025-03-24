<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js";
    import { Card } from "$lib/components/ui/card/index.js";
    import DataTable from "$lib/components/ui/data-table-general/data-table-general.svelte";
    import type { FacetedFilterColumn, TextFilterColumn } from "$lib/components/ui/data-table-general/types.js";
    import { Tabs, TabsContent, TabsList, TabsTrigger } from "$lib/components/ui/tabs";
    import { lboteColumns, lboteAggPivotColumns } from "./data-table-components/lbote-columns";
    import Filter from "$lib/components/ui/filter.svelte";
    import ComboboxFilter from "$lib/components/ui/combobox-filter.svelte";
    import KpiCard from "$lib/components/ui/kpi-card.svelte";
    import Users from "lucide-svelte/icons/users";
    import Globe from "lucide-svelte/icons/globe";
    import Languages from "lucide-svelte/icons/languages";
    import { ArrowDown } from "lucide-svelte";

    let { data } = $props();
    
    // Filtered data with state
    let filteredLboteData = $state(data.lboteData);
    let filteredLboteAggPivotData = $state(data.lboteAggPivotData);
    
    // Selected language for detailed view
    let selectedLanguage = $state(null);
    let selectedLanguageData = $derived(
        selectedLanguage 
            ? filteredLboteData.filter(item => item.language_nm === selectedLanguage)
            : []
    );
    
    // Selected schools
    let selectedSchools = $state<string[]>([]);

    // Calculate KPI data from the LBOTE data
    const kpiData = $derived(() => {
        // Total students
        const totalStudents = filteredLboteData.length;
        
        // Count unique languages
        const uniqueLanguages = new Set(filteredLboteData.map(item => item.language_nm)).size;
        
        // Get top 3 languages by count
        const languageCounts = filteredLboteData.reduce((acc, item) => {
            acc[item.language_nm] = (acc[item.language_nm] || 0) + 1;
            return acc;
        }, {});
        
        const topLanguages = Object.entries(languageCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([language, count]) => ({
                language,
                count,
                percentage: Math.round((count / totalStudents) * 100)
            }));
        
        return {
            totalStudents,
            uniqueLanguages,
            topLanguages
        };
    });

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
        
        // Clear selected language when schools change
        selectedLanguage = null;
    }

    // Handle row selection in aggregate table
    function handleRowSelect(language) {
        if (selectedLanguage === language) {
            // Toggle off if already selected
            selectedLanguage = null;
        } else {
            selectedLanguage = language;
        }
    }

    // Custom row class function for highlighting selected row
    function getRowClass(row) {
        return row.language_nm === selectedLanguage 
            ? "bg-primary/10 hover:bg-primary/20" 
            : "";
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
    
    <!-- KPI Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Total Students KPI -->
        <KpiCard 
            name="Total Students"
            value={kpiData().totalStudents}
            format="number"
            period="year"
            growth={2.5}
            trend={[
                { value: kpiData().totalStudents * 0.95, date: "2022" },
                { value: kpiData().totalStudents * 0.98, date: "2023" },
                { value: kpiData().totalStudents, date: "2024" }
            ]}
        />
        
        <!-- Unique Languages KPI -->
        <KpiCard 
            name="Unique Languages"
            value={kpiData().uniqueLanguages}
            format="number"
            period="year"
            growth={4.1}
            trend={[
                { value: kpiData().uniqueLanguages * 0.92, date: "2022" },
                { value: kpiData().uniqueLanguages * 0.96, date: "2023" },
                { value: kpiData().uniqueLanguages, date: "2024" }
            ]}
        />
        
        <!-- Top Languages KPIs -->
        {#each kpiData().topLanguages as language, i}
            <KpiCard 
                name={language.language}
                value={language.count}
                format="number"
                period="year"
                growth={i === 0 ? 3.2 : i === 1 ? 1.8 : 0.9}
                trend={[
                    { value: language.count * 0.93, date: "2022" },
                    { value: language.count * 0.97, date: "2023" },
                    { value: language.count, date: "2024" }
                ]}
            />
        {/each}
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
                <p class="text-sm text-muted-foreground mb-4">Click on a row to view detailed student data for that language</p>
                <DataTable 
                    columns={lboteAggPivotColumns} 
                    data={filteredLboteAggPivotData} 
                    filterableColumns={lboteAggPivotFilterColumns}
                    textFilterColumns={lboteAggPivotTextFilterColumns}
                    showColumnVisibility={true}
                    textClass=""
                    textMutedClass=""
                    textSubtleClass=""
                    onRowClick={(row) => handleRowSelect(row.language_nm)}
                    getRowClass={getRowClass}
                />
                
                {#if selectedLanguage}
                    <div class="mt-8 border-t pt-6">
                        <div class="flex items-center gap-2 mb-4">
                            <ArrowDown class="h-5 w-5 text-primary" />
                            <h3 class="text-lg font-semibold">Detailed Student Data for {selectedLanguage}</h3>
                        </div>
                        <DataTable 
                            columns={lboteColumns} 
                            data={selectedLanguageData} 
                            filterableColumns={[]}
                            textFilterColumns={lboteTextFilterColumns}
                            showColumnVisibility={true}
                            textClass=""
                            textMutedClass=""
                            textSubtleClass=""
                        />
                    </div>
                {/if}
            </Card>
        </TabsContent>
    </Tabs>
</div> 