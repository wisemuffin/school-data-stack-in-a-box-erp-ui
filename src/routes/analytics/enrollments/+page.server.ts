import type { PageServerLoad } from './$types';
import { queryMetrics } from '$lib/api/data-analytics/data_analytics_client';

export const load: PageServerLoad = async () => {
    const query = {
        metrics: ['total_enrollments'],
        // group_by: ['metric_time'],
        where: null,
        start_time: '2024-01-01',
        end_time: '2024-03-01'
    };

    const response = await queryMetrics(query);
    
    return {
        enrollments: response.results
    };
}; 