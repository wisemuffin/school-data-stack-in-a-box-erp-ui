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

    // Example KPI data with updated trend data format
    const salesKpi = {
        name: "Total Sales",
        value: 45892,
        growth: 12.5,
        trend: [
            { value: 35000, date: new Date("2023-01-01") },
            { value: 28000, date: new Date("2023-02-01") },
            { value: 32000, date: new Date("2023-03-01") },
            { value: 39000, date: new Date("2023-04-01") },
            { value: 42000, date: new Date("2023-05-01") },
            { value: 45892, date: new Date("2023-06-01") }
        ],
        format: "currency" as const,
        period: "monthly" as const
    };

    const usersKpi = {
        name: "Active Users",
        value: 1234,
        growth: -2.3,
        trend: [
            { value: 1300, date: new Date("2023-06-01") },
            { value: 1280, date: new Date("2023-06-08") },
            { value: 1260, date: new Date("2023-06-15") },
            { value: 1240, date: new Date("2023-06-22") },
            { value: 1234, date: new Date("2023-06-29") }
        ],
        format: "number" as const,
        period: "weekly" as const
    };
    
    const enrollmentKpi = {
        name: "Student Enrollment",
        value: 2845,
        growth: 5.2,
        trend: [
            { value: 2650, date: "2022" },
            { value: 2720, date: "2023" },
            { value: 2845, date: "2024" }
        ],
        format: "number" as const,
        period: "year" as const
    };
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
    <KpiCard 
        name={salesKpi.name} 
        value={salesKpi.value} 
        growth={salesKpi.growth} 
        trend={salesKpi.trend}
        format={salesKpi.format} 
        period={salesKpi.period} 
    />

    <KpiCard 
        name={usersKpi.name} 
        value={usersKpi.value} 
        growth={usersKpi.growth} 
        trend={usersKpi.trend}
        format={usersKpi.format} 
        period={usersKpi.period} 
    />
    
    <KpiCard 
        name={enrollmentKpi.name} 
        value={enrollmentKpi.value} 
        growth={enrollmentKpi.growth} 
        trend={enrollmentKpi.trend} 
        format={enrollmentKpi.format} 
        period={enrollmentKpi.period} 
    />
    
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
                <Card.Title class="text-xl font-semibold text-center ">Monthly Trends</Card.Title>
                <Card.Description class="text-center ">
                    Visualizing key metrics over time to identify patterns and growth opportunities.
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
                <Card.Title class="text-xl font-semibold text-center ">Revenue Breakdown</Card.Title>
                <Card.Description class="text-center ">
                    Comparing revenue streams across different time periods and categories.
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
                    series={[{ key: "value", color: "hsl(var(--primary))" }]}
                    >

                </LineChart>   
            </div>
            <Card.Header>
                <Card.Title class="text-xl font-semibold text-center ">Performance Metrics</Card.Title>
                <Card.Description class="text-center ">
                    Tracking key performance indicators to measure progress toward goals.
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
                        "hsl(var(--primary))",
                        "hsl(var(--secondary))",
                        "hsl(var(--destructive))",
                        "hsl(var(--accent))",
                      ]}
                    {debug}
                >
                    <svelte:fragment slot="aboveMarks">
                    <Text
                        value="Fruit Distribution"
                        textAnchor="middle"
                        verticalAnchor="middle"
                        class="text-sm fill-surface-content/50"
                        dy={26}
                    />
                    </svelte:fragment>
                </PieChart> 
            </div>
            <Card.Header>
                <Card.Title class="text-xl font-semibold text-center ">Category Distribution</Card.Title>
                <Card.Description class="text-center ">
                    Visualizing the proportional breakdown of different categories in our dataset.
                </Card.Description>
            </Card.Header>
        </Card.Content>
    </Card.Root>
</div>
