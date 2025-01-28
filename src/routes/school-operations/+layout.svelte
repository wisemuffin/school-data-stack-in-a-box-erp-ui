<script lang="ts">
import * as Sidebar from "$lib/components/ui/sidebar/index.js";
import * as Tabs from "$lib/components/ui/tabs";
import * as Card from "$lib/components/ui/card/index.js"

import { Button } from "$lib/components/ui/button";

import DatePickerWithRange from "$lib/components/ui/date-picker-with-range.svelte";

import Activity from "lucide-svelte/icons/activity";
	import CreditCard from "lucide-svelte/icons/credit-card";
import DollarSign from "lucide-svelte/icons/dollar-sign";
import { Download } from "lucide-svelte";
import Users from "lucide-svelte/icons/users";

import { page } from "$app/stores";

// import Overview from "./overview.svelte"

let { children } = $props();

let currentPath = $derived($page.url.pathname);
let currentTab = $derived(currentPath.split('/').pop() || 'overview');
</script>

<div class="flex-col">
	
	<div class="flex-1 space-y-4 p-8 pt-6">
		<div class="flex items-center justify-between space-y-2">
			<h2 class="text-3xl font-bold tracking-tight text-nsw-brand-dark dark:text-white">School Operations</h2>
			<div class="hidden md:flex flex items-center space-x-2">
				<DatePickerWithRange />
				<Button size="sm" class="bg-nsw-brand-dark text-white dark:bg-white dark:text-nsw-brand-dark hover:bg-nsw-brand-dark/90 dark:hover:bg-gray-100">
					<Download class="mr-2 size-4" />
					Download
				</Button>
			</div>
		</div>
		<Tabs.Root value={currentTab} class="space-y-4">
			<Tabs.List>
				<Tabs.Trigger value="overview" class="text-nsw-brand-dark/80 dark:text-white/80">
					<a href="/school-operations">Overview</a>
				</Tabs.Trigger>
				<Tabs.Trigger value="schools" class="text-nsw-brand-dark/80 dark:text-white/80">
					<a href="/school-operations/schools">Schools</a>
				</Tabs.Trigger>
				<Tabs.Trigger value="students" class="text-nsw-brand-dark/80 dark:text-white/80">
					<a href="/school-operations/students">Students</a>
				</Tabs.Trigger>
				<Tabs.Trigger value="courses" class="text-nsw-brand-dark/80 dark:text-white/80">
					<a href="/school-operations/courses">Courses</a>
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	</div>
</div>
{@render children()}