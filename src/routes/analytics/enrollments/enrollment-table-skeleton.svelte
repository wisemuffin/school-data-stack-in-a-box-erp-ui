<script lang="ts">
    import { Skeleton } from "$lib/components/ui/skeleton";
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "$lib/components/ui/table";
</script>

<div class="rounded-md border">
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Total Enrollments</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {#each Array(5) as _}
                <TableRow>
                    <TableCell>
                        <Skeleton class="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell>
                        <Skeleton class="h-4 w-[60px]" />
                    </TableCell>
                </TableRow>
            {/each}
        </TableBody>
    </Table>
</div> 