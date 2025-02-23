import type { MetricQuery, MetricQueryResponse } from './types/data_analytics_api';

const API_URL = 'http://localhost:8001';

export async function queryMetrics<
    M extends MetricQuery['metrics'],
    D extends NonNullable<MetricQuery['group_by']>
>(query: MetricQuery & { metrics: M; group_by?: D }): Promise<MetricQueryResponse<M, D>> {
    const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
} 