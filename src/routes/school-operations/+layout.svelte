<script lang="ts">
import * as Sidebar from "$lib/components/ui/sidebar/index.js";
import * as Tabs from "$lib/components/ui/tabs/index.js";
import * as Card from "$lib/components/ui/card/index.js"

import { Button } from "$lib/components/ui/button/index.js";

import DatePickerWithRange from "$lib/components/ui/date-picker-with-range.svelte";

import Activity from "lucide-svelte/icons/activity";
	import CreditCard from "lucide-svelte/icons/credit-card";
import DollarSign from "lucide-svelte/icons/dollar-sign";
import Download from "lucide-svelte/icons/download";
import Users from "lucide-svelte/icons/users";

// import Overview from "./overview.svelte"
import RecentSales from "./recent-sales.svelte";

let { children } = $props();

    
</script>

<div class="hidden flex-col md:flex">
	
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-3xl font-bold tracking-tight text-nsw-brand-dark dark:text-white">School Operations</h2>
			<div class="flex items-center space-x-2">
				<DatePickerWithRange />
				<Button size="sm" class="bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100">
					<Download class="mr-2 size-4" />
					Download
				</Button>
			</div>
		</div>
		<Tabs.Root value="overview" class="space-y-4">
			<Tabs.List>
				<Tabs.Trigger value="overview" class="text-nsw-brand-dark/80 dark:text-white/80">
					<a href="/school-operations">Overview</a>
				</Tabs.Trigger>
				<Tabs.Trigger value="analytics" class="text-nsw-brand-dark/80 dark:text-white/80">
					Analytics
				</Tabs.Trigger>
				<Tabs.Trigger value="schools" class="text-nsw-brand-dark/80 dark:text-white/80">
					<a href="/school-operations/schools">Schools</a>
				</Tabs.Trigger>
				<Tabs.Trigger value="students" class="text-nsw-brand-dark/80 dark:text-white/80">
					<a href="/school-operations/students">Students</a>
				</Tabs.Trigger>
				<Tabs.Trigger value="notifications" disabled class="text-nsw-brand-dark/60 dark:text-white/60">
					Notifications
				</Tabs.Trigger>
			</Tabs.List>
			<Tabs.Content value="overview" class="space-y-4">
				<p>overview tab</p>
			</Tabs.Content>
            <Tabs.Content value="analytics" class="space-y-4">
				
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
			</Tabs.Content>
		</Tabs.Root>
	</div>
</div>
{@render children()}