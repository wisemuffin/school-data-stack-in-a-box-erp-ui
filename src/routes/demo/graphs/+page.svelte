<script lang="ts">
    import { Area, AreaChart, BarChart, Chart, LineChart, LinearGradient, Grid, Axis, PieChart, Text } from 'layerchart';
    import { dateSeriesData } from './data/data';
	import * as Card from '$lib/components/ui/card';

    let debug = true;
    let data_pie = [
        {
            "year": 2019,
            "basket": 1,
            "fruit": "apples",
            "value": 3840
        },
        {
            "year": 2019,
            "basket": 1,
            "fruit": "bananas",
            "value": 1920
        },
        {
            "year": 2019,
            "basket": 2,
            "fruit": "cherries",
            "value": 960
        },
        {
            "year": 2019,
            "basket": 2,
            "fruit": "grapes",
            "value": 400
        }
        ]

    import KpiCard from "$lib/components/ui/kpi-card.svelte";

    // Example KPI data
    const salesKpi = {
        name: "Total Sales",
        value: 45892,
        growth: 12.5,
        trend: [35, 28, 32, 39, 42, 45], // Last 6 months data
        format: "currency",
    };

    const usersKpi = {
        name: "Active Users",
        value: 1234,
        growth: -2.3,
        format: "number",
    };
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
    <KpiCard name={salesKpi.name} value={salesKpi.value} growth={salesKpi.growth} trend={salesKpi.trend} format={salesKpi.format} />

	<KpiCard name={usersKpi.name} value={usersKpi.value} growth={usersKpi.growth} format={usersKpi.format} />
    
    <Card.Root class="dark:bg-gray-800">
        <Card.Content class="pt-6">
            <div class="h-[300px]">
                <AreaChart 
                    data={dateSeriesData} 
                    x="date" 
                    y="value"
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
            <Card.Header>
                <Card.Title class="text-xl font-semibold text-center ">Student Management</Card.Title>
                <Card.Description class="text-center ">
                    Efficiently manage student records, attendance, and academic progress all in one place.
                </Card.Description>
            </Card.Header>
        </Card.Content>
    </Card.Root>
    <Card.Root class="dark:bg-gray-800">
        <Card.Content class="pt-6">
            <div class="h-[300px]">
                <BarChart 
                    data={dateSeriesData} 
                    x="date" 
                    y="value"
                    grid={false} 
                    axis={false}
                    >

                </BarChart>   
            </div>
            <Card.Header>
                <Card.Title class="text-xl font-semibold text-center ">Student Management</Card.Title>
                <Card.Description class="text-center ">
                    Efficiently manage student records, attendance, and academic progress all in one place.
                </Card.Description>
            </Card.Header>
        </Card.Content>
    </Card.Root>
    <Card.Root class="dark:bg-gray-800">
        <Card.Content class="pt-6">
            <div class="h-[300px]">
                <LineChart 
                    data={dateSeriesData} 
                    x="date" 
                    series={[{ key: "value", color: "hsl(var(--color-primary))" }]}
                    >

                </LineChart>   
            </div>
            <Card.Header>
                <Card.Title class="text-xl font-semibold text-center ">Student Management</Card.Title>
                <Card.Description class="text-center ">
                    Efficiently manage student records, attendance, and academic progress all in one place.
                </Card.Description>
            </Card.Header>
        </Card.Content>
    </Card.Root>
    <Card.Root class="dark:bg-gray-800">
        <Card.Content class="pt-6">
            <div class="h-[300px]">
                <PieChart
                    data={data_pie}
                    key="fruit"
                    value="value"
                    innerRadius={-20}
                    cornerRadius={5}
                    padAngle={0.02}
                    cRange={[
                        "hsl(var(--color-primary))",
                        "hsl(var(--color-warning))",
                        "hsl(var(--color-danger))",
                        "hsl(var(--color-info))",
                      ]}
                    {debug}
                >
                    <svelte:fragment slot="aboveMarks">
                    <!-- <Text
                        value={format(sum(data, (d) => d.value))}
                        textAnchor="middle"
                        verticalAnchor="middle"
                        class="text-4xl"
                        dy={4}
                    /> -->
                    <Text
                        value="total"
                        textAnchor="middle"
                        verticalAnchor="middle"
                        class="text-sm fill-surface-content/50"
                        dy={26}
                    />
                    </svelte:fragment>
                </PieChart> 
            </div>
            <Card.Header>
                <Card.Title class="text-xl font-semibold text-center ">Student Management</Card.Title>
                <Card.Description class="text-center ">
                    Efficiently manage student records, attendance, and academic progress all in one place.
                </Card.Description>
            </Card.Header>
        </Card.Content>
    </Card.Root>
</div>
