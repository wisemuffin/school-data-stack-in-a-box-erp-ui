<script lang="ts">
	import { Card, CardContent } from "$lib/components/ui/card";
	import { ArrowDownIcon, ArrowUpIcon } from "lucide-svelte";
	import { Area, AreaChart, LinearGradient, Tooltip } from "layerchart";

	type PeriodType = "daily" | "weekly" | "monthly" | "term" | "year";

	type Props = {
		/** KPI name */
		name: string;
		/** KPI value */
		value: number;
		/** Growth percentage from prior period */
		growth?: number;
		/** Optional trend data array */
		trend?: Array<{value: number, date: Date | string}>;
		/** Value format type */
		format?: "currency" | "number" | "percentage";
		/** Comparison period type */
		period?: PeriodType;
	};

	// Props with defaults
	let { 
		name, 
		value, 
		growth = 0, 
		trend, 
		format = "number",
		period = "monthly" 
	}: Props = $props();

	// Format KPI value based on type
	const formattedValue = $derived(formatValue(value, format));

	// Format growth percentage
	const formattedGrowth = $derived(formatGrowth(growth));

	// Growth text color based on value
	const growthColorClass = $derived(growth >= 0 ? "text-green-500" : "text-red-500");

	// Format trend data for LayerChart
	const trendData = $derived(
		trend?.map((item, index) => ({
			x: item.date,
			y: item.value,
			date: item.date
		})) ?? []
	);

	// Get period display text
	const periodText = $derived(getPeriodText(period));

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

	/** Get display text for period type */
	function getPeriodText(periodType: PeriodType): string {
		switch (periodType) {
			case "daily":
				return "vs. yesterday";
			case "weekly":
				return "vs. last week";
			case "monthly":
				return "vs. last month";
			case "term":
				return "vs. last term";
			case "year":
				return "vs. last year";
			default:
				return "vs. previous period";
		}
	}

	/** Format date for tooltip */
	function formatDate(date: Date | string): string {
		if (!date) return "";
		
		const dateObj = typeof date === 'string' ? new Date(date) : date;
		
		// Use 'en-GB' locale for English (UK) date format
		const locale = 'en-GB';
		
		switch (period) {
			case "daily":
				return dateObj.toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
			case "weekly":
				return `Week of ${dateObj.toLocaleDateString(locale, { month: 'short', day: 'numeric' })}`;
			case "monthly":
				return dateObj.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
			case "term":
				return `Term ${dateObj.getMonth() >= 8 ? 1 : dateObj.getMonth() >= 5 ? 4 : dateObj.getMonth() >= 2 ? 3 : 2}, ${dateObj.getFullYear()}`;
			case "year":
				return dateObj.getFullYear().toString();
			default:
				return dateObj.toLocaleDateString(locale);
		}
	}
</script>

<Card>
	<CardContent class="flex flex-col gap-4 p-6">
		<!-- KPI Header with chart taking available space -->
		<div class="flex items-start justify-between gap-4">
			<!-- Left side with KPI value and name -->
			<div class="flex flex-col min-w-fit">
				<span class="text-4xl font-bold tracking-tight">{formattedValue}</span>
				<span class="text-sm text-muted-foreground">{name}</span>
				
				<!-- Growth indicator -->
				{#if growth !== undefined}
					<div class="flex items-center gap-1 mt-1">
						<span class={"flex items-center gap-0.5 text-sm font-medium " + growthColorClass}>
							{#if growth >= 0}
								<ArrowUpIcon class="h-4 w-4" />
							{:else}
								<ArrowDownIcon class="h-4 w-4" />
							{/if}
							{formattedGrowth}
						</span>
						<span class="text-sm text-muted-foreground">{periodText}</span>
					</div>
				{/if}
			</div>

			<!-- Right side with chart taking all available space -->
			{#if trend}
				<div class="h-16 flex-grow">
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
						
						<!-- <svelte:fragment slot="tooltip" let:data>
							{#if data}
								<div class="bg-popover text-popover-foreground shadow-md rounded-md p-2 text-sm">
									<div class="font-medium">{formatDate(data.date)}</div>
									<div class="flex items-center gap-2">
										<div class="w-2 h-2 rounded-full bg-primary"></div>
										<div>{formatValue(data.y, format)}</div>
									</div>
								</div>
							{/if}
						</svelte:fragment> -->
					</AreaChart>
				</div>
			{/if}
		</div>
	</CardContent>
</Card>