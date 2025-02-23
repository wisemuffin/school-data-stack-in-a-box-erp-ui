import type { PageServerLoad } from './$types';
import { queryMetrics } from '$lib/api/data-analytics/data_analytics_client';

export const load: PageServerLoad = async () => {
    const response = await queryMetrics({
        metrics: ['total_enrollments'],
        group_by: ['metric_time'],
        where: null,
        start_time: '2024-01-01',
        end_time: '2024-03-01'
    });
    
    // response.results will be typed as Array<{ total_enrollments: number, metric_time: string }>
    return {
        enrollments: response.results
    };
}; 