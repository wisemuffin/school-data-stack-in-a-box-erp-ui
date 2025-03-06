<script lang="ts">
    import { AreaChart } from 'layerchart';
    import { dateSeriesData } from './data/data';

    let debug = true;
    
</script>

<div class="h-[300px] p-4 border rounded">
    <AreaChart data={dateSeriesData} x="date" y="value" {debug} />
  </div>