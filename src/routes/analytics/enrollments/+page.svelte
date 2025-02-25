<script lang="ts">
    import { Card } from "$lib/components/ui/card";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import { Input } from "$lib/components/ui/input";
    import { Search } from "lucide-svelte";
    import EnrollmentTableSkeleton from "./enrollment-table-skeleton.svelte";

    let { data } = $props();
    // let searchQuery = $state("");
    let loading = $state(true);

    // const filteredResults = $derived(() => {
    //     if (!searchQuery) return data.enrollments;
        
    //     return data.enrollments.filter((result: any) => 
    //         result.student__student_id.toString().includes(searchQuery.toLowerCase())
    //     );
    // });

    // Simulate loading state
    // $effect(() => {
    //     loading = true;
    //     if (data.enrollments) {
    //         loading = false;
    //     }
    // });
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    <Card class="col-span-4 p-4">

        {#await data.enrollments}
            <EnrollmentTableSkeleton />
        {:then response}
            <div class="rounded-md border">
                {JSON.stringify(response.results)}
            </div>
        {:catch error}
            <div class="rounded-md border p-4 text-red-500">
                Error loading data: {error.message}
            </div>
        {/await}
    </Card>
</div> 