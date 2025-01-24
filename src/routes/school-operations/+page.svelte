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
			<Card.Title class="text-sm font-medium text-nsw-brand-dark dark:text-white">Total Schools</Card.Title>
			<DollarSign class="text-muted-foreground size-4" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold text-nsw-brand-dark dark:text-white">{data.schools}</div>
			<p class="text-xs text-nsw-brand-dark/60 dark:text-white/60">+20.1% from last month</p>
		</Card.Content>
	</Card.Root>
	<Card.Root>
		<Card.Header
			class="flex flex-row items-center justify-between space-y-0 pb-2"
		>
			<Card.Title class="text-sm font-medium text-nsw-brand-dark dark:text-white">Total Students</Card.Title>
			<Users class="text-muted-foreground size-4" />
		</Card.Header>
		<Card.Content>
			<div class="text-2xl font-bold text-nsw-brand-dark dark:text-white">{data.students}</div>
			<p class="text-xs text-nsw-brand-dark/60 dark:text-white/60">+180.1% from last month</p>
		</Card.Content>
	</Card.Root>
	
</div>
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
	<Card.Root class="col-span-4">
		<Card.Header>
			<Card.Title class="text-nsw-brand-dark dark:text-white">Overview</Card.Title>
		</Card.Header>
		<Card.Content>
			<!-- <Overview /> -->
		</Card.Content>
	</Card.Root>
	<Card.Root class="col-span-3">
		<Card.Header>
			<Card.Title class="text-nsw-brand-dark dark:text-white">Recent Sales</Card.Title>
			<Card.Description class="text-nsw-brand-dark/70 dark:text-white/70">You made 265 sales this month.</Card.Description>
		</Card.Header>
		<Card.Content>
			<RecentSales />
		</Card.Content>
	</Card.Root>
</div>