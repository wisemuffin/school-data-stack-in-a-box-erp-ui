<script lang="ts">

	import * as Card from "$lib/components/ui/card/index.js"

	import Activity from "lucide-svelte/icons/activity";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import DollarSign from "lucide-svelte/icons/dollar-sign";
	import Download from "lucide-svelte/icons/download";
	import Users from "lucide-svelte/icons/users";
    import RecentSales from "./recent-sales.svelte";

    let { data } = $props();

</script>


<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
	<Card.Root>
		<Card.Header
			class="flex flex-row items-center justify-between space-y-0 pb-2"
		>
			<Card.Title class="text-sm font-medium">Total Schools</Card.Title>
			<DollarSign class="text-muted-foreground size-4" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{data.schools}</div>
			<p class="text-muted-foreground text-xs">+20.1% from last month</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header
			class="flex flex-row items-center justify-between space-y-0 pb-2"
		>
			<Card.Title class="text-sm font-medium">Total Students</Card.Title>
			<Users class="text-muted-foreground size-4" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold">{data.students}</div>
			<p class="text-muted-foreground text-xs">+180.1% from last month</p>
		</Card.Content>
	</Card.Root>
	
</div>
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
	<Card.Root class="col-span-4">
		<Card.Header>
			<Card.Title>Overview</Card.Title>
		</Card.Header>
		<Card.Content>
			<!-- <Overview /> -->
		</Card.Content>
	</Card.Root>
	<Card.Root class="col-span-3">
		<Card.Header>
			<Card.Title>Recent Sales</Card.Title>
			<Card.Description>You made 265 sales this month.</Card.Description>
		</Card.Header>
		<Card.Content>
			<RecentSales />
		</Card.Content>
	</Card.Root>
</div>