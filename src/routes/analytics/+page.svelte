<script lang="ts">
    import * as Card from "$lib/components/ui/card";
    import { ChartBar } from "lucide-svelte";
</script>

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
            <Card.Title class="text-sm font-medium ">
                Analytics Dashboard
            </Card.Title>
            <ChartBar class="text-muted-foreground size-4" />
        </Card.Header>
        <Card.Content>
            <div class="text-2xl font-bold ">
                Coming Soon
            </div>
            <p class="text-xs ">
                Analytics dashboard is under development
            </p>
        </Card.Content>
    </Card.Root>
</div> 