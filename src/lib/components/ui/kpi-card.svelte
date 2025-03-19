<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { ArrowDownIcon, ArrowUpIcon } from "lucide-svelte";
	import { Area, AreaChart, LineChart, LinearGradient } from "layerchart";

	type Props = {
		/** KPI name */
		name: string;
		/** KPI value */
		value: number;
		/** Growth percentage from prior period */
		growth?: number;
		/** Optional trend data array */
		trend?: number[];
		/** Value format type */
		format?: "currency" | "number" | "percentage";
	};

	// Props with defaults
	let { name, value, growth = 0, trend, format = "number" }: Props = $props();

	// Format KPI value based on type
	const formattedValue = $derived(formatValue(value, format));

	// Format growth percentage
	const formattedGrowth = $derived(formatGrowth(growth));

	// Growth text color based on value
	const growthColorClass = $derived(growth >= 0 ? "text-green-500" : "text-red-500");

	// Format trend data for LayerChart
	const trendData = $derived(
		trend?.map((value, index) => ({
			x: index,
			y: value,
		})) ?? []
	);

	/** Format value based on type */
	function formatValue(val: number, type: string): string {
		switch (type) {
			case "currency":
				return new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
					maximumFractionDigits: 0,
				}).format(val);
			case "percentage":
				return `${val}%`;
			default:
				return new Intl.NumberFormat("en-US").format(val);
		}
	}

	/** Format growth with + or - symbol */
	function formatGrowth(val: number): string {
		const prefix = val >= 0 ? "+" : "";
		return `${prefix}${val.toFixed(1)}%`;
	}
</script>

<Card>
	<CardContent class="flex flex-col gap-4 p-6">
		<!-- KPI Header with optional trend chart -->
		<div class="flex items-start justify-between gap-4">
			<div class="flex flex-col gap-1">
				<span class="text-4xl font-bold tracking-tight">{formattedValue}</span>
				<span class="text-sm text-muted-foreground">{name}</span>
			</div>

			{#if trend}
				<div class="h-10 w-24">
					<AreaChart
						data={trendData}
						x="x"
						y="y"
						grid={false} 
						axis={false}
					>
						<svelte:fragment slot="marks">
							<LinearGradient class="from-primary/50 to-primary/0" vertical let:gradient>
								<Area line={{ class: 'stroke-primary' }} fill={gradient} />
							</LinearGradient>
						</svelte:fragment>
					</AreaChart>
				</div>
			{/if}
		</div>

		<!-- Growth indicator -->
		{#if growth !== undefined}
			<div class="flex items-center gap-1">
				<span class={"flex items-center gap-0.5 text-sm font-medium " + growthColorClass}>
					{#if growth >= 0}
						<ArrowUpIcon class="h-4 w-4" />
					{:else}
						<ArrowDownIcon class="h-4 w-4" />
					{/if}
					{formattedGrowth}
				</span>
				<span class="text-sm text-muted-foreground">vs. last month</span>
			</div>
		{/if}
	</CardContent>
</Card>