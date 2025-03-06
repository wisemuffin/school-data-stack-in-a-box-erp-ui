<script lang="ts">
    import { Area, AreaChart, Chart, LinearGradient, Grid, Axis } from 'layerchart';
    import { dateSeriesData } from './data/data';
	import * as Card from '$lib/components/ui/card';

    let debug = true;
    
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
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
</div>
