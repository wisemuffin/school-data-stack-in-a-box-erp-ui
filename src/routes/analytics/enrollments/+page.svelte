<script lang="ts">
    import { Card } from "$lib/components/ui/card";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
    import { Input } from "$lib/components/ui/input";
    import { Search } from "lucide-svelte";

    let { data } = $props();
    let searchQuery = $state("");

    const filteredResults = $derived(() => {
        if (!searchQuery) return data.enrollments;
        
        return data.enrollments.filter((result: any) => 
            result.student__student_id.toString().includes(searchQuery.toLowerCase())
        );
    });
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
    <Card class="col-span-4 p-4">


        <div class="rounded-md border">
            {JSON.stringify(data.enrollments)}
        </div>
    </Card>
</div> 